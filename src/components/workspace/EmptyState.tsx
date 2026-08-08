"use client";

import React from "react";
import { Terminal, ArrowRight, ShieldCheck, Play } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  recommendations: Array<{ label: string; action: () => void }>;
}

export function EmptyState({ title, description, recommendations }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-8 text-center font-mono text-xs space-y-4 shadow-xl">
      <div className="rounded-full bg-[#121418] p-3 border border-[#20252B]">
        <Terminal className="h-6 w-6 text-[#4F8CFF]" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-sm font-bold text-[#F5F5F5]">{title}</h3>
        <p className="text-xs text-[#8A9098] leading-relaxed">{description}</p>
      </div>

      <div className="space-y-2 w-full max-w-sm pt-2">
        <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Recommended Action Pathways
        </span>
        <div className="flex flex-col gap-1.5">
          {recommendations.map((rec) => (
            <button
              key={rec.label}
              onClick={rec.action}
              className="flex items-center justify-between rounded-xl border border-[#20252B] bg-[#121418] px-3 py-2 text-xs text-[#F5F5F5] hover:border-[#4F8CFF] hover:text-[#4F8CFF] transition-all"
            >
              <span className="flex items-center gap-2">
                <Play className="h-3 w-3 text-[#4F8CFF]" /> {rec.label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#8A9098]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
