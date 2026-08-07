"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { searchClient } from "@/lib/api-client";
import type { SearchResultItem } from "@/services/search.service";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!open) return;
    searchClient.search(query).then(setResults).catch(console.error);
  }, [query, open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32"
      onClick={() => setOpen(false)}
    >
      <Command
        className="w-full max-w-lg rounded-xl border border-white/10 bg-black/90 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          autoFocus
          value={query}
          onValueChange={setQuery}
          placeholder="Search projects, knowledge nodes, writing..."
          className="w-full bg-transparent px-4 py-3 text-white outline-none border-b border-white/10 placeholder:text-white/40"
        />
        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-4 text-white/40 text-sm text-center">
            No matching items found.
          </Command.Empty>

          <Command.Group heading="DEVAN Search Results" className="text-xs font-semibold text-white/40 px-2 py-1 uppercase tracking-wider">
            {results.map((r) => (
              <Command.Item
                key={r.id + r.route}
                onSelect={() => go(r.route)}
                className="px-3 py-2 rounded-lg text-white/90 aria-selected:bg-white/10 cursor-pointer transition-colors"
              >
                <span className="font-medium">{r.title}</span> — <span className="text-white/50">{r.subtitle}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
