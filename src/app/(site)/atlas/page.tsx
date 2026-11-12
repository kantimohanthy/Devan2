import type { Metadata } from "next";
import Link from "next/link";
import { atlasEdges, atlasNodes } from "@/content";
import { SiteHeader, SiteFooter, SkipLink } from "@/components/site/SiteChrome";
import { AtlasLazyWrapper } from "@/components/routed/AtlasLazyWrapper";
import { EvidenceMarker } from "@/components/routed/EvidenceModeProvider";

export const metadata: Metadata = {
  title: "DEVAN Atlas",
  description:
    "Zoomed-out topology of Ujwal Shyam Kantimohanthy's engineering portfolio: projects connected to decisions, concepts, and verified artifacts.",
  alternates: { canonical: "https://kantimohanthy.dev/atlas/" },
  openGraph: {
    title: "DEVAN Atlas · Ujwal Shyam Kantimohanthy",
    description:
      "Curated graph of projects, architectural decisions, protocol concepts, and inspectable artifacts.",
    url: "https://kantimohanthy.dev/atlas/",
    images: [{ url: "/og/atlas.svg", width: 1200, height: 630 }],
  },
};

export default function AtlasPage() {
  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />

      <main id="main" className="mx-auto max-w-[1200px] px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ivory/10 pb-8">
          <div className="max-w-[740px]">
            <p className="note text-[#F2A65A]">DEVAN Atlas · Zoomed-out network</p>
            <h1 className="display mt-3 text-[clamp(2.1rem,5.5vw,4rem)] font-light leading-[1.02]">
              How work connects to <em className="italic text-[#F2A65A]">decisions and proof.</em>
            </h1>
            <p className="pretty mt-4 text-[16.5px] leading-relaxed text-ivory-2">
              The hero mesh zoomed out one layer: every project links to the architectural decisions, protocol concepts, and artifacts backing it. Select any node for its inspector panel and permanent URL, or browse the identical structured list below.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[12px]">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ivory/25 px-5 text-ivory hover:border-teal"
            >
              ← Zoom back to Hero Mesh
            </Link>
            <Link
              href="/evidence/"
              className="inline-flex min-h-[44px] items-center rounded-full border border-teal/40 px-5 text-teal hover:bg-teal/10"
            >
              Raw Evidence Ledger →
            </Link>
          </div>
        </div>

        <section aria-label="Interactive DEVAN Atlas topology" className="mt-10">
          <AtlasLazyWrapper />
        </section>

        {/* Accessible, non-JS identical structured list built strictly from the same atlasNodes array */}
        <section aria-labelledby="structured-atlas-heading" className="mt-16 border-t border-ivory/15 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="structured-atlas-heading" className="note text-[#F2A65A]">
              Structured node index · {atlasNodes.length} items (identical to graph)
            </h2>
            <span className="font-mono text-[11.5px] text-ivory-3">Keyboard &amp; screen-reader equivalent</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {atlasNodes.map((node) => {
              const outEdges = atlasEdges.filter((e) => e.from === node.id);
              return (
                <article
                  key={node.id}
                  data-atlas-list-node={node.id}
                  className="rounded-lg border border-ivory/15 bg-[#181613] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-ivory-3">
                      <span>{node.kind}</span>
                      {node.status && <span className="text-[#F2A65A]">{node.status}</span>}
                    </div>
                    <h3 className="display mt-2 text-[22px] leading-snug text-ivory">
                      <Link href={node.url} className="hover:text-[#F2A65A]">
                        {node.title}
                      </Link>
                      <EvidenceMarker ids={node.evidenceIds} />
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ivory-2">{node.summary}</p>
                  </div>

                  <div className="mt-4 border-t border-ivory/10 pt-3">
                    {outEdges.length > 0 && (
                      <p className="font-mono text-[11px] text-ivory-3 mb-2">
                        Edges: {outEdges.map((e) => `${e.relation} ${e.to}`).join(" · ")}
                      </p>
                    )}
                    <Link href={node.url} className="ink-link font-mono text-[12px]">
                      Open node permalink →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
