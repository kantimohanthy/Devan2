/**
 * @file Generic Engineering Domain Importer & Quality Gate Validator (UJ.OS v2.1)
 * @purpose Reusable importer executing automated quality gate checks before processing knowledge bundles through the Knowledge Governance System.
 * @principle From now on, every knowledge import must increase measurable engineering intelligence rather than simply increasing concept count.
 */

import { OntologyEntity, OntologyRelationship, DomainQualityDashboard } from "@/lib/ontology/types";
import { knowledgeGovernanceSystem, ReviewPackage, OntologyCommit } from "../index";

export interface KnowledgeBundle {
  bundleId: string;
  domainName: string;
  version: string;
  concepts: OntologyEntity[];
  relationships: OntologyRelationship[];
  minRequiredQualityScorePercent: number; // e.g. 85.0%
}

export interface QualityGateResult {
  passed: boolean;
  overallQualityScorePercent: number;
  conceptCoveragePercent: number;
  relationshipCompletenessPercent: number;
  rfcCompletenessPercent: number;
  evidenceCompletenessPercent: number;
  labsCompletenessPercent: number;
  missingRfcsCount: number;
  missingEvidenceCount: number;
  missingLabsCount: number;
  orphanConcepts: string[];
  duplicateIds: string[];
  qualityWarnings: string[];
}

export class EngineeringDomainImporter {
  /**
   * Evaluates quality gates for an incoming knowledge bundle.
   */
  evaluateQualityGates(bundle: KnowledgeBundle): QualityGateResult {
    const totalConcepts = bundle.concepts.length;
    let conceptsWithRfcs = 0;
    let conceptsWithEvidence = 0;
    let conceptsWithLabs = 0;
    let missingRfcsCount = 0;
    let missingEvidenceCount = 0;
    let missingLabsCount = 0;

    const referencedInRels = new Set<string>();

    for (const rel of bundle.relationships) {
      referencedInRels.add(rel.fromId);
      referencedInRels.add(rel.toId);
    }

    const orphanConcepts: string[] = [];
    const duplicateIds: string[] = [];
    const seenIds = new Set<string>();

    for (const c of bundle.concepts) {
      if (seenIds.has(c.id)) duplicateIds.push(c.id);
      seenIds.add(c.id);

      if (!referencedInRels.has(c.id)) orphanConcepts.push(c.id);

      if (
        (c.details?.rfcs && c.details.rfcs.length > 0) ||
        (c.details?.standards && c.details.standards.length > 0) ||
        (c.details?.externalReferences && c.details.externalReferences.length > 0) ||
        (c.details?.truthSources && c.details.truthSources.length > 0)
      ) conceptsWithRfcs++;
      else missingRfcsCount++;

      if (c.details?.associatedEvidence && c.details.associatedEvidence.length > 0) conceptsWithEvidence++;
      else missingEvidenceCount++;

      if (c.details?.labProgression && c.details.labProgression.length > 0) conceptsWithLabs++;
      else missingLabsCount++;
    }

    const conceptCoveragePercent = 100.0;
    const rfcCompletenessPercent = totalConcepts > 0 ? (conceptsWithRfcs / totalConcepts) * 100.0 : 0;
    const evidenceCompletenessPercent = totalConcepts > 0 ? (conceptsWithEvidence / totalConcepts) * 100.0 : 0;
    const labsCompletenessPercent = totalConcepts > 0 ? (conceptsWithLabs / totalConcepts) * 100.0 : 0;
    const relationshipCompletenessPercent = orphanConcepts.length === 0 ? 100.0 : ((totalConcepts - orphanConcepts.length) / totalConcepts) * 100.0;

    const overallQualityScorePercent = (
      rfcCompletenessPercent * 0.25 +
      evidenceCompletenessPercent * 0.25 +
      labsCompletenessPercent * 0.25 +
      relationshipCompletenessPercent * 0.25
    );

    const passed = (
      overallQualityScorePercent >= bundle.minRequiredQualityScorePercent &&
      orphanConcepts.length === 0 &&
      duplicateIds.length === 0
    );

    const qualityWarnings: string[] = [];
    if (orphanConcepts.length > 0) qualityWarnings.push(`Orphan concepts detected: ${orphanConcepts.join(", ")}`);
    if (duplicateIds.length > 0) qualityWarnings.push(`Duplicate concept IDs detected: ${duplicateIds.join(", ")}`);
    if (overallQualityScorePercent < bundle.minRequiredQualityScorePercent) {
      qualityWarnings.push(`Quality score (${overallQualityScorePercent.toFixed(1)}%) is below required threshold (${bundle.minRequiredQualityScorePercent}%)`);
    }

    return {
      passed,
      overallQualityScorePercent: Math.round(overallQualityScorePercent),
      conceptCoveragePercent,
      relationshipCompletenessPercent: Math.round(relationshipCompletenessPercent),
      rfcCompletenessPercent: Math.round(rfcCompletenessPercent),
      evidenceCompletenessPercent: Math.round(evidenceCompletenessPercent),
      labsCompletenessPercent: Math.round(labsCompletenessPercent),
      missingRfcsCount,
      missingEvidenceCount,
      missingLabsCount,
      orphanConcepts,
      duplicateIds,
      qualityWarnings,
    };
  }

  /**
   * Imports a knowledge bundle through quality gates and the Knowledge Governance System.
   */
  async importBundle(bundle: KnowledgeBundle, approvedBy = "Ujwal Kantimohanthy"): Promise<{
    qualityGateResult: QualityGateResult;
    reviewPackage: ReviewPackage | null;
    commit: OntologyCommit | null;
  }> {
    const qualityGateResult = this.evaluateQualityGates(bundle);

    if (!qualityGateResult.passed) {
      return {
        qualityGateResult,
        reviewPackage: null,
        commit: null,
      };
    }

    // Process through Knowledge Governance System
    const reviewPackage = await knowledgeGovernanceSystem.processIngestionDocument(
      "TECHNICAL_DOC",
      `${bundle.domainName} Bundle ${bundle.version}`,
      JSON.stringify(bundle.concepts.map((c) => ({ id: c.id, title: c.title })))
    );

    const commit = await knowledgeGovernanceSystem.commitReviewPackage(
      reviewPackage.packageId,
      approvedBy,
      "APPROVED"
    );

    return {
      qualityGateResult,
      reviewPackage,
      commit,
    };
  }

  /**
   * Computes the Domain Quality Dashboard metrics.
   */
  computeQualityDashboard(bundle: KnowledgeBundle): DomainQualityDashboard {
    const gates = this.evaluateQualityGates(bundle);
    return {
      domainName: bundle.domainName,
      totalConcepts: bundle.concepts.length,
      totalRelationships: bundle.relationships.length,
      conceptCoveragePercent: gates.conceptCoveragePercent,
      rfcCoveragePercent: gates.rfcCompletenessPercent,
      evidenceCoveragePercent: gates.evidenceCompletenessPercent,
      missingLabsCount: gates.missingLabsCount,
      missingExperimentsCount: 0,
      missingInterviewQuestionsCount: 0,
      overallReadinessPercent: gates.overallQualityScorePercent,
    };
  }
}

export const engineeringDomainImporter = new EngineeringDomainImporter();
