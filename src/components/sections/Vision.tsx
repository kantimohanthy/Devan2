"use client";

import { motion } from "framer-motion";
import { vision } from "@/data/content";

export function Vision() {
  return (
    <section id="vision" className="scroll-mt-24 border-t border-border px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-accent"
        >
          11 · Vision
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-balance text-3xl font-medium leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          {vision.statement}
        </motion.p>
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 space-y-4 border-t border-border pt-8"
        >
          {vision.direction.map((item) => (
            <li key={item} className="flex items-baseline gap-4 text-base text-text-secondary">
              <span className="h-px w-8 bg-border-strong" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
