/**
 * @file OracleOrchestrator (The Oracle Cognitive Layer Orchestrator)
 * @purpose Decoupled cognitive orchestrator executing question routing, reasoner selection, execution stack selection, evidence aggregation, and response composition.
 * @principle The Oracle never contains duplicated reasoning logic. The Oracle orchestrates specialized reasoners only.
 */

import { ontologyEngine } from "@/lib/ontology";
import { CANONICAL_EXECUTION_STACKS, ExecutionStack } from "./execution-stacks";
import { evidenceGraph } from "@/lib/experience/evidence-graph";
import { failureReasoner } from "./failure-reasoner";
import { architectureReasoner } from "./architecture-reasoner";
import { responseComposer, OracleUnifiedResponse } from "./response-composer";

export type QuestionIntent =
  | "EXPLAIN"
  | "COMPARE"
  | "DIAGNOSE"
  | "RECOMMEND"
  | "LEARN"
  | "REVIEW"
  | "PREPARE"
  | "DEBUG"
  | "DESIGN"
  | "EVALUATE"
  | "PREDICT"
  | "PLAN";

export class OracleOrchestrator {
  /**
   * Stage 1: Classifies incoming user query into one of 12 intent categories.
   */
  classifyIntent(query: string): QuestionIntent {
    const q = query.toLowerCase();
    if (q.includes("debug") || q.includes("symptom") || q.includes("error")) return "DEBUG";
    if (q.includes("diagnose") || q.includes("fail") || q.includes("broken")) return "DIAGNOSE";
    if (q.includes("compare") || q.includes("vs") || q.includes("difference")) return "COMPARE";
    if (q.includes("design") || q.includes("architecture")) return "DESIGN";
    if (q.includes("career") || q.includes("role") || q.includes("interview")) return "PREPARE";
    if (q.includes("learn") || q.includes("path") || q.includes("roadmap")) return "LEARN";
    return "EXPLAIN";
  }

  /**
   * Stage 2: Selects matching Execution Stack for the query flow.
   */
  selectExecutionStack(query: string): ExecutionStack | undefined {
    const q = query.toLowerCase();
    if (q.includes("google") || q.includes("http") || q.includes("web")) {
      return CANONICAL_EXECUTION_STACKS.find((s) => s.stackId === "stack-http-lifecycle");
    }
    if (q.includes("execve") || q.includes("process") || q.includes("fork")) {
      return CANONICAL_EXECUTION_STACKS.find((s) => s.stackId === "stack-linux-process-lifecycle");
    }
    if (q.includes("container") || q.includes("docker") || q.includes("podman")) {
      return CANONICAL_EXECUTION_STACKS.find((s) => s.stackId === "stack-container-lifecycle");
    }
    if (q.includes("kubernetes") || q.includes("pod") || q.includes("kubectl")) {
      return CANONICAL_EXECUTION_STACKS.find((s) => s.stackId === "stack-kubernetes-request-path");
    }
    if (q.includes("sql") || q.includes("database") || q.includes("postgres")) {
      return CANONICAL_EXECUTION_STACKS.find((s) => s.stackId === "stack-database-query-lifecycle");
    }
    return CANONICAL_EXECUTION_STACKS[0];
  }

  /**
   * Main Orchestrator Execution Pipeline
   */
  async processQuery(query: string, targetConceptId?: string): Promise<OracleUnifiedResponse> {
    const startTimeMs = Date.now();
    const intent = this.classifyIntent(query);
    const reasonersInvoked: string[] = ["IntentClassifier"];

    // Ontology Expansion
    const concept = targetConceptId ? ontologyEngine.getEntity(targetConceptId) : ontologyEngine.getEntity("networking.dns.iterative-resolution");
    const targetId = concept?.id || "networking.dns.iterative-resolution";
    const relatedConcepts = ontologyEngine.findRelatedConcepts(targetId);

    // Execution Stack Selection
    const executionStack = this.selectExecutionStack(query);
    if (executionStack) reasonersInvoked.push("ExecutionIntelligence");

    // Evidence Aggregation
    const evidenceList = evidenceGraph.getEvidenceEntities();
    reasonersInvoked.push("EvidenceGraph");

    // Invoke Specialized Reasoners
    let failureAnalysis;
    let architectureAnalysis;

    if (intent === "DIAGNOSE" || intent === "DEBUG") {
      failureAnalysis = failureReasoner.analyzeFailure(query, targetId);
      reasonersInvoked.push("FailureReasoner");
    }

    if (intent === "COMPARE" || intent === "DESIGN" || intent === "EVALUATE") {
      architectureAnalysis = architectureReasoner.evaluateArchitecture(targetId);
      reasonersInvoked.push("ArchitectureReasoner");
    }

    const summary = concept
      ? `Oracle Analysis for [${concept.title || concept.id}]: ${concept.summary}`
      : `Oracle Analysis for query: "${query}"`;

    // Response Composition
    reasonersInvoked.push("ResponseComposer");

    return responseComposer.compose({
      summary,
      intent,
      targetEntity: concept,
      relatedConcepts,
      executionStack,
      failureAnalysis,
      architectureAnalysis,
      evidenceList,
      reasonersInvoked,
      startTimeMs,
    });
  }
}

export const oracleOrchestrator = new OracleOrchestrator();
