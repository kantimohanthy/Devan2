"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, ExternalLink, Terminal } from "lucide-react";
import type { ProjectRecord } from "@/content";
import { EvidenceMarker } from "./EvidenceModeProvider";
import { InlineSchematic } from "./InlineEvidenceDiagrams";

export function TracerouteCaseStudy({ project }: { project: ProjectRecord }) {
  // Default all hops open so full content is readable immediately & with zero JS
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(project.hops.map((h) => [h.id, true]))
  );

  const toggleHop = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setAll = (state: boolean) => {
    setExpanded(Object.fromEntries(project.hops.map((h) => [h.id, state])));
  };

  return (
    <section aria-labelledby="traceroute-heading" className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-4">
        <div>
          <h2 id="traceroute-heading" className="note text-[#F2A65A]">
            Traceroute path · {project.hops.length} hops
          </h2>
          <p className="mt-1 text-[14.5px] text-ivory-2">
            Each hop isolates problem, constraints, architecture decisions, verification artifacts, and limits.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[12px]">
          <button
            type="button"
            onClick={() => setAll(true)}
            className="inline-flex min-h-[38px] items-center rounded border border-ivory/20 px-3 text-ivory-2 hover:border-teal hover:text-ivory"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => setAll(false)}
            className="inline-flex min-h-[38px] items-center rounded border border-ivory/20 px-3 text-ivory-2 hover:border-teal hover:text-ivory"
          >
            Collapse all
          </button>
        </div>
      </div>

      <ol className="relative mt-6 space-y-4">
        {project.hops.map((hop, idx) => {
          const isOpen = Boolean(expanded[hop.id]);
          const isLast = idx === project.hops.length - 1;
          const panelId = `hop-panel-${hop.id}`;

          return (
            <li
              key={hop.id}
              className="rounded-lg border border-ivory/15 bg-[#181613] overflow-hidden"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleHop(hop.id)}
                className="flex w-full min-h-[56px] items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-[#211E1A] transition-colors focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 min-w-0">
                  <span className="font-mono text-[12px] font-bold text-[#F2A65A] shrink-0">
                    hop {String(hop.hopNumber).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-wider text-teal shrink-0">
                    {hop.label}
                  </span>
                  <span className="text-[15.5px] font-medium text-ivory">
                    {hop.summary}
                  </span>
                </div>
                <span className="text-ivory-3 shrink-0" aria-hidden>
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="border-t border-ivory/10 bg-[#11100E]/60 px-4 py-5 sm:px-6 space-y-4"
                >
                  <ul className="space-y-2.5 text-[15.5px] leading-relaxed text-ivory-2">
                    {hop.details.map((line) => (
                      <li key={line} className="relative pl-5">
                        <span aria-hidden className="absolute left-0 top-[0.2em] text-[12px] text-[#7AC4CC]">
                          ◆
                        </span>
                        <span>{line}</span>
                        {hop.evidenceIds && <EvidenceMarker ids={hop.evidenceIds} />}
                      </li>
                    ))}
                  </ul>

                  {hop.diagramKind && (
                    <InlineSchematic kind={hop.diagramKind} caption={hop.diagramCaption} />
                  )}

                  {hop.commandSample && (
                    <div className="rounded-md border border-ivory/15 bg-[#11100E] p-3.5 font-mono text-[12.5px] text-ivory">
                      <div className="mb-1.5 flex items-center gap-2 text-[12px] uppercase tracking-wider text-ivory-3">
                        <Terminal className="h-3.5 w-3.5 text-[#F2A65A]" />
                        <span>Recorded verification command</span>
                      </div>
                      <pre className="overflow-x-auto text-[#F2EBDC]">{hop.commandSample}</pre>
                    </div>
                  )}

                  {hop.media && hop.media.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {hop.media.map((m) => (
                        <figure key={m.src} className="overflow-hidden rounded-md border border-ivory/15 bg-[#181613]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={m.src}
                            srcSet={m.srcSet}
                            sizes="(min-width: 1024px) 420px, 100vw"
                            alt={m.alt}
                            width={m.width}
                            height={m.height}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full"
                          />
                          <figcaption className="px-3 py-2 text-[12.5px] leading-snug text-ivory-3">{m.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  {hop.mediaStatus && !hop.mediaStatus.available && (
                    <div className="rounded-md border border-dashed border-ivory/25 bg-[#181613] px-4 py-3 font-mono text-[12px] text-ivory-3">
                      Asset status ({hop.mediaStatus.kind}): {hop.mediaStatus.note}
                    </div>
                  )}

                  {hop.externalLinks && hop.externalLinks.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {hop.externalLinks.map((lnk) =>
                        lnk.href.startsWith("http") ? (
                          <a
                            key={lnk.href}
                            href={lnk.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[42px] items-center gap-2 rounded border border-teal/40 bg-teal/10 px-4 font-mono text-[12.5px] text-teal hover:bg-teal/20"
                          >
                            {lnk.label}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <Link
                            key={lnk.href}
                            href={lnk.href}
                            className="inline-flex min-h-[42px] items-center gap-2 rounded border border-teal/40 bg-teal/10 px-4 font-mono text-[12.5px] text-teal hover:bg-teal/20"
                          >
                            {lnk.label} →
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {!isLast && (
                <div className="sr-only">Next hop follows below</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
