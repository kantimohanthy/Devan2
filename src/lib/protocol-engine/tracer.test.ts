import { describe, it, expect } from "vitest";
import { executeProtocolTrace } from "./tracer";

describe("Protocol Execution Engine", () => {
  it("executes multi-step protocol trace pipeline for valid target host", async () => {
    const result = await executeProtocolTrace("kantimohanthy.dev");

    expect(result.targetHost).toBe("kantimohanthy.dev");
    expect(typeof result.totalDurationMs).toBe("number");
    expect(result.totalDurationMs).toBeGreaterThan(0);
    expect(Array.isArray(result.spans)).toBe(true);
    expect(result.spans.length).toBeGreaterThanOrEqual(3);

    const categories = result.spans.map((s) => s.category);
    expect(categories).toContain("dns");
    expect(categories).toContain("http");
  });

  it("handles hostname stripping and protocol prefixes correctly", async () => {
    const result = await executeProtocolTrace("https://cloudflare.com/path/to/resource");
    expect(result.targetHost).toBe("cloudflare.com");
  });
});
