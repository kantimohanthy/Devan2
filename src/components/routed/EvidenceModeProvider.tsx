"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, X } from "lucide-react";
import { getEvidenceEntry } from "@/content";

interface EvidenceContextValue {
  enabled: boolean;
  toggle: () => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

const EvidenceContext = createContext<EvidenceContextValue>({
  enabled: false,
  toggle: () => {},
  openId: null,
  setOpenId: () => {},
});

export function useEvidenceMode() {
  return useContext(EvidenceContext);
}

export function EvidenceModeProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  // Sync from URL ?evidence=1 after mount to preserve pure static HTML hydration
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setEnabled(params.get("evidence") === "1");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      const url = new URL(window.location.href);
      if (next) {
        url.searchParams.set("evidence", "1");
      } else {
        url.searchParams.delete("evidence");
        setOpenId(null);
      }
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      return next;
    });
  }, []);

  return (
    <EvidenceContext.Provider value={{ enabled, toggle, openId, setOpenId }}>
      {children}
    </EvidenceContext.Provider>
  );
}

export function ShowEvidenceToggle({ compact = false }: { compact?: boolean }) {
  const { enabled, toggle } = useEvidenceMode();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Hide inline evidence markers" : "Show evidence markers across factual claims"}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-3.5 font-mono text-[12px] transition-colors ${
        enabled
          ? "border-[#E8923A] bg-[#E8923A]/15 text-[#F2A65A]"
          : "border-ivory/25 bg-[#181613] text-ivory-2 hover:border-teal hover:text-ivory"
      } ${compact ? "w-full justify-between" : ""}`}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${enabled ? "bg-[#E8923A]" : "bg-ivory-3"}`}
        aria-hidden
      />
      <span>Show evidence</span>
      <span className="text-[10.5px] uppercase tracking-wider opacity-85">{enabled ? "on" : "off"}</span>
    </button>
  );
}

export function EvidenceMarker({ ids }: { ids: string[] }) {
  const { enabled, openId, setOpenId } = useEvidenceMode();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const primaryId = ids[0];
  const instanceKey = ids.join("-");
  const isOpen = enabled && openId === instanceKey;
  const entries = ids.map((id) => getEvidenceEntry(id)).filter((e): e is NonNullable<typeof e> => Boolean(e));

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenId(null);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpenId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpenId]);

  if (!enabled || entries.length === 0) {
    return null;
  }

  return (
    <span className="relative inline-flex items-baseline align-baseline mx-1">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Inspect evidence ledger entry ${primaryId}`}
        onClick={() => setOpenId(isOpen ? null : instanceKey)}
        className="inline-flex min-h-[26px] min-w-[26px] items-center justify-center rounded border border-[#E8923A]/70 bg-[#E8923A]/15 px-1.5 font-mono text-[10.5px] font-semibold text-[#F2A65A] hover:bg-[#E8923A]/25 focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
      >
        [{ids.join(",")}]
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label={`Evidence ledger details for ${ids.join(", ")}`}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[420px] rounded-lg border border-ivory/25 bg-[#211E1A] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.75)] sm:absolute sm:bottom-auto sm:left-0 sm:right-auto sm:top-full sm:mt-2 sm:w-[360px]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-ivory/15 pb-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#F2A65A]">
              Evidence Ledger · {ids.join(" · ")}
            </span>
            <button
              type="button"
              onClick={() => {
                setOpenId(null);
                triggerRef.current?.focus();
              }}
              aria-label="Close evidence popover"
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-ivory/15 text-ivory-2 hover:border-ivory hover:text-ivory"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-3 text-left">
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-1.5 border-b border-ivory/10 pb-3 last:border-none last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-ivory">{entry.id}</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10.5px] uppercase ${
                      entry.verificationStatus === "verified"
                        ? "bg-[#7CC488]/15 text-[#7CC488]"
                        : "bg-[#E8923A]/15 text-[#F2A65A]"
                    }`}
                  >
                    {entry.verificationStatus === "verified" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <FileText className="h-3 w-3" />
                    )}
                    {entry.verificationStatus}
                  </span>
                </div>
                <p className="text-[13px] leading-snug text-ivory">{entry.publishableWording}</p>
                <p className="font-mono text-[11px] text-ivory-3">
                  Source: {entry.source} · Reviewed {entry.date}
                </p>
                {entry.artifactUrl && (
                  entry.artifactUrl.startsWith("http") ? (
                    <a
                      href={entry.artifactUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-link inline-block pt-1 font-mono text-[12px]"
                    >
                      {entry.artifactLabel || "Inspect artifact"} ↗
                    </a>
                  ) : (
                    <Link
                      href={entry.artifactUrl}
                      onClick={() => setOpenId(null)}
                      className="ink-link inline-block pt-1 font-mono text-[12px]"
                    >
                      {entry.artifactLabel || "Inspect artifact"} →
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}
