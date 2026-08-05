"use client";

import { useState } from "react";
import { ProjectGlyph } from "@/components/ui/ProjectGlyph";
import type { ResearchItem } from "@/data/types";

const TYPE_COLOR: Record<ResearchItem["type"], string> = {
  Thesis: "#4C8BF5",
  Whitepaper: "#E8A33D",
  "Field notes": "#4CE0B3",
  Summary: "#8A63F5",
};

export function ResearchCard({
  item,
  index,
}: {
  item: ResearchItem;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const color = TYPE_COLOR[item.type] || "#4C8BF5";

  return (
    <div
      className="rounded-xl border border-[var(--hairline)] border-t-2 p-5 bg-white/[0.02] backdrop-blur-sm"
      style={{ borderTopColor: color }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[var(--text-faint)] font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p
          className="text-xs font-mono font-semibold uppercase tracking-wider"
          style={{ color }}
        >
          {item.type}
        </p>
      </div>

      <ProjectGlyph slug={item.title} domainCount={item.tags.length} />
      <h3 className="text-lg font-medium text-white mt-2">{item.title}</h3>
      <p className="text-sm text-[var(--text-dim)] mt-1">{item.context}</p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 text-xs font-mono text-[var(--signal-blue)] hover:underline cursor-pointer"
      >
        {open ? "close ↑" : "read →"}
      </button>

      {open && (
        <p className="mt-3 text-sm text-[var(--text-dim)] leading-relaxed border-l-2 border-[var(--hairline)] pl-3 py-1">
          {item.description}
        </p>
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {item.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-[var(--hairline)] text-[var(--text-dim)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
