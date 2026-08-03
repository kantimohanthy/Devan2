"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DISCIPLINES = [
  "Engineering",
  "Infrastructure",
  "Artificial Intelligence",
  "Networking",
  "Space",
  "Systems",
];

export function Landing() {
  const reducedMotion = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 60, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
        }}
      />
      <motion.div
        style={reducedMotion ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className="relative mx-auto w-full max-w-6xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent"
        >
          Ujwal Shyam Kantimohanthy — Internet Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="text-balance text-6xl font-semibold tracking-tight text-text-primary sm:text-7xl lg:text-8xl"
        >
          DEVAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          className="mt-5 max-w-xl text-balance text-lg italic leading-relaxed text-text-secondary sm:text-xl"
        >
          The Eye of UJ.
        </motion.p>

        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
          {DISCIPLINES.map((word, i) => (
            <motion.li
              key={word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 + i * 0.08 }}
              className="text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary"
            >
              {word}
              {i < DISCIPLINES.length - 1 && <span className="ml-5 text-border-strong">/</span>}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
          className="mt-12"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("field:pulse"))}
            className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary transition-colors duration-300 hover:text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 group-hover:opacity-90" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Scroll, or wake the field
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
