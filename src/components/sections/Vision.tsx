"use client";

import { motion } from "framer-motion";
import { vision } from "@/data/content";
import { PrincipleCards } from "@/components/ui/PrincipleCards";

export function Vision() {
  return (
    <section id="vision" className="scroll-mt-24 border-t border-white/10 px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-blue-400 font-mono"
          >
            11 · Vision & Core Principles
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-balance text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {vision.statement}
          </motion.p>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="mb-6 text-xs uppercase tracking-wider text-white/40 font-mono">Principles (Click to Expand Evidence)</p>
          <PrincipleCards />
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4 border-t border-white/10 pt-8"
        >
          {vision.direction.map((item) => (
            <li key={item} className="flex items-baseline gap-4 text-base text-white/70">
              <span className="h-px w-8 bg-blue-500/40" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
