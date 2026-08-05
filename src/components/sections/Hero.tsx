"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { IdentityReveal } from "./IdentityReveal";
import type { Domain } from "@/data/types";

const KnowledgeGraph = dynamic(
  () => import("./KnowledgeGraph").then((m) => m.KnowledgeGraph),
  { ssr: false }
);

const DOMAINS: { id: Domain; label: string }[] = [
  { id: "build", label: "Build" },
  { id: "understand", label: "Understand" },
  { id: "explore", label: "Explore" },
  { id: "lead", label: "Lead" },
];

export function Hero() {
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 px-6 pt-28 pb-16 min-h-screen max-w-7xl mx-auto">
      <aside className="md:sticky md:top-28 md:self-start flex flex-col gap-8">
        <IdentityReveal />

        <div className="border-t border-[var(--hairline)] pt-6">
          <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-3">
            System Topology Filter
          </p>
          <nav className="flex flex-col gap-1.5">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDomain(activeDomain === d.id ? null : d.id)}
                className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-mono transition-all cursor-pointer border ${
                  activeDomain === d.id
                    ? "bg-[var(--signal-blue)]/10 text-[var(--signal-blue)] border-[var(--signal-blue)] font-semibold"
                    : "text-[var(--text-dim)] hover:text-[var(--text)] border-transparent hover:bg-white/[0.03]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="min-h-[580px] w-full">
        <KnowledgeGraph headless filterDomain={activeDomain} />
      </div>
    </section>
  );
}
