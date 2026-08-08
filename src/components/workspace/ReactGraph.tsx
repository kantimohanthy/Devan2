"use client";

import React, { useEffect, useState } from "react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { GraphLayoutEngine, GraphLayoutResult } from "@/lib/query/graph-engine";
import { workspaceStore } from "@/lib/workspace/workspace-store";

interface ReactGraphProps {
  width?: number;
  height?: number;
  onNodeClick?: (nodeId: string) => void;
}

export function ReactGraph({ width = 800, height = 500, onNodeClick }: ReactGraphProps) {
  const [layout, setLayout] = useState<GraphLayoutResult | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  useEffect(() => {
    const loadGraph = async () => {
      const atlasRes = await queryEngine.queryAtlas();
      const layoutData = GraphLayoutEngine.computeLayout(atlasRes.data, width, height);
      setLayout(layoutData);
    };

    loadGraph();
  }, [width, height]);

  if (!layout) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-2xl border border-[#20252B] bg-[#0A0B0D]/80 font-mono text-xs text-[#8A9098]">
        Computing Atlas Knowledge Graph Layout...
      </div>
    );
  }

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
    workspaceStore.setState({ selectedConceptId: id });
    if (onNodeClick) onNodeClick(id);
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#20252B] bg-[#0A0B0D]/90 p-4 overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="cursor-grab active:cursor-grabbing">
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
    </div>
  );
}
