"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Each section gets its own small reveal signature instead of one shared
// fade — still fast (<=0.3s), just a different shape of motion so a
// section feels like it belongs to a distinct part of the site.
const REVEALS = {
  rise: {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  wipe: {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    show: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  },
  focus: {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 },
  },
} satisfies Record<string, Variants>;

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  reveal = "rise",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  reveal?: keyof typeof REVEALS;
}) {
  const variants = REVEALS[reveal];

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 border-t border-border px-6 py-24 sm:px-10 lg:px-16", className)}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={variants}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 max-w-2xl"
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-balance text-base leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
