import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { atlasEdges, atlasNodes, getAtlasNode } from "@/content";
import { SiteHeader, SiteFooter, SkipLink } from "@/components/site/SiteChrome";
import { EvidenceMarker } from "@/components/routed/EvidenceModeProvider";

export function generateStaticParams() {
  return atlasNodes.map((n) => ({ node: n.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ node: string }>;
}): Promise<Metadata> {
  const { node } = await params;
  const item = getAtlasNode(node);
  if (!item) return {};
  return {
    title: `${item.title} · DEVAN Atlas`,
    description: item.summary,
    alternates: { canonical: `https://kantimohanthy.dev/atlas/${item.id}/` },
    openGraph: {
      title: `${item.title} · DEVAN Atlas`,
      description: item.summary,
      url: `https://kantimohanthy.dev/atlas/${item.id}/`,
      images: [{ url: "/og/atlas.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function AtlasNodePage({
  params,
}: {
  params: Promise<{ node: string }>;
}) {
  const { node: nodeId } = await params;
  const item = getAtlasNode(nodeId);
  if (!item) notFound();

  const incoming = atlasEdges.filter((e) => e.to === item.id);
  const outgoing = atlasEdges.filter((e) => e.from === item.id);

  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />

      <main id="main" className="mx-auto max-w-[920px] px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/10 pb-5 font-mono text-[12px]">
          <Link href="/atlas/" className="ink-link">
            ← Back to DEVAN Atlas
          </Link>
          <span className="uppercase tracking-wider text-ivory-3">
            {item.kind} · {item.id}
          </span>
        </div>

        <header className="mt-8">
          {item.status && (
            <span className="stamp border-[#E8923A]/60 text-[#F2A65A] mb-4">{item.status}</span>
          )}
          <h1 className="display mt-2 text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-ivory">
            {item.title}
            <EvidenceMarker ids={item.evidenceIds} />
          </h1>
          <p className="mt-2 font-mono text-[13px] text-ivory-3">{item.subtitle}</p>
          <p className="pretty mt-5 text-[18px] leading-relaxed text-ivory">{item.summary}</p>
        </header>

        {item.details.length > 0 && (
          <section className="mt-10 border-t border-ivory/15 pt-7">
            <h2 className="note text-[#F2A65A]">Verification notes &amp; details</h2>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-ivory-2">
              {item.details.map((d) => (
                <li key={d} className="relative pl-5">
                  <span aria-hidden className="absolute left-0 top-[0.2em] text-teal">◆</span>
                  {d}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10 border-t border-ivory/15 pt-7 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="note">Incoming relationships ({incoming.length})</h2>
            {incoming.length === 0 ? (
              <p className="mt-3 text-[14.5px] text-ivory-3">Root entry node.</p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {incoming.map((e) => {
                  const src = getAtlasNode(e.from);
                  if (!src) return null;
                  return (
                    <li key={e.from}>
                      <Link href={src.url} className="ink-link text-[15px]">
                        ← {src.title}
                      </Link>
                      <span className="ml-2 font-mono text-[11px] text-ivory-3">({e.relation})</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div>
            <h2 className="note">Outgoing relationships ({outgoing.length})</h2>
            {outgoing.length === 0 ? (
              <p className="mt-3 text-[14.5px] text-ivory-3">Leaf verification node.</p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {outgoing.map((e) => {
                  const dest = getAtlasNode(e.to);
                  if (!dest) return null;
                  return (
                    <li key={e.to}>
                      <span className="mr-2 font-mono text-[11px] text-[#F2A65A]">{e.relation} →</span>
                      <Link href={dest.url} className="ink-link text-[15px]">
                        {dest.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {item.externalHref && (
          <div className="mt-10 border-t border-ivory/15 pt-7">
            {item.externalHref.startsWith("http") ? (
              <a
                href={item.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#F2EBDC] px-6 font-mono text-[13px] font-medium text-[#11100E] hover:bg-[#F2A65A]"
              >
                {item.externalLabel || "Inspect source repository"} ↗
              </a>
            ) : (
              <Link
                href={item.externalHref}
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#F2EBDC] px-6 font-mono text-[13px] font-medium text-[#11100E] hover:bg-[#F2A65A]"
              >
                {item.externalLabel || "Inspect linked record"} →
              </Link>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
