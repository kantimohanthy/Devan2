"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Loads the interactive map only on wide screens. Small screens, keyboard and
 * screen reader users always have the full list version on the same page.
 */
const FieldMap = dynamic(() => import("./FieldMap"), {
  ssr: false,
  loading: () => <div className="aspect-[1000/560] w-full rounded-md border border-ivory/10 bg-ink-2/60" aria-hidden />,
});

export function FieldMapLoader() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  if (!wide) return null;
  return (
    <section id="field-map" aria-label="Interactive map" className="scroll-mt-20">
      <FieldMap />
    </section>
  );
}
