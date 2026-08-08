/**
 * @file EvidenceQuery (Specialized Evidence Query Module)
 */

import { evidenceGraph, EvidenceEntity } from "@/lib/experience/evidence-graph";
import { QueryResult } from "./query-engine";

export class EvidenceQuery {
  async execute(evidenceId?: string): Promise<QueryResult<EvidenceEntity[]>> {
    const startTime = Date.now();
    const allEvidence = evidenceGraph.getEvidenceEntities();
    const data = evidenceId ? allEvidence.filter((e) => e.id === evidenceId) : allEvidence;
    const executionTimeMs = Date.now() - startTime;

    return {
      data,
      metadata: {
        sourceEngines: ["EvidenceGraph"],
        executionTimeMs,
        evidenceCount: data.length,
        ontologyNodes: 0,
        confidence: 100,
        cacheStatus: "MISS",
      },
    };
  }
}

export const evidenceQuery = new EvidenceQuery();
