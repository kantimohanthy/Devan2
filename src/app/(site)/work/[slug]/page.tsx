import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  getProjectBySlug,
  getRepoSnapshot,
  formatBuildRelativePush,
  formatMonth,
} from "@/content";
import { SiteHeader, SiteFooter, SkipLink } from "@/components/site/SiteChrome";
import { TracerouteCaseStudy } from "@/components/routed/TracerouteCaseStudy";
import { StatusPill } from "@/components/routed/SelectedWorkChapters";
import { EvidenceMarker } from "@/components/routed/EvidenceModeProvider";

export function generateStaticParams() {
  const seen = new Set<string>();
  const params: { slug: string }[] = [];
  for (const p of projects) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      params.push({ slug: p.slug });
    }
    if (p.aliases) {
      for (const alias of p.aliases) {
        if (!seen.has(alias)) {
          seen.add(alias);
          params.push({ slug: alias });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const ogImg = `/og/${p.slug}.svg`;
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `https://kantimohanthy.dev/work/${p.slug}/` },
    openGraph: {
      title: `${p.title} · Ujwal Shyam Kantimohanthy`,
      description: p.summary,
      url: `https://kantimohanthy.dev/work/${p.slug}/`,
      images: [{ url: ogImg, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} · Ujwal Shyam Kantimohanthy`,
      description: p.summary,
      images: [ogImg],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const repoMeta = p.repoSlug ? getRepoSnapshot(p.repoSlug) : undefined;
  const pushLabel = formatBuildRelativePush(repoMeta);

  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />

      <main id="main" className="mx-auto max-w-[960px] px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/15 pb-5 font-mono text-[12px]">
          <Link href="/#work" className="ink-link inline-flex min-h-[38px] items-center">
            ← All selected work
          </Link>
          <span className="text-ivory-3">Reviewed {formatMonth(p.lastReviewed)}</span>
        </div>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={p.status} label={p.statusLabel} />
            <span className="note">{p.kicker}</span>
          </div>

          <h1 className="display mt-4 text-[clamp(2.2rem,5.5vw,3.9rem)] font-light leading-[1.02] text-ivory">
            {p.title}
            <EvidenceMarker ids={p.evidenceIds} />
          </h1>

          <p className="pretty mt-5 max-w-[740px] text-[18.5px] leading-relaxed text-ivory-2">
            {p.summary}
          </p>

          <dl className="mt-7 grid gap-4 border-y border-ivory/15 py-5 sm:grid-cols-3 text-[14px]">
            <div>
              <dt className="note">Organisation</dt>
              <dd className="mt-1 text-ivory">{p.organization}</dd>
            </div>
            <div>
              <dt className="note">Role</dt>
              <dd className="mt-1 text-ivory">{p.role}</dd>
            </div>
            <div>
              <dt className="note">Timeline / Repo</dt>
              <dd className="mt-1 text-ivory-2">
                {p.period}
                {pushLabel && <span className="block font-mono text-[11.5px] text-teal mt-0.5">{pushLabel}</span>}
              </dd>
            </div>
          </dl>
        </header>

        {/* Traceroute hops */}
        <TracerouteCaseStudy project={p} />

        {/* Next / Atlas navigation */}
        <nav
          aria-label="Next project traceroute"
          className="mt-14 border-t border-ivory/15 pt-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link href={`/work/${next.slug}/`} className="group block">
            <span className="note block">Next project route</span>
            <span className="display mt-1 block text-[26px] text-ivory group-hover:text-[#F2A65A]">
              {next.title} →
            </span>
          </Link>
          <Link
            href={`/atlas/${p.slug === "cineforge-ai-pro" ? "devan" : p.slug}/`}
            className="inline-flex min-h-[44px] items-center rounded-full border border-teal/40 px-5 font-mono text-[12.5px] text-teal hover:bg-teal/10"
          >
            Inspect node in DEVAN Atlas ↗
          </Link>
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
}
