"use client";

import { useEffect, useState } from "react";
import { graphClient } from "@/lib/api-client";

interface StatusStripProps {
  filteredCount: number;
}

export function StatusStrip({ filteredCount }: StatusStripProps) {
  const [metrics, setMetrics] = useState({ totalNodes: filteredCount, totalEdges: 14 });

  useEffect(() => {
    graphClient.getGraph().then((g) => {
      setMetrics({
        totalNodes: g.metrics.totalNodes,
        totalEdges: g.metrics.totalEdges,
      });
    }).catch(console.error);
  }, []);

  return (
    <footer className="h-[28px] w-full shrink-0 border-t border-[#20252B] bg-[#101317] px-4 flex items-center justify-between font-mono text-[11px] text-[#8A9098] select-none z-30">
      <div className="flex items-center gap-4">
        <span>NODES: <strong className="text-[#F5F5F5]">{filteredCount}</strong> / {metrics.totalNodes}</span>
        <span className="h-3 w-px bg-[#20252B]" />
        <span>EDGES: <strong className="text-[#F5F5F5]">{metrics.totalEdges}</strong></span>
        <span className="h-3 w-px bg-[#20252B]" />
        <span className="hidden sm:inline">DERIVED EVIDENCE GRAPH v2.4</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-[10px] text-[#8A9098]">LAST SYNC: 2026-08-07</span>
        <span className="h-2 w-2 rounded-full bg-[#31D07D]" title="Operational" />
      </div>
    </footer>
  );
}
