"use client";

import { useEffect, useState } from "react";

/** Previous/next and a counter for the horizontal photo story. Only shown in dock-view mode. */
export function BeyondControls() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);

  const track = () => document.querySelector<HTMLElement>(".beyond-track");

  useEffect(() => {
    const t = track();
    if (!t) return;
    const count = t.children.length;
    setN(count);
    const onScroll = () => setI(Math.round(t.scrollLeft / Math.max(1, t.clientWidth)));
    onScroll();
    t.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (document.documentElement.getAttribute("data-view") !== "beyond") return;
      if (document.querySelector("[role=dialog]")) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = (dir: 1 | -1) => {
    const t = track();
    if (!t) return;
    t.scrollTo({ left: t.scrollLeft + dir * t.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="beyond-controls items-center justify-between gap-4 px-6 py-4 sm:px-12">
      <p className="font-mono text-[12px] text-ivory-3" aria-live="polite">
        {n ? `${Math.min(i + 1, n)} / ${n}` : ""}
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => step(-1)} aria-label="Previous scene" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-[#F2A65A] focus-visible:outline-2 focus-visible:outline-[#F2A65A]">
          ‹
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next scene" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-[#F2A65A] focus-visible:outline-2 focus-visible:outline-[#F2A65A]">
          ›
        </button>
      </div>
    </div>
  );
}
