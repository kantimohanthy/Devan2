"use client";

import { useMemo, useState, useRef } from "react";
import {
  HIERARCHICAL_KNOWLEDGE_NODES,
  HIERARCHICAL_KNOWLEDGE_EDGES,
  KnowledgeNodeKind,
} from "@/data/hierarchical-graph";
import { getDefaultVisibleNodeIds } from "@/lib/graph/default-view";
import type { FilterState } from "./FilterRail";
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

// Initial position calculations for Root Categories and Children
function calculateInitialPositions(): NodeItem[] {
  const rootCategoryPositions: Record<string, { x: number; y: number }> = {
    "cat-networking": { x: 300, y: 220 },
    "cat-ai": { x: 750, y: 220 },
    "cat-[#distributed]": { x: 300, y: 520 },
    "cat-security": { x: 750, y: 520 },
    "cat-space": { x: 525, y: 370 },
  };

  const featuredIds = new Set([
    "cat-networking",
    "node-rfc1035",
    "node-dns-wire-format",
    "node-exp-dig-trace",
    "cat-ai",
    "node-pattern-adversarial",
    "node-repo-sentinel",
    "cat-[#distributed]",
  ]);

  return HIERARCHICAL_KNOWLEDGE_NODES.map((n) => {
    const featured = featuredIds.has(n.id);
    if (n.kind === "root-category") {
      const pos = rootCategoryPositions[n.id] ?? { x: 500, y: 350 };
      return { ...n, featured, lastActivity: "2026-08-07", x: pos.x, y: pos.y };
    }

    const parent = HIERARCHICAL_KNOWLEDGE_NODES.find((p) => p.id === n.parentId);
    const parentPos = parent ? (rootCategoryPositions[parent.id] ?? { x: 500, y: 350 }) : { x: 500, y: 350 };

    const offsetAngle = Math.random() * 2 * Math.PI;
    const offsetDist = 120 + Math.random() * 60;
    const x = Math.round(parentPos.x + offsetDist * Math.cos(offsetAngle));
    const y = Math.round(parentPos.y + offsetDist * Math.sin(offsetAngle));

    return { ...n, featured, lastActivity: "2026-08-07", x, y };
  });
}

const INITIAL_NODES = calculateInitialPositions();

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
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<string>>(
    new Set(["cat-networking", "cat-ai"])
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const queryLower = searchQuery.toLowerCase().trim();

  // Curated 8-node visible set vs all nodes
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

  // Determine visibility of children based on curated view + expandable roots
  const visibleNodes = useMemo(() => {
    return nodes.filter((n) => {
      // If not showing all nodes and no search query, filter by curated default visible set
      if (!filters.showAllNodes && !queryLower && !defaultVisibleSet.has(n.id)) {
        return false;
      }

      if (n.kind === "root-category") return true;
      if (!n.parentId) return true;

      // Find root ancestor
      let currParentId: string | undefined = n.parentId;
      while (currParentId) {
        if (currParentId.startsWith("cat-")) {
          return expandedCategoryIds.has(currParentId);
        }
        const parentNode = nodes.find((p) => p.id === currParentId);
        currParentId = parentNode?.parentId;
      }
      return true;
    });
  }, [nodes, expandedCategoryIds, filters.showAllNodes, queryLower, defaultVisibleSet]);

  // Evaluate matching status per node
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

  // Active connected node IDs
  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (selectedNodeId) {
      set.add(selectedNodeId);
      HIERARCHICAL_KNOWLEDGE_EDGES.forEach((e) => {
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
    setNodes(calculateInitialPositions());
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
      {/* Zoom / Pan Controls HUD */}
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

      {/* Main Canvas Container with Pan & Zoom Transform */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: draggingNodeId || isPanning ? "none" : "transform 0.15s ease-out",
        }}
        className="absolute inset-0 h-full w-full"
      >
        {/* Hierarchical Relationship Edge Layer */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none stroke-[#20252B]">
          {HIERARCHICAL_KNOWLEDGE_EDGES.map((edge, idx) => {
            const source = visibleNodes.find((n) => n.id === edge.fromId);
            const target = visibleNodes.find((n) => n.id === edge.toId);
            if (!source || !target) return null;

            const isConnectedToSelected =
              selectedNodeId && (edge.fromId === selectedNodeId || edge.toId === selectedNodeId);
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

                {/* Edge Semantic Text Label */}
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
                  {edge.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {visibleNodes.map((node) => {
          const isRoot = node.kind === "root-category";
          const isExpanded = expandedCategoryIds.has(node.id);
          const isSelected = selectedNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);
          const isMatching = nodeMatches.get(node.id) ?? true;

          // Shape encoding
          let shapeClasses = "rounded-lg";
          if (isRoot) shapeClasses = "rounded-2xl border-2 shadow-[0_0_25px_rgba(79,140,255,0.3)]";
          else if (node.kind === "artifact") shapeClasses = "rotate-45 rounded-sm";
          else if (node.kind === "repository") shapeClasses = "rounded-md";
          else if (node.kind === "rfc" || node.kind === "paper") shapeClasses = "rounded-full";

          // Sizing: Roots are larger
          const sizePx = isRoot ? 64 : 42 + Math.round((node.density / 100) * 16);

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
              {/* Node Body */}
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
                <div className={node.kind === "artifact" ? "-rotate-45 flex items-center gap-1" : "flex flex-col items-center gap-0.5"}>
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

              {/* Node Label Below */}
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
