"use client";

import React from "react";
import { Zap } from "lucide-react";

/** Shows a derived evidence state (e.g. TESTED) instead of a readiness percentage. */
export function EvidenceStateBadge({ state }: { state: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="rounded-full border border-[#4F8CFF]/50 bg-[#121418] px-2 py-0.5 font-bold text-[#F5F5F5] text-[12px]">
        {state}
      </span>
      <span className="text-[12px] text-[#8A9098] uppercase">Evidence state</span>
    </div>
  );
}

export function ExecutionPulseBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[#4F8CFF]/10 px-2 py-0.5 font-mono text-[12px] text-[#4F8CFF] border border-[#4F8CFF]/20">
      <Zap className="h-3 w-3 text-[#4F8CFF]" />
      <span>EXPLORER</span>
    </span>
  );
}

