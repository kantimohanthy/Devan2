"use client";

import { useReducedMotion } from "framer-motion";
import { heroVideo } from "@/content/photos";

/** Decorative hero backdrop: looping silent video when one is configured, otherwise the still photo. */
export function HeroBackdrop() {
  const reduced = useReducedMotion();
  const still = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      aria-hidden="true"
      alt=""
      src="/photos/interests/hero-smile-690.webp"
      srcSet="/photos/interests/hero-smile-480.webp 480w, /photos/interests/hero-smile-690.webp 690w"
      sizes="(min-width: 1024px) 700px, 100vw"
      decoding="async"
      className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-auto max-w-none object-cover opacity-90 [mask-image:linear-gradient(to_right,transparent,black_35%)] max-lg:h-[300px] max-lg:w-full max-lg:object-[50%_16%] max-lg:[mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
    />
  );
  if (!heroVideo) return still;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={heroVideo.poster} alt="" className="size-full object-cover object-right opacity-70" />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroVideo.poster}
          tabIndex={-1}
          className="size-full object-cover object-right opacity-70"
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#11100e] via-[#11100e]/70 to-transparent" />
    </div>
  );
}
