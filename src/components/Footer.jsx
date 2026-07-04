import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const siteName = import.meta.env.VITE_SITE_NAME || "Kaasi Mahal";
  const phone = import.meta.env.VITE_CONTACT_PHONE || "074180 06000";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "kaasimahal@gmail.com";
  const address =
    import.meta.env.VITE_CONTACT_ADDRESS ||
    "32-Eraniyan Street Rangampalayam, Chennimalai main road, Erode, Tamil Nadu 638009";

  return (
    <footer className="bg-brand-ink text-white">
      <div className="container-pad section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center border border-brand-gold bg-brand-gold font-serif text-2xl font-bold text-white">
                K
              </span>

              <div>
                <p className="font-serif text-3xl font-semibold">{siteName}</p>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Events & Mandapam
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
              A professional event venue for family functions, community gatherings,
              meetings and celebrations with transparent online availability and
              booking request support.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-brand-gold">
              Quick Links
            </p>

            <div className="grid gap-3 text-sm font-semibold text-white/75">
              <Link to="/about" className="hover:text-brand-gold">
                About Us
              </Link>
              <Link to="/services" className="hover:text-brand-gold">
                Services
              </Link>
              <Link to="/booking" className="hover:text-brand-gold">
                Booking
              </Link>
              <Link to="/gallery" className="hover:text-brand-gold">
                Gallery
              </Link>
              <Link to="/contact" className="hover:text-brand-gold">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-brand-gold">
              Contact
            </p>

            <div className="space-y-4 text-sm text-white/75">
              <p className="flex gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-brand-gold" />
                <span>{phone}</span>
              </p>

              <p className="flex gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-brand-gold" />
                <span>{email}</span>
              </p>

              <p className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-brand-gold" />
                <span>{address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-pad flex flex-col gap-2 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p>Designed for professional event bookings.</p>
        </div>
      </div>
    </footer>
  );
}