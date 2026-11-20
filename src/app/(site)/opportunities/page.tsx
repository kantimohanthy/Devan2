import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter, SkipLink } from "@/components/site/SiteChrome";
import { opportunities, formatDeadline, OPPORTUNITIES_REVIEWED } from "@/content/opportunities";

export const metadata: Metadata = {
  title: "Opportunity radar",
  description:
    "Programmes, internships and research placements Ujwal Shyam Kantimohanthy is tracking for 2027, with deadlines and official links.",
  alternates: { canonical: "https://kantimohanthy.dev/opportunities/" },
};

const sorted = [...opportunities].sort((a, b) => {
  if (a.deadline === "rolling") return 1;
  if (b.deadline === "rolling") return -1;
  return a.deadline.localeCompare(b.deadline);
});

export default function OpportunitiesPage() {
  return (
    <div className="journal min-h-screen">
      <SkipLink />
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1200px] px-4 pb-20 pt-10 sm:px-8 sm:pt-14">
        <div className="max-w-[720px]">
          <p className="note">Opportunity radar · reviewed {OPPORTUNITIES_REVIEWED}</p>
          <h1 className="display mt-4 text-[clamp(2.1rem,5.5vw,4rem)] font-light leading-[1.02]">
            What I&apos;m watching <em className="italic text-[#F2A65A]">for 2027.</em>
          </h1>
          <p className="pretty mt-5 text-[16.5px] leading-relaxed text-ivory-2">
            Programmes and research placements I&apos;m tracking, sorted by deadline. Each eligibility note is a fact about the
            programme, not a judgement of fit. Always check the official posting before applying.
          </p>
        </div>

        <ol className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
          {sorted.map((o) => (
            <li key={o.id} id={o.id} className="scroll-mt-20 grid gap-4 py-8 lg:grid-cols-[170px_1fr_260px] lg:gap-10">
              <div>
                <p className="display text-[26px] leading-none text-[#F2A65A]">{formatDeadline(o.deadline)}</p>
                <p className="note mt-2">{o.deadline === "rolling" ? "rolling basis" : "deadline"}</p>
              </div>
              <div>
                <p className="note">{o.org} · {o.field}</p>
                <h2 className="display mt-1 text-[26px] leading-tight text-ivory">{o.programme}</h2>
                <p className="pretty mt-3 text-[16px] leading-relaxed text-ivory-2">{o.focus}</p>
                {o.deadlineNote && <p className="mt-2 text-[14.5px] text-ivory-3">Note: {o.deadlineNote}</p>}
              </div>
              <div className="space-y-3 text-[14.5px]">
                <p className="text-ivory-2">{o.length}</p>
                <p className="text-ivory-3">{o.eligibilityNote}</p>
                <a href={o.url} target="_blank" rel="noopener noreferrer" className="ink-link inline-flex min-h-[36px] items-center font-mono text-[13px]">
                  Official listing ↗
                </a>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-[15px] text-ivory-3">
          <Link href="/" className="ink-link">← Back to the portfolio</Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
