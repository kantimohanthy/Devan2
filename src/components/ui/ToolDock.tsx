"use client";

import { useState } from "react";
import { Activity, Search, Terminal as TerminalIcon, X } from "lucide-react";
import { LiveDiagnostics } from "@/components/sections/LiveDiagnostics";
import AskDevan from "@/components/ui/AskDevan";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";

type Tool = "diagnostics" | "search" | "terminal" | null;

const TOOLS = [
  { id: "diagnostics" as const, icon: Activity, label: "Live Diagnostics" },
  { id: "search" as const, icon: Search, label: "Ask DEVAN (Semantic Search)" },
  { id: "terminal" as const, icon: TerminalIcon, label: "Engineering CLI Terminal" },
];

export function ToolDock() {
  const [open, setOpen] = useState<Tool>(null);

  return (
    <>
      {/* Floating dock icons */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setOpen(open === t.id ? null : t.id)}
            aria-label={t.label}
            title={t.label}
            className={`w-11 h-11 grid place-items-center rounded-full border transition-all shadow-xl cursor-pointer backdrop-blur-md ${
              open === t.id
                ? "border-[var(--signal-blue)] text-[var(--signal-blue)] bg-blue-500/20 scale-105"
                : "border-[var(--hairline)] bg-[var(--surface-quiet)]/90 text-[var(--text-dim)] hover:text-[var(--text)] hover:border-white/20"
            }`}
          >
            <t.icon size={18} />
          </button>
        ))}
      </div>

      {/* Slide-out tool drawer */}
      {open && (
        <div className="fixed right-20 top-1/2 -translate-y-1/2 w-[92vw] max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/95 backdrop-blur-xl p-5 z-40 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3 mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--signal-blue)]">
              {TOOLS.find((t) => t.id === open)?.label}
            </span>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="grid place-items-center rounded-full p-1 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            {open === "diagnostics" && <LiveDiagnostics />}
            {open === "search" && <AskDevan />}
            {open === "terminal" && <InteractiveTerminal />}
          </div>
        </div>
      )}
    </>
  );
}
