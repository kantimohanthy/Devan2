"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { identityClient, timelineClient } from "@/lib/api-client";
import type { IdentityViewModel } from "@/services/identity.service";
import type { TimelineEntryViewModel } from "@/services/timeline.service";

export function Identity() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [profile, setProfile] = React.useState<IdentityViewModel | null>(null);
  const [timeline, setTimeline] = React.useState<TimelineEntryViewModel[]>([]);

  React.useEffect(() => {
    identityClient.getProfile().then(setProfile).catch(console.error);
    timelineClient.getTimeline().then(setTimeline).catch(console.error);
  }, []);

  if (!profile) return null;

  return (
    <Section id="identity" eyebrow="01 · Identity" reveal="rise">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance text-3xl font-medium leading-[1.3] tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
      >
        {profile.mission}
      </motion.p>

      <div className="mt-20">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
          A few things that hold
        </p>
        <div className="divide-y divide-border border-t border-border">
          {profile.principles.map((principle, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={principle.title}
                onMouseEnter={() => setOpenIndex(i)}
                onMouseLeave={() => setOpenIndex(null)}
                onFocus={() => setOpenIndex(i)}
                onBlur={() => setOpenIndex(null)}
                tabIndex={0}
                className="group py-6 outline-none"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex items-baseline gap-5">
                    <span className="text-xs font-medium text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4
                      className={`text-xl font-semibold transition-colors duration-200 sm:text-2xl ${
                        isOpen ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {principle.title}
                    </h4>
                  </div>
                </div>
                <p className="mt-3 max-w-2xl pl-0 text-sm leading-relaxed text-text-secondary sm:pl-11">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 overflow-x-auto">
        <div className="flex min-w-max items-stretch gap-0 border-t border-border">
          {timeline.slice(0, 5).map((entry) => (
            <div
              key={entry.title}
              className="w-56 shrink-0 border-r border-border px-5 py-5 transition-colors hover:bg-surface/40"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-accent">
                {entry.date}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-text-primary">
                {entry.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
