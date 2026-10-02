import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, getDecision, missions, formatMonth } from "@/data/portfolio";
import { SiteHeader, SiteFooter, SkipLink, Stamp, ArtifactLink, Figure } from "@/components/site/SiteChrome";
import { ProjectFigure } from "@/components/site/Figures";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `https://kantimohanthy.dev/work/${p.slug}/` },
    openGraph: { title: `${p.title} · Ujwal Shyam Kantimohanthy`, description: p.summary, url: `https://kantimohanthy.dev/work/${p.slug}/` },
  };
}

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-ivory/10 py-10 md:grid-cols-[180px_1fr] md:gap-10">
      <h2 className="note pt-1.5">
        {String(n).padStart(2, "0")} · {title}
      </h2>
      <div className="pretty min-w-0 text-[17px] leading-relaxed text-ivory-2">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="relative pl-5">
          <span aria-hidden className="absolute left-0 top-[0.15em] text-[12px] text-ochre">◆</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const decision = getDecision(p.decision);
  const relatedMissions = missions.filter((m) => p.missions.includes(m.slug));

  const blocks: { title: string; node: React.ReactNode }[] = [];
  blocks.push({ title: "Problem", node: <p className="text-ivory">{p.problem}</p> });
  if (p.constraints?.length) blocks.push({ title: "Constraints", node: <Bullets items={p.constraints} /> });
  blocks.push({
    title: "My role",
    node: (
      <>
        <p className="mb-4 text-ivory">{p.role}</p>
        <Bullets items={p.contributions} />
      </>
    ),
  });
  if (p.architecture)
    blocks.push({
      title: "Architecture",
      node: (
        <>
          <p>{p.architecture.body}</p>
          {p.architecture.points && <div className="mt-4"><Bullets items={p.architecture.points} /></div>}
        </>
      ),
    });
  if (decision)
    blocks.push({
      title: "Key decision",
      node: (
        <div className="rounded-md border border-ivory/10 bg-ink-2/60 p-5 sm:p-7">
          <h3 className="display text-[26px] leading-snug text-ivory">{decision.title}</h3>
          <p className="mt-3 text-[16px]">{decision.context}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {decision.options.map((o) => (
              <li key={o.name} className="rounded border border-ivory/10 p-4 text-[15px]">
                <span className="block font-medium text-ivory">{o.name}</span>
                <span className="mt-1 block">{o.tradeoff}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-l-2 border-ochre pl-4 text-[16px]">
            <p className="text-ivory">
              <span className="note mr-2 text-ochre-2">Chose</span>
              {decision.choice}
            </p>
            <p className="mt-2">{decision.why}</p>
          </div>
          <p className="mt-4 text-[15.5px]">
            <span className="note mr-2">Cost</span>
            {decision.cost}
          </p>
          <p className="mt-4 text-[13.5px] text-ivory-3">Source: {decision.source}</p>
        </div>
      ),
    });
  if (p.validation?.length || p.artifacts.length)
    blocks.push({
      title: "Validation & artifacts",
      node: (
        <>
          {p.validation && <Bullets items={p.validation} />}
          <ul className="mt-4 divide-y divide-ivory/10 border-y border-ivory/10">
            {p.artifacts.map((a) => (
              <li key={a.label}>
                <ArtifactLink a={a} />
              </li>
            ))}
          </ul>
        </>
      ),
    });
  if (p.limitations?.length) blocks.push({ title: "Limitations", node: <Bullets items={p.limitations} /> });
  if (p.next)
    blocks.push({
      title: "Next milestone",
      node: (
        <p>
          <span className="stamp mr-3 text-ivory-2">○ Planned</span>
          {p.next.replace(/^Planned:\s*/, "")}
        </p>
      ),
    });

  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1080px] px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-[14px] text-ivory-3">
          <Link href="/#work" className="hover:text-ivory">← All work</Link>
        </nav>

        <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="note">{p.kicker}</p>
            <h1 className="display mt-4 text-[clamp(44px,7vw,88px)] font-light leading-[0.98]">{p.title}</h1>
            <p className="pretty mt-6 text-[19px] leading-relaxed text-ivory">{p.summary}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ivory/10 pt-6 text-[14.5px]">
            <div className="col-span-2">
              <dt className="note">Organisation</dt>
              <dd className="mt-1 text-ivory-2">{p.organization}</dd>
            </div>
            <div>
              <dt className="note">Status</dt>
              <dd className="mt-1.5"><Stamp status={p.status} /></dd>
            </div>
            <div>
              <dt className="note">Since</dt>
              <dd className="mt-1 text-ivory-2">{formatMonth(p.start)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="note">Missions</dt>
              <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {relatedMissions.map((m) => (
                  <Link key={m.slug} href={`/map/#${m.slug}`} className="ink-link text-ivory-2">{m.title}</Link>
                ))}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="note">Last reviewed</dt>
              <dd className="mt-1 text-ivory-3">{formatMonth(p.lastReviewed)}</dd>
            </div>
          </dl>
        </header>

        <Figure n="1" caption={p.figureCaption} className="mx-auto mt-12 max-w-[760px]">
          <ProjectFigure kind={p.figure} />
        </Figure>

        <div className="mt-6">
          {blocks.map((b, i) => (
            <Block key={b.title} n={i + 1} title={b.title}>
              {b.node}
            </Block>
          ))}
        </div>

        <nav aria-label="Next case study" className="mt-6 border-t border-ivory/10 pt-8">
          <Link href={`/work/${next.slug}/`} className="group block">
            <span className="note">Next entry</span>
            <span className="display mt-2 block text-[clamp(30px,5vw,52px)] leading-tight group-hover:text-ochre-2">
              {next.title} <span aria-hidden className="text-ochre">→</span>
            </span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
