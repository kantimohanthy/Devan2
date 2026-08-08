import { describe, it, expect } from "vitest";
import { oracleOrchestrator } from "./oracle-orchestrator";

describe("OracleOrchestrator (Phase XII Cognitive Layer)", () => {
  it("orchestrates question routing, specialized reasoners, and transparent reasoning trace", async () => {
    const res = await oracleOrchestrator.processQuery("Walk me through what happens when I open google.com");

    expect(res.summary).toBeDefined();
    expect(res.trace.intent).toBe("EXPLAIN");
    expect(res.trace.executionStackUsed).toBe("stack-http-lifecycle");
    expect(res.trace.reasonersInvoked).toContain("ResponseComposer");
    expect(res.trace.confidence).toBeGreaterThan(0.9);
    expect(res.executionStack).toBeDefined();
    expect(res.evidence.length).toBeGreaterThan(0);
  });

  it("orchestrates failure diagnosis queries via FailureReasoner", async () => {
    const res = await oracleOrchestrator.processQuery("Diagnose DNS query timeout error", "networking.dns.iterative-resolution");

    expect(["DIAGNOSE", "DEBUG"]).toContain(res.trace.intent);
    expect(res.trace.reasonersInvoked).toContain("FailureReasoner");
    expect(res.failureModes.length).toBeGreaterThan(0);
  });

  it("orchestrates architecture comparison queries via ArchitectureReasoner", async () => {
    const res = await oracleOrchestrator.processQuery("Compare TCP and UDP performance trade-offs", "networking.tcp");

    expect(res.trace.intent).toBe("COMPARE");
    expect(res.trace.reasonersInvoked).toContain("ArchitectureReasoner");
    expect(res.tradeOffs.length).toBeGreaterThan(0);
  });
});
