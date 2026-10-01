"use client";

import React from "react";
import { Radio, ShieldCheck, Zap } from "lucide-react";

export function TelemetryPulse() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
      <Radio className="h-3 w-3 text-emerald-400" />
      <span>RECORDED TRACE</span>
    </span>
  );
}

/** Marks that an evidence record is attached. Deliberately carries no score. */
export function EvidenceSealedBadge({ label = "EVIDENCE ATTACHED" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-400 border border-purple-500/20">
      <ShieldCheck className="h-3 w-3 text-purple-400" />
      <span>{label}</span>
    </span>
  );
}

/** Shows a derived evidence state (e.g. TESTED) instead of a readiness percentage. */
export function ReadinessRing({ state }: { state: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="rounded-full border border-[#4F8CFF]/50 bg-[#121418] px-2 py-0.5 font-bold text-[#F5F5F5] text-[10px]">
        {state}
      </span>
      <span className="text-[10px] text-[#8A9098] uppercase">Evidence state</span>
    </div>
  );
}

export function ExecutionPulseBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[#4F8CFF]/10 px-2 py-0.5 font-mono text-[10px] text-[#4F8CFF] border border-[#4F8CFF]/20">
      <Zap className="h-3 w-3 text-[#4F8CFF]" />
      <span>EXECUTION EXPLORER</span>
    </span>
  );
}
