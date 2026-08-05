export type ArtifactStatus = "planned" | "building" | "completed";
export type Difficulty = "warm-up" | "solid" | "hard" | "brutal";

export interface ArchitectureNode {
  component: string;
  description: string;
}

export interface Benchmark {
  metric: string;
  value: string;
  context: string;
}

export interface Diagram {
  title: string;
  url: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface Artifact {
  id: string;
  title: string;
  summary: string;
  motivation: string;
  problem: string;

  architecture: ArchitectureNode[];
  technologies: string[];

  repository?: string;
  liveDemo?: string;

  benchmarks: Benchmark[];
  diagrams: Diagram[];
  screenshots?: string[];

  relatedConcepts: string[];
  lessonsLearned: string[];
  references: Reference[];

  status: ArtifactStatus;
  difficulty: Difficulty;
  engineeringDomain:
    | "networking"
    | "systems"
    | "ai"
    | "cloud"
    | "cybersecurity"
    | "distributed-systems";
  tags: string[];

  startedAt: string;
  completedAt?: string;
}
