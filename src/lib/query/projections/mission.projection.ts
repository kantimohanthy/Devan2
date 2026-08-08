/**
 * @file MissionProjection (Mission Progress ViewModel)
 */

import { MissionEvaluation } from "@/lib/mission/types";

export type MissionViewModel = MissionEvaluation;

export class MissionProjection {
  static createProjection(evaluation: MissionEvaluation): MissionViewModel {
    return { ...evaluation };
  }
}
