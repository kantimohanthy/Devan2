import Link from "next/link";
import {
  person,
  caseStudies,
  research,
  ventures,
  experience,
  otherWork,
  talks,
} from "@/data/portfolio";
import { experiments } from "@/lib/data";
import { SiteHeader, SiteFooter, StatusPill, TextLink } from "@/components/site/SiteChrome";
import { MeshField } from "@/components/site/MeshField";
import {
  Reveal,
  SplitHeading,
  WordRotator,
  SpotlightCard,
  ScrollProgress,
  Magnetic,
  TraceReplay,
} from "@/components/site/Motion";
import { WorkVisual } from "@/components/site/WorkVisual";
import type { ListItem } from "@/data/portfolio";

const stack = [
  "Wireless mesh",
  "TV White Space",
  "RF propagation",
  "DNS",
  "TCP/IP",
  "Packet capture",
  "MATLAB",
  "Next.js",
  "TypeScript",
  "React",
  "Prisma",
  "PostgreSQL",
  "FastAPI",
  "Python",
  "Hugging Face",
  "Speech & emotion models",
  "CI validation",
];

const now = [
  { label: "Building", value: "Project LOOP at Zidio", color: "text-cyan-300" },
  { label: "Researching", value: "Mesh over TV White Space", color: "text-blue" },
  { label: "Founding", value: "CosmoHub at STATION F", color: "text-amber" },
];

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-text-2">
      <span className="text-cyan-300">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-cyan-300/60 to-transparent" />
      {children}
    </div>
  );
}

