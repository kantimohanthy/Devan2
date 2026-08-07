/**
 * @file Reasoning Types & Shared Contract
 * @purpose Defines the uniform contract returned by all specialized reasoners in DEVAN's intelligence pipeline.
 */

export interface EvidenceRef {
  type: string;
  title: string;
  href: string;
  state?: string;
}

export interface ReasoningResult {
  reasonerName: string;
  score: number; // 0 - 100 overall dimension score
  summary: string;
  insights: string[];
  evidenceRefs: EvidenceRef[];
  recommendations: string[];
  metadata?: Record<string, unknown>;
}

export interface ReasonerInputContext {
  prompt: string;
  intent: string;
  concepts: Array<{ slug: string; title: string; domain: string; summary: string }>;
  experiments: Array<{ slug: string; title: string; category: string; state?: string }>;
  projects: Array<{ slug: string; title: string; summary: string }>;
  repositories: Array<{ slug: string; name: string; description: string; ciStatus?: string }>;
  competencies: Array<{ conceptSlug: string; knowledgeScore: number; experienceScore: number; evidenceScore: number; confidenceScore: number }>;
}

export interface IReasoner {
  readonly name: string;
  evaluate(context: ReasonerInputContext): Promise<ReasoningResult>;
}
