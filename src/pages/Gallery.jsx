import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import { galleryImages } from "../data/generatedGallery";

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A professional visual showcase of Kaasi Mahal."
        description="All images placed inside the public/gallery folder are automatically synced into this gallery before running or building the project."
      />

      <section className="section-pad">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Venue Photos"
            title="Hall, function setup and event arrangements."
            description="Keep your venue images in the public/gallery folder. The gallery page will display every image from that folder."
          />

          {galleryImages.length ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <figure key={image} className="group overflow-hidden border border-brand-line bg-white">
                  <img
                    src={image}
                    alt={`Kaasi Mahal gallery ${index + 1}`}
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <figcaption className="border-t border-brand-line bg-white px-5 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">
                    Gallery Image {String(index + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-12 border border-brand-line bg-white p-10 text-center shadow-line">
              <p className="mx-auto max-w-2xl font-serif text-4xl font-semibold text-brand-ink">
                Add your images to public/gallery and run the project.
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-ink/65">
                The project includes an automatic gallery sync script. It scans the public/gallery folder and displays every JPG, PNG, WEBP, GIF or AVIF image on this page.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
