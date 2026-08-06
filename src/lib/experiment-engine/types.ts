import type { ArchitectureNode, Benchmark } from "@/data/artifact-schema";
import type { ProtocolSpan } from "@/lib/protocol-engine/types";

export type ExperimentCategory =
  | "networking"
  | "cloud"
  | "linux"
  | "distributed-systems"
  | "cybersecurity"
  | "ai";

export type IdentityDimension = "BUILD" | "UNDERSTAND" | "EXPLORE" | "LEAD";

export interface ExperimentRecord {
  id: string;
  slug: string;
  title: string;
  category: ExperimentCategory;
  identityDimension: IdentityDimension;
  objective: string;
  problem: string;
  motivation: string;
  status: "planned" | "executing" | "completed";
  evidenceScore: number;
  architecture: ArchitectureNode[];
  telemetry: ProtocolSpan[];
  benchmarks: Benchmark[];
  tradeoffs: string[];
  lessonsLearned: string[];
  githubRepo: string | null;
  relatedKnowledgeNodes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentExecutionParams {
  host?: string;
  iterations?: number;
  dimension?: number;
}
