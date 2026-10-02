import Link from "next/link";
import {
  person,
  caseStudies,
  research,
  ventures,
  experience,
  otherWork,
  talks,
  notes,
} from "@/data/portfolio";
import {
  SiteHeader,
  SiteFooter,
  Section,
  ItemList,
  StatusPill,
} from "@/components/site/SiteChrome";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1080px] px-4 sm:px-6">
        {/* Introduction */}
        <section className="pb-14 pt-14 sm:pb-20 sm:pt-24">
          <p className="font-mono text-[13px] text-text-2">
            {person.headline} · {person.location}
          </p>
          <h1 className="mt-4 text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-[60px]">
            {person.fullName}
          </h1>
          <p className="mt-6 max-w-[760px] text-[21px] leading-snug text-text sm:text-[26px]">
            {person.thread}
          </p>
          <div className="mt-6 max-w-[680px] space-y-4 text-[16px] leading-relaxed text-text-2">
            {person.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${person.email}`}
              className="rounded-md bg-text px-4 py-2.5 text-[15px] font-medium text-bg hover:bg-white"
            >
              Email me
            </a>
            <a
              href={person.linkedin}
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2.5 text-[15px] hover:border-text-2"
            >
              LinkedIn
            </a>
            <a
              href={person.github}
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2.5 text-[15px] hover:border-text-2"
            >
              GitHub
            </a>
            <a
              href="#work"
              className="rounded-md px-4 py-2.5 text-[15px] text-text-2 hover:text-text"
            >
              See selected work ↓
            </a>
          </div>
        </section>

        {/* Featured work */}
        <Section id="work" label="Selected work" title="Three projects, each with what I built and what's still open.">
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}/`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue/50 focus-visible:outline-2 focus-visible:outline-blue"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-text-2">{cs.period}</span>
                  <StatusPill status={cs.status} />
                </div>
                <h3 className="mt-4 text-[20px] font-semibold tracking-tight">{cs.title}</h3>
                <p className="mt-1 text-[14px] text-text-2">{cs.context}</p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text/90">{cs.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
                  {cs.tags.slice(0, 4).map((t) => (
                    <li key={t} className="rounded border border-border px-2 py-0.5 text-[12px] text-text-2">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 text-[14px] font-medium text-blue">
                  Read case study <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section id="research" label="Research">
          <ItemList items={research} />
        </Section>

        <Section id="ventures" label="Venture">
          <ItemList items={ventures} />
        </Section>

        <Section id="experience" label="Experience">
          <ItemList items={experience} />
        </Section>

        <Section id="more" label="More work">
          <ItemList items={otherWork} />
        </Section>

        <Section id="talks" label="Talks">
          <ItemList items={talks} />
        </Section>

        <Section id="notes" label="Engineering notes">
          <ItemList items={notes} />
        </Section>

        <Section id="devan" label="DEVAN">
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="max-w-[640px] text-[16px] leading-relaxed text-text/90">
              Underneath this site is DEVAN, my engineering workspace: a graph of the concepts I&apos;ve
              studied, the experiments I&apos;ve run and the raw evidence behind them. It&apos;s denser than
              this page and built for exploring rather than skimming.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/devan/"
                className="rounded-md border border-blue/50 bg-blue/10 px-4 py-2.5 text-[15px] font-medium text-text hover:bg-blue/20"
              >
                Explore DEVAN →
              </Link>
              <Link href="/work/devan/" className="rounded-md px-4 py-2.5 text-[15px] text-text-2 hover:text-text">
                How it works
              </Link>
            </div>
          </div>
        </Section>

        <Section id="contact" label="Contact">
          <p className="max-w-[640px] text-[21px] leading-snug">
            Working on networking, infrastructure, web products or space sector tooling? I&apos;d like to hear
            about it.
          </p>
          <dl className="mt-6 grid max-w-[640px] gap-3 text-[15px] sm:grid-cols-[100px_1fr]">
            <dt className="text-text-2">Email</dt>
            <dd>
              <a href={`mailto:${person.email}`} className="text-blue underline-offset-4 hover:underline">
                {person.email}
              </a>
            </dd>
            <dt className="text-text-2">LinkedIn</dt>
            <dd>
              <a href={person.linkedin} rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">
                Ujwal Shyam Kantimohanthy
              </a>
            </dd>
            <dt className="text-text-2">GitHub</dt>
            <dd>
              <a href={person.github} rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">
                kantimohanthy
              </a>
            </dd>
          </dl>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
