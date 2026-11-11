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
  const activeProject = chapters.find((c) => c.slug === activeSlug) ?? chapters[0];
  const repoMeta = activeProject.repoSlug ? getRepoSnapshot(activeProject.repoSlug) : undefined;
  const pushLabel = formatBuildRelativePush(repoMeta);
  const firstLimitation = activeProject.hops.find((h) => h.id === "limitation")?.summary;
  const diagramHop = activeProject.hops.find((h) => h.diagramKind);

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
      {/* Left: Three numbered chapters with problem, contribution, status badge & visible artifact links */}
      <div className="divide-y divide-ivory/15 border-y border-ivory/15">
        {chapters.map((p, idx) => {
          const isSelected = p.slug === activeProject.slug;
          const cardRepoMeta = p.repoSlug ? getRepoSnapshot(p.repoSlug) : undefined;
          const cardPushLabel = formatBuildRelativePush(cardRepoMeta);

          return (
            <article
              key={p.slug}
              aria-labelledby={`chapter-${p.slug}`}
              className={`py-7 px-3 sm:px-4 transition-colors ${
                isSelected ? "bg-[#181613]/90 border-l-2 border-l-[#E8923A]" : "hover:bg-[#181613]/40 border-l-2 border-l-transparent"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSlug(p.slug)}
                  aria-pressed={isSelected}
                  className="inline-flex min-h-[44px] items-center gap-2.5 text-left font-mono text-[12px] uppercase tracking-wider text-ivory hover:text-[#F2A65A] focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
                >
                  <span className={isSelected ? "text-[#F2A65A] font-bold" : "text-ivory-3"}>
                    hop 0{idx + 1}
                  </span>
                  <span className="text-ivory-3">·</span>
                  <span>{isSelected ? "signal active" : "inspect route"}</span>
                </button>
                <StatusPill status={p.status} label={p.statusLabel} />
              </div>

              <h3 id={`chapter-${p.slug}`} className="display mt-2 text-[clamp(26px,3.2vw,34px)] leading-tight text-ivory">
                <Link href={`/work/${p.slug}/`} className="hover:text-[#F2A65A] transition-colors">
                  {p.title}
                </Link>
                <EvidenceMarker ids={p.evidenceIds} />
              </h3>

              <p className="mt-1 font-mono text-[12px] text-ivory-3">{p.organization}</p>

              <div className="mt-4 space-y-2.5 text-[15.5px] leading-relaxed">
                <p className="text-ivory">
                  <strong className="font-mono text-[11px] uppercase tracking-wider text-ivory-3 mr-2">Problem:</strong>
                  {p.problem}
                </p>
                <p className="text-ivory-2">
                  <strong className="font-mono text-[11px] uppercase tracking-wider text-ivory-3 mr-2">My part:</strong>
                  {p.contributionOneLiner}
                </p>
              </div>

              {cardPushLabel && (
                <p className="mt-3 font-mono text-[11.5px] text-ivory-3">
                  GitHub: {cardPushLabel}
                </p>
              )}

              {/* Artifact links visible without hover */}
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href={`/work/${p.slug}/`} className="ink-link inline-flex min-h-[44px] items-center font-mono text-[13px] font-medium">
                  Trace case study ({p.hops.length} hops) →
                </Link>
                {p.repoUrl ? (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link inline-flex min-h-[44px] items-center font-mono text-[13px]"
                  >
                    Repository ↗
                  </a>
                ) : (
                  <span className="font-mono text-[12px] text-ivory-3">
                    Private collaboration repo
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Right: Zero-layout-shift "Project Signal Preview" panel */}
      <aside
        aria-live="polite"
        aria-label="Project signal preview"
        className="lg:sticky lg:top-24 rounded-lg border border-ivory/15 bg-[#181613] p-5 sm:p-7 min-h-[420px] flex flex-col justify-between"
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/10 pb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#F2A65A]">
              Project signal preview · {activeProject.shortTitle}
            </span>
            <StatusPill status={activeProject.status} label={activeProject.statusLabel} />
          </div>

          <h4 className="display mt-4 text-[26px] leading-tight text-ivory">{activeProject.title}</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-ivory-2">{activeProject.summary}</p>

          {pushLabel && (
            <p className="mt-3 rounded border border-ivory/10 bg-[#11100E] px-3 py-1.5 font-mono text-[11.5px] text-ivory-3">
              Repo telemetry snapshot: {pushLabel}
            </p>
          )}

          {diagramHop?.diagramKind && (
            <InlineSchematic
              kind={diagramHop.diagramKind}
              caption={diagramHop.diagramCaption}
            />
          )}

          {firstLimitation && (
            <div className="mt-4 border-l-2 border-[#E8923A] pl-3.5">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-ivory-3">Limitation & scope</p>
              <p className="mt-1 text-[14px] leading-relaxed text-ivory-2">{firstLimitation}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ivory/10 pt-4">
          <Link
            href={`/work/${activeProject.slug}/`}
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#F2EBDC] px-5 font-mono text-[12.5px] font-medium text-[#11100E] hover:bg-[#F2A65A] transition-colors"
          >
            Inspect {activeProject.hops.length} traceroute hops →
          </Link>
          <Link
            href={`/atlas/${activeProject.slug}/`}
            className="ink-link inline-flex min-h-[44px] items-center font-mono text-[12.5px]"
          >
            View in Atlas ↗
          </Link>
        </div>
      </aside>
    </div>
  );
}
