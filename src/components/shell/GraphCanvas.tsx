"use client";

import { useMemo, useState, useRef } from "react";
import { knowledgeNodes } from "@/data/content";
import { ONTOLOGY_ENTITIES, SEMANTIC_RELATIONSHIPS } from "@/lib/ontology/store";
import type { FilterState } from "./FilterRail";
import { Network, Cpu, Shield, Activity, Globe, Zap, ZoomIn, ZoomOut, RotateCcw, FileText, Wrench } from "lucide-react";

export type EntityType = "concept" | "tool" | "paper" | "project" | "question" | "person";

export interface NodeItem {
  id: string;
  label: string;
  summary: string;
  type: EntityType;
  domain: string;
  evidenceDepth: number; // 0..5
  density: number; // 10..100
  x: number;
  y: number;
}

// Initial position layout for nodes
const INITIAL_NODES: NodeItem[] = knowledgeNodes.map((n, idx) => {
  const angle = (idx / knowledgeNodes.length) * 2 * Math.PI;
  const radius = 200 + (idx % 3) * 50;
  const x = Math.round(500 + radius * Math.cos(angle));
  const y = Math.round(350 + radius * Math.sin(angle));

  const ontologyMatch = ONTOLOGY_ENTITIES.find((oe) => oe.id === n.id);
  let type: EntityType = "concept";
  if (ontologyMatch) type = ontologyMatch.type;
  else if (n.id.includes("project") || n.projects.length > 0) type = "project";
  else if (n.id.includes("dns") || n.id.includes("slice") || n.id.includes("http")) type = "paper";

  const depthMap: Record<string, number> = {
    networking: 5,
    "distributed-systems": 4,
    ai: 4,
    space: 3,
    "software-architecture": 5,
    finance: 2,
    "open-source": 3,
    hardware: 2,
  };

  const densityMap: Record<string, number> = {
    networking: 95,
    "distributed-systems": 85,
    ai: 80,
    space: 60,
    "software-architecture": 90,
    finance: 40,
    "open-source": 65,
    hardware: 35,
  };

  return {
    id: n.id,
    label: n.label,
    summary: n.summary,
    type,
    domain: n.domain,
    evidenceDepth: depthMap[n.id] ?? 3,
    density: densityMap[n.id] ?? 50,
    x,
    y,
  };
});

interface GraphCanvasProps {
  filters: FilterState;
  searchQuery: string;
  selectedNodeId: string | null;
  onSelectNode: (node: NodeItem) => void;
}

