"use client";

import { useEffect, useState } from "react";
import { Search, Activity, Cpu, Shield, Network, ArrowRight, X } from "lucide-react";
import { searchClient } from "@/lib/api-client";
import type { SearchResultItem } from "@/services/search.service";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectNode }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    searchClient.search(query).then(setResults).catch(console.error);
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-md font-sans">
      <div className="w-full max-w-xl rounded-2xl border border-[#20252B] bg-[#101317] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 border-b border-[#20252B] px-4 py-3 bg-[#0A0B0D]">
          <Search size={16} className="text-[#4F8CFF]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search nodes (e.g. 'networking', 'DNS', 'AI')..."
            className="flex-1 bg-transparent text-sm text-[#F5F5F5] outline-none placeholder:text-[#8A9098]"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[#8A9098] hover:bg-[#20252B] hover:text-[#F5F5F5] cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          <p className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#8A9098]">
            Results ({results.length})
          </p>

          {results.map((item) => (
            <button
              key={item.id + item.route}
              type="button"
              onClick={() => {
                onSelectNode(item.id);
                onClose();
              }}
              className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-[#20252B]/60 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-[#20252B] bg-[#0A0B0D] p-2 text-[#4F8CFF] group-hover:border-[#4F8CFF]">
                  {item.id.includes("network") ? (
                    <Network size={14} />
                  ) : item.id.includes("ai") ? (
                    <Cpu size={14} />
                  ) : item.id.includes("security") ? (
                    <Shield size={14} />
                  ) : (
                    <Activity size={14} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F5F5F5] group-hover:text-[#4F8CFF]">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#8A9098] line-clamp-1">{item.subtitle}</p>
                </div>
              </div>
              <ArrowRight size={13} className="text-[#8A9098] group-hover:text-[#4F8CFF] group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        <div className="border-t border-[#20252B] bg-[#0A0B0D] px-4 py-2 flex items-center justify-between text-[10px] font-mono text-[#8A9098]">
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-[#20252B] bg-[#101317] px-1 py-0.5">↑↓</kbd> navigate
            <kbd className="rounded border border-[#20252B] bg-[#101317] px-1 py-0.5">↵</kbd> select
            <kbd className="rounded border border-[#20252B] bg-[#101317] px-1 py-0.5">esc</kbd> close
          </div>
          <span>DEVAN Intelligence Search</span>
        </div>
      </div>
    </div>
  );
}
