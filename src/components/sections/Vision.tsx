"use client";

import { useState } from "react";
import { PrincipleCards } from "@/components/ui/PrincipleCards";

export function Vision() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="vision" className="px-6 py-24 max-w-3xl mx-auto scroll-mt-24">
      <p className="text-xs uppercase tracking-wide text-[var(--signal-blue)] font-mono">
        11 · Vision & Core Principles
      </p>
      <h2 className="text-3xl md:text-4xl font-medium mt-3 leading-snug text-white">
        Speed stopped being the problem. Reach and proof still are.
      </h2>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 text-sm text-[var(--signal-blue)] hover:underline cursor-pointer font-mono"
      >
        {expanded ? "close ↑" : "the longer version →"}
      </button>

      {expanded && (
        <p className="mt-3 text-[var(--text-dim)] text-sm leading-relaxed border-l-2 border-[var(--signal-blue)]/40 pl-4 py-1">
          There are still places a signal doesn&apos;t get to, and still ways of
          proving what you know that depend more on how you phrase it than
          on what you&apos;ve actually built. Those are the two problems I keep
          coming back to.
        </p>
      )}

      <div className="mt-10 border-t border-[var(--hairline)] pt-8">
        <PrincipleCards />
      </div>
    </section>
  );
}
