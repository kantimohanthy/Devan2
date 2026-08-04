export type NodeId =
  | "networking"
  | "ai"
  | "cloud"
  | "cybersecurity"
  | "systems"
  | "finance"
  | "space"
  | "distributed-systems";

export interface KnowledgeNode {
  id: NodeId;
  label: string;
  summary: string;
  detail: string;
  projects: string[];
  x?: number;
  y?: number;
}

export interface KnowledgeEdge {
  from: NodeId;
  to: NodeId;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: "Shipped" | "In build" | "Submitted" | "Live";
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  lessons: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  domain: NodeId[];
  atmosphere?: { tint: string; label: string };
}

export interface ResearchItem {
  type: "Thesis" | "Whitepaper" | "Field notes" | "Summary";
  title: string;
  context: string;
  description: string;
  tags: string[];
}

export interface Experiment {
  title: string;
  status: "In progress" | "Blocked" | "Complete" | "Paused";
  progress: number;
  description: string;
  tags: string[];
}

export interface Venture {
  name: string;
  tagline: string;
  problem: string;
  market: string;
  stage: string;
  notes: string;
  vision: string;
}

export interface Article {
  title: string;
  dek: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export interface TimelineEntry {
  date: string;
  category: "Education" | "Project" | "Research" | "Award" | "Event";
  title: string;
  description: string;
}

export interface NetworkNode {
  name: string;
  role: string;
  context: string;
}
