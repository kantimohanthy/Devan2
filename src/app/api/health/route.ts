export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withApiHandler } from "@/lib/api-handler";

const startedAt = Date.now();

export const GET = withApiHandler(async () => {
  const dbStart = performance.now();
  let dbStatus = "connected";
  let dbLatencyMs = 0;
  let dbError: string | null = null;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Math.round(performance.now() - dbStart);
  } catch (err) {
    dbStatus = "disconnected";
    dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    status: dbStatus === "connected" ? "healthy" : "degraded",
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    database: { status: dbStatus, latencyMs: dbLatencyMs, error: dbError },
    timestamp: new Date().toISOString(),
  });
});
