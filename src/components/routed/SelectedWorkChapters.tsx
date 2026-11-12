"use client";

import React from "react";
import Link from "next/link";
import {
  formatBuildRelativePush,
  getRepoSnapshot,
  type ProjectRecord,
} from "@/content";
import { EvidenceMarker } from "./EvidenceModeProvider";
import { InlineSchematic } from "./InlineEvidenceDiagrams";

export function StatusPill({ status, label }: { status: ProjectRecord["status"]; label: string }) {
  const tone =
    status === "submitted"
      ? "border-[#7CC488]/60 text-[#7CC488]"
      : status === "ongoing" || status === "draft-under-review" || status === "in-progress"
      ? "border-[#E8923A]/70 text-[#F2A65A]"
      : "border-ivory/35 text-ivory-2";
  const glyph = status === "submitted" || status === "completed" ? "●" : "◐";
  return (
    <span className={`stamp ${tone}`}>
      <span aria-hidden>{glyph}</span>
      {label}
    </span>
  );
}

export function SelectedWorkChapters({
  chapters,
  activeSlug,
  onSelectSlug,
}: {
  chapters: ProjectRecord[];
  activeSlug: string;
  onSelectSlug: (slug: string) => void;
}) {
  return (
    <ul className="mt-10 grid gap-5 lg:grid-cols-3">
      {chapters.map((p, idx) => {
        const isSelected = p.slug === activeSlug;
        const diagramHop = p.hops.find((h) => h.diagramKind);
        const firstLimitation = p.hops.find((h) => h.id === "limitation")?.summary;
        const repoMeta = p.repoSlug ? getRepoSnapshot(p.repoSlug) : undefined;
        const pushLabel = formatBuildRelativePush(repoMeta);

        return (
          <li key={p.slug} className="flex">
            <article
              aria-labelledby={`chapter-${p.slug}`}
              className={`trace-card flex w-full flex-col overflow-hidden rounded-xl border bg-[#181613] transition-colors ${
                isSelected ? "border-[#E8923A]/70" : "border-ivory/15 hover:border-ivory/30"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectSlug(p.slug)}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? "Signal active" : "Select"}: ${p.title}`}
                className="block w-full bg-[#11100E] p-3 text-left focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
              >
                {diagramHop?.diagramKind ? (
                  <InlineSchematic kind={diagramHop.diagramKind} compact />
                ) : null}
              </button>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[12px] text-ivory-3">
                    hop 0{idx + 1}{isSelected ? " · signal active" : ""}
                  </span>
                  <StatusPill status={p.status} label={p.statusLabel} />
                </div>

                <h3 id={`chapter-${p.slug}`} className="display mt-3 text-[clamp(26px,2.6vw,32px)] leading-tight text-ivory">
                  <Link href={`/work/${p.slug}/`} className="hover:text-[#F2A65A] transition-colors">
                    {p.title}
                  </Link>
                  <EvidenceMarker ids={p.evidenceIds} />
                </h3>
                <p className="mt-1 font-mono text-[12px] text-ivory-3">{p.organization}</p>

                <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-ivory-2">{p.problem}</p>

                <details className="group mt-4">
                  <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 font-mono text-[13px] text-[#F2A65A] focus-visible:outline-2 focus-visible:outline-[#F2A65A] [&::-webkit-details-marker]:hidden">
                    <span className="transition-transform group-open:rotate-90" aria-hidden="true">›</span>
                    My part and limits
                  </summary>
                  <div className="space-y-3 pb-1 pt-1 text-[14.5px] leading-relaxed text-ivory-2">
                    <p>
                      <strong className="mr-2 font-mono text-[12px] text-ivory-3">My part:</strong>
                      {p.contributionOneLiner}
                    </p>
                    {firstLimitation && (
                      <p className="border-l-2 border-[#E8923A] pl-3">
                        <strong className="mr-2 font-mono text-[12px] text-ivory-3">Limit:</strong>
                        {firstLimitation}
                      </p>
                    )}
                    {pushLabel && <p className="font-mono text-[12px] text-ivory-3">GitHub: {pushLabel}</p>}
                  </div>
                </details>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-4">
                  <Link href={`/work/${p.slug}/`} className="ink-link inline-flex min-h-[44px] items-center font-mono text-[14px] font-medium">
                    Case study ({p.hops.length} hops) →
                  </Link>
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="ink-link inline-flex min-h-[44px] items-center font-mono text-[14px]">
                      Repo ↗
                    </a>
                  )}
                  <Link href={`/atlas/${p.slug}/`} className="ink-link inline-flex min-h-[44px] items-center font-mono text-[14px]">
                    Atlas ↗
                  </Link>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
