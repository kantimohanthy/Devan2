"use client";

import React from "react";
import type { ReadinessDimensionScore } from "@/services/intelligence-snapshot.service";

interface ReadinessRadarProps {
  dimensions: ReadinessDimensionScore[];
}

export function ReadinessRadar({ dimensions }: ReadinessRadarProps) {
  return (
    <div className="space-y-4">
      {dimensions.map((d) => {
        const overall = Math.round(
          (d.knowledge + d.experience + d.evidence + d.confidence) / 4
        );
        return (
          <div
            key={d.domain}
            className="rounded-xl border border-[#20252B] bg-[#0A0B0D]/80 p-4 transition-all hover:border-[#4F8CFF]/40"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-[#F5F5F5]">
                {d.domain}
              </span>
              <span className="font-mono text-xs font-bold text-[#4F8CFF]">
                {overall} / 10
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-[#8A9098]">
              <div>
                <div className="flex justify-between mb-1">
                  <span>KNW</span>
                  <span>{d.knowledge}/10</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${d.knowledge * 10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>EXP</span>
                  <span>{d.experience}/10</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${d.experience * 10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>EVI</span>
                  <span>{d.evidence}/10</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${d.evidence * 10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>CNF</span>
                  <span>{d.confidence}/10</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1D23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${d.confidence * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
