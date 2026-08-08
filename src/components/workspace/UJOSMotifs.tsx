"use client";

import React from "react";
import { Radio, ShieldCheck, Zap } from "lucide-react";

export function TelemetryPulse() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
      <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
      <span>LIVE TELEMETRY</span>
    </span>
  );
}

export function EvidenceSealedBadge({ confidence = 100 }: { confidence?: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-400 border border-purple-500/20">
      <ShieldCheck className="h-3 w-3 text-purple-400" />
      <span>SEALED PROOF ({confidence}%)</span>
    </span>
  );
}

export function ReadinessRing({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#4F8CFF] bg-[#121418] font-bold text-[#F5F5F5] text-[10px]">
        {percent}%
      </div>
      <span className="text-[10px] text-[#8A9098] uppercase">Readiness</span>
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
