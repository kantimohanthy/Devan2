"use client";

import React, { useEffect, useState } from "react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { GraphLayoutEngine, GraphLayoutResult } from "@/lib/query/graph-engine";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { Network, List, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ReactGraphProps {
  width?: number;
  height?: number;
  onNodeClick?: (nodeId: string) => void;
}

const STATIC_ATLAS_SEED = {
  totalNodes: 6,
  totalEdges: 4,
  nodes: [
    { id: "networking.dns", label: "DNS (RFC 1035)", domain: "Networking", evidenceCount: 4 },
    { id: "networking.tcp", label: "TCP (RFC 793)", domain: "Networking", evidenceCount: 3 },
    { id: "networking.tls", label: "TLS 1.3", domain: "Networking", evidenceCount: 2 },
    { id: "linux.kernel", label: "Linux Kernel", domain: "Linux", evidenceCount: 5 },
    { id: "container.kubernetes", label: "Kubernetes", domain: "Cloud", evidenceCount: 2 },
    { id: "rf-propagation-occluded-terrain", label: "RF Propagation", domain: "AI Systems", evidenceCount: 3 },
  ],
  edges: [
    { source: "networking.dns", target: "networking.tcp", type: "TC Fallback" },
    { source: "networking.tcp", target: "networking.tls", type: "Handshake Encapsulation" },
    { source: "container.kubernetes", target: "networking.dns", type: "CoreDNS Resolution" },
    { source: "rf-propagation-occluded-terrain", target: "networking.tcp", type: "Lossy Link Transport" },
  ],
};

export function ReactGraph({ width = 800, height = 500, onNodeClick }: ReactGraphProps) {
  // Pre-compute initial layout immediately with static seed to prevent blank / hanging loading screen
  const [layout, setLayout] = useState<GraphLayoutResult>(() =>
    GraphLayoutEngine.computeLayout(STATIC_ATLAS_SEED, width, height)
  );
  const [activeNodeId, setActiveNodeId] = useState<string | null>("networking.tcp");
  const [viewMode, setViewMode] = useState<"CANVAS" | "LIST">("CANVAS");

  useEffect(() => {
    let isCancelled = false;

    const loadGraph = async () => {
      try {
        const timeoutPromise = new Promise<{ data: typeof STATIC_ATLAS_SEED }>((resolve) =>
          setTimeout(() => resolve({ data: STATIC_ATLAS_SEED }), 2000)
        );
        const atlasRes = await Promise.race([queryEngine.queryAtlas(), timeoutPromise]);
        if (!isCancelled && atlasRes?.data?.nodes?.length) {
          const layoutData = GraphLayoutEngine.computeLayout(atlasRes.data, width, height);
          setLayout(layoutData);
        }
      } catch (err) {
        console.warn("Atlas graph layout fallback to seed:", err);
      }
    };

    loadGraph();
    return () => {
      isCancelled = true;
    };
  }, [width, height]);

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
    workspaceStore.setState({ selectedConceptId: id });
    if (onNodeClick) onNodeClick(id);
  };

  const activeNode = layout.nodes.find((n) => n.id === activeNodeId);

  return (
    <div className="relative w-full rounded-2xl border border-[#20252B] bg-[#0A0B0D]/90 p-4 font-mono text-xs overflow-hidden">
      {/* Graph Toolbar */}
      <div className="flex items-center justify-between border-b border-[#20252B] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-[#4F8CFF]" />
          <span className="font-bold text-[#F5F5F5] uppercase tracking-wider text-xs">
            Atlas Knowledge Graph ({layout.nodes.length} nodes · {layout.edges.length} edges)
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-[#20252B] bg-[#121418] p-1">
          <button
            onClick={() => setViewMode("CANVAS")}
            aria-label="View graph canvas"
            className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold transition-colors ${
              viewMode === "CANVAS" ? "bg-[#20252B] text-[#4F8CFF]" : "text-[#8A9098] hover:text-[#F5F5F5]"
            }`}
          >
            <Network className="h-3 w-3" />
            <span>Canvas</span>
          </button>
          <button
            onClick={() => setViewMode("LIST")}
            aria-label="View accessible concept list"
            className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold transition-colors ${
              viewMode === "LIST" ? "bg-[#20252B] text-[#4F8CFF]" : "text-[#8A9098] hover:text-[#F5F5F5]"
            }`}
          >
            <List className="h-3 w-3" />
            <span>Node List</span>
          </button>
        </div>
      </div>

      {viewMode === "CANVAS" ? (
        <div className="relative">
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="cursor-grab active:cursor-grabbing select-none"
          >
            {/* Render Graph Edges */}
            <g stroke="#20252B" strokeWidth="1.5" strokeDasharray="3 3">
              {layout.edges.map((edge, i) => (
                <line
                  key={`edge-${i}`}
                  x1={edge.sourceX}
                  y1={edge.sourceY}
                  x2={edge.targetX}
                  y2={edge.targetY}
                  className="transition-all duration-300"
                />
              ))}
            </g>

            {/* Render Graph Nodes */}
            <g>
              {layout.nodes.map((node) => {
                const isSelected = activeNodeId === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => handleNodeClick(node.id)}
                    className="cursor-pointer group"
                  >
                    <circle
                      r={isSelected ? 14 : 10}
                      fill={node.color}
                      stroke={isSelected ? "#FFFFFF" : "#121418"}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <text
                      x={16}
                      y={4}
                      fill={isSelected ? "#FFFFFF" : "#8A9098"}
                      fontSize={11}
                      fontFamily="monospace"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="transition-colors group-hover:fill-[#4F8CFF]"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Active Node Detail Card */}
          {activeNode && (
            <div className="absolute bottom-3 left-3 max-w-sm rounded-xl border border-[#20252B] bg-[#07080A]/95 p-3 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-[#F5F5F5]">{activeNode.label}</span>
                <span className="rounded bg-[#20252B] px-1.5 py-0.5 text-[9px] text-[#4F8CFF] font-semibold">
                  {activeNode.domain}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-[#8A9098] flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>{activeNode.evidenceCount} verified artifacts linked</span>
              </p>
              <div className="mt-2 pt-2 border-t border-[#20252B] flex items-center justify-between">
                <Link
                  href={`/knowledge/${activeNode.id.replace(/^networking\./, "")}/`}
                  className="text-[10px] text-[#4F8CFF] hover:underline flex items-center gap-1 font-semibold"
                >
                  Inspect in Knowledge Workspace <ExternalLink className="h-2.5 w-2.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Accessible List View */
        <div className="max-h-[500px] overflow-y-auto divide-y divide-[#20252B] rounded-xl border border-[#20252B] bg-[#07080A] p-3">
          {layout.nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className="flex items-center justify-between py-2.5 px-3 hover:bg-[#121418] cursor-pointer rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: node.color }} />
                <div>
                  <span className="font-semibold text-[#F5F5F5] text-xs">{node.label}</span>
                  <span className="ml-2 text-[10px] text-[#8A9098]">({node.domain})</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#8A9098]">{node.evidenceCount} proofs</span>
                <Link
                  href={`/knowledge/${node.id.replace(/^networking\./, "")}/`}
                  className="rounded bg-[#20252B] px-2 py-0.5 text-[10px] text-[#4F8CFF] hover:bg-[#20252B]/80 font-semibold"
                >
                  Inspect
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
