import { describe, it, expect } from "vitest";
import { GET } from "./route";
import { NextRequest } from "next/server";

describe("GET /api/health", () => {
  it("returns health telemetry status with db check & request ID", async () => {
    const res = await GET(new NextRequest("http://localhost/api/health"));
    const body = await res.json();
    expect(["healthy", "degraded"]).toContain(body.status);
    expect(body.database.latencyMs).toBeGreaterThanOrEqual(0);
    expect(res.headers.get("x-request-id")).toBeTruthy();
    expect(res.headers.get("x-trace-id")).toBeTruthy();
  });
});
