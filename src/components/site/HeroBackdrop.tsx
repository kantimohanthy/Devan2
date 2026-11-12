"use client";

import { useReducedMotion } from "framer-motion";
import { heroVideo } from "@/content/photos";

/** Decorative hero backdrop: looping silent video when one is configured, otherwise the still photo. */
export function HeroBackdrop() {
  const reduced = useReducedMotion();
  const still =
    "pointer-events-none absolute inset-0 -z-10 bg-[url('/photos/personal/background.webp')] bg-[length:auto_100%] bg-right bg-no-repeat opacity-80 [mask-image:linear-gradient(to_right,transparent_28%,black_70%)]";
  if (!heroVideo) return <div aria-hidden="true" className={still} />;
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
