/**
 * @file OntologyEngine
 * @purpose Central domain model authority for DEVAN. The Ontology Engine is the single source of truth for all entities and relationships.
 * @inputs Entity ID or array of Entity IDs.
 * @outputs Graph traversals, prerequisites, dependents, career connections, and expanded neighborhoods.
 * @dependencies Canonical Ontology Definitions (ontology-graph.ts). UI-agnostic.
 * @failureBehavior Returns empty arrays or fallback entity objects gracefully when queried IDs are missing.
 */

import { CANONICAL_ENTITIES, CANONICAL_RELATIONSHIPS } from "./ontology-graph";
import type {
  OntologyEntity,
  OntologyRelationship,
  DependencyChain,
  ExpandedNeighborhood,
} from "./types";

export class OntologyEngine {
  private entitiesMap = new Map<string, OntologyEntity>();
  private relationshipsList: OntologyRelationship[] = [];

  constructor() {
    for (const entity of CANONICAL_ENTITIES) {
      this.entitiesMap.set(entity.id, entity);
    }
    this.relationshipsList = [...CANONICAL_RELATIONSHIPS];
  }

  /**
   * Retrieves an entity by its unique ID.
   */
  getEntity(entityId: string): OntologyEntity | undefined {
    return this.entitiesMap.get(entityId);
  }

  /**
   * Returns all registered entities in the ontology graph.
   */
  getAllEntities(): OntologyEntity[] {
    return Array.from(this.entitiesMap.values());
  }

  /**
   * Finds concepts directly related to the target entity.
   */
  findRelatedConcepts(entityId: string): OntologyEntity[] {
    const connectedIds = new Set<string>();
    for (const rel of this.relationshipsList) {
      if (rel.fromId === entityId) connectedIds.add(rel.toId);
      if (rel.toId === entityId) connectedIds.add(rel.fromId);
    }
    return Array.from(connectedIds)
      .map((id) => this.entitiesMap.get(id))
      .filter((e): e is OntologyEntity => e !== undefined && e.type === "concept");
  }

  /**
   * Finds prerequisite entities required before mastering the target entity.
   */
  findPrerequisites(entityId: string): OntologyEntity[] {
    const prereqIds = this.relationshipsList
      .filter((rel) => rel.fromId === entityId && (rel.type === "DEPENDS_ON" || rel.type === "PREREQUISITE_FOR"))
      .map((rel) => rel.toId);

    return prereqIds
      .map((id) => this.entitiesMap.get(id))
      .filter((e): e is OntologyEntity => e !== undefined);
  }

  /**
   * Finds entities that depend on the target entity.
   */
  findDependents(entityId: string): OntologyEntity[] {
    const dependentIds = this.relationshipsList
      .filter((rel) => rel.toId === entityId && (rel.type === "DEPENDS_ON" || rel.type === "PREREQUISITE_FOR"))
      .map((rel) => rel.fromId);

    return dependentIds
      .map((id) => this.entitiesMap.get(id))
      .filter((e): e is OntologyEntity => e !== undefined);
  }

  /**
   * Builds the complete dependency chain (prerequisites + dependents) for a target entity.
   */
  getDependencyChain(entityId: string): DependencyChain {
    return {
      targetId: entityId,
      prerequisites: this.findPrerequisites(entityId),
      dependents: this.findDependents(entityId),
    };
  }

  /**
   * Maps concepts to career engineering role profiles.
   */
  findCareerConnections(role: string): OntologyEntity[] {
    const roleLower = role.toLowerCase();
    let targetDomain = "Networking";
    if (roleLower.includes("systems") || roleLower.includes("kernel")) targetDomain = "Operating Systems";
    else if (roleLower.includes("platform") || roleLower.includes("cloud")) targetDomain = "Cloud";
    else if (roleLower.includes("ai") || roleLower.includes("ml")) targetDomain = "AI Systems";

    return this.getAllEntities().filter((e) => e.domain === targetDomain || e.domain === "Networking");
  }

  /**
   * Expands the topological neighborhood surrounding a set of root entity IDs.
   */
  expandKnowledgeGraph(rootEntityIds: string[]): ExpandedNeighborhood[] {
    return rootEntityIds.map((rootId) => {
      const rootEntity = this.getEntity(rootId) || {
        id: rootId,
        type: "concept",
        title: rootId,
        domain: "General",
        summary: "Entity",
      };

      const connected = this.findRelatedConcepts(rootId);
      const rels = this.relationshipsList.filter(
        (r) => r.fromId === rootId || r.toId === rootId
      );

      return {
        rootEntity,
        connectedEntities: connected,
        relationships: rels,
      };
    });
  }

  /**
   * Infers whether a topological path or relationship exists between two entities.
   */
  inferRelationships(fromId: string, toId: string): OntologyRelationship | null {
    const direct = this.relationshipsList.find(
      (r) => (r.fromId === fromId && r.toId === toId) || (r.fromId === toId && r.toId === fromId)
    );
    if (direct) return direct;

    // Check 2-hop path
    const fromRel = this.relationshipsList.filter((r) => r.fromId === fromId || r.toId === fromId);
    for (const r1 of fromRel) {
      const mid = r1.fromId === fromId ? r1.toId : r1.fromId;
      const r2 = this.relationshipsList.find(
        (r) => (r.fromId === mid && r.toId === toId) || (r.fromId === toId && r.toId === mid)
      );
      if (r2) {
        return {
          fromId,
          toId,
          type: "RELATED_TO",
          weight: 0.7,
          note: `Inferred relationship via intermediate entity [${mid}]`,
        };
      }
    }

    return null;
  }
}

export const ontologyEngine = new OntologyEngine();
