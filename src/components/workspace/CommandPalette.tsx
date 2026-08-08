"use client";

import React, { useEffect, useState } from "react";
import { Search, Command, ArrowRight } from "lucide-react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { SearchResultItem } from "@/lib/query/search-query";
import { useRouter } from "next/navigation";
import { workspaceStore } from "@/lib/workspace/workspace-store";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const clean = query.replace(/^(explain|open|graph|search|compare)\s+/i, "");
      const res = await queryEngine.search(clean);
      setResults(res.data);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchResultItem) => {
    setIsOpen(false);
    workspaceStore.setState({ selectedConceptId: item.id });
    if (item.type === "CONCEPT") {
      router.push(`/knowledge/${item.id}`);
    } else if (item.type === "EXECUTION_STACK") {
      router.push(`/reasoning`);
    } else {
      router.push(`/evidence`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-[#20252B] bg-[#0A0B0D] shadow-2xl overflow-hidden font-mono text-xs">
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#20252B] px-4 py-3">
          <Search className="h-4 w-4 text-[#4F8CFF]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Universal Command Bar: > explain tcp | > open linux | > graph kubernetes | > search rfc1035..."
            className="w-full bg-transparent text-[#F5F5F5] placeholder-[#8A9098] outline-none text-xs"
            autoFocus
          />
          <kbd className="flex items-center gap-1 rounded bg-[#20252B] px-2 py-0.5 text-[10px] text-[#8A9098]">
            <Command className="h-3 w-3" /> ESC
          </kbd>
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-2">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-[#8A9098]">
              Type a command: &quot;&gt; open dns&quot; | &quot;&gt; graph kubernetes&quot; | &quot;&gt; compare tcp udp&quot; | &quot;&gt; search rfc1035&quot;...
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between rounded-xl border border-[#20252B]/40 bg-[#121418]/60 px-3 py-2 text-[#F5F5F5] hover:bg-[#121418] hover:border-[#4F8CFF] cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="rounded bg-[#20252B] px-1.5 py-0.5 text-[9px] text-[#4F8CFF] font-bold">
                      {item.type}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[10px] text-[#8A9098] line-clamp-1">{item.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#8A9098]" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
