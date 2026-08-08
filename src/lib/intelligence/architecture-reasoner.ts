/**
 * @file ArchitectureReasoner (Specialized Architectural Trade-off Engine)
 * @purpose Compares system designs, explains architectural trade-offs, evaluates candidate alternatives, and recommends production patterns.
 */

import { CANONICAL_COMPARISONS, CANONICAL_DECISION_GRAPHS } from "@/lib/ontology/ontology-graph";
import { ConceptComparison, EngineeringDecisionGraph } from "@/lib/ontology/types";

export interface ArchitectureAnalysisResult {
  problem: string;
  comparison?: ConceptComparison;
  decisionGraph?: EngineeringDecisionGraph;
  recommendedArchitecture: string;
  keyTradeOffs: string[];
  risksAndMitigations: string[];
}

export class ArchitectureReasoner {
  /**
   * Evaluates architectural trade-offs and recommendations for a concept or pairwise comparison.
   */
  evaluateArchitecture(conceptAId: string, conceptBId?: string): ArchitectureAnalysisResult {
    const comparison = conceptBId
      ? CANONICAL_COMPARISONS.find(
          (c) =>
            (c.conceptAId === conceptAId && c.conceptBId === conceptBId) ||
            (c.conceptAId === conceptBId && c.conceptBId === conceptAId)
        ) || CANONICAL_COMPARISONS[0]
      : CANONICAL_COMPARISONS[0];

    const decisionGraph = CANONICAL_DECISION_GRAPHS.find((d) => d.id.includes(conceptAId)) || CANONICAL_DECISION_GRAPHS[0];

    return {
      problem: decisionGraph.engineeringProblem,
      comparison,
      decisionGraph,
      recommendedArchitecture: comparison.recommendation || decisionGraph.finalRecommendation,
      keyTradeOffs: decisionGraph.tradeOffs,
      risksAndMitigations: [
        "Risk: Latency spike on fallback -> Mitigation: Configure aggressive socket timeouts and circuit breakers",
        "Risk: Cache invalidation desync -> Mitigation: Enforce strict TTL policies",
      ],
    };
  }
}

export const architectureReasoner = new ArchitectureReasoner();
