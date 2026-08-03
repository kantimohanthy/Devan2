"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { now } from "@/data/content";

export function Now() {
  return (
    <Section
      id="now"
      eyebrow="10 · Now"
      reveal="rise"
      title="What I'm actually doing this month"
      description={`Updated ${now.updated}. Not a roadmap — just what's open on the desk right now.`}
    >
      <ol className="space-y-0 border-t border-border">
        {now.items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex gap-5 border-b border-border py-5"
          >
            <span className="mt-0.5 text-xs font-medium text-text-tertiary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary">{item}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
