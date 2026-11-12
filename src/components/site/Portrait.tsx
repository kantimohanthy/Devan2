import { photos } from "@/content/photos";
import { person } from "@/content";

/**
 * Hero portrait. Renders an approved photo when one is configured, otherwise a
 * finished monogram plate so the layout never looks broken.
 */
export function Portrait({ className = "" }: { className?: string }) {
  const p = photos.portrait;
  return (
    <figure
      className={`relative aspect-[3/4] overflow-hidden rounded-[10px] border border-ivory/20 bg-[#181613] ${className}`}
    >
      {p ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src}
          srcSet={p.srcSet}
          sizes={p.sizes}
          alt={p.alt}
          width={p.width}
          height={p.height}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{ objectPosition: p.focal }}
        />
      ) : (
        <div className="paper-grid flex h-full w-full flex-col justify-between p-5">
          <svg viewBox="0 0 200 120" aria-hidden="true" className="w-full opacity-70">
            <path d="M0,90 C40,60 70,100 110,70 S170,40 200,55" fill="none" stroke="#7ac4cc" strokeWidth="1" strokeDasharray="3 5" />
            <path d="M0,104 C50,78 80,112 120,86 S176,60 200,72" fill="none" stroke="#f2ebdc" strokeOpacity="0.25" strokeWidth="1" />
            <circle cx="110" cy="70" r="3.5" fill="#e8923a" />
          </svg>
          <p className="display text-[clamp(56px,9vw,96px)] font-light leading-none text-ivory/90">
            {person.initials}
          </p>
        </div>
      )}
      {p?.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[12.5px] text-ivory-2">
          {p.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
