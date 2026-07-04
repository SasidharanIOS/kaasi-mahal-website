export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="border-b border-brand-line bg-brand-green text-white">
      <div className="container-pad py-16 sm:py-20">
        {eyebrow ? (
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-6xl">
          {title}
        </h1>
        {description ? <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">{description}</p> : null}
      </div>
    </section>
  );
}
