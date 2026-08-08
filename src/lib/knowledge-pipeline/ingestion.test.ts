import { describe, it, expect } from "vitest";
import { executeNetworkingIngestion } from "./ingest-networking";

describe("Gold Standard Networking Ingestion Pipeline (Phase IX)", () => {
  it("executes quality gate verification and generates versioned OntologyCommit for 30 concepts", async () => {
    const res = await executeNetworkingIngestion();
    expect(res.qualityResult.passed).toBe(true);
    expect(res.qualityResult.overallQualityScorePercent).toBeGreaterThanOrEqual(90);
    expect(res.dashboard.totalConcepts).toBe(30);
    expect(res.dashboard.totalRelationships).toBeGreaterThanOrEqual(30);
    expect(res.commit).toBeDefined();
    expect(res.commit?.resultingOntologyVersion).toBeDefined();
  });
});
