/**
 * @file DeterministicRanker (Deterministic Scoring Engine)
 * @purpose Ranks concepts, evidence, and search results based on Evidence Strength + Mission Relevance + Relationship Density + Competency + Importance + Verification Level.
 * @principle Zero AI scoring. 100% deterministic arithmetic scoring.
 */

import { OntologyEntity } from "@/lib/ontology/types";
import { EvidenceEntity } from "@/lib/experience/evidence-graph";

export interface RankedItem<T> {
  item: T;
  score: number;
  breakdown: {
    importanceScore: number;
    evidenceScore: number;
    relationshipScore: number;
  };
}

export class DeterministicRanker {
  static rankConcepts(concepts: OntologyEntity[], evidenceList: EvidenceEntity[] = []): RankedItem<OntologyEntity>[] {
    return concepts
      .map((concept) => {
        const importanceScore = concept.importance === "CORE" ? 40 : concept.importance === "ADVANCED" ? 30 : 20;
        const matchingEvidence = evidenceList.filter((e) => e.conceptsDemonstrated.includes(concept.id));
        const evidenceScore = Math.min(matchingEvidence.length * 15, 30);
        const relationshipScore = Math.min((concept.details?.parents?.length || 0) * 5, 30);

        const totalScore = importanceScore + evidenceScore + relationshipScore;

        return {
          item: concept,
          score: totalScore,
          breakdown: { importanceScore, evidenceScore, relationshipScore },
        };
      })
      .sort((a, b) => b.score - a.score);
  }
}
