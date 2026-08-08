"use client";

import React, { useEffect, useState } from "react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { DashboardViewModel } from "@/lib/query/projections/dashboard.projection";
import { ContextInspector } from "@/components/workspace/ContextInspector";
import { ActivityFeed } from "@/components/workspace/ActivityFeed";
import { HeroVisualization } from "@/components/workspace/HeroVisualization";
import { UniversalObjectCard } from "@/components/workspace/UniversalObjectCard";
import { GitHistoryTimeline } from "@/components/workspace/GitHistoryTimeline";
import { KnowledgeBreadcrumbs } from "@/components/workspace/KnowledgeBreadcrumbs";
import { DensityToggle } from "@/components/workspace/DensityToggle";
import { Target, Activity } from "lucide-react";

export default function HomePage() {
  const [data, setData] = useState<DashboardViewModel | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const res = await queryEngine.queryDashboard();
      setData(res.data);
    };

    loadDashboard();
  }, []);

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-xs text-[#8A9098]">
        Initializing DEVAN Cognitive Control Center...
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* Main Control Center Workspace */}
      <div className="flex-1 space-y-5">
        <KnowledgeBreadcrumbs
          items={[
            { label: "DEVAN OS" },
            { label: "Cognitive Control Center" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F5] font-mono flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#4F8CFF]" /> Cognitive Control Center
            </h1>
            <p className="text-xs text-[#8A9098] font-mono">
              Live situational awareness backing protocol engineering, ground proof evidence, and mission readiness.
            </p>
          </div>
          <DensityToggle />
        </div>

        {/* Hero Flagship Visualization */}
        <HeroVisualization />

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-4 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Concepts Tracked</span>
            <div className="text-xl font-bold text-[#F5F5F5]">{data.systemMetrics.totalConceptsTracked}</div>
          </div>
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Verified Repositories</span>
            <div className="text-xl font-bold text-[#4F8CFF]">{data.systemMetrics.verifiedRepositories}</div>
          </div>
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Evidence Artifacts</span>
            <div className="text-xl font-bold text-amber-400">{data.systemMetrics.totalEvidenceArtifacts}</div>
          </div>
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Tests Passing</span>
            <div className="text-xl font-bold text-emerald-400">{data.systemMetrics.testAssertionsPassing} assertions</div>
          </div>
        </div>

        {/* Current Mission Deck */}
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 font-mono text-xs space-y-3">
          <span className="font-semibold text-[#8A9098] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-cyan-400" /> Active Mission Control
          </span>
          <div className="flex items-center justify-between border-t border-[#20252B] pt-3">
            <div>
              <h3 className="text-base font-bold text-[#F5F5F5]">{data.currentMission.title}</h3>
              <p className="text-[11px] text-[#8A9098]">{data.currentMission.objective}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-emerald-400">{data.currentMission.progressPercent}%</span>
              <span className="block text-[10px] text-[#8A9098]">COMPLETED</span>
            </div>
          </div>
        </div>

        {/* Universal Object Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <UniversalObjectCard
            data={{
              id: "networking.dns",
              type: "CONCEPT",
              title: "DNS (Domain Name System)",
              subtitle: "Iterative resolution, RFC 1035 wire specs, and UDP datagram flow",
              status: "GOLD STANDARD",
              confidence: 99,
              evidenceCount: 4,
              tags: ["Networking", "RFC 1035", "UDP/53"],
              href: "/knowledge/networking.dns",
            }}
          />
          <UniversalObjectCard
            data={{
              id: "networking.tcp",
              type: "CONCEPT",
              title: "TCP (Transmission Control Protocol)",
              subtitle: "3-way handshake, congestion control, seq/ack windowing",
              status: "GOLD STANDARD",
              confidence: 98,
              evidenceCount: 3,
              tags: ["Networking", "RFC 793", "POSIX Sockets"],
              href: "/knowledge/networking.tcp",
            }}
          />
        </div>

        {/* Git History Timeline */}
        <GitHistoryTimeline />

        {/* Activity Feed */}
        <ActivityFeed />
      </div>

      {/* Synchronized Context Inspector Panel */}
      <ContextInspector />
    </div>
  );
}
