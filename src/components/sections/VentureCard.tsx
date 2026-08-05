"use client";

import { useState } from "react";
import type { Venture } from "@/data/types";

export function VentureCard({ v }: { v: Venture }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--hairline)] p-6 bg-white/[0.02] backdrop-blur-sm">
      <h3 className="text-xl font-medium text-white">{v.name}</h3>
      <p className="text-[var(--signal-blue)] font-mono text-sm mt-1">{v.tagline}</p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 text-xs font-mono text-[var(--text-dim)] hover:text-[var(--text)] transition-colors cursor-pointer"
      >
        {open ? "collapse ↑" : "problem / market / stage →"}
      </button>

      {open && (
        <div className="mt-4 space-y-3.5 text-sm border-t border-[var(--hairline)] pt-4">
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-dim)] tracking-wider">Problem</p>
            <p className="mt-1 text-white/80">{v.problem}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-dim)] tracking-wider">Market</p>
            <p className="mt-1 text-white/80">{v.market}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-dim)] tracking-wider">Stage</p>
            <p className="mt-1 text-white/80">{v.stage}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-dim)] tracking-wider">Notes</p>
            <p className="mt-1 text-white/80">{v.notes}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-dim)] tracking-wider">Vision</p>
            <p className="mt-1 text-white/80 italic">{v.vision}</p>
          </div>
        </div>
      )}
    </div>
  );
}
