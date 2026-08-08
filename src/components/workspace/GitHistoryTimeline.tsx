"use client";

import React, { useEffect, useState } from "react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { ExperienceEventRecord } from "@/repositories/experience.repository";
import { GitCommit, ShieldCheck, Tag } from "lucide-react";

export function GitHistoryTimeline() {
  const [events, setEvents] = useState<ExperienceEventRecord[]>([]);

  useEffect(() => {
    const loadTimeline = async () => {
      const res = await queryEngine.queryTimeline(10);
      setEvents(res.data.events);
    };

    loadTimeline();
  }, []);

  return (
    <div className="space-y-4 font-mono text-xs">
      <span className="font-semibold text-[#8A9098] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
        <GitCommit className="h-3.5 w-3.5 text-[#4F8CFF]" /> Git History Experience Ledger
      </span>

      <div className="relative border-l border-[#20252B] ml-3 pl-4 space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="relative group">
            {/* Commit Dot */}
            <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border border-[#4F8CFF] bg-[#0A0B0D] group-hover:bg-[#4F8CFF] transition-colors" />

            <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3 space-y-1.5 hover:border-[#4F8CFF] transition-colors">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-[#4F8CFF] flex items-center gap-1">
                  <Tag className="h-3 w-3" /> commit {ev.id.substring(0, 7)}
                </span>
                <span className="text-[#8A9098]">{new Date(ev.timestamp).toLocaleDateString()}</span>
              </div>

              <h4 className="font-bold text-[#F5F5F5]">{ev.action}</h4>
              <p className="text-[11px] text-[#8A9098]">{ev.reason}</p>

              <div className="flex items-center justify-between border-t border-[#20252B] pt-1.5 text-[10px] text-[#8A9098]">
                <span>Entity: {ev.entityId}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Verified (Score: {ev.confidence})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
