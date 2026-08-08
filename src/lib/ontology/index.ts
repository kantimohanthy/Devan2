/**
 * @file OntologyEngine
 * @purpose Central domain model authority for DEVAN. The Ontology Engine is the single source of truth for all entities and relationships.
 * @inputs Entity ID or array of Entity IDs.
 * @outputs Graph traversals, prerequisites, dependents, career connections, expanded neighborhoods, and topological prerequisite paths.
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
   * Dynamically registers a new entity into the ontology map.
   */
  addEntity(entity: OntologyEntity): void {
    this.entitiesMap.set(entity.id, entity);
  }

  /**
   * Dynamically registers a new relationship edge into the ontology list.
   */
  addRelationship(relationship: OntologyRelationship): void {
    this.relationshipsList.push(relationship);
  }

  /**
   * Retrieves an entity by its unique ID.
   */
  getEntity(entityId: string): OntologyEntity | undefined {
    // Support lookup by namespaced ID or legacy slug fallback
    if (this.entitiesMap.has(entityId)) return this.entitiesMap.get(entityId);
    
    // Fallback search by title or endsWith slug
    return Array.from(this.entitiesMap.values()).find(
      (e) => e.id === entityId || e.id.endsWith(`.${entityId}`) || e.id.includes(entityId)
    );
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
    const entity = this.getEntity(entityId);
    const targetId = entity?.id || entityId;

    const connectedIds = new Set<string>();
    for (const rel of this.relationshipsList) {
      if (rel.fromId === targetId) connectedIds.add(rel.toId);
      if (rel.toId === targetId) connectedIds.add(rel.fromId);
    }
    return Array.from(connectedIds)
      .map((id) => this.entitiesMap.get(id))
      .filter((e): e is OntologyEntity => e !== undefined && e.type === "concept");
  }

  /**
   * Finds prerequisite entities required before mastering the target entity.
   */
  findPrerequisites(entityId: string): OntologyEntity[] {
    const entity = this.getEntity(entityId);
    const targetId = entity?.id || entityId;

    const prereqIds = this.relationshipsList
      .filter((rel) => rel.fromId === targetId && (rel.type === "DEPENDS_ON" || rel.type === "PREREQUISITE_FOR"))
      .map((rel) => rel.toId);

    return prereqIds
      .map((id) => this.entitiesMap.get(id))
      .filter((e): e is OntologyEntity => e !== undefined);
  }

  /**
   * Finds entities that depend on the target entity.
   */
  findDependents(entityId: string): OntologyEntity[] {
    const entity = this.getEntity(entityId);
    const targetId = entity?.id || entityId;

    const dependentIds = this.relationshipsList
      .filter((rel) => rel.toId === targetId && (rel.type === "DEPENDS_ON" || rel.type === "PREREQUISITE_FOR"))
      .map((rel) => rel.fromId);

    return dependentIds
      .map((id) => this.entitiesMap.get(id))
      .filter((e): e is OntologyEntity => e !== undefined);
  }

  /**
   * Automatically computes the complete ordered prerequisite traversal path to master a target concept.
   * E.g. Kubernetes -> Containers -> Namespaces -> cgroups -> Processes -> POSIX Sockets -> TCP/IP -> DNS.
   */
  getPrerequisiteTraversalPath(targetEntityId: string): OntologyEntity[] {
    const visited = new Set<string>();
    const orderedPath: OntologyEntity[] = [];

    const traverse = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);

      const prereqs = this.findPrerequisites(id);
      for (const p of prereqs) {
        traverse(p.id);
      }

      const entity = this.getEntity(id);
      if (entity && !orderedPath.some((e) => e.id === entity.id)) {
        orderedPath.push(entity);
      }
    };

    const rootEntity = this.getEntity(targetEntityId);
    if (rootEntity) traverse(rootEntity.id);

    return orderedPath;
  }

  /**
   * Builds the complete dependency chain (prerequisites + dependents) for a target entity.
   */
  getDependencyChain(entityId: string): DependencyChain {
    const entity = this.getEntity(entityId);
    const targetId = entity?.id || entityId;

    return {
      targetId,
      prerequisites: this.findPrerequisites(targetId),
      dependents: this.findDependents(targetId),
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

      const connected = this.findRelatedConcepts(rootEntity.id);
      const rels = this.relationshipsList.filter(
        (r) => r.fromId === rootEntity.id || r.toId === rootEntity.id
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
    const fromEntity = this.getEntity(fromId);
    const toEntity = this.getEntity(toId);

    const fId = fromEntity?.id || fromId;
    const tId = toEntity?.id || toId;

    const direct = this.relationshipsList.find(
      (r) => (r.fromId === fId && r.toId === tId) || (r.fromId === tId && r.toId === fId)
    );
    if (direct) return direct;

    // Check 2-hop path
    const fromRel = this.relationshipsList.filter((r) => r.fromId === fId || r.toId === fId);
    for (const r1 of fromRel) {
      const mid = r1.fromId === fId ? r1.toId : r1.fromId;
      const r2 = this.relationshipsList.find(
        (r) => (r.fromId === mid && r.toId === tId) || (r.fromId === tId && r.toId === mid)
      );
      if (r2) {
        return {
          fromId: fId,
          toId: tId,
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