function Rows({ items }: { items: ListItem[] }) {
  return (
    <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {items.map((item, i) => (
        <li key={item.title + item.context}>
          <Reveal delay={i * 0.05} y={16}>
            <div className="group grid gap-2 py-6 transition-colors sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-7">
              <div className="min-w-0">
                <h3 className="font-display text-[22px] font-medium tracking-tight transition-colors group-hover:text-cyan-200 sm:text-[26px]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[14px] text-text-2">{item.context}</p>
                <p className="mt-3 max-w-[640px] text-[15.5px] leading-relaxed text-text/85">{item.body}</p>
                {item.links && item.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {item.links.map((l) => (
                      <TextLink key={l.href} link={l} />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-start gap-2 font-mono text-[12.5px] text-text-2 sm:flex-col sm:items-end">
                {item.period && <span>{item.period}</span>}
                {item.status && <StatusPill status={item.status} />}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  const dns = experiments.find((e) => e.slug === "dns-iterative-resolution");
  const traceLines = dns?.outputLines ?? [];

  return (
    <div className="grain">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteHeader />

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section className="relative isolate flex min-h-[calc(100svh-56px)] flex-col overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-20%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(79,140,255,0.22),transparent)] blur-2xl" />
            <div className="absolute right-[-10%] top-[30%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.12),transparent)] blur-2xl" />
          </div>
          <MeshField className="absolute inset-0 -z-10 h-full w-full" />

          <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-4 pb-10 pt-16 sm:px-8">
            <Reveal y={10}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[12px] text-text-2 backdrop-blur">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-green text-green" />
                {person.headline} · {person.location}
              </div>
            </Reveal>

            <h1 className="mt-7 font-display font-semibold leading-[0.88] tracking-[-0.045em]">
              <SplitHeading text="Ujwal" className="block text-[clamp(64px,13vw,190px)]" />
              <SplitHeading text="Kantimohanthy" delay={0.15} className="sheen block text-[clamp(44px,10.4vw,168px)]" />
            </h1>

            <Reveal delay={0.55} y={16}>
              <p className="mt-8 max-w-[880px] font-display text-[clamp(22px,3vw,38px)] leading-[1.15] tracking-tight text-text">
                I build dependable <br className="sm:hidden" />
                <WordRotator words={["networks", "web products", "AI pipelines", "evidence systems"]} />
                <br /> and make their behaviour verifiable.
              </p>
            </Reveal>

            <Reveal delay={0.75} y={16}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href="#work"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-text px-6 py-3.5 text-[15px] font-semibold text-bg"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-300 via-blue to-violet-400 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    <span className="relative">See the work</span>
                    <span className="relative transition-transform group-hover:translate-y-0.5">↓</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-6 py-3.5 text-[15px] backdrop-blur transition hover:border-cyan-300/60 hover:text-cyan-100"
                  >
                    Say hello
                  </a>
                </Magnetic>
                <div className="flex items-center gap-1 pl-1">
                  <a href={person.github} rel="noopener noreferrer" className="rounded-full px-3 py-2 text-[14px] text-text-2 transition hover:text-text">
                    GitHub ↗
                  </a>
                  <a href={person.linkedin} rel="noopener noreferrer" className="rounded-full px-3 py-2 text-[14px] text-text-2 transition hover:text-text">
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Now strip */}
          <Reveal delay={0.95} y={10}>
            <div className="mx-auto w-full max-w-[1240px] px-4 pb-8 sm:px-8">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur sm:grid-cols-3">
                {now.map((n) => (
                  <div key={n.label} className="flex items-center gap-3 bg-[#0a0b0d]/80 px-5 py-4">
                    <span className={`live-dot h-2 w-2 shrink-0 rounded-full bg-current ${n.color}`} />
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-2">{n.label}</div>
                      <div className="truncate text-[15px] text-text">{n.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 hidden text-right font-mono text-[11px] text-text-2/70 sm:block">
                Move your cursor over the mesh: you&apos;re the gateway.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ───────────── Marquee ───────────── */}
        <div className="marquee overflow-hidden border-y border-white/[0.07] py-5" aria-label="Tools and topics">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-[22px] tracking-tight text-text-2 sm:text-[28px]">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-10" aria-hidden={i >= stack.length}>
                {s}
                <span className="text-cyan-300/60">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ───────────── About ───────────── */}
        <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <Eyebrow index="00">About</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal delay={0.05}>
              <p className="font-display text-[clamp(26px,3.4vw,46px)] leading-[1.12] tracking-tight">
                Networks are one of the few systems you can{" "}
                <span className="text-cyan-300">watch fail in real time.</span> I trace problems down to the layer
                underneath, then build there.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-5 text-[16.5px] leading-relaxed text-text-2">
                {person.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── Selected work ───────────── */}
        <section id="work" className="scroll-mt-16 mx-auto max-w-[1240px] px-4 pb-24 sm:px-8 sm:pb-32">
          <Reveal>
            <Eyebrow index="01">Selected work</Eyebrow>
            <h2 className="mt-6 max-w-[900px] font-display text-[clamp(36px,5.6vw,80px)] font-semibold leading-[0.98] tracking-[-0.03em]">
              Three systems. <span className="text-text-2">What I built, and what&apos;s still open.</span>
            </h2>
          </Reveal>

          <div className="mt-14 space-y-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={0.05}>
                <Link href={`/work/${cs.slug}/`} className="block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                  <SpotlightCard>
                    <div className={`grid items-stretch lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                      <div className="flex flex-col p-7 sm:p-10">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-[13px] text-cyan-300">0{i + 1}</span>
                          <StatusPill status={cs.status} />
                        </div>
                        <h3 className="mt-8 font-display text-[clamp(32px,4vw,52px)] font-semibold leading-none tracking-[-0.03em]">
                          {cs.title}
                        </h3>
                        <p className="mt-3 text-[15px] text-text-2">{cs.context}</p>
                        <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-text/90">{cs.summary}</p>
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {cs.tags.slice(0, 4).map((t) => (
                            <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-[12.5px] text-text-2">
                              {t}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-auto inline-flex items-center gap-2 pt-10 text-[15px] font-medium text-cyan-200">
                          Read the case study
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </span>
                      </div>
                      <div className="relative min-h-[260px] border-t border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.10),transparent_70%)] p-6 lg:border-l lg:border-t-0">
                        <WorkVisual slug={cs.slug} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────────── Proof ───────────── */}
        <section className="relative overflow-hidden border-y border-white/[0.07] py-24 sm:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(103,232,249,0.08),transparent_60%)]" />
          <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <Eyebrow index="02">Proof, not percentages</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(34px,4.6vw,64px)] font-semibold leading-[1] tracking-[-0.03em]">
                Every claim points at something you can check.
              </h2>
              <p className="mt-6 max-w-[480px] text-[16.5px] leading-relaxed text-text-2">
                No skill bars here. This is a real iterative DNS resolution I traced with dig and tshark: root, then
                TLD, then authoritative, four hops in total. My first capture missed a hop, and finding out why was
                the useful part.
              </p>
              <div className="mt-8 grid max-w-[460px] grid-cols-4 gap-2 font-mono text-[11px]">
                {[
                  { k: "local", ms: 12 },
                  { k: "root", ms: 34 },
                  { k: ".com", ms: 28 },
                  { k: "auth", ms: 18 },
                ].map((h) => (
                  <div key={h.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="text-text-2">{h.k}</div>
                    <div className="mt-1 text-[18px] text-cyan-200">{h.ms}<span className="text-[11px] text-text-2"> ms</span></div>
                    <div className="mt-2 h-1 rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue" style={{ width: `${(h.ms / 34) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                <TextLink link={{ label: "Open the evidence record", href: "/evidence/" }} />
                <TextLink link={{ label: "How DEVAN works", href: "/work/devan/" }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <TraceReplay command="dig +trace example.com" lines={traceLines} />
              <p className="mt-3 font-mono text-[11px] text-text-2/70">Replayed from the recorded run of 7 Aug 2026.</p>
            </Reveal>
          </div>
        </section>

        {/* ───────────── Research & venture ───────────── */}
        <section id="research" className="scroll-mt-16 mx-auto max-w-[1240px] px-4 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[320px_1fr]">
            <Reveal>
              <Eyebrow index="03">Research</Eyebrow>
              <h2 className="mt-6 font-display text-[40px] font-semibold leading-none tracking-[-0.03em]">Open questions I&apos;m working on.</h2>
            </Reveal>
            <Rows items={research} />
          </div>
          <div className="mt-24 grid gap-14 lg:grid-cols-[320px_1fr]">
            <Reveal>
              <Eyebrow index="04">Venture</Eyebrow>
              <h2 className="mt-6 font-display text-[40px] font-semibold leading-none tracking-[-0.03em]">Building from zero.</h2>
            </Reveal>
            <Rows items={ventures} />
          </div>
        </section>

        {/* ───────────── Experience ───────────── */}
        <section id="experience" className="scroll-mt-16 mx-auto max-w-[1240px] px-4 pb-24 sm:px-8 sm:pb-32">
          <div className="grid gap-14 lg:grid-cols-[320px_1fr]">
            <Reveal>
              <Eyebrow index="05">Experience</Eyebrow>
              <h2 className="mt-6 font-display text-[40px] font-semibold leading-none tracking-[-0.03em]">Where I&apos;m putting the hours.</h2>
            </Reveal>
            <Rows items={experience} />
          </div>
          <div className="mt-24 grid gap-14 lg:grid-cols-[320px_1fr]">
            <Reveal>
              <Eyebrow index="06">More</Eyebrow>
              <h2 className="mt-6 font-display text-[40px] font-semibold leading-none tracking-[-0.03em]">Shipped, submitted, spoken.</h2>
            </Reveal>
            <Rows items={[...otherWork, ...talks]} />
          </div>
        </section>

        {/* ───────────── DEVAN portal ───────────── */}
        <section className="mx-auto max-w-[1240px] px-4 pb-24 sm:px-8 sm:pb-32">
          <Reveal>
            <Link href="/devan/" className="group block rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              <SpotlightCard className="rounded-[28px]">
                <div className="relative grid gap-8 overflow-hidden p-8 sm:p-14 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[conic-gradient(from_180deg,rgba(103,232,249,0.25),rgba(167,139,250,0.2),rgba(79,140,255,0.25),rgba(103,232,249,0.25))] blur-3xl transition-transform duration-700 group-hover:scale-125" />
                  <div className="relative">
                    <Eyebrow index="07">Go deeper</Eyebrow>
                    <h2 className="mt-6 font-display text-[clamp(40px,6vw,88px)] font-semibold leading-[0.95] tracking-[-0.04em]">
                      Enter <span className="sheen">DEVAN</span>
                    </h2>
                    <p className="mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-text-2">
                      My engineering workspace underneath this site: concepts I&apos;ve studied, experiments I&apos;ve run
                      and the raw evidence behind them, linked as a graph.
                    </p>
                  </div>
                  <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/15 text-[28px] transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:text-bg">
                    →
                  </span>
                </div>
              </SpotlightCard>
            </Link>
          </Reveal>
        </section>

        {/* ───────────── Contact ───────────── */}
        <section id="contact" className="scroll-mt-16 relative overflow-hidden border-t border-white/[0.07]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_at_bottom,rgba(79,140,255,0.18),transparent_70%)]" />
          <div className="relative mx-auto max-w-[1240px] px-4 py-28 sm:px-8 sm:py-40">
            <Reveal>
              <Eyebrow index="08">Contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 font-display text-[clamp(44px,8vw,128px)] font-semibold leading-[0.92] tracking-[-0.045em]">
                Let&apos;s build something
                <br />
                <span className="sheen">that holds up.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[560px] text-[17px] leading-relaxed text-text-2">
                Networking, infrastructure, web products or space sector tooling: if there&apos;s an overlap, write to me.
              </p>
              <a
                href={`mailto:${person.email}`}
                className="link-underline mt-10 inline-block break-all font-display text-[clamp(26px,4.4vw,60px)] font-medium tracking-tight text-cyan-200"
              >
                {person.email}
              </a>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { label: "LinkedIn", href: person.linkedin },
                  { label: "GitHub", href: person.github },
                ].map((s) => (
                  <Magnetic key={s.label}>
                    <a
                      href={s.href}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[15px] transition hover:border-cyan-300/60 hover:text-cyan-100"
                    >
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
