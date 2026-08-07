"use client";

import { useEffect, useState } from "react";
import { Search, Command } from "lucide-react";

interface CommandBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCommandPalette?: () => void;
}

const TABS = [
  "Identity",
  "Knowledge",
  "Systems",
  "Research",
  "Projects",
  "Timeline",
  "Network",
  "Repositories",
];

export function CommandBar({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenCommandPalette,
}: CommandBarProps) {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().substring(11, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[56px] w-full shrink-0 border-b border-[#20252B] bg-[#101317] px-4 flex items-center justify-between gap-4 font-sans select-none z-30">
      {/* Left: Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#F5F5F5] uppercase">
          DEVAN
        </span>
        <span className="h-3 w-px bg-[#20252B]" />
        <span className="text-[10px] font-mono tracking-widest text-[#8A9098] uppercase">
          UJ.OS v2.4
        </span>
      </div>

      {/* Center: Search / Cmd-K Live Graph Filter */}
      <div className="relative flex-1 max-w-md">
        <div
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 rounded-lg border border-[#20252B] bg-[#0A0B0D] px-3 py-1.5 text-xs text-[#8A9098] focus-within:border-[#4F8CFF] focus-within:text-[#F5F5F5] transition-all cursor-pointer"
        >
          <Search size={13} className="shrink-0 text-[#8A9098]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter graph live (e.g. 'networking', 'DNS', 'CineForge')..."
            className="w-full bg-transparent text-[#F5F5F5] outline-none placeholder:text-[#8A9098]/60 text-xs"
          />
          <kbd
            onClick={(e) => {
              e.stopPropagation();
              onOpenCommandPalette?.();
            }}
            className="hidden sm:flex items-center gap-0.5 rounded border border-[#20252B] bg-[#101317] px-1.5 py-0.5 text-[10px] font-mono text-[#8A9098] hover:border-[#4F8CFF] hover:text-[#F5F5F5]"
          >
            <Command size={10} />K
          </kbd>
        </div>
      </div>

      {/* Right: Section Tabs */}
      <nav className="hidden lg:flex items-center gap-1">
        {TABS.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                  ? "bg-[#20252B] text-[#F5F5F5]"
                  : "text-[#8A9098] hover:text-[#F5F5F5]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {/* Far Right: Quiet Status Cluster */}
      <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-[#8A9098]">
        {utcTime && <span className="hidden sm:inline">{utcTime}</span>}
        <span className="h-3 w-px bg-[#20252B] hidden sm:inline" />
        <span className="hidden md:inline text-[10px] tracking-wider uppercase text-[#8A9098]">
          INDEXED
        </span>
        <span className="h-2 w-2 rounded-full bg-[#31D07D]" title="Graph Synced" />
      </div>
    </header>
  );
}
