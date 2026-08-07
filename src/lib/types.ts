export type EvidenceState =
  | "ENCOUNTERED"
  | "STUDIED"
  | "IMPLEMENTED"
  | "TESTED"
  | "APPLIED"
  | "DEFENDED";

export type EntityType =
  | "Concept"
  | "Experiment"
  | "Decision"
  | "Repository"
  | "Project"
  | "Mission"
  | "Evidence"
  | "Source";

export interface ChipRef {
  type: EntityType;
  title: string;
  meta?: string;
  href: string;
  state?: EvidenceState;
  unverified?: boolean;
}

export interface Concept {
  slug: string;
  domain: string;
  topic: string;
  name: string;
  description: string;
  state?: EvidenceState;
  unverified?: boolean;
  sources: ChipRef[];
  experiments: ChipRef[];
  evidence: ChipRef[];
  decisions: ChipRef[];
  related: ChipRef[];
  createdAt: string;
  stateChangedAt?: string;
}

export interface ExperimentStep {
  command: string;
}

export interface Experiment {
  slug: string;
  name: string;
  description: string;
  state: EvidenceState;
  executable: boolean;
  lastRun?: string;
  commands: string[];
  outputLines: string[];
  timelineSpans?: { label: string; ms: number }[];
  concepts: ChipRef[];
  evidenceProduced: ChipRef[];
  repositories: ChipRef[];
  createdAt: string;
}

export interface DecisionAlternative {
  name: string;
  tradeoff: string;
}

export interface Decision {
  slug: string;
  question: string;
  summary: string;
  requirements: string;
  alternatives: DecisionAlternative[];
  decision: string;
  implementation: string;
  lessons?: string;
  future?: string;
  hasAlternatives: boolean;
  decidedDuring?: string;
  verification?: string;
}

export interface Repository {
  slug: string;
  name: string;
  description: string;
  lastCommit: string;
  ciStatus: "passing" | "failing" | "unknown";
  openIssues: number;
  architectureNote: string;
  concepts: ChipRef[];
  decisions: ChipRef[];
  experiments: ChipRef[];
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  repositories: ChipRef[];
  concepts: ChipRef[];
  experiments: ChipRef[];
  decisions: ChipRef[];
  openQuestions: string[];
}

export interface MissionObjective {
  label: string;
  done: boolean;
}

export interface Mission {
  slug: string;
  name: string;
  objective: string;
  objectives: MissionObjective[];
  focus: ChipRef[];
}
