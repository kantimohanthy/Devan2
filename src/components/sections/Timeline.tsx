"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import { timeline } from "@/data/content";
import type { TimelineEntry } from "@/data/types";

const categories: Array<TimelineEntry["category"] | "All"> = [
  "All",
  "Education",
  "Project",
  "Research",
  "Award",
  "Event",
];

const categoryTone: Record<TimelineEntry["category"], "accent" | "success" | "warning" | "neutral"> = {
  Education: "neutral",
  Project: "accent",
  Research: "warning",
  Award: "success",
  Event: "neutral",
};

export function Timeline() {
  const [filter, setFilter] = React.useState<(typeof categories)[number]>("All");
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const items = timeline.filter((t) => filter === "All" || t.category === filter);
  const trackRef = React.useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="timeline"
      eyebrow="08 · Timeline"
      reveal="slideLeft"
      title="How this took shape"
      description="Education, projects, research, and the events that changed direction. Hover an entry for the full note."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === cat
                ? "border-accent bg-accent-dim text-accent"
                : "border-border text-text-tertiary hover:text-text-secondary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <ol ref={trackRef} className="relative ml-3 space-y-8 pl-8">
        <span className="absolute left-0 top-0 h-full w-px bg-border" aria-hidden />
        <motion.span
          className="absolute left-0 top-0 w-px bg-accent"
          style={{ height: lineHeight }}
          aria-hidden
        />
        {items.map((entry, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.li
              key={entry.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex(null)}
              onFocus={() => setOpenIndex(i)}
              onBlur={() => setOpenIndex(null)}
              tabIndex={0}
              className="relative cursor-default rounded-lg outline-none"
            >
              <motion.span
                className="absolute -left-[calc(2rem+4.5px)] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
                animate={isOpen ? { scale: 1.4 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-text-tertiary">{entry.date}</span>
                <Tag tone={categoryTone[entry.category]}>{entry.category}</Tag>
              </div>
              <h4
                className={cn(
                  "text-base font-semibold transition-colors duration-200",
                  isOpen ? "text-accent" : "text-text-primary"
                )}
              >
                {entry.title}
              </h4>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="mt-1.5 max-w-2xl pb-0.5 text-sm leading-relaxed text-text-secondary">
                  {entry.description}
                </p>
              </motion.div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
