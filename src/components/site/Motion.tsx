"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

/** Fades and lifts children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Splits a heading into words that rise in one after another. */
export function SplitHeading({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Cycles through words in place. */
export function WordRotator({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);
  return (
    <span className="relative inline-grid align-bottom">
      {/* reserve width for the longest word */}
      <span className="invisible col-start-1 row-start-1">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 bg-gradient-to-r from-cyan-300 via-blue to-violet-400 bg-clip-text text-transparent"
          initial={{ y: "70%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Card with a light that follows the pointer and a gentle 3D tilt. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (!reduce) {
      const rx = ((y / r.height) - 0.5) * -4;
      const ry = ((x / r.width) - 0.5) * 6;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

/** Thin progress bar along the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-blue to-violet-400"
    />
  );
}

/** Link that leans toward the pointer. */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}

/** Replays a recorded terminal session line by line once visible. */
export function TraceReplay({ command, lines }: { command: string; lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? command : "");
  const [shown, setShown] = useState(reduce ? lines.length : 0);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!started || reduce) return;
    let cancelled = false;
    setTyped("");
    setShown(0);
    (async () => {
      for (let i = 1; i <= command.length; i++) {
        if (cancelled) return;
        setTyped(command.slice(0, i));
        await new Promise((r) => setTimeout(r, 38));
      }
      await new Promise((r) => setTimeout(r, 350));
      for (let i = 1; i <= lines.length; i++) {
        if (cancelled) return;
        setShown(i);
        await new Promise((r) => setTimeout(r, lines[i - 1] === "" ? 120 : lines[i - 1].startsWith(";;") ? 420 : 160));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [started, run, command, lines, reduce]);

  const done = shown >= lines.length;
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-[#07080a]/90 shadow-[0_40px_120px_-40px_rgba(103,232,249,0.35)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[12px] text-text-2">ujwal@lab: ~</span>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          disabled={!done}
          className="ml-auto rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-text-2 transition hover:border-cyan-300/50 hover:text-cyan-200 disabled:opacity-40"
        >
          {done ? "Replay ↻" : "Running…"}
        </button>
      </div>
      <pre className="min-h-[360px] overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        <code>
          <span className="text-green">$ </span>
          <span className="text-text">{typed}</span>
          {!done && shown === 0 && <span className="caret">▍</span>}
          {"\n"}
          {lines.slice(0, shown).map((l, i) => (
            <span
              key={i}
              className={
                l.startsWith(";;")
                  ? "block text-text-2/70"
                  : l.includes(" IN A ")
                    ? "block text-green"
                    : "block text-cyan-200/90"
              }
            >
              {l || " "}
            </span>
          ))}
          {!done && shown > 0 && <span className="caret">▍</span>}
        </code>
      </pre>
    </div>
  );
}
