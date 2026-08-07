"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { getDefaultVisibleNodeIds } from "@/lib/graph/default-view";
import type { FilterState } from "./FilterRail";
import { graphClient } from "@/lib/api-client";
import type { GraphEdgeViewModel } from "@/services/graph.service";
import {
  Network,
  Zap,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Wrench,
  ChevronRight,
  ChevronDown,
  Layers,
  Terminal,
  FileCode2,
  FolderGit2,
  BookOpen,
} from "lucide-react";

export type KnowledgeNodeKind =
  | "root-category"
  | "rfc"
  | "paper"
  | "protocol"
  | "experiment"
  | "artifact"
  | "repository"
  | "benchmark"
  | "pattern"
  | "technology"
  | "concept";

export interface NodeItem {
  id: string;
  label: string;
  kind: KnowledgeNodeKind;
  parentId?: string;
  summary: string;
  detail: string;
  domain: string;
  evidenceDepth: number;
  density: number;
  featured?: boolean;
  lastActivity?: string;
  x: number;
  y: number;
}

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
  const [nodes, setNodes] = useState<NodeItem[]>([]);
  const [edges, setEdges] = useState<GraphEdgeViewModel[]>([]);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<string>>(
    new Set(["cat-networking", "cat-ai"])
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    graphClient.getGraph().then((data) => {
      setEdges(data.edges);
      const rootCategoryPositions: Record<string, { x: number; y: number }> = {
        "cat-networking": { x: 300, y: 220 },
        "cat-ai": { x: 750, y: 220 },
        "cat-[#distributed]": { x: 300, y: 520 },
        "cat-security": { x: 750, y: 520 },
        "cat-space": { x: 525, y: 370 },
      };

      const items: NodeItem[] = data.nodes.map((n) => {
        const isRoot = n.id.startsWith("cat-");
        const pos = isRoot ? (rootCategoryPositions[n.id] ?? { x: 500, y: 350 }) : { x: 500 + (Math.random() * 200 - 100), y: 350 + (Math.random() * 200 - 100) };
        return {
          id: n.id,
          label: n.label,
          kind: isRoot ? "root-category" : "concept",
          summary: n.summary,
          detail: n.detail || n.summary,
          domain: n.domain,
          evidenceDepth: 4,
          density: 85,
          featured: isRoot || n.featured,
          x: pos.x,
          y: pos.y,
        };
      });
      setNodes(items);
    }).catch(console.error);
  }, []);

  const queryLower = searchQuery.toLowerCase().trim();

  const defaultVisibleSet = useMemo(
    () => getDefaultVisibleNodeIds(nodes),
    [nodes]
  );

  const toggleCategoryExpanded = (categoryId: string) => {
    setExpandedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const visibleNodes = useMemo(() => {
    return nodes.filter((n) => {
      if (!filters.showAllNodes && !queryLower && !defaultVisibleSet.has(n.id)) {
        return false;
      }
      if (n.kind === "root-category") return true;
      if (!n.parentId) return true;
      return true;
    });
  }, [nodes, filters.showAllNodes, queryLower, defaultVisibleSet]);

  const nodeMatches = useMemo(() => {
    const map = new Map<string, boolean>();
    nodes.forEach((n) => {
      const matchesDomain = filters.domains.size === 0 || filters.domains.has(n.domain);
      const matchesQuery =
        !queryLower ||
        n.label.toLowerCase().includes(queryLower) ||
        n.summary.toLowerCase().includes(queryLower);

      map.set(n.id, matchesDomain && matchesQuery);
    });
    return map;
  }, [filters, queryLower, nodes]);

  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (selectedNodeId) {
      set.add(selectedNodeId);
      edges.forEach((e) => {
        if (e.from === selectedNodeId) set.add(e.to);
        if (e.to === selectedNodeId) set.add(e.from);
      });
    }
    return set;
  }, [selectedNodeId, edges]);

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
  };

  const renderKindIcon = (kind: KnowledgeNodeKind) => {
    switch (kind) {
      case "root-category":
        return <Layers size={14} className="text-[#4F8CFF]" />;
      case "rfc":
      case "paper":
        return <BookOpen size={12} className="text-[#4F8CFF]" />;
      case "protocol":
        return <Network size={12} className="text-[#4F8CFF]" />;
      case "experiment":
        return <Terminal size={12} className="text-[#4F8CFF]" />;
      case "artifact":
        return <FileCode2 size={12} className="text-[#4F8CFF]" />;
      case "repository":
        return <FolderGit2 size={12} className="text-[#4F8CFF]" />;
      case "benchmark":
        return <Zap size={12} className="text-[#4F8CFF]" />;
      case "technology":
        return <Wrench size={12} className="text-[#8A9098]" />;
      default:
        return <FileText size={12} />;
    }
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDownCanvas}
      className="relative flex-1 h-full w-full bg-[#0A0B0D] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-xl border border-[#20252B] bg-[#101317]/90 px-3 py-1.5 backdrop-blur-md text-xs font-mono text-[#8A9098]">
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
        <span className="h-3 w-px bg-[#20252B]" />
        <span className="text-[10px] text-[#4F8CFF] font-semibold">
          {filters.showAllNodes ? `All Nodes (${visibleNodes.length})` : `Curated View (${visibleNodes.length} nodes)`}
        </span>
      </div>

      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: draggingNodeId || isPanning ? "none" : "transform 0.15s ease-out",
        }}
        className="absolute inset-0 h-full w-full"
      >
        <svg className="absolute inset-0 h-full w-full pointer-events-none stroke-[#20252B]">
          {edges.map((edge, idx) => {
            const source = visibleNodes.find((n) => n.id === edge.from);
            const target = visibleNodes.find((n) => n.id === edge.to);
            if (!source || !target) return null;

            const isConnectedToSelected =
              selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId);
            const isBothMatching = nodeMatches.get(source.id) && nodeMatches.get(target.id);

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

                <text
                  x={midX}
                  y={midY}
                  fill={isConnectedToSelected ? "#4F8CFF" : "#8A9098"}
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                  dy="-3"
                  className="pointer-events-none font-bold select-none opacity-80"
                >
                  {edge.relationship}
                </text>
              </g>
            );
          })}
        </svg>

        {visibleNodes.map((node) => {
          const isRoot = node.kind === "root-category";
          const isExpanded = expandedCategoryIds.has(node.id);
          const isSelected = selectedNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);
          const isMatching = nodeMatches.get(node.id) ?? true;

          let shapeClasses = "rounded-lg";
          if (isRoot) shapeClasses = "rounded-2xl border-2 shadow-[0_0_25px_rgba(79,140,255,0.3)]";

          const sizePx = isRoot ? 64 : 48;

          const handleClickNode = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (isRoot) {
              toggleCategoryExpanded(node.id);
            } else {
              onSelectNode(node);
            }
          };

          return (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDownNode(e, node.id)}
              onClick={handleClickNode}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)",
                width: `${sizePx}px`,
                height: `${sizePx}px`,
              }}
              className={`absolute flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
                isMatching ? "opacity-100" : "opacity-15 pointer-events-none"
              }`}
            >
              <div
                className={`w-full h-full flex flex-col items-center justify-center border backdrop-blur-md transition-all duration-200 ${shapeClasses} ${
                  isRoot
                    ? "border-[#4F8CFF] bg-[#101317] hover:bg-[#4F8CFF]/20"
                    : isSelected
                    ? "border-[#4F8CFF] bg-[#4F8CFF]/25 shadow-[0_0_25px_rgba(79,140,255,0.5)] scale-110"
                    : isConnected
                    ? "border-[#4F8CFF]/70 bg-[#101317]"
                    : "border-[#20252B] bg-[#101317]/90 hover:border-[#8A9098]"
                }`}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-1">
                    {renderKindIcon(node.kind)}
                    {isRoot && (
                      <span className="text-[#4F8CFF]">
                        {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#F5F5F5] uppercase truncate px-1">
                    {node.label.substring(0, 3)}
                  </span>
                </div>
              </div>

              <div className="absolute top-[105%] mt-1 whitespace-nowrap pointer-events-none text-center">
                <p
                  className={`font-mono text-[11px] tracking-tight transition-colors ${
                    isRoot
                      ? "text-[#4F8CFF] font-bold uppercase tracking-wider text-[11px]"
                      : isSelected
                      ? "text-[#4F8CFF] font-bold"
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
