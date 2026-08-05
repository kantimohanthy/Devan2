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
    <section className="min-h-screen flex flex-col justify-center gap-8 px-6 max-w-7xl mx-auto pt-24 pb-16">
      <IdentityReveal />

      <nav className="flex gap-2 border-b border-[var(--hairline)] pb-0">
        {DOMAINS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActiveDomain(activeDomain === d.id ? null : d.id)}
            className={`px-4 py-2.5 text-sm font-mono transition-colors border-b-2 -mb-px cursor-pointer ${
              activeDomain === d.id
                ? "border-[var(--signal-blue)] text-[var(--text)] font-semibold"
                : "border-transparent text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {d.label}
          </button>
        ))}
      </nav>

      {/* Headless bare graph filtered by selected domain */}
      <KnowledgeGraph headless filterDomain={activeDomain} />
    </section>
  );
}
