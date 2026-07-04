export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-brand-ink/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
