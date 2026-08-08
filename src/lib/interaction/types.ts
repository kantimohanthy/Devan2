/**
 * @file Primary Interaction Model Definitions
 * @purpose Defines the product interaction model triad: THE EYE (Observe), THE ATLAS (Understand), THE FORGE (Build).
 */

export type ExperienceMode = "THE_EYE" | "THE_ATLAS" | "THE_FORGE";

export interface EyeExperienceView {
  mode: "THE_EYE";
  purpose: "Observe live engineering status, mission deck, competency radar, and evidence summary.";
  activeMissionSlug: string;
  competencyRadarSummary: {
    knowledgeAvg: number;
    experienceAvg: number;
    evidenceAvg: number;
    confidenceAvg: number;
  };
  recentEvidenceCount: number;
  recommendedNextActions: string[];
}

export interface AtlasExperienceView {
  mode: "THE_ATLAS";
  purpose: "Interactively explore and understand the topology of concepts, capabilities, dependencies, and evidence.";
  selectedDomain?: string;
  selectedConceptId?: string;
  expandedNeighborhoodSize: number;
  activeFilterCapabilities: string[];
}

export interface ForgeExperienceView {
  mode: "THE_FORGE";
  purpose: "Executable engineering workspace running experiments, protocol traces, labs, and evidence generation.";
  activeExperimentSlug?: string;
  targetHost?: string;
  latestProtocolTraceMs?: number;
  generatedEvidenceCount: number;
}