export function GraphCanvas({
  filters,
  searchQuery,
  selectedNodeId,
  onSelectNode,
}: GraphCanvasProps) {
  const [nodes, setNodes] = useState<NodeItem[]>(INITIAL_NODES);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const queryLower = searchQuery.toLowerCase().trim();

  // Evaluate matching status per node
  const nodeMatches = useMemo(() => {
    const map = new Map<string, boolean>();
    nodes.forEach((n) => {
      const matchesDomain = filters.domains.size === 0 || filters.domains.has(n.domain);
      const matchesDepth = n.evidenceDepth >= filters.minEvidenceDepth;
      const matchesWeight = n.density >= filters.minWeight;
      const matchesQuery =
        !queryLower ||
        n.label.toLowerCase().includes(queryLower) ||
        n.summary.toLowerCase().includes(queryLower);

      map.set(n.id, matchesDomain && matchesDepth && matchesWeight && matchesQuery);
    });
    return map;
  }, [filters, queryLower, nodes]);

  // Active connected node IDs
  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (selectedNodeId) {
      set.add(selectedNodeId);
      SEMANTIC_RELATIONSHIPS.forEach((e) => {
        if (e.fromId === selectedNodeId) set.add(e.toId);
        if (e.toId === selectedNodeId) set.add(e.fromId);
      });
    }
    return set;
  }, [selectedNodeId]);

  // Handle Dragging Nodes
  const handleMouseDownNode = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggingNodeId(nodeId);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeId) {
      const dx = (e.clientX - dragStartRef.current.x) / zoom;
      const dy = (e.clientY - dragStartRef.current.y) / zoom;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggingNodeId ? { ...n, x: n.x + dx, y: n.y + dy } : n
        )
      );
    } else if (isPanning) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
    setIsPanning(false);
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "svg") {
      setIsPanning(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setNodes(INITIAL_NODES);
  };

  const renderDomainIcon = (domain: string, type: EntityType) => {
    if (type === "tool") return <Wrench size={12} />;
    if (type === "paper") return <FileText size={12} />;
    switch (domain) {
      case "networking":
        return <Network size={12} />;
      case "ai":
        return <Cpu size={12} />;
      case "security":
        return <Shield size={12} />;
      case "space":
        return <Globe size={12} />;
      case "software-architecture":
        return <Zap size={12} />;
      default:
        return <Activity size={12} />;
    }
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDownCanvas}
      className="relative flex-1 h-full w-full bg-[#0A0B0D] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Zoom / Pan Controls HUD */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 rounded-xl border border-[#20252B] bg-[#101317]/90 px-2 py-1.5 backdrop-blur-md text-xs font-mono text-[#8A9098]">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
          className="rounded p-1 hover:bg-[#20252B] hover:text-[#F5F5F5] cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn size={13} />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
          className="rounded p-1 hover:bg-[#20252B] hover:text-[#F5F5F5] cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut size={13} />
        </button>
        <span className="px-1 text-[10px] text-[#F5F5F5]">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={resetView}
          className="rounded p-1 hover:bg-[#20252B] hover:text-[#F5F5F5] cursor-pointer"
          title="Reset Graph Layout"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Main Canvas Container with Pan & Zoom Transform */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: draggingNodeId || isPanning ? "none" : "transform 0.15s ease-out",
        }}
        className="absolute inset-0 h-full w-full"
      >
        {/* Semantic Relationship Edge Layer */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none stroke-[#20252B]">
          {SEMANTIC_RELATIONSHIPS.map((edge, idx) => {
            const source = nodes.find((n) => n.id === edge.fromId);
            const target = nodes.find((n) => n.id === edge.toId);
            if (!source || !target) return null;

            const isConnectedToSelected =
              selectedNodeId && (edge.fromId === selectedNodeId || edge.toId === selectedNodeId);
            const isBothMatching = nodeMatches.get(source.x.toString()) && nodeMatches.get(target.x.toString());

            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;

            return (
              <g key={idx}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isConnectedToSelected ? "#4F8CFF" : "#20252B"}
                  strokeWidth={isConnectedToSelected ? 2.5 : 1}
                  strokeOpacity={
                    isConnectedToSelected
                      ? 0.85
                      : isBothMatching
                      ? 0.3
                      : 0.15
                  }
                  className="transition-all duration-300"
                />

                {/* Edge Semantic Relationship Text Label */}
                <text
                  x={midX}
                  y={midY}
                  fill={isConnectedToSelected ? "#4F8CFF" : "#8A9098"}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  dy="-4"
                  className="pointer-events-none font-bold select-none opacity-80"
                >
                  {edge.type}
                </text>

                {/* Animated Pulse Signal Dot for Selected Edges */}
                {isConnectedToSelected && (
                  <circle r="3" fill="#4F8CFF">
                    <animateMotion
                      path={`M${source.x},${source.y} L${target.x},${target.y}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer with Ontology Shapes */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);
          const isMatching = nodeMatches.get(node.id) ?? true;

          // Encode Ontology Shapes per type
          let shapeClasses = "rounded-full"; // concept = circle
          if (node.type === "tool") shapeClasses = "rounded-none"; // tool = square
          if (node.type === "paper") shapeClasses = "rotate-45 rounded-sm"; // paper = diamond
          if (node.type === "project") shapeClasses = "rounded-xl"; // project = rounded square

          // Size scaling by density
          const sizePx = 40 + Math.round((node.density / 100) * 22);

          return (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDownNode(e, node.id)}
              onClick={() => onSelectNode(node)}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)",
                width: `${sizePx}px`,
                height: `${sizePx}px`,
              }}
              className={`absolute flex items-center justify-center transition-opacity duration-300 cursor-grab active:cursor-grabbing ${
                isMatching ? "opacity-100" : "opacity-12 pointer-events-none"
              }`}
            >
              {/* Node Body */}
              <div
                className={`w-full h-full flex flex-col items-center justify-center border backdrop-blur-md transition-all duration-200 ${shapeClasses} ${
                  isSelected
                    ? "border-[#4F8CFF] bg-[#4F8CFF]/25 shadow-[0_0_30px_rgba(79,140,255,0.5)] scale-110"
                    : isConnected
                    ? "border-[#4F8CFF]/70 bg-[#101317]"
                    : "border-[#20252B] bg-[#101317]/90 hover:border-[#8A9098]"
                }`}
              >
                <div className={node.type === "paper" ? "-rotate-45 flex items-center gap-1" : "flex flex-col items-center gap-0.5"}>
                  <span className={isSelected ? "text-[#4F8CFF]" : "text-[#8A9098]"}>
                    {renderDomainIcon(node.domain, node.type)}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[#F5F5F5] uppercase truncate px-1">
                    {node.label.substring(0, 3)}
                  </span>
                </div>
              </div>

              {/* Node Label Floating Below */}
              <div className="absolute top-[105%] mt-1 whitespace-nowrap pointer-events-none text-center">
                <p
                  className={`font-mono text-[11px] tracking-tight transition-colors ${
                    isSelected
                      ? "text-[#4F8CFF] font-bold shadow-sm"
                      : "text-[#F5F5F5]/80 font-medium"
                  }`}
                >
                  {node.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
