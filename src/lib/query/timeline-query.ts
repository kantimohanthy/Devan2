/**
 * @file TimelineQuery (Specialized Chronological Timeline Query Module)
 */

import { experienceEngine } from "@/lib/experience";
import { ExperienceEventRecord } from "@/repositories/experience.repository";
import { QueryResult } from "./query-engine";

export class TimelineQuery {
  async execute(limit = 20): Promise<QueryResult<ExperienceEventRecord[]>> {
    const startTime = Date.now();
    const events = await experienceEngine.getRecentTimeline(limit);
    const executionTimeMs = Date.now() - startTime;

    return {
      data: events,
      metadata: {
        sourceEngines: ["ExperienceEngine"],
        executionTimeMs,
        evidenceCount: events.length,
        ontologyNodes: 0,
        confidence: 100,
        cacheStatus: "MISS",
      },
    };
  }
}

export const timelineQuery = new TimelineQuery();
