/**
 * @file ContextInspectorProjection (Synchronized Context Inspector ViewModel)
 */

import { OntologyEntity } from "@/lib/ontology/types";
import { EvidenceEntity } from "@/lib/experience/evidence-graph";
import { ExecutionStack } from "@/lib/intelligence/execution-stacks";

export interface ContextInspectorViewModel {
  targetConcept?: OntologyEntity;
  relatedConcepts: OntologyEntity[];
  executionStacks: ExecutionStack[];
  evidenceList: EvidenceEntity[];
  diagnosticTools: string[];
  rfcsAndManPages: string[];
  careerImpact: string[];
}

export class ContextInspectorProjection {
  static createProjection(params: {
    targetConcept?: OntologyEntity;
    relatedConcepts: OntologyEntity[];
    executionStacks: ExecutionStack[];
    evidenceList: EvidenceEntity[];
  }): ContextInspectorViewModel {
    const concept = params.targetConcept;

    const diagnosticTools = concept?.details?.debuggingTechniques || [
      "dig",
      "tshark",
      "strace",
      "perf",
      "bpftrace",
      "ss",
    ];

    const rfcsAndManPages = (concept?.details?.externalReferences || []).map(
      (r) => `${r.title} (${r.identifier})`
    );

    const careerImpact = concept?.details?.professionalMapping?.engineeringRoles || [
      "Network Engineer",
      "Platform Engineer",
      "SRE",
    ];

    return {
      targetConcept: concept,
      relatedConcepts: params.relatedConcepts,
      executionStacks: params.executionStacks,
      evidenceList: params.evidenceList,
      diagnosticTools,
      rfcsAndManPages,
      careerImpact,
    };
  }
}
