import Link from "next/link";
import type { ReactNode } from "react";
import { person, type LinkRef, type Status, type ListItem } from "@/data/portfolio";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Research", href: "/#research" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0b0d]/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 rounded focus-visible:outline-2 focus-visible:outline-blue">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-300/20 to-violet-400/20 font-mono text-[11px] font-bold text-cyan-200">
            {person.handle}
          </span>
          <span className="font-display text-[16px] font-semibold tracking-tight">{person.name}</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-[14px]">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded px-2.5 py-1.5 text-text-2 hover:text-text md:inline-block"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/devan/"
            className="ml-1 rounded-full border border-white/15 px-4 py-1.5 text-text-2 transition hover:border-cyan-300/60 hover:text-cyan-100"
          >
            Explore DEVAN
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-8 text-[13px] text-text-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {person.fullName} · Content updated {person.updated}
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${person.email}`} className="hover:text-text">Email</a>
          <a href={person.linkedin} className="hover:text-text" rel="noopener noreferrer">LinkedIn</a>
          <a href={person.github} className="hover:text-text" rel="noopener noreferrer">GitHub</a>
          <Link href="/devan/" className="hover:text-text">DEVAN</Link>
        </div>
      </div>
    </footer>
  );
}

const statusStyle: Record<Status, string> = {
  Ongoing: "border-blue/40 text-blue",
  "Early stage": "border-amber/40 text-amber",
  Shipped: "border-green/40 text-green",
  Completed: "border-green/40 text-green",
  Submitted: "border-border text-text-2",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[12px] font-medium ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

export function TextLink({ link }: { link: LinkRef }) {
  const cls =
    "inline-flex items-center gap-1 text-[14px] font-medium text-blue underline-offset-4 hover:underline";
  if (link.external) {
    return (
      <a href={link.href} className={cls} rel="noopener noreferrer">
        {link.label} <span aria-hidden>↗</span>
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label} <span aria-hidden>→</span>
    </Link>
  );
}

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-20 border-t border-border py-14 sm:py-16">
      <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-10">
        <div>
          <h2 id={`${id}-label`} className="font-mono text-[12px] uppercase tracking-[0.12em] text-text-2">
            {label}
          </h2>
          {title && <p className="mt-2 text-[15px] leading-snug text-text-2 md:max-w-[180px]">{title}</p>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function ItemList({ items }: { items: ListItem[] }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.title + item.context} className="py-5 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-[17px] font-semibold tracking-tight">{item.title}</h3>
            <div className="flex items-center gap-2 text-[13px] text-text-2">
              {item.period && <span>{item.period}</span>}
              {item.status && <StatusPill status={item.status} />}
            </div>
          </div>
          <p className="mt-0.5 text-[14px] text-text-2">{item.context}</p>
          <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-text/90">{item.body}</p>
          {item.links && item.links.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
              {item.links.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
