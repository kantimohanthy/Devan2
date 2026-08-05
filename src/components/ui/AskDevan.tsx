"use client";

import { useState, useRef } from "react";
import { pipeline } from "@xenova/transformers";

type EmbeddedItem = { id: string; kind: string; text: string; vector: number[] };

function cosineSim(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function keywordScore(query: string, text: string): number {
  const qTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const t = text.toLowerCase();
  const matches = qTerms.filter((term) => t.includes(term)).length;
  return qTerms.length ? matches / qTerms.length : 0;
}

type Extractor = (
  text: string,
  options: { pooling: string; normalize: boolean }
) => Promise<{ data: Float32Array | number[] }>;

export default function AskDevan() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EmbeddedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const extractorRef = useRef<Extractor | null>(null);
  const itemsRef = useRef<EmbeddedItem[] | null>(null);

  const runSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      if (!itemsRef.current) {
        const res = await fetch("/embeddings.json");
        if (res.ok) {
          itemsRef.current = await res.json();
        }
      }
      if (!extractorRef.current) {
        extractorRef.current = (await pipeline(
          "feature-extraction",
          "Xenova/all-MiniLM-L6-v2"
        )) as unknown as Extractor;
      }

      if (itemsRef.current && extractorRef.current) {
        const output = await extractorRef.current(query, { pooling: "mean", normalize: true });
        const qVec = Array.from(output.data) as number[];

        const scored = itemsRef.current
          .map((item) => {
            const semantic = cosineSim(qVec, item.vector);
            const keyword = keywordScore(query, item.text);
            return { item, score: 0.7 * semantic + 0.3 * keyword };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 6);

        setResults(scored.map((s) => s.item));
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
        Ask DEVAN (Hybrid Semantic + Keyword Search)
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
          {results.map((r, i) => (
            <div key={i} className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3.5 transition-colors hover:border-white/20">
              <span className="inline-block rounded bg-[var(--signal-blue)]/15 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--signal-blue)]">
                {r.kind}
              </span>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text)]">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
