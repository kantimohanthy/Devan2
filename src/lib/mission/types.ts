/**
 * @file Mission Types & Data Contracts
 * @purpose Defines the data structures for declarative mission evaluation in DEVAN.
 */

import type { OntologyEntity } from "@/lib/ontology/types";

export interface MissionRequirement {
  ontologyEntity: OntologyEntity;
  requiredLevel: "STUDIED" | "TESTED" | "APPLIED" | "MASTERED";
  currentLevel: "NOT_STARTED" | "STUDIED" | "TESTED" | "APPLIED" | "MASTERED";
  satisfied: boolean;
}

export interface MissionGap {
  conceptId: string;
  title: string;
  missingDomain: string;
  recommendedAction: string;
}

export interface MissionEvaluation {
  missionSlug: string;
  title: string;
  objective: string;
  completionPercentage: number;
  requirements: MissionRequirement[];
  remainingGaps: MissionGap[];
  suggestedBuilds: string[];
}
