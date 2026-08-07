export type EntityType = "concept" | "tool" | "paper" | "project" | "question" | "person";

export type VerificationStatus = "UNVERIFIED" | "IN_TESTING" | "VERIFIED" | "DEFENDED";

export type RelationshipType =
  | "USES"
  | "IMPLEMENTS"
  | "PROVES"
  | "DEPENDS_ON"
  | "VALIDATES"
  | "CONTRADICTS"
  | "EXTENDS"
  | "INSPIRED_BY"
  | "GENERATED"
  | "OBSERVED_IN";

export interface OntologyEntity {
  id: string;
  name: string;
  type: EntityType;
  domain: string;
  status: VerificationStatus;
  confidence: number; // 0..100
  description: string;
  firstUsed?: string;
  experimentsCount?: number;
  relatedEntityIds: string[];
}

export interface OntologyClaim {
  id: string;
  statement: string;
  status: VerificationStatus;
  evidenceCount: number;
  confidence: number; // 0..100
  lastTested: string;
  domain: string;
  supportingExperimentIds: string[];
}

export interface EvidenceLedgerEntry {
  id: string;
  code: string; // e.g. "Evidence #0042"
  question: string;
  method: string;
  artifacts: string[];
  result: string;
  confidence: number;
  verified: boolean;
  timestamp: string;
}

export interface MissionSubtask {
  id: string;
  label: string;
  completed: boolean;
}

export interface OntologyMission {
  id: string;
  title: string;
  objective: string;
  progressPercent: number;
  domain: string;
  subtasks: MissionSubtask[];
}

export interface SemanticRelationship {
  fromId: string;
  toId: string;
  type: RelationshipType;
}

export interface ReasoningReplayStep {
  stage:
    | "Claim"
    | "Question"
    | "Hypothesis"
    | "Sources"
    | "Experiment"
    | "Terminal Recording"
    | "Packet Capture"
    | "Observations"
    | "Mistakes"
    | "Conclusion"
    | "Confidence"
    | "Knowledge Graph Updated";
  detail: string;
  timestamp: string;
  status: "pass" | "info" | "warn";
  artifactRef?: string;
}

export interface ReasoningReplayTrace {
  claimId: string;
  title: string;
  steps: ReasoningReplayStep[];
}
