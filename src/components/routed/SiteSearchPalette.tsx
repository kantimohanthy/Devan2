"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { atlasNodes, decisions, projects, evidenceLedger } from "@/content";

interface SearchDoc {
  title: string;
  kind: "Case study" | "Atlas node" | "Decision" | "Evidence" | "Profile";
  meta: string;
  href: string;
  keywords: string;
}

const searchDocs: SearchDoc[] = [
  ...projects.map((p) => ({
    title: p.title,
    kind: "Case study" as const,
    meta: p.statusLabel,
    href: `/work/${p.slug}/`,
    keywords: `${p.kicker} ${p.organization} ${p.summary} ${p.problem}`,
  })),
  ...atlasNodes.map((n) => ({
    title: n.title,
    kind: "Atlas node" as const,
    meta: `${n.kind} · ${n.id}`,
    href: n.url,
    keywords: `${n.subtitle} ${n.summary}`,
  })),
  ...decisions.map((d) => ({
    title: d.title,
    kind: "Decision" as const,
    meta: d.reviewedDate,
    href: `/work/${d.projectSlug}/`,
    keywords: `${d.context} ${d.choice} ${d.source}`,
  })),
  ...evidenceLedger.map((e) => ({
    title: `${e.id}: ${e.claim}`,
    kind: "Evidence" as const,
    meta: e.verificationStatus,
    href: e.artifactUrl || "/evidence/",
    keywords: `${e.source} ${e.publishableWording}`,
  })),
  {
    title: "Curriculum Vitae (Printable / PDF)",
    kind: "Profile",
    meta: "CV",
    href: "/cv/",
    keywords: "resume cv education tor vergata zidio inference lab",
  },
];

export function SiteSearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Search public projects, nodes, and notes (Command K)"
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ivory/20 bg-[#181613] px-3.5 font-mono text-[12px] text-ivory-2 hover:border-teal hover:text-ivory transition-colors"
    >
      <Search className="h-3.5 w-3.5 text-teal" />
      <span>Search</span>
      <kbd className="hidden sm:inline rounded border border-ivory/20 px-1.5 py-0.5 text-[12px] text-ivory-3">
        ⌘K
      </kbd>
    </button>
  );
}

export function SiteSearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const timer = setTimeout(() => inputRef.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchDocs.slice(0, 10);
    return searchDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.meta.toLowerCase().includes(q) ||
        doc.keywords.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search public portfolio records"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pt-[10vh] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] overflow-hidden rounded-xl border border-ivory/20 bg-[#181613] shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ivory/15 px-4 py-3.5">
          <Search className="h-4 w-4 text-teal shrink-0" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, nodes, decisions, evidence…"
            aria-label="Search query"
            className="flex-1 bg-transparent text-[15px] text-ivory placeholder:text-ivory-3 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-ivory/15 text-ivory-2 hover:text-ivory"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-3">
          {matches.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="font-mono text-[13px] text-ivory-2">
                No matching public records for &ldquo;{query.trim()}&rdquo;.
              </p>
              <p className="mt-1 font-mono text-[12px] text-ivory-3">
                Search covers published case studies, Atlas nodes, decisions, and evidence ledger entries only (no AI synthesis).
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-ivory/10">
              {matches.map((item) => {
                const isExternal = item.href.startsWith("http");
                return (
                  <li key={`${item.kind}-${item.title}`}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center justify-between gap-3 rounded px-3 py-3 hover:bg-[#211E1A]"
                      >
                        <div className="min-w-0">
                          <p className="text-[14px] font-medium text-ivory truncate">{item.title}</p>
                          <p className="font-mono text-[12px] text-ivory-3">{item.kind} · {item.meta}</p>
                        </div>
                        <span className="font-mono text-[12px] text-teal shrink-0">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between gap-3 rounded px-3 py-3 hover:bg-[#211E1A]"
                      >
                        <div className="min-w-0">
                          <p className="text-[14px] font-medium text-ivory truncate">{item.title}</p>
                          <p className="font-mono text-[12px] text-ivory-3">{item.kind} · {item.meta}</p>
                        </div>
                        <span className="font-mono text-[12px] text-teal shrink-0">→</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-ivory/10 bg-[#11100E] px-4 py-2 font-mono text-[12px] text-ivory-3 flex justify-between">
          <span>Search index · public records only</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
