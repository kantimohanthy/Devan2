import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/portfolio";
import { SiteHeader, SiteFooter, StatusPill, TextLink } from "@/components/site/SiteChrome";
import { ScrollProgress, Reveal } from "@/components/site/Motion";
import { WorkVisual } from "@/components/site/WorkVisual";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <div className="grain">
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[820px] px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <Link href="/#work" className="text-[14px] text-text-2 hover:text-text">
          ← All work
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-[14px] text-text-2">
            <span>{cs.context}</span>
            <span aria-hidden>·</span>
            <span>{cs.period}</span>
            <StatusPill status={cs.status} />
          </div>
          <h1 className="mt-5 font-display text-[clamp(44px,8vw,84px)] font-semibold leading-[0.95] tracking-[-0.04em]">{cs.title}</h1>
          <p className="mt-4 text-[19px] leading-relaxed text-text/90">{cs.summary}</p>
          <div className="mt-8 h-[240px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.12),transparent_70%)] p-5 sm:h-[300px]">
            <WorkVisual slug={cs.slug} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Topics">
            {cs.tags.map((t) => (
              <li key={t} className="rounded border border-border px-2 py-0.5 text-[12px] text-text-2">
                {t}
              </li>
            ))}
          </ul>
        </header>

        <div className="divide-y divide-border">
          {cs.sections.map((s) => (
            <Reveal key={s.heading} y={18}>
            <section className="py-9">
              <h2 className="font-display text-[26px] font-semibold tracking-tight">{s.heading}</h2>
              {s.body && <p className="mt-3 text-[16px] leading-[1.7] text-text/90">{s.body}</p>}
              {s.points && (
                <ul className="mt-3 space-y-2.5 text-[16px] leading-[1.6] text-text/90">
                  {s.points.map((p) => (
                    <li key={p} className="relative pl-5">
                      <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-text-2" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </section>
            </Reveal>
          ))}
        </div>

        {cs.writeUpStatus && (
          <p className="mt-2 rounded-lg border border-border bg-surface px-4 py-3 text-[14px] text-text-2">
            {cs.writeUpStatus}
          </p>
        )}

        {cs.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {cs.links.map((l) => (
              <TextLink key={l.href} link={l} />
            ))}
          </div>
        )}

        <nav aria-label="Next case study" className="mt-14 border-t border-border pt-6">
          <Link href={`/work/${next.slug}/`} className="group block">
            <span className="text-[13px] text-text-2">Next</span>
            <span className="mt-1 block font-display text-[clamp(28px,5vw,48px)] font-semibold tracking-tight transition-colors group-hover:text-cyan-200">
              {next.title} →
            </span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
