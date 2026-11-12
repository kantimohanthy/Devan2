"use client";

import React, { useState } from "react";
import Link from "next/link";
import { person, projects, LAST_REVIEWED, formatMonth } from "@/content";
import { HeroTerrainMesh } from "@/components/site/HeroTerrainMesh";
import { PhotoScenes } from "@/components/site/PhotoScenes";
import { SelectedWorkChapters } from "./SelectedWorkChapters";
import { EvidenceMarker } from "./EvidenceModeProvider";
import { SectionHead } from "@/components/site/SiteChrome";

export function ContourDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1200px] px-4 sm:px-8 overflow-hidden select-none">
      <svg viewBox="0 0 1200 42" className="h-7 w-full" preserveAspectRatio="none">
        <path
          d="M 0,21 C 180,6 340,36 560,20 C 780,4 960,34 1200,19"
          fill="none"
          stroke="rgba(242,235,220,0.14)"
          strokeWidth="1"
        />
        <path
          d="M 0,27 C 210,14 390,39 610,25 C 830,11 1010,36 1200,26"
          fill="none"
          stroke="rgba(122,196,204,0.18)"
          strokeWidth="0.9"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}

export function HomeRoutedWorkspace({
  featuredSlugs,
}: {
  featuredSlugs: string[];
}) {
  const chapters = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const [activeSlug, setActiveSlug] = useState<string>(chapters[0]?.slug || "project-loop");
  const supporting = projects.filter((p) => !p.featuredOnHome && !p.isResearch);

  return (
    <>
      {/* ── Hop 01: Terrain Hero ── */}
      <section
        id="hero"
        aria-labelledby="intro-title"
        className="paper-grid relative isolate scroll-mt-20 overflow-hidden border-b border-ivory/15"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/photos/personal/background.webp')] bg-[length:auto_100%] bg-right bg-no-repeat opacity-80 [mask-image:linear-gradient(to_right,transparent_28%,black_70%)]"
        />
        <div className="mx-auto flex min-h-[82svh] max-w-[1440px] flex-col justify-center px-5 py-16 sm:px-10">
          <p className="note mb-5">
            {person.location} · systems &amp; network field portfolio · reviewed {formatMonth(LAST_REVIEWED)}
          </p>

          <div className="max-w-[620px] rounded-xl bg-[#11100e]/85 p-5 sm:p-8">
            <div className="min-w-0">
              <h1
                id="intro-title"
                className="display surname-safe text-[clamp(2rem,4vw,4rem)] font-light leading-[0.98] text-ivory"
              >
                {person.firstAndMiddle.split(" ")[0]}{" "}
                <em className="font-normal italic text-[#F2A65A]">
                  {person.firstAndMiddle.split(" ")[1]}
                </em>{" "}
                <span className="block">{person.surname}</span>
              </h1>

              <p className="pretty mt-6 max-w-[560px] text-[clamp(18px,2vw,21.5px)] leading-snug text-ivory">
                {person.positioning}
                <EvidenceMarker ids={["E01", "E02"]} />
              </p>

              <p className="mt-3 font-mono text-[12px] tracking-wide text-ivory-3">
                {person.subline}
              </p>

              <p className="display pretty mt-5 max-w-[540px] border-l-2 border-[#E8923A] pl-4 text-[17px] italic leading-relaxed text-ivory-2">
                {person.approach}
                <EvidenceMarker ids={["E06"]} />
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#F2EBDC] px-6 text-[15px] font-medium text-[#11100E] transition-colors hover:bg-[#F2A65A]"
                >
                  View selected work <span aria-hidden>↓</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-[48px] items-center rounded-full border border-ivory/25 px-6 text-[15px] text-ivory transition-colors hover:border-teal"
                >
                  Contact
                </a>
                <Link
                  href="/cv/"
                  className="inline-flex min-h-[48px] items-center rounded-full border border-ivory/25 px-6 text-[15px] text-ivory-2 transition-colors hover:border-teal hover:text-ivory"
                >
                  CV
                </Link>
              </div>
            </div>

          </div>

          {/* Quiet current-focus ledger row */}
          <div className="mt-8">
            <ul
              className="grid divide-y divide-ivory/15 border-y border-ivory/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              aria-label="Current focus (reviewed November 2026)"
            >
              {person.now.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="group block px-1 py-4 sm:px-5">
                    <span className="note">
                      Now · {n.label}
                      <EvidenceMarker ids={[n.evidenceId]} />
                    </span>
                    <span className="mt-1 block text-[15px] text-ivory group-hover:text-[#F2A65A]">
                      {n.value}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PhotoScenes />

      <ContourDivider />

      {/* ── Hop 02: Selected Work (3 Flagship Chapters + Signal Preview) ── */}
      <section
        id="work"
        aria-labelledby="work-label"
        className="scroll-mt-20 mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24"
      >
        <SectionHead
          id="work"
          n="02"
          label="Selected work"
          title={
            <>
              Three systems built cleanly,{" "}
              <em className="italic text-ivory-2">with their boundaries intact.</em>
            </>
          }
        >
          Select a chapter to inspect its route preview, source status, and explicit limitations — or trace every hop into the full engineering log.
        </SectionHead>

        <div className="mb-10"><HeroTerrainMesh activeSlug={activeSlug} onSelectSlug={setActiveSlug} /></div>

        <SelectedWorkChapters
          chapters={chapters}
          activeSlug={activeSlug}
          onSelectSlug={setActiveSlug}
        />

        {supporting.length > 0 && (
          <div className="trace-card mt-10 rounded-lg border border-ivory/15 bg-[#181613]/60 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="note">Supporting projects</p>
              <p className="mt-1 text-[14.5px] text-ivory-2">
                {supporting.map((s) => `${s.title} (${s.statusLabel})`).join(" · ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-mono text-[12.5px]">
              {supporting.map((s) => (
                <Link key={s.slug} href={`/work/${s.slug}/`} className="ink-link">
                  Inspect {s.shortTitle} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
