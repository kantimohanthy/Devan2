import { photos } from "@/content/photos";

/** Up to three approved photos for the About essay. Renders nothing without photos. */
export function AboutPhotos() {
  if (photos.about.length === 0) return null;
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      {photos.about.map((p, i) => (
        <figure
          key={p.src}
          className={`overflow-hidden rounded-[10px] border border-ivory/15 bg-[#181613] ${i === 0 ? "col-span-2" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            srcSet={p.srcSet}
            sizes={p.sizes}
            alt={p.alt}
            width={p.width}
            height={p.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: p.focal, aspectRatio: i === 0 ? "16 / 9" : "4 / 5" }}
          />
          {p.caption ? (
            <figcaption className="px-3 py-2 text-[12.5px] text-ivory-3">{p.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
