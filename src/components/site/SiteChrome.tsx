import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import type { ReactNode } from "react";
import { person, LAST_REVIEWED, formatMonth, type Artifact, type Status } from "@/data/portfolio";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Research", href: "/#research" },
  { label: "CV", href: "/cv/" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:rounded focus:bg-ink-3 focus:px-3 focus:py-2 focus:text-ivory"
    >
      Skip to content
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-baseline gap-3">
          <span className="display text-[17px] font-medium leading-tight tracking-tight text-ivory sm:text-[19px]">
            {person.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="rounded px-3 py-2 text-[14.5px] text-ivory-2 transition-colors hover:text-ivory">
              {l.label}
            </a>
          ))}
          <Link
            href="/map/"
            className="ml-3 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 text-[14px] text-ivory-2 transition-colors hover:border-ochre hover:text-ivory"
          >
            <span aria-hidden className="text-ochre">◇</span> Explore the map
          </Link>
        </nav>

        <MobileMenu items={nav} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-10 text-[13.5px] text-ivory-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {person.name} · Content last reviewed {formatMonth(LAST_REVIEWED)}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/cv/" className="hover:text-ivory">CV</Link>
          <a href={`mailto:${person.email}`} className="hover:text-ivory">Email</a>
          <a href={person.linkedin} rel="noopener noreferrer" className="hover:text-ivory">LinkedIn</a>
          <a href={person.github} rel="noopener noreferrer" className="hover:text-ivory">GitHub</a>
          <Link href="/map/" className="hover:text-ivory">Map</Link>
          <Link href="/devan/" className="hover:text-ivory">DEVAN</Link>
        </div>
      </div>
    </footer>
  );
}

const stampTone: Record<Status, string> = {
  "In progress": "text-ochre-2",
  "Draft under review": "text-ochre-2",
  Submitted: "text-moss",
  Completed: "text-moss",
  "Early stage": "text-ivory-2",
  "Ongoing role": "text-ivory-2",
};
const stampGlyph: Record<Status, string> = {
  "In progress": "◐",
  "Draft under review": "◐",
  Submitted: "●",
  Completed: "●",
  "Early stage": "○",
  "Ongoing role": "◐",
};

/** Status shown as a word and a glyph, so it reads without colour. */
export function Stamp({ status }: { status: Status }) {
  return (
    <span className={`stamp ${stampTone[status]}`}>
      <span aria-hidden>{stampGlyph[status]}</span>
      {status}
    </span>
  );
}

export function ArtifactLink({ a }: { a: Artifact }) {
  const meta = [a.type, a.date ? formatMonth(a.date) : null, a.note].filter(Boolean).join(" · ");
  const inner = (
    <>
      <span className="block text-[15.5px] text-ivory group-hover:text-ochre-2">
        {a.label}
        {a.href && <span aria-hidden className="ml-1.5 text-ochre">{a.href.startsWith("http") ? "↗" : "→"}</span>}
      </span>
      <span className="note mt-0.5 block normal-case tracking-normal">{meta}</span>
    </>
  );
  if (!a.href) return <div className="py-2.5">{inner}</div>;
  const external = a.href.startsWith("http");
  return external ? (
    <a href={a.href} rel="noopener noreferrer" className="group block py-2.5">
      {inner}
    </a>
  ) : (
    <Link href={a.href} className="group block py-2.5">
      {inner}
    </Link>
  );
}

export function SectionHead({ id, n, label, title, children }: { id: string; n: string; label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
      <p className="note pt-3" id={`${id}-label`}>
        § {n} · {label}
      </p>
      <div>
        <h2 className="display text-[clamp(34px,5vw,60px)] font-normal leading-[1.02]">{title}</h2>
        {children && <div className="pretty mt-5 max-w-[640px] text-[17px] leading-relaxed text-ivory-2">{children}</div>}
      </div>
    </div>
  );
}

export function Figure({ n, caption, children, className = "" }: { n: string; caption: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`rounded-md border border-ivory/10 bg-ink-2/60 p-4 sm:p-5 ${className}`}>
      {children}
      <figcaption className="mt-3 border-t border-ivory/10 pt-3 text-[13px] leading-snug text-ivory-3">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-ivory-2">Fig. {n}</span> · {caption}
      </figcaption>
    </figure>
  );
}
