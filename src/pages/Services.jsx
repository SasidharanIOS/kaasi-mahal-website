import { useEffect, useState } from "react";
import { BadgeIndianRupee, Check, Loader2, PartyPopper } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import { publicApi } from "../api/publicApi";
import { getErrorMessage, money } from "../utils/format";

const defaultServices = [
  "Catering",
  "Labour",
  "Backdrops",
  "Serial Light",
  "Tower Lights",
  "Balloons",
  "Bouncers",
  "Singers",
  "LED Board",
  "A/C",
  "Valamaram",
  "EB",
  "Cleaning",
  "Debris Cleaning"
];

const defaultPurposes = [
  "Marriage",
  "Meeting",
  "Kathu Kuthu",
  "Engagement",
  "Karuvizhunthu",
  "Elathirukingu",
  "Sada Abishegam",
  "Birthday Party",
  "Age Attend Function",
  "Valagappu",
  "Government Camp"
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [servicesRes, purposesRes] = await Promise.all([
          publicApi.services(),
          publicApi.purposes()
        ]);
        setServices(servicesRes.data || []);
        setPurposes(purposesRes.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const serviceRows = services.length ? services : defaultServices.map((name, index) => ({ id: index + 1, name, price: 0, rate_type: "quote" }));
  const purposeRows = purposes.length ? purposes : defaultPurposes.map((name, index) => ({ id: index + 1, name }));

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Complete event support services for your function."
        description="Customers can view the available mandapam services and select additional services while submitting the booking request."
      />

      <section className="section-pad">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Additional Services"
            title="Event support that can be included with your booking."
            description=""
          />

          {loading ? (
            <div className="mt-12 flex items-center gap-3 border border-brand-line bg-white p-6 text-brand-ink">
              <Loader2 className="animate-spin text-brand-gold" /> Loading services...
            </div>
          ) : null}

          {error ? (
            <div className="mt-12 border border-brand-gold bg-brand-gold/10 p-5 text-sm font-semibold text-brand-ink">
              Backend services could not be loaded. Showing default service list. {error}
            </div>
          ) : null}

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceRows.map((service) => (
              <div key={service.id || service.name} className="square-card p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-gold">Service</p>
                    <h3 className="mt-3 text-2xl font-extrabold text-brand-ink">{service.name}</h3>
                  </div>
                  <PartyPopper size={28} className="text-brand-gold" />
                </div>
                <div className="mt-6 border-t border-brand-line pt-5">
                  <p className="flex items-center gap-2 text-sm font-bold text-brand-ink/70">
                    <BadgeIndianRupee size={18} className="text-brand-green" />
                    {Number(service.price || 0) > 0 ? money(service.price) : "Quote based"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-line bg-white section-pad">
        <div className="container-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Function Purposes"
            title="Venue suitable for multiple family and public programs."
            description="The function purpose list is connected with the backend master data and shown in the booking form dropdown."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {purposeRows.map((purpose) => (
              <div key={purpose.id || purpose.name} className="flex items-center gap-3 border border-brand-line bg-brand-soft px-5 py-4">
                <Check size={18} className="text-brand-gold" />
                <span className="text-sm font-extrabold text-brand-ink">{purpose.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
