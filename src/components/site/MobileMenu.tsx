"use client";

import Link from "next/link";
import { useRef } from "react";

/** Native <details> menu (works without JS); closes itself after a choice when JS is on. */
export function MobileMenu({ items }: { items: { label: string; href: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");
  return (
    <details ref={ref} className="group relative md:hidden">
      <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-ivory/20 px-4 text-[14px] text-ivory [&::-webkit-details-marker]:hidden">
        Menu <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+8px)] w-[min(78vw,280px)] rounded-lg border border-ivory/15 bg-ink-2 p-2 shadow-2xl">
        {items.map((l) => (
          <a key={l.href} href={l.href} onClick={close} className="block rounded px-3 py-3 text-[16px] text-ivory hover:bg-ink-3">
            {l.label}
          </a>
        ))}
        <Link href="/map/" onClick={close} className="mt-1 block rounded border-t border-ivory/10 px-3 py-3 text-[16px] text-ochre-2 hover:bg-ink-3">
          ◇ Explore the map
        </Link>
      </div>
    </details>
  );
}
