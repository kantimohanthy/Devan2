/**
 * @file DashboardQuery (Specialized Dashboard Snapshot Query Module)
 */

import { intelligenceSnapshotService, IntelligenceSnapshotViewModel } from "@/services/intelligence-snapshot.service";
import { QueryResult } from "./query-engine";

export class DashboardQuery {
  async execute(): Promise<QueryResult<IntelligenceSnapshotViewModel>> {
    const startTime = Date.now();
    const snapshot = await intelligenceSnapshotService.getSnapshot();
    const executionTimeMs = Date.now() - startTime;

    return {
      data: snapshot,
      metadata: {
        sourceEngines: ["IntelligenceSnapshotService", "OntologyEngine", "ExperienceEngine", "MissionEngine"],
        executionTimeMs,
        evidenceCount: snapshot.systemMetrics.totalEvidenceArtifacts,
        ontologyNodes: snapshot.systemMetrics.totalConceptsTracked,
        confidence: 100,
        cacheStatus: "MISS",
      },
    };
  }
}

export const dashboardQuery = new DashboardQuery();
