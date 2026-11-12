import Link from "next/link";

export default function NotFound() {
  return (
    <div className="journal min-h-screen bg-[#11100E] text-ivory flex flex-col justify-between p-6 sm:p-12">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-6">
        <Link href="/" className="display text-[20px] font-medium tracking-tight text-ivory hover:text-[#F2A65A]">
          Ujwal Shyam Kantimohanthy
        </Link>
        <span className="font-mono text-xs text-[#F2A65A] uppercase tracking-widest">
          ICMP / HTTP 404 · Destination unreachable
        </span>
      </header>

      <main className="my-auto max-w-[680px] py-16">
        <p className="note text-[#F2A65A]">Hop failed · No route to host</p>
        <h1 className="display mt-3 text-[clamp(34px,5vw,54px)] font-light leading-tight text-ivory">
          Destination <em className="italic text-ivory-2">unreachable.</em>
        </h1>
        <p className="pretty mt-5 text-[16.5px] leading-relaxed text-ivory-2">
          Your packet reached an edge with no forwarding entry — either this route was retired or never published. Pick a valid hop below.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#F2EBDC] px-5 text-[#11100E] font-semibold hover:bg-[#F2A65A] transition-colors"
          >
            ← Return to Terrain Hero
          </Link>
          <Link
            href="/#work"
            className="inline-flex min-h-[44px] items-center rounded-full border border-ivory/25 px-5 text-ivory hover:border-teal transition-colors"
          >
            Selected Work
          </Link>
          <Link
            href="/atlas/"
            className="inline-flex min-h-[44px] items-center rounded-full border border-teal/40 px-5 text-teal hover:bg-teal/10 transition-colors"
          >
            DEVAN Atlas
          </Link>
          <Link
            href="/cv/"
            className="inline-flex min-h-[44px] items-center rounded-full border border-ivory/25 px-5 text-ivory hover:border-teal transition-colors"
          >
            View CV
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-[44px] items-center rounded-full border border-ivory/25 px-5 text-ivory hover:border-teal transition-colors"
          >
            Contact
          </Link>
        </div>
      </main>

      <footer className="border-t border-ivory/15 pt-6 font-mono text-xs text-ivory-3 flex flex-wrap justify-between gap-4">
        <span>kantimohanthy.dev</span>
        <span>Press ⌘K / Ctrl+K on the homepage or Atlas to search published records</span>
      </footer>
    </div>
  );
}
