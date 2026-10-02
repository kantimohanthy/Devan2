import type { Metadata } from "next";
import Link from "next/link";
import { missions, projects, decisions, timeline } from "@/data/portfolio";
import { SiteHeader, SiteFooter, SkipLink, Stamp } from "@/components/site/SiteChrome";
import { FieldMapLoader } from "@/components/site/FieldMapLoader";

export const metadata: Metadata = {
  title: "Explore the map",
  description: "Ujwal Shyam Kantimohanthy's work arranged as missions: the question behind each, the projects that serve it, the decisions made and the next move.",
  alternates: { canonical: "https://kantimohanthy.dev/map/" },
};

const orgWork: Record<string, string[]> = {
  "organize-communities": ["Events Lead", "OGV Team Lead"],
  "space-learning": ["Talk: Building a Sustainable Space Economy"],
};

export default function MapPage() {
  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1200px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <p className="note">Explore the map</p>
            <h1 className="display mt-4 text-[clamp(40px,6vw,72px)] font-light leading-[1]">
              The same work, <em className="italic text-ochre-2">arranged as missions.</em>
            </h1>
            <p className="pretty mt-5 text-[17px] leading-relaxed text-ivory-2">
              I treat my progress like a long game: pick a hard problem, learn its rules, build, check, and let the evidence pick the next move.
              Each mission below is a real question. Select one to see the projects, decisions and next step behind it. No levels, no scores.
            </p>
          </div>
          <Link href="/#work" className="inline-flex min-h-12 items-center rounded-full border border-ivory/25 px-5 text-[15px] text-ivory hover:border-ochre">
            ← Back to reading
          </Link>
        </div>

        <div className="mt-12">
          <FieldMapLoader />
        </div>

        {/* List equivalent: always rendered, works without JavaScript */}
        <section aria-labelledby="list-title" className="mt-14">
          <h2 id="list-title" className="note">All missions, as a list</h2>
          <ol className="mt-4 divide-y divide-ivory/10 border-y border-ivory/10">
            {missions.map((m, i) => {
              const ps = projects.filter((p) => m.projects.includes(p.slug));
              const ds = decisions.filter((d) => m.decisions.includes(d.id));
              const extra = timeline.filter((t) => orgWork[m.slug]?.some((x) => t.title.startsWith(x)));
              return (
                <li key={m.slug} id={m.slug} className="scroll-mt-20 grid gap-6 py-10 lg:grid-cols-[80px_1fr_1fr] lg:gap-10">
                  <p className="display text-[40px] leading-none text-ochre-2" aria-hidden>
                    {i + 1}
                  </p>
                  <div>
                    <h3 className="display text-[30px] leading-tight">{m.title}</h3>
                    <p className="pretty mt-3 text-[17px] leading-relaxed text-ivory">{m.question}</p>
                    <p className="pretty mt-2 text-[15.5px] leading-relaxed text-ivory-2">{m.why}</p>
                    <p className="mt-4 text-[15px] text-ivory-2">
                      <span className="stamp mr-2 text-ivory-2">○ Next</span>
                      {m.next.replace(/^Planned:\s*/, "Planned: ")}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <p className="note">Projects</p>
                      {ps.length || extra.length ? (
                        <ul className="mt-2 divide-y divide-ivory/10 border-y border-ivory/10">
                          {ps.map((p) => (
                            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
                              <Link href={`/work/${p.slug}/`} className="ink-link text-[15.5px] text-ivory">{p.title}</Link>
                              <Stamp status={p.status} />
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
                              <Link href={`/work/${d.project}/`} className="ink-link text-ivory-2">{d.title}</Link>
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
