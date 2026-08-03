"use client";

import { motion } from "framer-motion";
import { notebook } from "@/data/content";

export function Notebook() {
  return (
    <section
      id="uj"
      className="scroll-mt-24 border-t border-border bg-background-secondary/30 px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary"
        >
          A quieter page
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-2xl font-semibold text-text-primary sm:text-3xl"
        >
          UJ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary"
        >
          {notebook.intro}
        </motion.p>

        <dl className="mt-10 space-y-6 border-t border-border pt-8">
          {notebook.entries.map((entry, i) => (
            <motion.div
              key={entry.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              <dt className="font-mono text-xs text-text-tertiary">{entry.label}</dt>
              <dd className="text-sm leading-relaxed text-text-secondary">{entry.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
