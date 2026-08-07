"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Decision } from "@/lib/types";

function Step({ label, children, index }: { label: string; children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.18 }}
      className="py-4.5 border-t border-border first:border-t-0"
    >
      <div className="text-[11px] uppercase tracking-wide text-blue mb-2">{label}</div>
      <div className="text-[14px] leading-[1.7] max-w-[620px]">{children}</div>
    </motion.div>
  );
}

export function ReasoningReplay({ decision }: { decision: Decision }) {
  const [replayed, setReplayed] = useState(false);

  if (!decision.hasAlternatives) {
    return (
      <div className="mt-6 pt-5 border-t border-border">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Decision</div>
        <p className="text-[14px] leading-[1.7] max-w-[620px] mb-3">{decision.decision}</p>
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2 mt-4">Implementation</div>
        <p className="text-[14px] leading-[1.7] max-w-[620px] mb-3">{decision.implementation}</p>
        <p className="text-[12px] text-text-3 italic mt-2">
          Alternatives weren&rsquo;t recorded for this decision — showing the flat record rather than a fabricated replay.
        </p>
      </div>
    );
  }

  return (
    <div>
      {!replayed && (
        <button
          onClick={() => setReplayed(true)}
          className="inline-flex items-center gap-2 text-[13px] text-blue border border-blue/35 bg-blue/[0.06] hover:bg-blue/[0.12] px-3.5 py-2 rounded-md transition-colors"
        >
          <ChevronRight size={12} />
          Replay this decision
        </button>
      )}

      {!replayed && (
        <div className="mt-6 pt-5 border-t border-border">
          <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Decision</div>
          <p className="text-[14px] leading-[1.7] max-w-[620px]">{decision.decision}</p>
        </div>
      )}

      <AnimatePresence>
        {replayed && (
          <div className="mt-6">
            <Step label="Requirements" index={0}>
              {decision.requirements}
            </Step>
            <Step label="Alternatives Considered" index={1}>
              <div className="flex flex-col gap-2.5 mt-1">
                {decision.alternatives.map((alt) => (
                  <div key={alt.name} className="border border-border rounded-lg px-3 py-2.5">
                    <div className="text-[13px] font-medium mb-1">{alt.name}</div>
                    <div className="text-[12px] text-text-2">{alt.tradeoff}</div>
                  </div>
                ))}
              </div>
            </Step>
            <Step label="Decision" index={2}>
              {decision.decision}
            </Step>
            <Step label="Implementation" index={3}>
              {decision.implementation}
            </Step>
            {decision.lessons && (
              <Step label="Lessons" index={4}>
                {decision.lessons}
              </Step>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
