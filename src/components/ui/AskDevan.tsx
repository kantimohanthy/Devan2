"use client";

import { useState } from "react";
import Link from "next/link";

interface SearchResultItem {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  score: number;
  route: string;
}

export default function AskDevan() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch (err) {
      console.error("Ask DEVAN search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-[var(--hairline)] bg-[var(--surface-quiet)] p-5 backdrop-blur-md">
      <h3 className="mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--signal-blue)]">
        Ask DEVAN
      </h3>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
          placeholder="Try 'CineForge', 'networking', 'space infrastructure'..."
          className="flex-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2.5 text-[var(--text)] outline-none placeholder:text-[var(--text-dim)] focus:border-[var(--signal-blue)] text-sm"
        />
        <button
          type="button"
          onClick={runSearch}
          disabled={loading}
          className="rounded-xl border border-[var(--signal-blue)] bg-[var(--signal-blue)]/10 px-5 py-2.5 text-sm font-medium text-[var(--signal-blue)] hover:bg-[var(--signal-blue)]/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Searching…" : "Ask"}
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {results.slice(0, 6).map((r) => (
            <Link
              key={r.route + r.id}
              href={r.route}
              className="block rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3.5 transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="inline-block rounded bg-[var(--signal-blue)]/15 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--signal-blue)]">
                  {r.type}
                </span>
              </div>
              <h4 className="mt-1 font-semibold text-xs text-[var(--text)]">{r.title}</h4>
              <p className="mt-0.5 text-xs text-[var(--text-dim)] leading-relaxed line-clamp-2">{r.subtitle}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
