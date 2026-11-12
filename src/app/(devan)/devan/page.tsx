"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
      if (res && res.data) {
        setData(res.data);
      }
    };

    loadDashboard();
  }, []);

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-xs text-[#8A9098]">
        Loading DEVAN overview…
      </div>
    );
  }

  const systemMetrics = data.systemMetrics || {
    totalConceptsTracked: 30,
    totalEvidenceArtifacts: 12,
    verifiedRepositories: 4,
    testAssertionsPassing: 34,
  };

  const currentMission = data.currentMission || {
    title: "Wireless Mesh + TV White Space propagation modeling",
    objective: "Thesis research extending mesh coverage into challenging terrain",
    objectives: [],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-w-0">
      {/* Main Control Center Workspace */}
      <div className="flex-1 min-w-0 space-y-5">
        <KnowledgeBreadcrumbs
          items={[
            { label: "DEVAN" },
            { label: "Overview" },
          ]}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-[#F5F5F5] font-mono flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#4F8CFF] shrink-0" /> DEVAN overview
            </h1>
            <p className="text-xs text-[#8A9098] font-mono">
              The concepts, experiments and evidence behind Ujwal&apos;s work. On static hosting these counts come from the seeded graph, not a live database.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("devan:tour"))}
              className="rounded-md border border-[#20252B] px-3 py-1.5 font-mono text-[11px] text-[#8A9098] hover:text-[#F5F5F5]"
            >
              Take the tour
            </button>
            <DensityToggle />
          </div>
        </div>

        {/* Hero Flagship Visualization */}
        <HeroVisualization />

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Concepts Tracked</span>
            <div className="text-xl font-bold text-[#F5F5F5]">{systemMetrics.totalConceptsTracked}</div>
          </div>
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Verified Repositories</span>
            <div className="text-xl font-bold text-[#4F8CFF]">{systemMetrics.verifiedRepositories}</div>
          </div>
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Evidence Artifacts</span>
            <div className="text-xl font-bold text-amber-400">{systemMetrics.totalEvidenceArtifacts}</div>
          </div>
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-1">
            <span className="text-[10px] text-[#8A9098] uppercase">Devan2 Suite</span>
            <div className="text-xl font-bold text-emerald-400">CI test-gated</div>
          </div>
        </div>

        {/* Current Mission Deck */}
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 font-mono text-xs space-y-3">
          <span className="font-semibold text-[#8A9098] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-cyan-400" /> Current research
          </span>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#20252B] pt-3">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#F5F5F5]">{currentMission.title}</h3>
              <p className="text-[11px] text-[#8A9098]">{currentMission.objective}</p>
            </div>
            <div className="text-right">
              <span className="rounded-full border border-[#4F8CFF]/40 px-2 py-0.5 text-[11px] font-bold text-[#4F8CFF]">ONGOING</span>
              <Link href="/work/wireless-mesh-tvws/" className="block mt-2 text-[11px] text-[#8A9098] hover:text-[#F5F5F5]">Case study →</Link>
            </div>
          </div>
        </div>

        {/* Universal Object Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <UniversalObjectCard
            data={{
              id: "networking.dns",
              type: "CONCEPT",
              title: "DNS (Domain Name System)",
              subtitle: "Iterative resolution, RFC 1035 wire specs, and UDP datagram flow",
              status: "TESTED",
              evidenceCount: 4,
              tags: ["Networking", "RFC 1035", "UDP/53"],
              href: "/knowledge/dns/",
            }}
          />
          <UniversalObjectCard
            data={{
              id: "networking.tcp",
              type: "CONCEPT",
              title: "TCP (Transmission Control Protocol)",
              subtitle: "3-way handshake, congestion control, seq/ack windowing",
              status: "STUDIED",
              evidenceCount: 3,
              tags: ["Networking", "RFC 9293", "POSIX Sockets"],
              href: "/knowledge/tcp/",
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
