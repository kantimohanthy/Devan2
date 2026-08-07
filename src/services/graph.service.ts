import { graphRepository } from "@/repositories/graph.repository";

export interface GraphNodeViewModel {
  id: string;
  label: string;
  domain: string;
  summary: string;
  detail?: string;
  state?: string;
  featured?: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdgeViewModel {
  from: string;
  to: string;
  relationship: string;
}

export interface GraphViewModel {
  nodes: GraphNodeViewModel[];
  edges: GraphEdgeViewModel[];
  metrics: {
    totalNodes: number;
    totalEdges: number;
    experimentCount: number;
    repositoryCount: number;
    conceptCount: number;
  };
}

export class GraphService {
  async getGraph(): Promise<GraphViewModel> {
    const raw = await graphRepository.getRawGraphData();

    const nodes: GraphNodeViewModel[] = raw.staticNodes.map((n) => ({
      id: n.id,
      label: n.label,
      domain: n.domain,
      summary: n.summary,
      detail: n.detail,
    }));

    const edges: GraphEdgeViewModel[] = raw.staticEdges.map((e) => ({
      from: e.from,
      to: e.to,
      relationship: (e as unknown as Record<string, unknown>).relationship as string || (e as unknown as Record<string, unknown>).label as string || "connected",
    }));

    // Dynamic node enrichment from database models
    for (const c of raw.concepts) {
      if (!nodes.some((n) => n.id === c.slug || n.label === c.title)) {
        nodes.push({
          id: c.slug,
          label: c.title,
          domain: c.domain,
          summary: c.summary,
          state: c.state,
        });
      }
    }

    for (const e of raw.experiments) {
      if (!nodes.some((n) => n.id === e.slug)) {
        nodes.push({
          id: e.slug,
          label: e.title,
          domain: e.category,
          summary: `${e.category} experiment`,
          state: e.state,
        });
      }
    }

    return {
      nodes,
      edges,
      metrics: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        experimentCount: raw.experiments.length,
        repositoryCount: raw.repositories.length,
        conceptCount: raw.concepts.length,
      },
    };
  }
}

export const graphService = new GraphService();
