"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Item = { src: string; alt: string };

const ViewerContext = createContext<{
  open: (item: Item) => void;
}>({ open: () => {} });

/** Slow vertical drift tied to scroll. Content is always visible, with or without JavaScript. */
export function Parallax({ children, strength = 28, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Click or press Enter on a photo to see it larger. */
export function Zoomable({ src, alt, children }: Item & { children: React.ReactNode }) {
  const { open } = useContext(ViewerContext);
  return (
    <button
      type="button"
      onClick={() => open({ src, alt })}
      aria-label={`View larger: ${alt}`}
      className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A65A]"
    >
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        View larger
      </span>
    </button>
  );
}

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<Item | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((i: Item) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setItem(i);
  }, []);
  const close = useCallback(() => {
    setItem(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, close]);

  return (
    <ViewerContext.Provider value={{ open }}>
      {children}
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-ivory/30 bg-black/60 font-mono text-[13px] text-ivory hover:border-[#F2A65A] focus-visible:outline-2 focus-visible:outline-[#F2A65A]"
          >
            Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt} className="max-h-full max-w-full rounded-md object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </ViewerContext.Provider>
  );
}

/** Plays muted when on screen, pauses when off screen. Stays paused for reduced motion. */
export function AutoVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);
  return (
    <video ref={ref} controls muted loop playsInline preload="none" poster={poster} aria-label={label} className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
