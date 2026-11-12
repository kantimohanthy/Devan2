import type { Metadata } from "next";
import Link from "next/link";
import { missions, projects, decisions, timeline } from "@/data/portfolio";
import { SiteHeader, SiteFooter, SkipLink } from "@/components/site/SiteChrome";
import { FieldMapLoader } from "@/components/site/FieldMapLoader";

export const metadata: Metadata = {
  title: "Explore the map",
  description:
    "Ujwal Shyam Kantimohanthy's work arranged as missions: the question behind each, the projects that serve it, and the next move.",
  alternates: { canonical: "https://kantimohanthy.dev/map/" },
};

const orgWork: Record<string, string[]> = {
  "organize-communities": ["Events Lead", "OGV Team Lead"],
};

export default function MapPage() {
  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1200px] px-4 pb-20 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <p className="note">Mission field map</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,5.5vw,4rem)] font-light leading-[1.02]">
              The same work, <em className="italic text-[#F2A65A]">arranged by question.</em>
            </h1>
            <p className="pretty mt-5 text-[16.5px] leading-relaxed text-ivory-2">
              Each waypoint is an engineering question rather than a resume checkbox. For the full typed graph of projects, decisions, and verified evidence records, see the DEVAN Atlas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/atlas/" className="inline-flex min-h-[44px] items-center rounded-full bg-teal px-5 font-mono text-[13px] font-medium text-[#11100E] hover:bg-ivory">
              Open DEVAN Atlas →
            </Link>
            <Link href="/#work" className="inline-flex min-h-[44px] items-center rounded-full border border-ivory/25 px-5 text-[15px] text-ivory hover:border-teal">
              ← Back to reading
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <FieldMapLoader />
        </div>

        {/* List equivalent: always rendered cleanly */}
        <section aria-labelledby="list-title" className="mt-14">
          <h2 id="list-title" className="note">All missions, as a list</h2>
          <ol className="mt-4 divide-y divide-ivory/10 border-y border-ivory/10">
            {missions.map((m, i) => {
              const ps = projects.filter((p) => m.projects.includes(p.slug));
              const ds = decisions.filter((d) => m.decisions.includes(d.id));
              const extra = timeline.filter((t) => orgWork[m.slug]?.some((x) => t.title.startsWith(x)));
              return (
                <li key={m.slug} id={m.slug} className="scroll-mt-20 grid gap-6 py-10 lg:grid-cols-[80px_1fr_1fr] lg:gap-10">
                  <p className="display text-[40px] leading-none text-[#F2A65A]" aria-hidden>
                    {i + 1}
                  </p>
                  <div>
                    <h3 className="display text-[30px] leading-tight">{m.title}</h3>
                    <p className="pretty mt-3 text-[17px] leading-relaxed text-ivory">{m.question}</p>
                    <p className="pretty mt-2 text-[15.5px] leading-relaxed text-ivory-2">{m.why}</p>
                    <p className="mt-4 text-[15px] text-ivory-2">
                      <span className="stamp mr-2 border-ivory/30 text-ivory-2">○ Next</span>
                      {m.next}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <p className="note">Projects</p>
                      {ps.length || extra.length ? (
                        <ul className="mt-2 divide-y divide-ivory/10 border-y border-ivory/10">
                          {ps.map((p) => (
                            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
                              <Link href={`/work/${p.slug}/`} className="ink-link text-[15.5px]">{p.title}</Link>
                              <span className="stamp border-ivory/25 text-ivory-2">{p.statusLabel}</span>
                            </li>
                          ))}
                          {extra.map((t) => (
                            <li key={t.title} className="py-3 text-[15px] text-ivory-2">
                              <span className="text-ivory">{t.title}</span>, {t.org} <span className="text-ivory-3">({t.date})</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-[15px] text-ivory-3">No public project yet.</p>
                      )}
                    </div>
                    {ds.length > 0 && (
                      <div>
                        <p className="note">Decisions</p>
                        <ul className="mt-2 space-y-1.5 text-[15px]">
                          {ds.map((d) => (
                            <li key={d.id}>
                              <Link href={`/work/${d.projectSlug}/`} className="ink-link text-ivory-2">{d.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
