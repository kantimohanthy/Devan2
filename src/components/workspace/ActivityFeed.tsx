"use client";

import React, { useEffect, useState } from "react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { ExperienceEventRecord } from "@/repositories/experience.repository";
import { Activity, Radio } from "lucide-react";

export function ActivityFeed() {
  const [events, setEvents] = useState<ExperienceEventRecord[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const res = await queryEngine.queryTimeline(5);
      setEvents(res.data.events);
    };

    loadEvents();
  }, []);

  return (
    <div className="space-y-3 rounded-2xl border border-[#20252B] bg-[#0A0B0D]/80 p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#20252B] pb-2">
        <span className="font-semibold text-[#8A9098] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-emerald-400" /> Global Live Intelligence Feed
        </span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
          <Radio className="h-3 w-3 animate-pulse" /> LIVE
        </span>
      </div>

      <div className="space-y-2">
        {events.map((ev) => (
          <div key={ev.id} className="rounded-xl border border-[#20252B]/60 bg-[#121418] p-2.5 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-semibold text-[#F5F5F5]">{ev.action}</span>
              <span className="text-[#8A9098]">{new Date(ev.timestamp).toLocaleTimeString()}</span>
            </div>
            <p className="text-[10px] text-[#8A9098] line-clamp-1">{ev.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
