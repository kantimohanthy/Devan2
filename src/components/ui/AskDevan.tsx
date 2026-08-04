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

export default function AskDevan() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EmbeddedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const extractorRef = useRef<any>(null);
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
        extractorRef.current = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
      }

      if (itemsRef.current && extractorRef.current) {
        const output = await extractorRef.current(query, { pooling: "mean", normalize: true });
        const qVec = Array.from(output.data) as number[];

        const scored = itemsRef.current
          .map((item) => ({ item, score: cosineSim(qVec, item.vector) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        setResults(scored.map((s) => s.item));
      }
    } catch (err) {
      console.error("Ask DEVAN search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">Ask DEVAN (Semantic Search)</h3>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
          placeholder="Try 'rocket propulsion', 'networking', or 'AI'..."
          className="flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-white outline-none placeholder:text-white/30 focus:border-white/30 text-sm"
        />
        <button
          onClick={runSearch}
          disabled={loading}
          className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-all disabled:opacity-50"
        >
          {loading ? "Searching…" : "Ask"}
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {results.map((r, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:bg-white/10">
              <span className="inline-block rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/70">
                {r.kind}
              </span>
              <p className="mt-1.5 text-xs leading-relaxed text-white/90">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
