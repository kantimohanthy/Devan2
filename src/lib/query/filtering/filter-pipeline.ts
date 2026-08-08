/**
 * @file FilterPipeline (Composable Filtering Engine)
 * @purpose Composes ConceptFilter, EvidenceFilter, MissionFilter, CareerFilter, RelationshipFilter, and ExecutionFilter into a unified pipeline.
 */

import { OntologyEntity } from "@/lib/ontology/types";
import { EvidenceEntity } from "@/lib/experience/evidence-graph";

export interface FilterCriteria {
  domain?: string;
  conceptId?: string;
  rfc?: string;
  tool?: string;
  minImportance?: "CORE" | "ADVANCED" | "ELECTIVE";
  verificationLevel?: string;
}

export class FilterPipeline {
  static filterConcepts(entities: OntologyEntity[], criteria: FilterCriteria): OntologyEntity[] {
    return entities.filter((e) => {
      if (criteria.domain && e.domain.toLowerCase() !== criteria.domain.toLowerCase()) return false;
      if (criteria.minImportance && e.importance !== criteria.minImportance) return false;
      if (criteria.conceptId && e.id !== criteria.conceptId) return false;
      if (criteria.rfc && !e.details?.rfcs?.some((r) => r.toLowerCase().includes(criteria.rfc!.toLowerCase()))) return false;
      if (criteria.tool && !e.details?.debuggingTechniques?.some((t: string) => t.toLowerCase().includes(criteria.tool!.toLowerCase()))) return false;
      return true;
    });
  }

  static filterEvidence(evidence: EvidenceEntity[], criteria: FilterCriteria): EvidenceEntity[] {
    return evidence.filter((ev) => {
      if (criteria.verificationLevel && ev.verificationLevel !== criteria.verificationLevel) return false;
      if (criteria.conceptId && !ev.conceptsDemonstrated.includes(criteria.conceptId)) return false;
      return true;
    });
  }
}
