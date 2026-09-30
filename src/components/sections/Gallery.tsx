import { gallery, galleryImageSrc } from '@/lib/content/gallery'

/** Gallery section (ST-060) — titled photo grid, near Contact. */
export function Gallery() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-foreground">Gallery</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {gallery.map((entry) => (
          <figure key={entry.id} className="flex flex-col gap-2">
            <img
              src={galleryImageSrc(entry.imageFile)}
              alt={entry.title}
              className="aspect-square w-full rounded-[var(--radius)] object-cover"
              loading="lazy"
            />
            <figcaption className="text-center text-sm text-muted-foreground">
              {entry.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
