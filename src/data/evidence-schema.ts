export interface EvidenceSource {
  id: string;
  type: "rfc" | "book" | "paper" | "spec";
  label: string;
  url: string;
  accessedDate: string;
}

export interface EvidenceConcept {
  id: string;
  title: string;
  domain: string;
  sourceIds: string[];
  description: string;
}

export interface EvidenceQuestion {
  id: string;
  conceptId: string;
  text: string;
  hypothesis: string;
  date: string;
}

export interface EvidenceExperiment {
  id: string;
  questionId: string;
  date: string;
  method: string;
  environment: string;
}

export interface EvidenceOutcome {
  id: string;
  experimentId: string;
  observedResult: string;
  expectedVsActual: string;
  whatBrokeOrSurprised: string;
  rawArtifactRefs: string[];
}

export type RawArtifactType = "terminal-log" | "pcap" | "config" | "code";

export interface RawArtifact {
  id: string;
  outcomeId: string;
  type: RawArtifactType;
  path: string;
  description: string;
}

export type EvidenceState =
  | "ENCOUNTERED"
  | "STUDIED"
  | "IMPLEMENTED"
  | "TESTED"
  | "APPLIED"
  | "DEFENDED";

export interface EvidenceRecord {
  source: EvidenceSource;
  concept: EvidenceConcept;
  question: EvidenceQuestion;
  experiment: EvidenceExperiment;
  outcome: EvidenceOutcome;
  artifacts: RawArtifact[];
}

/**
 * Derives evidence state dynamically from logged record completeness
 */
export function deriveEvidenceState(record: EvidenceRecord): EvidenceState {
  if (!record.outcome || !record.outcome.observedResult) {
    return record.concept ? "STUDIED" : "ENCOUNTERED";
  }
  if (record.artifacts.length > 0 && record.outcome.expectedVsActual.includes("Confirmed")) {
    return "TESTED";
  }
  return "IMPLEMENTED";
}
