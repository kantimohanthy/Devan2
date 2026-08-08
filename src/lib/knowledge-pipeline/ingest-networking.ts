/**
 * @file Gold Standard Networking Ingestion Script (Phase IX)
 * @purpose Runs the generic EngineeringDomainImporter against NETWORKING_BUNDLE to execute Quality Gate checks, ReviewPackage creation, and versioned OntologyCommit.
 */

import { engineeringDomainImporter } from "./importers/engineering-domain.importer";
import { NETWORKING_BUNDLE } from "./bundles/networking.bundle";

export async function executeNetworkingIngestion() {
  console.log("=== Starting Gold Standard Networking Ingestion Pipeline ===");

  const dashboard = engineeringDomainImporter.computeQualityDashboard(NETWORKING_BUNDLE);
  console.log("Domain Quality Dashboard:", JSON.stringify(dashboard, null, 2));

  const result = await engineeringDomainImporter.importBundle(NETWORKING_BUNDLE, "Ujwal Kantimohanthy");

  if (!result.qualityGateResult.passed) {
    console.error("Quality Gate Check FAILED:", result.qualityGateResult.qualityWarnings);
    throw new Error("Ingestion aborted due to quality gate failure.");
  }

  console.log("Quality Gate Check PASSED with score:", result.qualityGateResult.overallQualityScorePercent, "%");
  console.log("Review Package Created:", result.reviewPackage?.packageId);
  console.log("Ontology Commit Generated:", result.commit?.commitId, "Version:", result.commit?.resultingOntologyVersion);

  return {
    dashboard,
    qualityResult: result.qualityGateResult,
    reviewPackage: result.reviewPackage,
    commit: result.commit,
  };
}
