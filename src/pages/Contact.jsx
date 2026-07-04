import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

export default function Contact() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "074180 06000";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "kaasimahal@gmail.com";
  const address =
    import.meta.env.VITE_CONTACT_ADDRESS ||
    "32-Eraniyan Street Rangampalayam, Chennimalai main road, Erode, Tamil Nadu 638009";

  const defaultMapUrl =
    "https://www.google.com/maps?q=32-Eraniyan%20Street%20Rangampalayam%2C%20Chennimalai%20main%20road%2C%20Erode%2C%20Tamil%20Nadu%20638009&output=embed";

  const mapUrl = import.meta.env.VITE_MAP_EMBED_URL || defaultMapUrl;

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Reach Kaasi Mahal for booking and venue details."
        description="Use the contact details below or submit your event date directly from the booking page."
      />

      <section className="section-pad">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Get in Touch"
              title="Speak with the venue team before your function."
              description="For exact location, function arrangements and booking support, contact the team or use the online booking request form."
            />

            <div className="mt-9 grid gap-5">
              <div className="square-card p-6">
                <div className="flex gap-4">
                  <Phone className="shrink-0 text-brand-gold" />

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">
                      Phone
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-brand-ink">
                      {phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="square-card p-6">
                <div className="flex gap-4">
                  <Mail className="shrink-0 text-brand-gold" />

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">
                      Email
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-brand-ink">
                      {email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="square-card p-6">
                <div className="flex gap-4">
                  <MapPin className="shrink-0 text-brand-gold" />

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">
                      Address
                    </p>
                    <p className="mt-2 text-lg font-extrabold leading-7 text-brand-ink">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button to="/booking" variant="gold" className="mt-8">
              Book Function Date
            </Button>
          </div>

          <div className="overflow-hidden border border-brand-line bg-white shadow-line">
            <iframe
              title="Kaasi Mahal Location Map"
              src={mapUrl}
              className="h-[620px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}