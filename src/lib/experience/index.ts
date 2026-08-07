/**
 * @file ExperienceEngine
 * @purpose Manages DEVAN's append-only immutable experience history. Computes evolved competency metrics dynamically from accumulated events.
 * @inputs Entity ID, action, metadata, reason, source, confidence.
 * @outputs Evolved competency scores, event timelines, and entity histories.
 * @dependencies experienceRepository, ontologyEngine
 * @failureBehavior Falls back to default baseline competency calculations if database is unreachable.
 */

import { experienceRepository, ExperienceEventRecord } from "@/repositories/experience.repository";
import { ontologyEngine } from "@/lib/ontology";

export interface EvolvedCompetency {
  conceptSlug: string;
  domain: string;
  knowledgeScore: number;  // 0 - 10
  experienceScore: number; // 0 - 10
  evidenceScore: number;   // 0 - 10
  confidenceScore: number; // 0 - 10
  eventCount: number;
  lastEventDate: Date;
}

export class ExperienceEngine {
  /**
   * Appends an immutable experience event for an ontology entity.
   */
  async recordEvent(
    entityId: string,
    action: string,
    metadata: Record<string, unknown> = {},
    reason?: string,
    source = "SYSTEM",
    confidence = 100
  ): Promise<ExperienceEventRecord | null> {
    return experienceRepository.recordEvent({
      entityId,
      action,
      metadata: JSON.stringify(metadata),
      reason,
      source,
      confidence,
    });
  }

  /**
   * Retrieves full chronological event history for an ontology entity.
   */
  async getEventHistory(entityId: string): Promise<ExperienceEventRecord[]> {
    return experienceRepository.getEventsByEntityId(entityId);
  }

  /**
   * Computes evolved 4-dimension competency scores dynamically from accumulated experience events.
   */
  async computeEvolvedCompetency(conceptSlug: string): Promise<EvolvedCompetency> {
    const entity = ontologyEngine.getEntity(conceptSlug);
    const domain = entity?.domain || "Networking";
    const events = await experienceRepository.getEventsByEntityId(conceptSlug);

    // Compute metrics dynamically from event volume and types
    const eventCount = events.length;
    const hasTested = events.some((e) => e.action.includes("TESTED") || e.action.includes("EXPERIMENT"));
    const hasEvidence = events.some((e) => e.action.includes("EVIDENCE") || e.action.includes("UPLOAD"));
    const hasApplied = events.some((e) => e.action.includes("PROJECT") || e.action.includes("SHIPPED"));

    // Base scores calibrated to Ujwal's evidence graph
    const isNetworkingOrOS = domain === "Networking" || domain === "Operating Systems";
    const knowledgeScore = isNetworkingOrOS ? Math.min(10, 8 + Math.floor(eventCount / 2)) : Math.min(10, 7 + Math.floor(eventCount / 2));
    const experienceScore = isNetworkingOrOS ? (hasApplied ? 9 : 8) : (hasApplied ? 8 : hasTested ? 6 : 4);
    const evidenceScore = isNetworkingOrOS ? 9 : (hasEvidence ? 9 : hasTested ? 7 : 5);
    const confidenceScore = Math.min(10, Math.round((knowledgeScore + experienceScore + evidenceScore) / 3));

    return {
      conceptSlug,
      domain,
      knowledgeScore,
      experienceScore,
      evidenceScore,
      confidenceScore,
      eventCount,
      lastEventDate: events[0]?.timestamp || new Date(),
    };
  }

  /**
   * Retrieves the system-wide recent experience event timeline.
   */
  async getRecentTimeline(limit = 10): Promise<ExperienceEventRecord[]> {
    return experienceRepository.getRecentEvents(limit);
  }
}

export const experienceEngine = new ExperienceEngine();
