/**
 * @file High-Density Linux Ingestion Execution Script (Phase X)
 * @purpose Runs the generic EngineeringDomainImporter against LINUX_BUNDLE to execute Quality Gate checks, ReviewPackage creation, and versioned OntologyCommit.
 */

import { engineeringDomainImporter } from "./importers/engineering-domain.importer";
import { LINUX_BUNDLE } from "./bundles/linux.bundle";

export async function executeLinuxIngestion() {
  console.log("=== Starting High-Density Linux Ingestion Pipeline ===");

  const dashboard = engineeringDomainImporter.computeQualityDashboard(LINUX_BUNDLE);
  const density = dashboard.totalRelationships / dashboard.totalConcepts;
  console.log("Domain Quality Dashboard:", JSON.stringify(dashboard, null, 2));
  console.log("Relationship Edge Density:", density.toFixed(2), "edges / concept");

  const result = await engineeringDomainImporter.importBundle(LINUX_BUNDLE, "Ujwal Kantimohanthy");

  if (!result.qualityGateResult.passed) {
    console.error("Quality Gate Check FAILED:", result.qualityGateResult.qualityWarnings);
    throw new Error("Linux ingestion aborted due to quality gate failure.");
  }

  console.log("Quality Gate Check PASSED with score:", result.qualityGateResult.overallQualityScorePercent, "%");
  console.log("Review Package Created:", result.reviewPackage?.packageId);
  console.log("Ontology Commit Generated:", result.commit?.commitId, "Version:", result.commit?.resultingOntologyVersion);

  return {
    dashboard,
    density,
    qualityResult: result.qualityGateResult,
    reviewPackage: result.reviewPackage,
    commit: result.commit,
  };
}
