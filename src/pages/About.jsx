import { Building2, CheckCircle2, Clock3, Handshake } from "lucide-react";
import ImagePanel from "../components/ImagePanel";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";

const values = [
  { icon: Building2, title: "Neat Venue Management", text: "A reliable hall booking flow for customers and admin staff." },
  { icon: Clock3, title: "Time-Based Packages", text: "Customers can plan events using clear start and end time selection." },
  { icon: Handshake, title: "Service Support", text: "Additional event services can be selected during booking." },
  { icon: CheckCircle2, title: "Confirmation Process", text: "Requests remain pending until the admin confirms availability." }
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A professional mandapam website for organized event bookings."
        description="Kaasi Mahal is presented as a clean, corporate event venue platform where visitors can understand services, view photos and request bookings in a structured way."
      />

      <section className="section-pad">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <SectionHeader
              eyebrow="Our Approach"
              title="Designed to make event booking clear for customers and manageable for admins."
              description="The website connects directly with the backend availability and booking APIs. Customers submit their preferred date, time and function details, while the admin confirms the booking from the admin panel."
            />
            <div className="mt-8 space-y-5 text-base leading-8 text-brand-ink/70">
              <p>
                The purpose of this customer website is to avoid confusion in hall availability, pricing and event service selection. Every booking request includes customer details, function name, start time, end time and selected services.
              </p>
              <p>
                The visual style is kept formal and premium, avoiding a dashboard-like look and giving the venue a strong professional identity.
              </p>
            </div>
          </div>
          <ImagePanel className="h-[520px]" index={2} label="Venue event setup" />
        </div>
      </section>

      <section className="border-y border-brand-line bg-white section-pad">
        <div className="container-pad">
          <SectionHeader
            align="center"
            eyebrow="Why Choose Us"
            title="Everything needed for a smooth booking experience."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title} className="square-card p-7">
                <item.icon size={32} className="text-brand-gold" />
                <h3 className="mt-6 text-xl font-extrabold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-ink/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-soft">
        <div className="container-pad grid gap-8 lg:grid-cols-3">
          {[
            { number: "01", title: "Check Availability", text: "Choose your start and end time to verify if the hall is free." },
            { number: "02", title: "Submit Booking", text: "Fill customer details, function details and optional services." },
            { number: "03", title: "Admin Confirmation", text: "The admin reviews the request and confirms the booking status." }
          ].map((step) => (
            <div key={step.number} className="border-l-4 border-brand-gold bg-white p-8 shadow-line">
              <p className="font-serif text-5xl font-semibold text-brand-gold">{step.number}</p>
              <h3 className="mt-5 text-2xl font-extrabold text-brand-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-ink/65">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
