"use client";

import { SlidersHorizontal } from "lucide-react";

export interface FilterState {
  domains: Set<string>;
  showAllNodes: boolean;
}

interface FilterRailProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const DOMAINS = [
  { id: "networking", label: "Networking" },
  { id: "cloud", label: "Cloud & K8s" },
  { id: "ai", label: "AI Systems" },
  { id: "security", label: "Cybersecurity" },
  { id: "distributed-systems", label: "Distributed Systems" },
  { id: "space", label: "Space Infrastructure" },
];

export function FilterRail({ filters, setFilters }: FilterRailProps) {
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

      {/* Domain Filters */}
      <div className="space-y-3">
        <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8A9098]">
          Filter by Domain
        </p>

        <div className="space-y-1.5">
          {DOMAINS.map((d) => {
            const isChecked = filters.domains.size === 0 || filters.domains.has(d.id);
            return (
              <label
                key={d.id}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#20252B]/50 cursor-pointer text-[#8A9098] hover:text-[#F5F5F5] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleDomain(d.id)}
                  className="accent-[#4F8CFF] rounded border-[#20252B] bg-[#0A0B0D]"
                />
                <span className={isChecked ? "text-[#F5F5F5] font-medium" : "text-[#8A9098]/60"}>
                  {d.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Density Mode Toggle */}
      <div className="space-y-2 border-t border-[#20252B] pt-4 font-mono text-[11px]">
        <p className="text-[10px] uppercase tracking-wider text-[#8A9098]">Graph View Mode</p>
        <button
          type="button"
          onClick={() =>
            setFilters((prev) => ({ ...prev, showAllNodes: !prev.showAllNodes }))
          }
          className={`w-full flex items-center justify-between rounded-lg border p-2 text-[11px] transition-colors cursor-pointer ${
            filters.showAllNodes
              ? "border-[#4F8CFF] bg-[#4F8CFF]/15 text-[#4F8CFF]"
              : "border-[#20252B] bg-[#0A0B0D] text-[#8A9098] hover:text-[#F5F5F5]"
          }`}
        >
          <span>{filters.showAllNodes ? "All Nodes View" : "Curated View (Featured)"}</span>
        </button>
      </div>
    </aside>
  );
}
