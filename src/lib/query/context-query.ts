/**
 * @file ContextQuery (Specialized Context Inspector Query Module)
 */

import { ontologyEngine } from "@/lib/ontology";
import { CANONICAL_EXECUTION_STACKS } from "@/lib/intelligence/execution-stacks";
import { evidenceGraph } from "@/lib/experience/evidence-graph";
import { ContextInspectorProjection, ContextInspectorViewModel } from "./projections/context-inspector.projection";
import { QueryResult } from "./query-engine";

export class ContextQuery {
  async execute(conceptId = "networking.dns"): Promise<QueryResult<ContextInspectorViewModel>> {
    const startTime = Date.now();
    const concept = ontologyEngine.getEntity(conceptId) || ontologyEngine.getEntity("networking.dns");
    const targetId = concept?.id || "networking.dns";

    const relatedConcepts = ontologyEngine.findRelatedConcepts(targetId);
    const executionStacks = CANONICAL_EXECUTION_STACKS.filter((s) => s.conceptIds.includes(targetId) || s.conceptIds.some((c) => targetId.includes(c)));
    const allEvidence = evidenceGraph.getEvidenceEntities();
    const evidenceList = allEvidence.filter((e) => e.conceptsDemonstrated.some((c) => targetId.includes(c) || c.includes(targetId)));

    const projection = ContextInspectorProjection.createProjection({
      targetConcept: concept,
      relatedConcepts,
      executionStacks: executionStacks.length > 0 ? executionStacks : [CANONICAL_EXECUTION_STACKS[0]],
      evidenceList: evidenceList.length > 0 ? evidenceList : [allEvidence[0]],
    });

    const executionTimeMs = Date.now() - startTime;

    return {
      data: projection,
      metadata: {
        sourceEngines: ["OntologyEngine", "ExecutionIntelligence", "EvidenceGraph"],
        executionTimeMs,
        evidenceCount: projection.evidenceList.length,
        ontologyNodes: projection.relatedConcepts.length + 1,
        confidence: 100,
        cacheStatus: "MISS",
      },
    };
  }
}

export const contextQuery = new ContextQuery();
