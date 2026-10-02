import Link from "next/link";
import {
  person,
  featuredProjects,
  decisions,
  getProject,
  getDecision,
  projects,
  timeline,
  now,
  formatMonth,
  LAST_REVIEWED,
} from "@/data/portfolio";
import {
  SiteHeader,
  SiteFooter,
  SkipLink,
  Stamp,
  SectionHead,
  Figure,
} from "@/components/site/SiteChrome";
import { FieldMapMini, ProjectFigure } from "@/components/site/Figures";

const featuredDecision = getDecision("aodv-over-olsr")!;
const otherDecisions = decisions.filter((d) => d.id !== featuredDecision.id);
const researchSlugs = ["daser-net", "wireless-mesh-tvws", "cosmohub"];
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export default function HomePage() {
  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />

      <main id="main">
        {/* ── Opening ── */}
        <section aria-labelledby="intro-title" className="paper border-b border-ivory/10">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:pb-20">
            <div>
              <p className="note">Field journal · {person.location} · reviewed {formatMonth(LAST_REVIEWED)}</p>
              <h1 id="intro-title" className="display mt-6 text-[clamp(50px,8.4vw,108px)] font-light leading-[0.94]">
                Ujwal <em className="font-normal italic text-ochre-2">Shyam</em>
                <br />
                Kantimohanthy
              </h1>
              <p className="pretty mt-7 max-w-[560px] text-[clamp(19px,2vw,23px)] leading-snug text-ivory">
                {person.positioning}
              </p>
              <p className="display pretty mt-6 max-w-[540px] border-l-2 border-ochre pl-4 text-[18px] italic leading-relaxed text-ivory-2">
                {person.approach}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#work" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ivory px-6 text-[15px] font-medium text-ink transition-colors hover:bg-ochre-2">
                  View work <span aria-hidden>↓</span>
                </a>
                <a href="#contact" className="inline-flex min-h-12 items-center rounded-full border border-ivory/25 px-6 text-[15px] text-ivory transition-colors hover:border-ochre">
                  Contact
                </a>
              </div>
            </div>

            <Link href="/map/" className="group block">
              <Figure n="0" caption="Five missions I'm working through. Lines join missions that share a project. Open the full map →">
                <FieldMapMini />
              </Figure>
            </Link>
          </div>

          <div className="mx-auto max-w-[1200px] px-5 pb-10 sm:px-8">
            <ul className="grid divide-y divide-ivory/10 border-y border-ivory/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0" aria-label="Now">
              {now.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="group block px-1 py-4 sm:px-5">
                    <span className="note">Now · {n.label}</span>
                    <span className="mt-1 block text-[15.5px] text-ivory group-hover:text-ochre-2">{n.value}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── § 1 Selected work ── */}
        <section id="work" aria-labelledby="work-label" className="scroll-mt-16 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead id="work" n="1" label="Selected work" title={<>Three things I built, <em className="italic text-ivory-2">and what they still lack.</em></>} />

          <div className="mt-14 divide-y divide-ivory/10 border-t border-ivory/10">
            {featuredProjects.map((p, i) => (
              <article key={p.slug} aria-labelledby={`${p.slug}-t`} className="grid gap-8 py-12 lg:grid-cols-[160px_1fr_1.1fr] lg:gap-10">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[13.5px] lg:block lg:space-y-4">
                  <div>
                    <dt className="note">Entry</dt>
                    <dd className="display mt-1 text-[28px] text-ochre-2">1.{i + 1}</dd>
                  </div>
                  <div>
                    <dt className="note">Status</dt>
                    <dd className="mt-1.5"><Stamp status={p.status} /></dd>
                  </div>
                  <div>
                    <dt className="note">Role</dt>
                    <dd className="mt-1 text-ivory-2">{p.role}</dd>
                  </div>
                  <div>
                    <dt className="note">Since</dt>
                    <dd className="mt-1 text-ivory-2">{formatMonth(p.start)}</dd>
                  </div>
                </dl>

                <div className="min-w-0">
                  <p className="note">{p.kicker}</p>
                  <h3 id={`${p.slug}-t`} className="display mt-2 text-[clamp(32px,4vw,48px)] leading-[1.02]">
                    <Link href={`/work/${p.slug}/`} className="hover:text-ochre-2">{p.title}</Link>
                  </h3>
                  <p className="mt-2 text-[14px] text-ivory-3">{p.organization}</p>
                  <p className="pretty mt-5 text-[17px] leading-relaxed text-ivory">{p.summary}</p>
                  <h4 className="note mt-7">My part</h4>
                  <ul className="mt-2 space-y-2 text-[15.5px] leading-relaxed text-ivory-2">
                    {p.contributions.slice(0, 3).map((c) => (
                      <li key={c} className="relative pl-5">
                        <span aria-hidden className="absolute left-0 top-[0.05em] text-[12px] text-ochre">◆</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Link href={`/work/${p.slug}/`} className="ink-link text-[15.5px] font-medium text-ivory">
                      Read the case study
                    </Link>
                    {p.artifacts.filter((a) => a.href && a.href.startsWith("http")).slice(0, 1).map((a) => (
                      <a key={a.href} href={a.href} rel="noopener noreferrer" className="ink-link text-[15.5px] text-ivory-2">
                        {a.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <Figure n={`1.${i + 1}`} caption={p.figureCaption} className="self-start">
                  <ProjectFigure kind={p.figure} />
                </Figure>
              </article>
            ))}
          </div>
        </section>

        {/* ── § 2 How I think ── */}
        <section id="thinking" aria-labelledby="thinking-label" className="scroll-mt-16 border-y border-ivory/10 bg-ink-2/50">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead id="thinking" n="2" label="How I think" title={<>A decision is a constraint, <em className="italic text-ivory-2">a tradeoff and a cost.</em></>}>
              I keep a decision log. Here is one entry in full, from my thesis, and two shorter ones from other projects.
            </SectionHead>

            <article aria-labelledby="dec-main" className="mt-14 grid gap-10 rounded-md border border-ivory/10 bg-ink p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="note">Decision · {getProject(featuredDecision.project)?.title}</p>
                <h3 id="dec-main" className="display mt-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08]">{featuredDecision.title}</h3>
                <p className="pretty mt-5 text-[16.5px] leading-relaxed text-ivory-2">{featuredDecision.context}</p>
                <p className="note mt-8">Source</p>
                <p className="mt-1 text-[14px] text-ivory-3">{featuredDecision.source}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="note">Options considered</p>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {featuredDecision.options.map((o) => (
                      <li key={o.name} className="rounded border border-ivory/10 p-4">
                        <span className="block text-[15px] font-medium text-ivory">{o.name}</span>
                        <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ivory-2">{o.tradeoff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-2 border-ochre pl-4">
                  <p className="note text-ochre-2">Chose</p>
                  <p className="mt-1 text-[17px] text-ivory">{featuredDecision.choice}</p>
                  <p className="pretty mt-2 text-[15.5px] leading-relaxed text-ivory-2">{featuredDecision.why}</p>
                </div>
                <div>
                  <p className="note">What it costs</p>
                  <p className="pretty mt-1 text-[15.5px] leading-relaxed text-ivory-2">{featuredDecision.cost}</p>
                </div>
              </div>
            </article>

            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {otherDecisions.map((d) => {
                const p = getProject(d.project);
                return (
                  <li key={d.id} className="rounded-md border border-ivory/10 p-6">
                    <p className="note">Decision · {p?.title}</p>
                    <h3 className="display mt-2 text-[24px] leading-snug">{d.title}</h3>
                    <p className="pretty mt-3 text-[15px] leading-relaxed text-ivory-2">
                      <span className="text-ivory">Chose:</span> {d.choice}
                    </p>
                    <p className="pretty mt-2 text-[15px] leading-relaxed text-ivory-2">
                      <span className="text-ivory">Cost:</span> {d.cost}
                    </p>
                    {p && (
                      <Link href={`/work/${p.slug}/`} className="ink-link mt-4 inline-block text-[14.5px] text-ivory">
                        In context: {p.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── § 3 Research and current questions ── */}
        <section id="research" aria-labelledby="research-label" className="scroll-mt-16 mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead id="research" n="3" label="Research" title={<>Open questions, <em className="italic text-ivory-2">kept separate from answers.</em></>}>
            What exists today is listed apart from what is planned. Nothing below is a published result.
          </SectionHead>

          <div className="mt-14 space-y-6">
            {researchSlugs.map((slug) => {
              const p = projects.find((x) => x.slug === slug)!;
              const done = p.contributions.filter((c) => c.startsWith("Done:")).map((c) => cap(c.replace(/^Done:\s*/, "")));
              const current = p.contributions.filter((c) => c.startsWith("Current:")).map((c) => cap(c.replace(/^Current:\s*/, "")));
              const exists = done.length ? done : p.contributions.slice(0, 2);
              return (
                <article key={slug} aria-labelledby={`r-${slug}`} className="rounded-md border border-ivory/10 p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="note">{p.organization}</p>
                      <h3 id={`r-${slug}`} className="display mt-2 text-[clamp(26px,3.2vw,38px)] leading-[1.05]">
                        <Link href={`/work/${slug}/`} className="hover:text-ochre-2">{p.title}</Link>
                      </h3>
                    </div>
                    <Stamp status={p.status} />
                  </div>
                  <p className="pretty mt-4 max-w-[760px] text-[17px] leading-relaxed text-ivory">{p.problem.split(". ").slice(0, 2).join(". ").replace(/\.?$/, ".")}</p>

                  <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div>
                      <p className="note"><span aria-hidden className="text-moss">●</span> Exists now</p>
                      <ul className="mt-2 space-y-2 text-[14.5px] leading-relaxed text-ivory-2">
                        {exists.map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="note"><span aria-hidden className="text-ochre">◐</span> Working on</p>
                      <ul className="mt-2 space-y-2 text-[14.5px] leading-relaxed text-ivory-2">
                        {(current.length ? current : [p.limitations?.[0] ?? ""]).filter(Boolean).map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="note"><span aria-hidden>○</span> Next, planned</p>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ivory-2">{cap(p.next?.replace(/^Planned:\s*/, "") ?? "")}</p>
                    </div>
                  </div>
                  <Link href={`/work/${slug}/`} className="ink-link mt-6 inline-block text-[15px] text-ivory">
                    Details, limits and artifacts
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── § 4 Experience ── */}
        <section id="experience" aria-labelledby="experience-label" className="scroll-mt-16 border-t border-ivory/10">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead id="experience" n="4" label="Experience" title={<>The route so far.</>} />
            <ol className="mt-12 border-t border-ivory/10">
              {[...timeline].sort((a, b) => b.sort.localeCompare(a.sort)).map((t) => (
                <li key={t.title + t.org} className="grid gap-1 border-b border-ivory/10 py-6 md:grid-cols-[180px_1fr_120px] md:gap-10">
                  <p className="font-mono text-[13px] text-ivory-3 md:pt-1">{t.date}</p>
                  <div className="min-w-0">
                    <h3 className="text-[18.5px] font-medium text-ivory">
                      {t.href ? (
                        t.href.startsWith("http") ? (
                          <a href={t.href} rel="noopener noreferrer" className="hover:text-ochre-2">{t.title} <span aria-hidden className="text-ochre">↗</span></a>
                        ) : (
                          <Link href={t.href} className="hover:text-ochre-2">{t.title} <span aria-hidden className="text-ochre">→</span></Link>
                        )
                      ) : (
                        t.title
                      )}
                    </h3>
                    <p className="mt-0.5 text-[14.5px] text-ivory-3">{t.org}</p>
                    <p className="pretty mt-2 max-w-[640px] text-[15.5px] leading-relaxed text-ivory-2">{t.body}</p>
                  </div>
                  <p className="note md:pt-1.5 md:text-right">{t.kind}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── § 5 About and contact ── */}
        <section id="about" aria-labelledby="about-label" className="scroll-mt-16 border-t border-ivory/10 bg-ink-2/50">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="note" id="about-label">§ 5 · About</p>
              <div className="pretty mt-6 space-y-5 text-[17.5px] leading-relaxed text-ivory-2 [&>p:first-child]:text-ivory">
                {person.about.map((p) => <p key={p}>{p}</p>)}
              </div>
              <p className="note mt-10">Interested in</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {person.interests.map((i) => (
                  <li key={i} className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-[14px] text-ivory-2">{i}</li>
                ))}
              </ul>
            </div>

            <div id="contact" className="scroll-mt-20 lg:border-l lg:border-ivory/10 lg:pl-12">
              <p className="note">§ 6 · Contact</p>
              <h2 className="display mt-5 text-[clamp(34px,4.4vw,52px)] leading-[1.04]">Working on something that should hold up? <em className="italic text-ochre-2">Write to me.</em></h2>
              <a href={`mailto:${person.email}`} className="ink-link mt-8 inline-block break-all text-[clamp(20px,2.4vw,26px)] text-ivory">
                {person.email}
              </a>
              <ul className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
                {[
                  { l: "LinkedIn", h: person.linkedin, d: "ujwalshyam kantimohanthy" },
                  { l: "GitHub", h: person.github, d: "kantimohanthy" },
                ].map((s) => (
                  <li key={s.l}>
                    <a href={s.h} rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between py-3 text-[15.5px]">
                      <span className="text-ivory group-hover:text-ochre-2">{s.l}</span>
                      <span className="text-ivory-3">{s.d} ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 rounded-md border border-ivory/10 p-5">
                <p className="note">Another way in</p>
                <p className="pretty mt-2 text-[15px] leading-relaxed text-ivory-2">
                  The same work, arranged as missions on a map. Or open DEVAN, the evidence graph behind this site.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  <Link href="/map/" className="ink-link text-[15px] text-ivory">Explore the map</Link>
                  <Link href="/devan/" className="ink-link text-[15px] text-ivory">Open DEVAN</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
