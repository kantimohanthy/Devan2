import Link from "next/link";
import {
  person,
  featuredWorkProjects,
  researchProjects,
  decisions,
  timeline,
} from "@/content";
import { SiteHeader, SiteFooter, SkipLink, SectionHead } from "@/components/site/SiteChrome";
import { HomeRoutedWorkspace, ContourDivider } from "@/components/routed/HomeRoutedWorkspace";
import { ScrollRouteIndicator } from "@/components/routed/ScrollRouteIndicator";
import { EvidenceMarker } from "@/components/routed/EvidenceModeProvider";
import { StatusPill } from "@/components/routed/SelectedWorkChapters";

const featuredDecision = decisions[0];

export default function HomePage() {
  const featuredSlugs = featuredWorkProjects.map((p) => p.slug);

  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />
      <ScrollRouteIndicator />

      <main id="main">
        {/* Hop 01 (Terrain Hero) + Hop 02 (Selected Work 3 Chapters) */}
        <HomeRoutedWorkspace featuredSlugs={featuredSlugs} />

        <ContourDivider />

        {/* ── Hop 03: Research (DASER-Net & Wireless Mesh + TVWS Thesis) ── */}
        <section
          id="research"
          aria-labelledby="research-label"
          className="scroll-mt-20 border-y border-ivory/15 bg-[#181613]/50"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24">
            <SectionHead
              id="research"
              n="03"
              label="Research"
              title={
                <>
                  Open questions, <em className="italic text-ivory-2">kept separate from results.</em>
                </>
              }
            >
              Both programs below are active works in progress. Completed pipeline engineering is documented separately from unverified benchmarks and open limitations.
            </SectionHead>

            <div className="mt-12 space-y-8">
              {researchProjects.map((rp) => {
                const completedHop = rp.hops.find((h) => h.id === "architecture");
                const limitationHop = rp.hops.find((h) => h.id === "limitation");
                const nextHop = rp.hops.find((h) => h.id === "next-hop");

                return (
                  <article
                    key={rp.slug}
                    aria-labelledby={`res-${rp.slug}`}
                    className="rounded-lg border border-ivory/15 bg-[#11100E] p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ivory/10 pb-5">
                      <div className="min-w-0">
                        <p className="note">{rp.organization} · {rp.period}</p>
                        <h3 id={`res-${rp.slug}`} className="display mt-2 text-[clamp(24px,3.2vw,34px)] leading-tight text-ivory">
                          <Link href={`/work/${rp.slug}/`} className="hover:text-[#F2A65A]">
                            {rp.title}
                          </Link>
                          <EvidenceMarker ids={rp.evidenceIds} />
                        </h3>
                      </div>
                      <StatusPill status={rp.status} label={rp.statusLabel} />
                    </div>

                    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                      <div>
                        <p className="note text-[#F2A65A]">Research question &amp; scope</p>
                        <p className="pretty mt-2 text-[16.5px] leading-relaxed text-ivory">
                          {rp.problem}
                        </p>
                        <p className="mt-4 text-[14.5px] leading-relaxed text-ivory-2">
                          <strong className="text-ivory">My scope:</strong> {rp.contributionOneLiner}
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-3 border-t border-ivory/10 pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                        <div>
                          <p className="note text-[#7CC488]">● Completed work</p>
                          <ul className="mt-2.5 space-y-2 text-[14px] leading-relaxed text-ivory-2">
                            {(completedHop?.details.slice(0, 2) ?? []).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="note text-[#F2A65A]">◐ Limitations</p>
                          <ul className="mt-2.5 space-y-2 text-[14px] leading-relaxed text-ivory-2">
                            {(limitationHop?.details.slice(0, 2) ?? []).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="note text-ivory-3">○ Next milestone</p>
                          <p className="mt-2.5 text-[14px] leading-relaxed text-ivory-2">
                            {nextHop?.summary}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-ivory/10 pt-4">
                      <Link href={`/work/${rp.slug}/`} className="ink-link inline-flex min-h-[40px] items-center font-mono text-[13px]">
                        Inspect full traceroute &amp; limitations →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Hop 04: How I Think (Decision as Mini-Traceroute) ── */}
        <section
          id="thinking"
          aria-labelledby="thinking-label"
          className="scroll-mt-20 mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24"
        >
          <SectionHead
            id="thinking"
            n="04"
            label="How I think"
            title={
              <>
                One verified architecture tradeoff,{" "}
                <em className="italic text-ivory-2">traced across five hops.</em>
              </>
            }
          >
            Rather than inventing a post-mortem story, this entry documents the verifiable engineering decision governing how kantimohanthy.dev itself builds and ships.
          </SectionHead>

          <article
            aria-labelledby="dec-main-title"
            className="mt-12 rounded-lg border border-ivory/15 bg-[#181613] p-5 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ivory/10 pb-5">
              <div>
                <p className="note">Decision record · {featuredDecision.id}</p>
                <h3 id="dec-main-title" className="display mt-2 text-[clamp(24px,3vw,34px)] leading-snug text-ivory">
                  {featuredDecision.title}
                  <EvidenceMarker ids={featuredDecision.evidenceIds} />
                </h3>
              </div>
              <span className="font-mono text-[11.5px] text-ivory-3">
                Source: {featuredDecision.source}
              </span>
            </div>

            {/* 5-hop horizontal/vertical traceroute layout */}
            <ol className="mt-7 grid gap-4 md:grid-cols-5">
              <li className="rounded border border-ivory/10 bg-[#11100E] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#F2A65A]">01 · Constraint</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ivory-2">{featuredDecision.constraint}</p>
              </li>

              <li className="rounded border border-ivory/10 bg-[#11100E] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-ivory-3">02 · Alternatives</p>
                <ul className="mt-2 space-y-2 text-[13.5px] leading-snug text-ivory-2">
                  {featuredDecision.alternatives.map((alt) => (
                    <li key={alt.name}>
                      <strong className="text-ivory">{alt.name}:</strong> {alt.tradeoff}
                    </li>
                  ))}
                </ul>
              </li>

              <li className="rounded border border-[#E8923A]/50 bg-[#211E1A] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#F2A65A]">03 · Choice</p>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-ivory">{featuredDecision.choice}</p>
              </li>

              <li className="rounded border border-ivory/10 bg-[#11100E] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-ivory-3">04 · Consequence</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ivory-2">{featuredDecision.consequence}</p>
              </li>

              <li className="rounded border border-teal/35 bg-[#11100E] p-4 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-wider text-teal">05 · Evidence</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ivory-2">{featuredDecision.why}</p>
                </div>
                <Link href="/atlas/dec-static-export/" className="ink-link mt-3 inline-block font-mono text-[12px]">
                  Inspect Atlas node →
                </Link>
              </li>
            </ol>
          </article>
        </section>

        <ContourDivider />

        {/* ── Hop 05: About, Arylax Labs & Selective Experience Timeline ── */}
        <section
          id="experience"
          aria-labelledby="about-label"
          className="scroll-mt-20 border-t border-ivory/15 bg-[#181613]/40"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24">
            <div id="about" className="scroll-mt-20 grid gap-12 lg:grid-cols-[1.05fr_1.35fr] lg:gap-14">
              <div>
                <p className="note text-[#F2A65A]" id="about-label">hop 05 · About &amp; lab identity</p>
                <h2 className="display mt-3 text-[clamp(30px,4vw,44px)] font-normal leading-tight text-ivory">
                  Who is building this, <em className="italic text-ivory-2">and how.</em>
                </h2>

                <div className="pretty mt-6 space-y-4 text-[16.5px] leading-relaxed text-ivory-2 [&>p:first-child]:text-ivory">
                  {person.about.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                <div className="mt-7 rounded-md border border-ivory/15 bg-[#11100E] p-4">
                  <p className="note text-teal">Lab umbrella · Arylax Labs</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ivory-2">
                    Arylax Labs is my independent lab identity for network and tooling experiments like DEVAN. Projects are listed once rather than double-counted across organisations.
                    <EvidenceMarker ids={["E10"]} />
                  </p>
                </div>

                <p className="note mt-8">Current interests</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {person.interests.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-ivory/20 bg-[#11100E] px-3.5 py-1.5 text-[13.5px] text-ivory-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-ivory/15">
                  <p className="note text-[#F2A65A]">Selective verified &amp; reported timeline</p>
                  <Link href="/cv/" className="ink-link font-mono text-[12px]">
                    Open formatted CV →
                  </Link>
                </div>

                <ol className="divide-y divide-ivory/10">
                  {[...timeline]
                    .sort((a, b) => b.sort.localeCompare(a.sort))
                    .map((item) => (
                      <li key={item.id} className="grid gap-1.5 py-4 sm:grid-cols-[135px_1fr_90px] sm:gap-4">
                        <p className="font-mono text-[12px] text-ivory-3 sm:pt-0.5">{item.date}</p>
                        <div className="min-w-0">
                          <h3 className="text-[16px] font-medium text-ivory">
                            {item.href ? (
                              <Link href={item.href} className="hover:text-[#F2A65A]">
                                {item.title} →
                              </Link>
                            ) : (
                              item.title
                            )}
                            <EvidenceMarker ids={[item.evidenceId]} />
                          </h3>
                          <p className="text-[13.5px] text-ivory-3">{item.org}</p>
                          <p className="mt-1 text-[14.5px] leading-relaxed text-ivory-2">{item.body}</p>
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-ivory-3 sm:text-right sm:pt-0.5">
                          {item.kind}
                        </p>
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hop 06: Direct Contact & Deep Exploration ── */}
        <section
          id="contact"
          aria-labelledby="contact-label"
          className="scroll-mt-20 border-t border-ivory/15 bg-[#11100E]"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="note text-[#F2A65A]" id="contact-label">hop 06 · Contact &amp; next path</p>
              <h2 className="display mt-4 text-[clamp(30px,4.2vw,48px)] leading-[1.06] text-ivory">
                Looking for an engineering intern or research collaborator?{" "}
                <em className="italic text-[#F2A65A]">Reach out directly.</em>
              </h2>
              <p className="pretty mt-4 max-w-[540px] text-[16px] leading-relaxed text-ivory-2">
                No fake contact form pretending to submit on static hosting — every channel below connects directly.
              </p>

              <a
                href={`mailto:${person.email}`}
                className="ink-link mt-7 inline-flex min-h-[48px] items-center break-all text-[clamp(20px,2.5vw,26px)]"
              >
                {person.email}
              </a>

              <ul className="mt-7 divide-y divide-ivory/15 border-y border-ivory/15 max-w-[540px]">
                <li>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[50px] items-center justify-between gap-4 py-2 text-[15.5px]"
                  >
                    <span className="text-ivory group-hover:text-teal">LinkedIn</span>
                    <span className="font-mono text-[13px] text-ivory-3 group-hover:text-teal">
                      ujwalshyam-kantimohanthy ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[50px] items-center justify-between gap-4 py-2 text-[15.5px]"
                  >
                    <span className="text-ivory group-hover:text-teal">GitHub</span>
                    <span className="font-mono text-[13px] text-ivory-3 group-hover:text-teal">
                      github.com/kantimohanthy ↗
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/cv/"
                    className="group flex min-h-[50px] items-center justify-between gap-4 py-2 text-[15.5px]"
                  >
                    <span className="text-ivory group-hover:text-[#F2A65A]">Curriculum Vitae (Print / Save PDF)</span>
                    <span className="font-mono text-[13px] text-[#F2A65A]">/cv/ →</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Optional DEVAN Deep Layer Entrance */}
            <aside className="self-center rounded-lg border border-teal/35 bg-[#181613] p-6 sm:p-8 space-y-5">
              <p className="note text-teal">Optional deeper layer · Zoom out</p>
              <h3 className="display text-[26px] leading-snug text-ivory">
                Explore the DEVAN Atlas &amp; Raw Evidence Ledger
              </h3>
              <p className="text-[15px] leading-relaxed text-ivory-2">
                Want to walk the typed graph linking projects, RFC concepts, architectural decisions, and DNS trace records? Open the DEVAN Atlas — the complete portfolio stands independently without it.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/atlas/"
                  className="inline-flex min-h-[46px] items-center rounded-full bg-teal px-5 font-mono text-[13px] font-medium text-[#11100E] hover:bg-[#F2EBDC] transition-colors"
                >
                  Open DEVAN Atlas →
                </Link>
                <Link
                  href="/devan/"
                  className="inline-flex min-h-[46px] items-center rounded-full border border-ivory/25 px-5 font-mono text-[13px] text-ivory hover:border-teal transition-colors"
                >
                  DEVAN Overview
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
