"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { person, LAST_REVIEWED, formatMonth, githubSnapshot } from "@/content";
import { MobileMenu } from "./MobileMenu";
import { ShowEvidenceToggle } from "@/components/routed/EvidenceModeProvider";
import { SiteSearchButton, SiteSearchModal } from "@/components/routed/SiteSearchPalette";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Research", href: "/#research" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:rounded focus:bg-[#211E1A] focus:border focus:border-[#F2A65A] focus:px-4 focus:py-2.5 focus:text-ivory"
    >
      Skip to content
    </a>
  );
}

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ivory/15 bg-[#11100E]/92 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-3 px-4 py-2 sm:px-8">
          <Link href="/" className="group inline-flex min-h-[44px] min-w-0 items-center gap-2.5">
            <span className="display text-[17px] font-medium leading-tight tracking-tight text-ivory sm:text-[18.5px] truncate">
              {person.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex min-h-[44px] items-center rounded px-3 text-[14.5px] text-ivory-2 transition-colors hover:text-ivory"
              >
                {l.label}
              </a>
            ))}
            <div className="ml-2 flex items-center gap-2 border-l border-ivory/15 pl-3">
              <Link
                href="/atlas/"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-teal/45 px-3.5 font-mono text-[12px] text-teal transition-colors hover:bg-teal/10"
              >
                <span aria-hidden>◇</span> Explore DEVAN
              </Link>
              <ShowEvidenceToggle />
              <SiteSearchButton onOpen={() => setSearchOpen(true)} />
            </div>
          </nav>

          <MobileMenu items={nav} onOpenSearch={() => setSearchOpen(true)} />
        </div>
      </header>
      <SiteSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function SiteFooter() {
  const syncDate = githubSnapshot.syncedAt ? githubSnapshot.syncedAt.slice(0, 10) : LAST_REVIEWED;
  return (
    <footer className="border-t border-ivory/15 bg-[#11100E] print:hidden">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-10 text-[13.5px] text-ivory-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-ivory-2">
            {person.name} · Reviewed {formatMonth(LAST_REVIEWED)}
          </p>
          <p className="mt-1 font-mono text-[11.5px] text-ivory-3">
            GitHub build sync: {syncDate} ({githubSnapshot.source})
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12.5px]">
          <Link href="/cv/" className="ink-link inline-flex min-h-[36px] items-center">CV</Link>
          <a href={`mailto:${person.email}`} className="ink-link inline-flex min-h-[36px] items-center">Email</a>
          <a href={person.linkedin} rel="noopener noreferrer" target="_blank" className="ink-link inline-flex min-h-[36px] items-center">LinkedIn ↗</a>
          <a href={person.github} rel="noopener noreferrer" target="_blank" className="ink-link inline-flex min-h-[36px] items-center">GitHub ↗</a>
          <Link href="/atlas/" className="ink-link inline-flex min-h-[36px] items-center">DEVAN Atlas</Link>
          <Link href="/evidence/" className="ink-link inline-flex min-h-[36px] items-center">Ledger</Link>
        </div>
      </div>
    </footer>
  );
}

export function SectionHead({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
      <p className="note pt-2 text-[#F2A65A]" id={`${id}-label`}>
        hop {n} · {label}
      </p>
      <div>
        <h2 className="display text-[clamp(30px,4.6vw,52px)] font-normal leading-[1.04] text-ivory">
          {title}
        </h2>
        {children && (
          <div className="pretty mt-4 max-w-[660px] text-[16.5px] leading-relaxed text-ivory-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
