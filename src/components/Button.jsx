import { Link } from "react-router-dom";

const base = "inline-flex items-center justify-center border px-6 py-3 text-sm font-extrabold uppercase tracking-[0.16em] transition disabled:cursor-not-allowed disabled:opacity-60";
const variants = {
  primary: "border-brand-green bg-brand-green text-white hover:bg-brand-ink",
  gold: "border-brand-gold bg-brand-gold text-white hover:border-brand-ink hover:bg-brand-ink",
  outline: "border-brand-green bg-transparent text-brand-green hover:bg-brand-green hover:text-white",
  light: "border-white bg-white text-brand-green hover:bg-brand-gold hover:text-white hover:border-brand-gold"
};

export default function Button({ children, to, type = "button", variant = "primary", className = "", ...props }) {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
