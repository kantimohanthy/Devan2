/**
 * @file AtlasProjection (Graph-Ready Structure ViewModel for Interactive Graph UI)
 */

import { OntologyEntity, OntologyRelationship } from "@/lib/ontology/types";

export interface AtlasNode {
  id: string;
  label: string;
  domain: string;
  importance?: string;
  evidenceCount: number;
}

export interface AtlasEdge {
  source: string;
  target: string;
  type: string;
}

export interface AtlasViewModel {
  nodes: AtlasNode[];
  edges: AtlasEdge[];
  totalNodes: number;
  totalEdges: number;
}

export class AtlasProjection {
  static createProjection(concepts: OntologyEntity[], relationships: OntologyRelationship[] = []): AtlasViewModel {
    const nodes: AtlasNode[] = concepts.map((c) => ({
      id: c.id,
      label: c.title || c.id,
      domain: c.domain,
      importance: c.importance,
      evidenceCount: c.details?.associatedEvidence?.length || 0,
    }));

    const edges: AtlasEdge[] = relationships.map((r) => ({
      source: r.fromId,
      target: r.toId,
      type: r.type,
    }));

    return {
      nodes,
      edges,
      totalNodes: nodes.length,
      totalEdges: edges.length,
    };
  }
}
