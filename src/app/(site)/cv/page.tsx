import type { Metadata } from "next";
import Link from "next/link";
import { person, LAST_REVIEWED, formatMonth } from "@/data/portfolio";
import { PrintButton } from "@/components/cv/PrintButton";

export const metadata: Metadata = {
  title: "Curriculum Vitae · Ujwal Shyam Kantimohanthy",
  description:
    "Curriculum Vitae for Ujwal Shyam Kantimohanthy (UJ) — Software & AI Engineer. Verified experience, education, thesis research, and technical competencies.",
};

export default function CvPage() {
  return (
    <div className="journal min-h-screen bg-ink text-ivory antialiased print:bg-white print:text-black">
      {/* Screen-only top action bar */}
      <header className="border-b border-ivory/10 bg-ink-2/80 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex h-16 max-w-[900px] items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] text-ivory-2 transition-colors hover:text-ochre-2"
          >
            <span aria-hidden>←</span> Back to Portfolio
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="rounded-full border border-ivory/20 px-4 py-1.5 text-[13px] text-ivory-2 transition-colors hover:border-ochre hover:text-ivory"
            >
              Contact
            </Link>
            <PrintButton />
          </div>
        </div>
      </header>

      {/* Main CV Document Container */}
      <main className="mx-auto max-w-[900px] px-6 py-12 print:max-w-none print:px-0 print:py-4">
        {/* Header Block */}
        <div className="border-b border-ivory/15 pb-8 print:border-black/20 print:pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="display text-[38px] font-light leading-tight tracking-tight text-ivory print:text-[28pt] print:text-black">
                Ujwal <span className="font-normal italic text-ochre-2 print:text-black">Shyam</span> Kantimohanthy
              </h1>
              <p className="mt-1 text-[16px] text-ivory-2 print:text-[12pt] print:text-black/80 font-mono">
                Software &amp; AI Engineer · Systems &amp; Internet Protocols
              </p>
            </div>
            <div className="text-right text-[13px] text-ivory-3 font-mono print:text-[9pt] print:text-black/60">
              <p>Rome, Italy · Paris, France</p>
              <p className="mt-0.5">Reviewed: {formatMonth(LAST_REVIEWED)}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-mono text-ivory-2 print:text-[9.5pt] print:text-black">
            <a href={`mailto:${person.email}`} className="hover:text-ochre-2 print:underline">
              {person.email}
            </a>
            <a href={person.linkedin} rel="noopener noreferrer" className="hover:text-ochre-2 print:underline">
              linkedin.com/in/ujwalshyam-kantimohanthy
            </a>
            <a href={person.github} rel="noopener noreferrer" className="hover:text-ochre-2 print:underline">
              github.com/kantimohanthy
            </a>
            <a href="https://kantimohanthy.dev" className="hover:text-ochre-2 print:underline">
              kantimohanthy.dev
            </a>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-ivory print:text-[10pt] print:text-black">
            {person.positioning} Focus on robust backend services, foundation model integration pipelines, reliable networking layers (DNS/TCP), and verifiable evidence systems.
          </p>
        </div>

        {/* Section: Education */}
        <section className="mt-8 border-b border-ivory/15 pb-8 print:mt-6 print:border-black/20 print:pb-4">
          <h2 className="display text-[20px] font-medium tracking-tight text-ochre-2 print:text-[13pt] print:text-black uppercase">
            Education
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[16px] font-semibold text-ivory print:text-[11pt] print:text-black">
                  University of Rome Tor Vergata
                </h3>
                <span className="font-mono text-[13px] text-ivory-3 print:text-[9.5pt] print:text-black/70">
                  Rome, Italy · Expected 2027
                </span>
              </div>
              <p className="text-[14.5px] italic text-ivory-2 print:text-[10pt] print:text-black/80">
                BSc in Engineering Sciences (Undergraduate Engineering Student · ICT &amp; Internet Engineering Focus)
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ivory-3 print:text-[9pt] print:text-black/70">
                <strong className="text-ivory-2 print:text-black">Core Coursework:</strong> Computer Networking (RFC 793/1035, routing protocols, POSIX sockets), Distributed Systems, Signal Processing, Linear Algebra, Information Systems, Operating Systems.
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ivory-3 print:text-[9pt] print:text-black/70">
                <strong className="text-ivory-2 print:text-black">Undergraduate Thesis:</strong> <em>Wireless Mesh Networks + TV White Space for Rural Connectivity</em> (Advisor-reviewed draft; reactive AODV simulation across occluded mountain terrain).
              </p>
            </div>
          </div>
        </section>

        {/* Section: Experience */}
        <section className="mt-8 border-b border-ivory/15 pb-8 print:mt-6 print:border-black/20 print:pb-4">
          <h2 className="display text-[20px] font-medium tracking-tight text-ochre-2 print:text-[13pt] print:text-black uppercase">
            Professional &amp; Fellowship Experience
          </h2>

          <div className="mt-6 space-y-6 print:space-y-4">
            {/* Zidio Development */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[16px] font-semibold text-ivory print:text-[11pt] print:text-black">
                  Zidio Development · Web Development Intern
                </h3>
                <span className="font-mono text-[13px] text-ivory-3 print:text-[9.5pt] print:text-black/70">
                  May 2024 – Present (Internship)
                </span>
              </div>
              <p className="text-[14px] text-ochre-2 print:text-[9.5pt] print:text-black/80 font-mono">
                Project LOOP (Continuous Team Feedback &amp; Evaluation Platform)
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-[14px] leading-relaxed text-ivory-2 print:text-[9.5pt] print:text-black">
                <li>
                  Engineered <strong>Project LOOP</strong>, an internal feedback platform designed to reduce review latency and eliminate multi-tool context switching for distributed engineering teams.
                </li>
                <li>
                  Architected role-scoped data access and audit trail models using PostgreSQL, Prisma ORM, and Next.js server components with deterministic schema migrations.
                </li>
                <li>
                  Integrated real-time response ingestion and automated sprint feedback summaries, establishing repeatable regression suites with Vitest.
                </li>
              </ul>
            </div>

            {/* UNIVERSEH */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[16px] font-semibold text-ivory print:text-[11pt] print:text-black">
                  UNIVERSEH (European Space University Consortium) · Student Fellow
                </h3>
                <span className="font-mono text-[13px] text-ivory-3 print:text-[9.5pt] print:text-black/70">
                  2024 – Present
                </span>
              </div>
              <p className="text-[14px] text-ochre-2 print:text-[9.5pt] print:text-black/80 font-mono">
                Space Technology, Earth Observation &amp; Ecosystem Ontology Research
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-[14px] leading-relaxed text-ivory-2 print:text-[9.5pt] print:text-black">
                <li>
                  Selected for the European space education alliance across eight universities to explore satellite communications, data standards, and cross-border research pipelines.
                </li>
                <li>
                  Designed the domain ontology for <strong>CosmoHub</strong>, modeling entities, orbital missions, and research opportunities across international space organizations.
                </li>
              </ul>
            </div>

            {/* Arylax Labs */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[16px] font-semibold text-ivory print:text-[11pt] print:text-black">
                  Arylax Labs · Systems &amp; Applied AI Research
                </h3>
                <span className="font-mono text-[13px] text-ivory-3 print:text-[9.5pt] print:text-black/70">
                  Independent Research Lab
                </span>
              </div>
              <p className="text-[14px] text-ochre-2 print:text-[9.5pt] print:text-black/80 font-mono">
                Autonomous Agents, Network Observability &amp; Verification
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-[14px] leading-relaxed text-ivory-2 print:text-[9.5pt] print:text-black">
                <li>
                  Built <strong>Sentinel AI</strong>, an adversarial multi-agent incident triage system evaluating incident event logs using IBM Granite foundation models.
                </li>
                <li>
                  Developed protocol observability cockpits capturing raw packet PCAP traces and POSIX socket lifecycles for RFC 1035 (DNS) and RFC 9293 (TCP).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Technical Projects */}
        <section className="mt-8 border-b border-ivory/15 pb-8 print:mt-6 print:border-black/20 print:pb-4">
          <h2 className="display text-[20px] font-medium tracking-tight text-ochre-2 print:text-[13pt] print:text-black uppercase">
            Engineering Projects &amp; Systems
          </h2>

          <div className="mt-6 space-y-5 print:space-y-4">
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[15.5px] font-semibold text-ivory print:text-[10.5pt] print:text-black">
                  DASER-Net: Dual Attention Residual Retinal Vessel Segmentation
                </h3>
                <span className="font-mono text-[12.5px] text-ochre-2 print:text-[9pt] print:text-black/70">
                  PyTorch · Computer Vision · DRIVE Dataset
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ivory-2 print:text-[9pt] print:text-black">
                Deep learning segmentation pipeline combining spatial and channel attention mechanisms with residual blocks. Mitigates low-contrast capillary vanishing gradients on fundus images, achieving verified 0.978 AUC and 0.954 accuracy.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[15.5px] font-semibold text-ivory print:text-[10.5pt] print:text-black">
                  CineForge AI Pro: Bilingual Preproduction Pipeline
                </h3>
                <span className="font-mono text-[12.5px] text-ochre-2 print:text-[9pt] print:text-black/70">
                  FastAPI · Hugging Face · IBM watsonx / Granite · IBM AI Challenge
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ivory-2 print:text-[9pt] print:text-black">
                Bilingual script breakdown and storyboard generation pipeline with pluggable LLM provider abstractions, isolating upstream vendor breaking changes without stalling the generation engine.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h3 className="text-[15.5px] font-semibold text-ivory print:text-[10.5pt] print:text-black">
                  DEVAN OS: Verifiable Engineering Portfolio &amp; Evidence Engine
                </h3>
                <span className="font-mono text-[12.5px] text-ochre-2 print:text-[9pt] print:text-black/70">
                  Next.js 15 · TypeScript · Tailwind CSS · Ajv JSON Schema · Vitest
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ivory-2 print:text-[9pt] print:text-black">
                Personal cognitive engineering environment mapping technical concepts to raw packet captures, source repos, and architectural trade-off logs. Replaces unverified skill bars with derived state proofs.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Skills & Competencies */}
        <section className="mt-8 print:mt-6">
          <h2 className="display text-[20px] font-medium tracking-tight text-ochre-2 print:text-[13pt] print:text-black uppercase">
            Technical Competencies
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 print:grid-cols-2 text-[13.5px] print:text-[9pt]">
            <div className="rounded border border-ivory/10 p-3.5 print:border-black/20 print:p-2">
              <h3 className="font-mono text-[12px] uppercase text-ochre-2 print:text-black font-bold">Languages &amp; Runtimes</h3>
              <p className="mt-1 text-ivory-2 print:text-black">
                TypeScript, JavaScript (ESNext), Python 3, SQL (PostgreSQL), C/C++ (Foundations), MATLAB, Bash / Shell.
              </p>
            </div>

            <div className="rounded border border-ivory/10 p-3.5 print:border-black/20 print:p-2">
              <h3 className="font-mono text-[12px] uppercase text-ochre-2 print:text-black font-bold">Backend &amp; Infrastructure</h3>
              <p className="mt-1 text-ivory-2 print:text-black">
                Node.js, Next.js (App Router), FastAPI, PostgreSQL, Prisma ORM, Docker, Linux/Unix administration, Git CI/CD.
              </p>
            </div>

            <div className="rounded border border-ivory/10 p-3.5 print:border-black/20 print:p-2">
              <h3 className="font-mono text-[12px] uppercase text-ochre-2 print:text-black font-bold">Networking &amp; Observability</h3>
              <p className="mt-1 text-ivory-2 print:text-black">
                DNS (RFC 1035), TCP/IP (RFC 793), UDP, POSIX socket lifecycle, Wireshark/tshark packet dissection, AODV routing, RF propagation.
              </p>
            </div>

            <div className="rounded border border-ivory/10 p-3.5 print:border-black/20 print:p-2">
              <h3 className="font-mono text-[12px] uppercase text-ochre-2 print:text-black font-bold">AI Systems &amp; Verification</h3>
              <p className="mt-1 text-ivory-2 print:text-black">
                PyTorch, Computer Vision (Attention UNets), Foundation Model APIs (Hugging Face, IBM watsonx), Ajv Schema Validation, Vitest.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
