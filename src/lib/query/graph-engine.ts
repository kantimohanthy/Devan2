/**
 * @file GraphEngine (Graph Projection & Layout Engine)
 * @purpose Pre-computes 2D layout coordinates (x, y) and topological clusters for React graph visualization.
 */

import { AtlasViewModel, AtlasNode, AtlasEdge } from "./projections/atlas.projection";

export interface PositionedGraphNode extends AtlasNode {
  x: number;
  y: number;
  color: string;
}

export interface PositionedGraphEdge extends AtlasEdge {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export interface GraphLayoutResult {
  nodes: PositionedGraphNode[];
  edges: PositionedGraphEdge[];
  bounds: { width: number; height: number };
}

export class GraphLayoutEngine {
  static computeLayout(atlasData: AtlasViewModel, width = 800, height = 600): GraphLayoutResult {
    const nodes = atlasData.nodes;
    const edges = atlasData.edges;
    const nodeCount = nodes.length;
    const radius = Math.min(width, height) * 0.35;
    const centerX = width / 2;
    const centerY = height / 2;

    const domainColors: Record<string, string> = {
      Networking: "#4F8CFF",
      Linux: "#10B981",
      "Operating Systems": "#10B981",
      Cloud: "#F59E0B",
      "AI Systems": "#EC4899",
      General: "#8A9098",
    };

    const nodePosMap = new Map<string, { x: number; y: number }>();

    const positionedNodes: PositionedGraphNode[] = nodes.map((node, index) => {
      const angle = (index / Math.max(nodeCount, 1)) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      nodePosMap.set(node.id, { x, y });

      return {
        ...node,
        x,
        y,
        color: domainColors[node.domain] || "#4F8CFF",
      };
    });

    const positionedEdges: PositionedGraphEdge[] = edges.map((edge) => {
      const sourcePos = nodePosMap.get(edge.source) || { x: centerX, y: centerY };
      const targetPos = nodePosMap.get(edge.target) || { x: centerX, y: centerY };

      return {
        ...edge,
        sourceX: sourcePos.x,
        sourceY: sourcePos.y,
        targetX: targetPos.x,
        targetY: targetPos.y,
      };
    });

    return {
      nodes: positionedNodes,
      edges: positionedEdges,
      bounds: { width, height },
    };
  }
}
