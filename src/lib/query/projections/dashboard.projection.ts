/**
 * @file DashboardProjection (The Eye Situational Awareness ViewModel)
 */

import { IntelligenceSnapshotViewModel } from "@/services/intelligence-snapshot.service";

export type DashboardViewModel = IntelligenceSnapshotViewModel;

export class DashboardProjection {
  static createProjection(snapshot: IntelligenceSnapshotViewModel): DashboardViewModel {
    return { ...snapshot };
  }
}
