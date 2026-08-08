/**
 * @file ConceptQuery (Specialized Concept Query Module)
 */

import { ontologyEngine } from "@/lib/ontology";
import { OntologyEntity } from "@/lib/ontology/types";
import { QueryResult } from "./query-engine";

export class ConceptQuery {
  async execute(conceptId: string): Promise<QueryResult<OntologyEntity | undefined>> {
    const startTime = Date.now();
    const concept = ontologyEngine.getEntity(conceptId);
    const executionTimeMs = Date.now() - startTime;

    return {
      data: concept,
      metadata: {
        sourceEngines: ["OntologyEngine"],
        executionTimeMs,
        evidenceCount: concept?.details?.associatedEvidence?.length || 0,
        ontologyNodes: concept ? 1 : 0,
        confidence: concept ? 100 : 0,
        cacheStatus: "MISS",
      },
    };
  }
}

export const conceptQuery = new ConceptQuery();
