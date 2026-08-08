import { describe, it, expect } from "vitest";
import { executeLinuxIngestion } from "./ingest-linux";

describe("High-Density Linux Ingestion Pipeline (Phase X)", () => {
  it("executes quality gate verification and generates versioned OntologyCommit for 38 Linux concepts with >10 edges/concept density", async () => {
    const res = await executeLinuxIngestion();
    expect(res.qualityResult.passed).toBe(true);
    expect(res.qualityResult.overallQualityScorePercent).toBeGreaterThanOrEqual(90);
    expect(res.dashboard.totalConcepts).toBe(38);
    expect(res.dashboard.totalRelationships).toBeGreaterThanOrEqual(300);
    expect(res.density).toBeGreaterThanOrEqual(10.0);
    expect(res.commit).toBeDefined();
    expect(res.commit?.resultingOntologyVersion).toBeDefined();
  });
});
