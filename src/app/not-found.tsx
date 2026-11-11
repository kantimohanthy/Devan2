import Link from "next/link";

export default function NotFound() {
  return (
    <div className="journal min-h-screen bg-ink text-ivory flex flex-col justify-between p-6 sm:p-12">
      <header className="flex items-center justify-between border-b border-ivory/10 pb-6">
        <Link href="/" className="display text-[20px] font-medium tracking-tight text-ivory hover:text-ochre-2">
          Ujwal Shyam Kantimohanthy
        </Link>
        <span className="font-mono text-xs text-ochre-2 uppercase tracking-widest">
          HTTP 404 · Not Found
        </span>
      </header>

      <main className="my-auto max-w-[680px] py-16">
        <p className="note text-ochre-2 font-mono">Entity Unreachable</p>
        <h1 className="display mt-3 text-[clamp(36px,5vw,56px)] font-light leading-tight">
          This artifact or route <em className="italic text-ivory-2">could not be resolved.</em>
        </h1>
        <p className="pretty mt-6 text-[16.5px] leading-relaxed text-ivory-2">
          The requested path does not match any published case study, concept node, or verified repository artifact in this build.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full bg-ivory px-5 text-ink font-semibold hover:bg-ochre-2 transition-colors"
          >
            ← Return to Homepage
          </Link>
          <Link
            href="/cv/"
            className="inline-flex min-h-11 items-center rounded-full border border-ivory/20 px-5 text-ivory hover:border-ochre transition-colors"
          >
            View CV
          </Link>
          <Link
            href="/knowledge/networking.tcp/"
            className="inline-flex min-h-11 items-center rounded-full border border-ivory/20 px-5 text-ivory hover:border-ochre transition-colors"
          >
            DEVAN Workspace
          </Link>
          <Link
            href="/reasoning/"
            className="inline-flex min-h-11 items-center rounded-full border border-ivory/20 px-5 text-ivory hover:border-ochre transition-colors"
          >
            Decision Log
          </Link>
        </div>
      </main>

      <footer className="border-t border-ivory/10 pt-6 font-mono text-xs text-ivory-3 flex flex-wrap justify-between gap-4">
        <span>kantimohanthy.dev</span>
        <span>Use ⌘K in DEVAN to search the knowledge graph</span>
      </footer>
    </div>
  );
}
