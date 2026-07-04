import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Booking", to: "/booking" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const siteName = import.meta.env.VITE_SITE_NAME || "Kaasi Mahal";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/80 bg-brand-soft/95 backdrop-blur-xl">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center border border-brand-gold bg-brand-green font-serif text-2xl font-bold text-white transition group-hover:bg-brand-ink">
            K
          </span>
          <span>
            <span className="block font-serif text-2xl font-semibold leading-6 tracking-wide text-brand-ink">
              {siteName}
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
              Events & Mandapam
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs font-extrabold uppercase tracking-[0.18em] transition ${
                  isActive ? "text-brand-gold" : "text-brand-ink/70 hover:text-brand-green"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/booking" variant="gold" className="px-5 py-3">
            Book Now
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="border border-brand-line bg-white p-3 text-brand-ink lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-brand-line bg-white lg:hidden">
          <div className="container-pad py-5">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `border border-brand-line px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] ${
                      isActive ? "bg-brand-green text-white" : "bg-white text-brand-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
