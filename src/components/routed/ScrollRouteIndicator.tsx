"use client";

import React, { useEffect, useState } from "react";
import { routeSections } from "@/content";

/**
 * Quiet section-routing breadcrumb & minimal packet indicator along page scroll.
 * Computed deterministically over authored section nodes; uses native IntersectionObserver
 * with zero scroll-jacking and static completeness for reduced-motion users.
 */
export function ScrollRouteIndicator() {
  const [activeId, setActiveId] = useState<string>(routeSections[0].id);

  useEffect(() => {
    const targets = routeSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = routeSections.find((s) => s.id === activeId) ?? routeSections[0];

  return (
    <aside
      aria-label="Route position across page sections"
      className="fixed bottom-4 right-4 z-30 hidden lg:block rounded-full border border-ivory/20 bg-[#181613]/95 px-3.5 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.5)] backdrop-blur-sm print:hidden"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ivory-2">
          hop {current.hop} / {routeSections.length} · <strong className="text-[#F2A65A] font-medium">{current.label}</strong>
        </span>
        <nav aria-label="Jump to section hop" className="flex items-center gap-1.5 border-l border-ivory/15 pl-3">
          {routeSections.map((s) => {
            const isCurrent = s.id === activeId;
            return (
              <a
                key={s.id}
                href={s.href}
                aria-label={`Jump to hop ${s.hop}: ${s.label}`}
                aria-current={isCurrent ? "location" : undefined}
                className="group relative flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
              >
                <span
                  className={`block rounded-full transition-all ${
                    isCurrent
                      ? "h-2.5 w-2.5 bg-[#E8923A] ring-4 ring-[#E8923A]/20"
                      : s.hop < current.hop
                      ? "h-1.5 w-1.5 bg-[#7AC4CC]"
                      : "h-1.5 w-1.5 bg-ivory-3/50 group-hover:bg-ivory"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
