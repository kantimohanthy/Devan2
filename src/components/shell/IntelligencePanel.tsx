"use client";

import { useEffect, useState } from "react";
import { NodeItem } from "./GraphCanvas";
import { ExternalLink, GitCommit } from "lucide-react";
import { graphClient } from "@/lib/api-client";
import type { GraphNodeViewModel } from "@/services/graph.service";

interface IntelligencePanelProps {
  selectedNode: NodeItem | null;
  onSelectNode: (node: NodeItem) => void;
}

export function IntelligencePanel({
  selectedNode,
  onSelectNode,
}: IntelligencePanelProps) {
  const [registryNodes, setRegistryNodes] = useState<GraphNodeViewModel[]>([]);

  useEffect(() => {
    graphClient.getGraph().then((data) => {
      setRegistryNodes(data.nodes.slice(0, 6));
    }).catch(console.error);
  }, []);

  if (!selectedNode) {
    return (
      <aside className="w-[360px] shrink-0 h-full border-l border-[#20252B] bg-[#101317] p-5 flex flex-col gap-5 overflow-y-auto select-none font-sans text-xs">
        <div className="border-b border-[#20252B] pb-3">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#8A9098] uppercase">
            DEVAN Evidence Registry
          </span>
          <p className="mt-1 text-[11px] text-[#8A9098]/70 leading-relaxed">
            Select any node on the graph canvas to inspect derived evidence trails, architecture, and connected repositories.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#424750] font-bold">
            Curated Knowledge Map
          </p>
          {registryNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() =>
                onSelectNode({
                  id: node.id,
                  label: node.label,
                  kind: "concept",
                  summary: node.summary,
                  detail: node.detail || node.summary,
                  domain: node.domain,
                  evidenceDepth: 4,
                  density: 85,
                  featured: true,
                  x: 500,
                  y: 350,
                })
              }
              className="w-full rounded-xl border border-[#20252B] bg-[#0A0B0D]/60 p-3 text-left transition-all hover:border-[#4F8CFF]/50 hover:bg-[#101317] cursor-pointer group"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#8A9098]">
                <span className="uppercase text-[#4F8CFF] font-semibold">{node.domain}</span>
                <span className="text-[#8A9098] font-bold">{node.state || "TESTED"}</span>
              </div>
              <p className="mt-1 font-semibold text-[#F5F5F5] group-hover:text-[#4F8CFF] transition-colors">
                {node.label}
              </p>
              <p className="mt-0.5 line-clamp-1 text-[#8A9098] text-[11px]">{node.summary}</p>
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[360px] shrink-0 h-full border-l border-[#20252B] bg-[#101317] p-5 flex flex-col gap-5 overflow-y-auto font-sans text-xs select-none">
      <div className="border-b border-[#20252B] pb-4 space-y-1.5">
        <div className="flex items-center justify-between font-mono text-[10px] text-[#8A9098]">
          <span className="uppercase tracking-widest text-[#4F8CFF] font-semibold">
            {selectedNode.kind} · {selectedNode.domain}
          </span>
          <span className="rounded bg-[#20252B] px-2 py-0.5 text-[#F5F5F5] font-mono text-[10px] font-bold">
            {selectedNode.kind === "root-category" ? "MASTERED" : "TESTED"}
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#F5F5F5] pt-1">
          {selectedNode.label}
        </h2>
        <p className="text-xs text-[#8A9098] leading-relaxed">{selectedNode.summary}</p>
      </div>

      <div className="space-y-2 border-b border-[#20252B] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#424750] font-bold">
          Dated Activity Trail
        </p>
        <div className="space-y-1.5 font-mono text-[11px] text-[#8A9098]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F8CFF]" />
            <span>2026-08-07: RFC 1035 Iterative Dig Trace Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8A9098]" />
            <span>2026-08-07: Wireshark UDP 53 PCAP Capture Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8A9098]" />
            <span>2026-08-06: Vitest 13/13 Automated Tests Verified</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-b border-[#20252B] pb-4 font-mono">
        <p className="text-[10px] uppercase tracking-wider text-[#424750] font-bold flex items-center gap-1">
          <GitCommit size={11} /> Evidence Repository
        </p>
        <a
          href="https://github.com/kantimohanthy/Devan2"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg border border-[#20252B] bg-[#0A0B0D] p-2.5 text-[#4F8CFF] hover:border-[#4F8CFF] transition-colors"
        >
          <span className="text-[11px]">kantimohanthy/Devan2</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </aside>
  );
}
