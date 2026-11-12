"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ShowEvidenceToggle } from "@/components/routed/EvidenceModeProvider";

/** Native <details> menu (works cleanly without JS); closes on Escape or choice. */
export function MobileMenu({
  items,
  onOpenSearch,
}: {
  items: { label: string; href: string }[];
  onOpenSearch?: () => void;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  const close = () => ref.current?.removeAttribute("open");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.hasAttribute("open")) {
        e.preventDefault();
        close();
        summaryRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details ref={ref} className="group relative lg:hidden">
      <summary
        ref={summaryRef}
        className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 rounded-full border border-ivory/25 bg-[#181613] px-4 font-mono text-[13px] text-ivory [&::-webkit-details-marker]:hidden"
      >
        Menu <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(82vw,300px)] rounded-xl border border-ivory/20 bg-[#181613] p-3 shadow-2xl space-y-1">
        {items.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            className="flex min-h-[44px] items-center rounded px-3 text-[15.5px] text-ivory hover:bg-[#211E1A]"
          >
            {l.label}
          </a>
        ))}
        <Link
          href="/atlas/"
          onClick={close}
          className="flex min-h-[44px] items-center justify-between rounded border-t border-ivory/10 px-3 pt-2 text-[15px] text-teal hover:bg-[#211E1A]"
        >
          <span>Explore DEVAN Atlas</span>
          <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/cv/"
          onClick={close}
          className="flex min-h-[44px] items-center rounded px-3 text-[15px] text-ivory-2 hover:bg-[#211E1A]"
        >
          Curriculum Vitae (CV)
        </Link>
        <div className="pt-2 border-t border-ivory/10 space-y-2">
          <ShowEvidenceToggle compact />
          {onOpenSearch && (
            <button
              type="button"
              onClick={() => {
                close();
                onOpenSearch();
              }}
              className="flex min-h-[44px] w-full items-center justify-between rounded-full border border-ivory/20 px-4 font-mono text-[12px] text-ivory-2 hover:border-teal"
            >
              <span>Search records</span>
              <span>⌘K</span>
            </button>
          )}
        </div>
      </div>
    </details>
  );
}
