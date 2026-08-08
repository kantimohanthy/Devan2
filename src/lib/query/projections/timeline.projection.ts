/**
 * @file TimelineProjection (Chronological Timeline ViewModel)
 */

import { ExperienceEventRecord } from "@/repositories/experience.repository";

export interface TimelineViewModel {
  events: ExperienceEventRecord[];
  totalEvents: number;
}

export class TimelineProjection {
  static createProjection(events: ExperienceEventRecord[]): TimelineViewModel {
    return {
      events,
      totalEvents: events.length,
    };
  }
}
