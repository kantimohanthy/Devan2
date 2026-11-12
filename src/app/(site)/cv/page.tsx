import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/cv/PrintButton";
import {
  person,
  projects,
  timeline,
  LAST_REVIEWED,
  formatMonth,
} from "@/content";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Curriculum Vitae for Ujwal Shyam Kantimohanthy — Engineering student building reliable web systems, evidence-grounded AI tools and network experiments.",
  alternates: { canonical: "https://kantimohanthy.dev/cv/" },
  openGraph: {
    title: "Curriculum Vitae · Ujwal Shyam Kantimohanthy",
    description:
      "Education, verified engineering work, ongoing research, and checked repositories for Ujwal Shyam Kantimohanthy.",
    url: "https://kantimohanthy.dev/cv/",
    images: [{ url: "/og/cv.svg", width: 1200, height: 630 }],
  },
};

export default function CVPage() {
  const workRoles = timeline.filter((t) => t.kind === "Work" || t.kind === "Research");
  const leadershipRoles = timeline.filter((t) => t.kind === "Leadership" || t.kind === "Talk");

  return (
    <div className="journal min-h-screen bg-[#11100E] text-ivory antialiased print:bg-white print:text-black">
      {/* Screen Toolbar */}
      <header className="border-b border-ivory/15 bg-[#181613]/90 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex h-16 max-w-[900px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-[14px] text-ivory-2 transition-colors hover:text-[#F2A65A]"
          >
            <span aria-hidden>←</span> Back to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex min-h-[40px] items-center rounded-full border border-ivory/25 px-4 text-[13px] text-ivory-2 hover:border-teal hover:text-ivory"
            >
              Contact
            </Link>
            <PrintButton />
          </div>
        </div>
      </header>

      {/* Printable Resume Sheet — derived strictly from src/content */}
      <main id="main" className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 print:max-w-none print:px-0 print:py-2">
        {/* Header */}
        <div className="border-b border-ivory/20 pb-7 print:border-black/25 print:pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="display surname-safe text-[clamp(2rem,4.5vw,2.6rem)] font-light leading-tight text-ivory print:text-[24pt] print:text-black">
                {person.firstAndMiddle.split(" ")[0]}{" "}
                <span className="font-normal italic text-[#F2A65A] print:text-black">
                  {person.firstAndMiddle.split(" ")[1]}
                </span>{" "}
                {person.surname}
              </h1>
              <p className="mt-1.5 font-mono text-[14px] text-ivory-2 print:text-[10.5pt] print:text-black/80">
                {person.positioning}
              </p>
            </div>
            <div className="font-mono text-[12.5px] text-ivory-3 print:text-[9pt] print:text-black/65">
              <p>{person.location}</p>
              <p className="mt-0.5">Reviewed: {formatMonth(LAST_REVIEWED)}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-teal print:text-[9.5pt] print:text-black">
            <a href={`mailto:${person.email}`} className="hover:underline">
              {person.email}
            </a>
            <a href={person.linkedin} rel="noopener noreferrer" target="_blank" className="hover:underline">
              linkedin.com/in/ujwalshyam-kantimohanthy
            </a>
            <a href={person.github} rel="noopener noreferrer" target="_blank" className="hover:underline">
              github.com/kantimohanthy
            </a>
            <Link href="/" className="hover:underline print:hidden">
              kantimohanthy.dev
            </Link>
          </div>
        </div>

        {/* Education */}
        <section className="mt-7 border-b border-ivory/15 pb-7 print:mt-4 print:border-black/20 print:pb-3">
          <h2 className="note text-[#F2A65A] print:text-black font-bold">Education</h2>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-[16.5px] font-semibold text-ivory print:text-[11pt] print:text-black">
                BSc in Engineering Sciences — University of Rome Tor Vergata
              </h3>
              <p className="mt-1 text-[14.5px] text-ivory-2 print:text-[9.5pt] print:text-black">
                Undergraduate student focusing on networking, systems engineering, and computer science foundations. Bachelor thesis (in progress): wireless mesh networks and TV White Space spectrum for rural and obstructed terrain.
              </p>
            </div>
            <span className="font-mono text-[12.5px] text-ivory-3 print:text-[9pt] print:text-black/70">
              2022 – exp. 2027
            </span>
          </div>
        </section>

        {/* Engineering Experience & Research */}
        <section className="mt-7 border-b border-ivory/15 pb-7 print:mt-4 print:border-black/20 print:pb-3">
          <h2 className="note text-[#F2A65A] print:text-black font-bold">Experience &amp; Research</h2>
          <div className="mt-4 space-y-5 print:space-y-3">
            {workRoles.map((role) => (
              <div key={role.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15.5px] font-semibold text-ivory print:text-[10.5pt] print:text-black">
                    {role.title} · {role.org}
                  </h3>
                  <span className="font-mono text-[12.5px] text-ivory-3 print:text-[9pt] print:text-black/70">
                    {role.date}
                  </span>
                </div>
                <p className="mt-1 text-[14.5px] leading-relaxed text-ivory-2 print:text-[9.5pt] print:text-black">
                  {role.body}
                </p>
              </div>
            ))}

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[15.5px] font-semibold text-ivory print:text-[10.5pt] print:text-black">
                  Arylax Labs · Independent Lab Umbrella
                </h3>
                <span className="font-mono text-[12.5px] text-ivory-3 print:text-[9pt] print:text-black/70">
                  Self-initiated
                </span>
              </div>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ivory-2 print:text-[9.5pt] print:text-black">
                Umbrella identity grouping independent protocol observability and verification work (including DEVAN and the RFC 1035 iterative DNS trace).
              </p>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mt-7 border-b border-ivory/15 pb-7 print:mt-4 print:border-black/20 print:pb-3">
          <h2 className="note text-[#F2A65A] print:text-black font-bold">Selected Technical Projects</h2>
          <div className="mt-4 space-y-4 print:space-y-2.5">
            {projects.map((p) => (
              <div key={p.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15.5px] font-semibold text-ivory print:text-[10.5pt] print:text-black">
                    {p.title} <span className="font-normal text-ivory-3 print:text-black/70">— {p.kicker}</span>
                  </h3>
                  <span className="font-mono text-[11.5px] text-teal print:text-[8.5pt] print:text-black">
                    {p.statusLabel}
                  </span>
                </div>
                <p className="mt-1 text-[14.5px] leading-relaxed text-ivory-2 print:text-[9.5pt] print:text-black">
                  {p.contributionOneLiner}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership & Speaking */}
        <section className="mt-7 pb-4 print:mt-4">
          <h2 className="note text-[#F2A65A] print:text-black font-bold">Leadership &amp; Presentations</h2>
          <ul className="mt-3 space-y-2 text-[14.5px] text-ivory-2 print:text-[9.5pt] print:text-black">
            {leadershipRoles.map((l) => (
              <li key={l.id}>
                <strong className="text-ivory print:text-black">{l.title}</strong> ({l.org}, {l.date}) — {l.body}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
