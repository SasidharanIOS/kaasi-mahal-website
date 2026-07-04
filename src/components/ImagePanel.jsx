import { galleryImages } from "../data/generatedGallery";

export default function ImagePanel({ className = "", index = 0, label = "Kaasi Mahal" }) {
  const image = galleryImages[index % Math.max(galleryImages.length, 1)];

  if (image) {
    return (
      <div className={`relative overflow-hidden border border-brand-line bg-white ${className}`}>
        <img src={image} alt={label} className="h-full min-h-[360px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative flex min-h-[360px] items-end border border-brand-line bg-brand-green ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.12)_75%,transparent_75%,transparent)] bg-[length:34px_34px] opacity-30" />
      <div className="relative p-8 text-white">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-gold">Gallery Ready</p>
        <p className="mt-3 max-w-sm font-serif text-4xl font-semibold leading-tight">Place your venue photos inside public/gallery</p>
      </div>
    </div>
  );
}
