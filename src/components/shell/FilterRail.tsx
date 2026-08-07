"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";

export interface FilterState {
  domains: Set<string>;
  minEvidenceDepth: number; // 0..5 (ENCOUNTERED -> DEFENDED)
  minWeight: number; // 0..100
}

interface FilterRailProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const DOMAINS = [
  { id: "networking", label: "Networking" },
  { id: "cloud", label: "Cloud & K8s" },
  { id: "ai", label: "AI & MLOps" },
  { id: "security", label: "Cybersecurity" },
  { id: "distributed", label: "Distributed Systems" },
  { id: "space", label: "Space & Comms" },
  { id: "research", label: "Research" },
];

const EVIDENCE_DEPTH_LABELS = [
  "Encountered",
  "Studied",
  "Implemented",
  "Tested",
  "Applied",
  "Defended",
];

export function FilterRail({ filters, setFilters }: FilterRailProps) {
  const [domainsOpen, setDomainsOpen] = useState(true);
  const [depthOpen, setDepthOpen] = useState(true);
  const [weightOpen, setWeightOpen] = useState(true);

  const toggleDomain = (domainId: string) => {
    setFilters((prev) => {
      const next = new Set(prev.domains);
      if (next.has(domainId)) {
        next.delete(domainId);
      } else {
        next.add(domainId);
      }
      return { ...prev, domains: next };
    });
  };

  const clearAllDomains = () => {
    setFilters((prev) => ({ ...prev, domains: new Set() }));
  };

  return (
    <aside className="w-[240px] shrink-0 h-full border-r border-[#20252B] bg-[#101317] p-4 flex flex-col gap-6 overflow-y-auto select-none text-xs font-sans">
      {/* Rail Header */}
      <div className="flex items-center justify-between border-b border-[#20252B] pb-3 text-[#8A9098]">
        <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-[#F5F5F5] uppercase">
          <SlidersHorizontal size={13} className="text-[#4F8CFF]" />
          Graph Controls
        </span>
        {filters.domains.size > 0 && (
          <button
            type="button"
            onClick={clearAllDomains}
            className="text-[10px] font-mono text-[#4F8CFF] hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {/* Group 1: Domains */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setDomainsOpen((o) => !o)}
          className="flex w-full items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8A9098] hover:text-[#F5F5F5]"
        >
          <span>Domains</span>
          {domainsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>

        {domainsOpen && (
          <div className="space-y-1.5 pt-1">
            {DOMAINS.map((d) => {
              const isChecked = filters.domains.size === 0 || filters.domains.has(d.id);
              return (
                <label
                  key={d.id}
                  className="flex items-center gap-2.5 px-1 py-1 rounded hover:bg-[#20252B]/40 cursor-pointer text-[#8A9098] hover:text-[#F5F5F5]"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleDomain(d.id)}
                    className="accent-[#4F8CFF] rounded border-[#20252B] bg-[#0A0B0D]"
                  />
                  <span className={isChecked ? "text-[#F5F5F5]" : "text-[#8A9098]/50"}>
                    {d.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Group 2: Evidence Depth Slider */}
      <div className="space-y-2 border-t border-[#20252B] pt-4">
        <button
          type="button"
          onClick={() => setDepthOpen((o) => !o)}
          className="flex w-full items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8A9098] hover:text-[#F5F5F5]"
        >
          <span>Min Evidence Depth</span>
          {depthOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>

        {depthOpen && (
          <div className="space-y-2 pt-1">
            <input
              type="range"
              min={0}
              max={5}
              value={filters.minEvidenceDepth}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minEvidenceDepth: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-[#4F8CFF] bg-[#20252B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#4F8CFF]">
              <span>{EVIDENCE_DEPTH_LABELS[filters.minEvidenceDepth]}</span>
              <span className="text-[#8A9098]">{EVIDENCE_DEPTH_LABELS[5]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Group 3: Derived Weight Filter */}
      <div className="space-y-2 border-t border-[#20252B] pt-4">
        <button
          type="button"
          onClick={() => setWeightOpen((o) => !o)}
          className="flex w-full items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8A9098] hover:text-[#F5F5F5]"
        >
          <span>Evidence Density</span>
          {weightOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>

        {weightOpen && (
          <div className="space-y-2 pt-1">
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              value={filters.minWeight}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minWeight: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-[#4F8CFF] bg-[#20252B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8A9098]">
              <span>Min Threshold</span>
              <span className="text-[#F5F5F5]">{filters.minWeight}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
