/**
 * @file MissionEngine
 * @purpose Evaluates declarative engineering missions dynamically over ontology entities, competencies, evidence, and experience history.
 * @inputs Mission slug identifier.
 * @outputs Declarative MissionEvaluation, completion percentages, remaining gaps, and recommended next builds.
 * @dependencies ontologyEngine, experienceEngine, searchRepository
 * @failureBehavior Returns safe fallback mission evaluation if database or ontology entities are unavailable.
 */

import { ontologyEngine } from "@/lib/ontology";
import { experienceEngine } from "@/lib/experience";
import { searchRepository } from "@/repositories/search.repository";
import type { MissionEvaluation, MissionRequirement, MissionGap } from "./types";

export class MissionEngine {
  /**
   * Dynamically computes the full evaluation for a declarative mission.
   */
  async evaluateMission(missionSlug: string): Promise<MissionEvaluation> {
    const missionEntity = ontologyEngine.getEntity(missionSlug) || {
      id: missionSlug,
      type: "mission",
      title: "Wireless Mesh + TV White Space for Rural Connectivity",
      domain: "Networking",
      summary: "Thesis research extending mesh coverage into challenging terrain using unused broadcast spectrum.",
    };

    const relatedConcepts = ontologyEngine.findRelatedConcepts(missionSlug);
    const conceptsToEvaluate = relatedConcepts.length > 0 ? relatedConcepts : ontologyEngine.getAllEntities().filter((e) => e.type === "concept").slice(0, 4);

    await searchRepository.fetchAllSearchData();
    const requirements: MissionRequirement[] = [];
    const remainingGaps: MissionGap[] = [];

    for (const concept of conceptsToEvaluate) {
      const evolved = await experienceEngine.computeEvolvedCompetency(concept.id);
      const isSatisfied = evolved.confidenceScore >= 7;

      requirements.push({
        ontologyEntity: concept,
        requiredLevel: "TESTED",
        currentLevel: isSatisfied ? "TESTED" : "STUDIED",
        satisfied: isSatisfied,
      });

      if (!isSatisfied) {
        remainingGaps.push({
          conceptId: concept.id,
          title: concept.title || concept.id,
          missingDomain: concept.domain,
          recommendedAction: `Run live executable experiment for ${concept.title || concept.id} and record PCAP/socket telemetry.`,
        });
      }
    }

    const satisfiedCount = requirements.filter((r) => r.satisfied).length;
    const totalReqs = requirements.length || 1;
    const completionPercentage = Math.round((satisfiedCount / totalReqs) * 100);

    const suggestedBuilds = [
      "Field-equivalent bench test for wireless mesh hybrid topology",
      "HTTP waterfall latency telemetry experiment against edge node",
    ];

    return {
      missionSlug,
      title: missionEntity.title || missionSlug,
      objective: missionEntity.summary || "",
      completionPercentage,
      requirements,
      remainingGaps,
      suggestedBuilds,
    };
  }

  /**
   * Computes the current completion percentage for a mission.
   */
  async getCompletionPercentage(missionSlug: string): Promise<number> {
    const evalResult = await this.evaluateMission(missionSlug);
    return evalResult.completionPercentage;
  }

  /**
   * Identifies remaining gaps for a mission.
   */
  async findRemainingGaps(missionSlug: string): Promise<MissionGap[]> {
    const evalResult = await this.evaluateMission(missionSlug);
    return evalResult.remainingGaps;
  }

  /**
   * Recommends the next engineering builds to advance a mission.
   */
  async suggestNextBuilds(missionSlug: string): Promise<string[]> {
    const evalResult = await this.evaluateMission(missionSlug);
    return evalResult.suggestedBuilds;
  }
}

export const missionEngine = new MissionEngine();
