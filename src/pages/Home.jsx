import { ArrowRight, CalendarCheck, Clock, ShieldCheck, Users } from "lucide-react";
import Button from "../components/Button";
import ImagePanel from "../components/ImagePanel";
import SectionHeader from "../components/SectionHeader";
import { money } from "../utils/format";

const highlights = [
  { icon: CalendarCheck, title: "Online Availability", text: "Customers can check date and time availability before submitting a booking request." },
  { icon: Clock, title: "Flexible Duration", text: "Clear packages for 12, 18 and 24 hour functions with extra-hour pricing." },
  { icon: Users, title: "Event Friendly", text: "Suitable for marriages, meetings, engagements, birthday parties and community functions." },
  { icon: ShieldCheck, title: "Admin Confirmation", text: "Every booking request is reviewed and confirmed by the admin team." }
];

const packages = [
  { label: "12 Hours", price: 26000, text: "Best for compact functions and half-day events." },
  { label: "18 Hours", price: 38000, text: "Ideal for ceremonies that need extended preparation time." },
  { label: "24 Hours", price: 50000, text: "Complete day access for major family celebrations." }
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-line bg-brand-soft">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-brand-green lg:block" />
        <div className="container-pad relative grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1fr_0.92fr] lg:py-20">
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.32em] text-brand-gold">
              Professional Event Venue
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.95] text-brand-ink sm:text-7xl lg:text-8xl">
              Celebrate with confidence at Kaasi Mahal.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ink/70">
              A corporate-style event website connected to the backend, allowing customers to check availability, view services and submit booking requests directly.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button to="/booking" variant="gold">
                Check Availability <ArrowRight size={17} className="ml-2" />
              </Button>
              <Button to="/services" variant="outline">
                View Services
              </Button>
            </div>
          </div>

          <div className="relative">
            <ImagePanel className="h-[560px]" label="Kaasi Mahal venue" />
            <div className="absolute bottom-0 left-0 border border-brand-line bg-white p-6 shadow-line sm:-left-8 sm:bottom-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-brand-gold">Starting From</p>
              <p className="mt-2 font-serif text-4xl font-semibold text-brand-ink">{money(26000)}</p>
              <p className="mt-1 text-sm font-semibold text-brand-ink/60">12 hours function package</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="square-card p-7">
                <item.icon size={30} className="text-brand-gold" />
                <h3 className="mt-6 text-xl font-extrabold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-ink/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-line bg-white section-pad">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <ImagePanel className="h-[520px]" index={1} label="Kaasi Mahal event interior" />
          <div>
            <SectionHeader
              eyebrow="About the Venue"
              title="Built for family events, public programs and professional gatherings."
              description="Kaasi Mahal supports different event purposes with simple pricing, additional services and admin-managed booking confirmation."
            />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                "Marriage functions",
                "Engagement events",
                "Meetings and gatherings",
                "Birthday parties",
                "Government camps",
                "Community functions"
              ].map((item) => (
                <div key={item} className="border border-brand-line bg-brand-soft px-5 py-4 text-sm font-bold text-brand-ink">
                  {item}
                </div>
              ))}
            </div>
            <Button to="/about" variant="primary" className="mt-8">
              Know More
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-soft">
        <div className="container-pad">
          <SectionHeader
            align="center"
            eyebrow="Transparent Packages"
            title="Simple hall booking prices"
            description="Extra hours are calculated at ₹2,000 per hour. The final estimated cost is shown before submitting the booking request."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <div key={item.label} className="square-card p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-gold">{item.label}</p>
                <p className="mt-4 font-serif text-5xl font-semibold text-brand-ink">{money(item.price)}</p>
                <p className="mt-5 text-sm leading-7 text-brand-ink/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-green py-16 text-white">
        <div className="container-pad flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">Book with clarity</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">Check your event date and submit your request online.</h2>
          </div>
          <Button to="/booking" variant="light">
            Start Booking
          </Button>
        </div>
      </section>
    </>
  );
}
