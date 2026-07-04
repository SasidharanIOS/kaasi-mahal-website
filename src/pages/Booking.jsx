import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Loader2, ReceiptIndianRupee, XCircle } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { publicApi } from "../api/publicApi";
import { getErrorMessage, money, prettyDateTime, toBackendDateTime } from "../utils/format";

const initialForm = {
  customer_name: "",
  mobile: "",
  email: "",
  address: "",
  function_name: "",
  purpose: "",
  start_time: "",
  end_time: "",
  selected_services: []
};

const defaultPurposes = [
  "Marriage",
  "Meeting",
  "Kathu Kuthu",
  "Engagement",
  "Birthday Party",
  "Valagappu",
  "Government Camp"
];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label-text">{label}</span>
      {children}
    </label>
  );
}

export default function Booking() {
  const [form, setForm] = useState(initialForm);
  const [services, setServices] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [mastersLoading, setMastersLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const loadMasters = async () => {
      try {
        const [servicesRes, purposesRes] = await Promise.all([
          publicApi.services(),
          publicApi.purposes()
        ]);
        setServices(servicesRes.data || []);
        setPurposes(purposesRes.data || []);
      } catch (_err) {
        setServices([]);
        setPurposes([]);
      } finally {
        setMastersLoading(false);
      }
    };

    loadMasters();
  }, []);

  const fixedServiceAmount = useMemo(() => {
    const selected = new Set(form.selected_services);
    return services.reduce((sum, service) => {
      if (!selected.has(service.name)) return sum;
      const amount = Number(service.price || 0);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);
  }, [form.selected_services, services]);

  const estimate = availability?.price || null;
  const finalEstimate = estimate
    ? {
        ...estimate,
        total_amount: Number(estimate.base_amount || 0) + fixedServiceAmount,
        additional_service_amount: fixedServiceAmount,
        free_items: Number(estimate.base_amount || 0) + fixedServiceAmount > 25000
          ? ["Mandapam", "Table", "Chair", "Kitchen Things"]
          : ["Mandapam", "Table", "Chair"]
      }
    : null;

  const purposeRows = purposes.length ? purposes.map((item) => item.name) : defaultPurposes;

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (["start_time", "end_time"].includes(name)) setAvailability(null);
    setMessage({ type: "", text: "" });
  };

  const toggleService = (serviceName) => {
    setForm((prev) => {
      const exists = prev.selected_services.includes(serviceName);
      return {
        ...prev,
        selected_services: exists
          ? prev.selected_services.filter((item) => item !== serviceName)
          : [...prev.selected_services, serviceName]
      };
    });
  };

  const validateTime = () => {
    if (!form.start_time || !form.end_time) {
      setMessage({ type: "error", text: "Please select start time and end time." });
      return false;
    }
    if (new Date(form.end_time) <= new Date(form.start_time)) {
      setMessage({ type: "error", text: "End time must be greater than start time." });
      return false;
    }
    return true;
  };

  const checkAvailability = async () => {
    if (!validateTime()) return;
    try {
      setChecking(true);
      setMessage({ type: "", text: "" });
      const res = await publicApi.availability({
        start_time: toBackendDateTime(form.start_time),
        end_time: toBackendDateTime(form.end_time)
      });
      setAvailability(res.data);
      setMessage({
        type: res.data?.available ? "success" : "error",
        text: res.data?.available
          ? "Selected date and time is available. You can submit the booking request."
          : "Selected time is already blocked. Please choose another time."
      });
    } catch (err) {
      setMessage({ type: "error", text: getErrorMessage(err) });
      setAvailability(null);
    } finally {
      setChecking(false);
    }
  };

  const submitBooking = async (event) => {
    event.preventDefault();

    const required = ["customer_name", "mobile", "address", "function_name", "start_time", "end_time"];
    const missing = required.filter((key) => !String(form[key] || "").trim());
    if (missing.length) {
      setMessage({ type: "error", text: "Please fill all required booking details." });
      return;
    }

    if (!availability?.available) {
      await checkAvailability();
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: "", text: "" });
      const payload = {
        ...form,
        start_time: toBackendDateTime(form.start_time),
        end_time: toBackendDateTime(form.end_time),
        additional_service_amount: fixedServiceAmount
      };
      const res = await publicApi.createBooking(payload);
      setMessage({
        type: "success",
        text: `Booking request submitted successfully. Booking No: ${res.data?.booking_no || "-"}`
      });
      setForm(initialForm);
      setAvailability(null);
    } catch (err) {
      setMessage({ type: "error", text: getErrorMessage(err) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Check availability and submit your function booking request."
        description="Fill the customer details, choose function date and time, select required services and submit the request for admin confirmation."
      />

      <section className="section-pad">
        <div className="container-pad grid gap-10 lg:grid-cols-[1fr_420px]">
          <form onSubmit={submitBooking} className="square-card p-6 sm:p-8 lg:p-10">
            <SectionHeader
              eyebrow="Customer Details"
              title="Booking request form"
              description="Mail ID is optional. Other details are required for admin confirmation."
            />

            {message.text ? (
              <div className={`mt-8 flex gap-3 border p-4 text-sm font-bold ${message.type === "success" ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-800"}`}>
                {message.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                <span>{message.text}</span>
              </div>
            ) : null}

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <Field label="Name *">
                <input className="input-box" value={form.customer_name} onChange={(e) => updateField("customer_name", e.target.value)} placeholder="Customer name" />
              </Field>
              <Field label="Mobile *">
                <input className="input-box" value={form.mobile} onChange={(e) => updateField("mobile", e.target.value)} placeholder="Mobile number" />
              </Field>
              <Field label="Mail ID Optional">
                <input className="input-box" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Email address" />
              </Field>
              <Field label="Function Name *">
                <input className="input-box" value={form.function_name} onChange={(e) => updateField("function_name", e.target.value)} placeholder="Function name" />
              </Field>
              <Field label="Purpose">
                <select className="input-box" value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)}>
                  <option value="">Select purpose</option>
                  {purposeRows.map((purpose) => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </Field>
              <Field label="Start Time *">
                <input className="input-box" type="datetime-local" value={form.start_time} onChange={(e) => updateField("start_time", e.target.value)} />
              </Field>
              <Field label="End Time *">
                <input className="input-box" type="datetime-local" value={form.end_time} onChange={(e) => updateField("end_time", e.target.value)} />
              </Field>
              <div className="md:col-span-2">
                <Field label="Address *">
                  <textarea className="input-box min-h-32 resize-y" value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Full address" />
                </Field>
              </div>
            </div>

            <div className="mt-10 border-t border-brand-line pt-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="label-text">Additional Services</p>
                  <p className="text-sm leading-7 text-brand-ink/65">Select any extra service required for your function.</p>
                </div>
                {mastersLoading ? <p className="flex items-center gap-2 text-sm font-bold text-brand-green"><Loader2 size={16} className="animate-spin" /> Loading</p> : null}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {services.length ? services.map((service) => {
                  const checked = form.selected_services.includes(service.name);
                  return (
                    <label key={service.id} className={`cursor-pointer border p-4 transition ${checked ? "border-brand-gold bg-brand-gold/10" : "border-brand-line bg-white hover:border-brand-gold"}`}>
                      <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleService(service.name)} />
                      <span className="flex items-start justify-between gap-4">
                        <span>
                          <span className="block text-sm font-extrabold text-brand-ink">{service.name}</span>
                          <span className="mt-1 block text-xs font-bold text-brand-ink/55">
                            {Number(service.price || 0) > 0 ? money(service.price) : "Quote based"}
                          </span>
                        </span>
                        <span className={`flex h-5 w-5 items-center justify-center border ${checked ? "border-brand-gold bg-brand-gold" : "border-brand-line bg-white"}`}>
                          {checked ? <CheckCircle2 size={14} className="text-white" /> : null}
                        </span>
                      </span>
                    </label>
                  );
                }) : (
                  <div className="border border-brand-line bg-brand-soft p-5 text-sm font-semibold text-brand-ink/65 sm:col-span-2">
                    No active additional services found from backend. You can still submit the booking request.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button type="button" variant="outline" onClick={checkAvailability} disabled={checking}>
                {checking ? <Loader2 size={18} className="mr-2 animate-spin" /> : <CalendarDays size={18} className="mr-2" />}
                Check Availability
              </Button>
              <Button type="submit" variant="gold" disabled={submitting || checking}>
                {submitting ? <Loader2 size={18} className="mr-2 animate-spin" /> : null}
                Submit Booking
              </Button>
            </div>
          </form>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="square-card p-7">
              <div className="flex items-center gap-3">
                <ReceiptIndianRupee size={30} className="text-brand-gold" />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-gold">Estimate</p>
                  <h3 className="text-2xl font-extrabold text-brand-ink">Booking Summary</h3>
                </div>
              </div>

              {finalEstimate ? (
                <div className="mt-7 space-y-4 text-sm">
                  <div className="flex justify-between gap-4 border-b border-brand-line pb-3">
                    <span className="font-semibold text-brand-ink/60">Availability</span>
                    <span className={`font-extrabold ${availability?.available ? "text-green-700" : "text-red-700"}`}>
                      {availability?.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4"><span className="text-brand-ink/60">Start</span><span className="font-bold text-brand-ink">{prettyDateTime(form.start_time)}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-brand-ink/60">End</span><span className="font-bold text-brand-ink">{prettyDateTime(form.end_time)}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-brand-ink/60">Charged Hours</span><span className="font-bold text-brand-ink">{finalEstimate.charged_hours}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-brand-ink/60">Hall Amount</span><span className="font-bold text-brand-ink">{money(finalEstimate.base_amount)}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-brand-ink/60">Extra Service</span><span className="font-bold text-brand-ink">{money(fixedServiceAmount)}</span></div>
                  <div className="border-t border-brand-line pt-4">
                    <div className="flex justify-between gap-4">
                      <span className="text-base font-extrabold text-brand-ink">Total Estimate</span>
                      <span className="font-serif text-3xl font-semibold text-brand-gold">{money(finalEstimate.total_amount)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-sm leading-7 text-brand-ink/65">
                  Select start time and end time, then click Check Availability to see estimated price and free included items.
                </p>
              )}
            </div>

            <div className="border border-brand-green bg-brand-green p-7 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-brand-gold">Free Items</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold">Included based on cost</h3>
              <div className="mt-5 grid gap-3">
                {(finalEstimate?.free_items || ["Mandapam", "Table", "Chair"]).map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold">
                    <CheckCircle2 size={17} className="text-brand-gold" /> {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-white/70">
                Above ₹25,000: Mandapam, Table, Chair and Kitchen Things. ₹25,000 or below: Mandapam, Table and Chair.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
