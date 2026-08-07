"use client";

import { Activity, GitCommit, CheckCircle2, Award, Terminal } from "lucide-react";

export interface FeedEvent {
  id: string;
  time: string;
  type: "evidence" | "experiment" | "annotation" | "repo" | "mission";
  title: string;
  description: string;
}

const FEED_EVENTS: FeedEvent[] = [
  {
    id: "f-1",
    time: "09:31",
    type: "evidence",
    title: "Evidence Promoted",
    description: "DNS Resolution state promoted to DEFENDED (97% Confidence)",
  },
  {
    id: "f-2",
    time: "09:12",
    type: "experiment",
    title: "Experiment Completed",
    description: "Captured raw UDP/53 packet trace in dns-trace.pcap",
  },
  {
    id: "f-3",
    time: "08:42",
    type: "annotation",
    title: "RFC 1035 Annotated",
    description: "Verified Section 3.3.11 iterative referral response header rules",
  },
  {
    id: "f-4",
    time: "Yesterday",
    type: "repo",
    title: "New Repository Connected",
    description: "kantimohanthy/Devan2 synced with 22 passing Vitest assertions",
  },
  {
    id: "f-5",
    time: "2 days ago",
    type: "mission",
    title: "Mission Milestone Reached",
    description: "DNS Protocol Mechanics achieved 72% progress",
  },
];

export function IntelligenceFeed() {
  return (
    <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#20252B] pb-2 text-[#8A9098]">
        <span className="font-semibold uppercase tracking-wider text-[10px] text-[#4F8CFF] flex items-center gap-1.5">
          <Activity size={12} /> Real-Time Cognitive Feed
        </span>
        <span className="h-2 w-2 rounded-full bg-[#31D07D]" title="Streaming Live Events" />
      </div>

      <div className="space-y-3">
        {FEED_EVENTS.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <span className="text-[10px] text-[#8A9098] w-14 shrink-0 pt-0.5">{event.time}</span>
            <div className="flex-1 border-l border-[#20252B] pl-3 space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-[#F5F5F5] text-[11px]">
                {event.type === "evidence" && <Award size={12} className="text-[#31D07D]" />}
                {event.type === "experiment" && <Terminal size={12} className="text-[#4F8CFF]" />}
                {event.type === "repo" && <GitCommit size={12} className="text-[#F7B955]" />}
                {event.type === "mission" && <CheckCircle2 size={12} className="text-[#31D07D]" />}
                <span>{event.title}</span>
              </div>
              <p className="text-[11px] text-[#8A9098]">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
