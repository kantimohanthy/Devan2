import { describe, it, expect } from "vitest";
import { experimentService } from "./experiment.service";

describe("Experiment Service", () => {
  it("fetches seeded default experiments", async () => {
    const items = await experimentService.getAllExperiments();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThanOrEqual(2);

    const networkingExp = items.find((e) => e.slug === "networking-protocol-pipeline");
    expect(networkingExp).toBeDefined();
    expect(networkingExp?.identityDimension).toBe("BUILD");
  });

  it("fetches single experiment by slug", async () => {
    const item = await experimentService.getExperimentBySlug("vector-search-benchmark");
    expect(item).not.toBeNull();
    expect(item?.slug).toBe("vector-search-benchmark");
    expect(item?.identityDimension).toBe("EXPLORE");
  });

  it("executes experiment live and updates evidence score", async () => {
    const result = await experimentService.executeExperiment("networking-protocol-pipeline", {
      host: "kantimohanthy.dev",
    });

    expect(result.status).toBe("completed");
    expect(result.evidenceScore).toBeGreaterThan(50);
    expect(Array.isArray(result.telemetry)).toBe(true);
    expect(result.telemetry.length).toBeGreaterThan(0);
  });
});
