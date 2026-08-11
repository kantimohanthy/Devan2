export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";
import { protocolTraceService } from "@/lib/services/protocol-trace.service";

export const runtime = "nodejs";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const limitParam = req.nextUrl.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const traces = await protocolTraceService.getRecentTraces(limit);
  return NextResponse.json({ traces });
});

export const POST = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const body = await req.json();

  if (!body.host || typeof body.host !== "string") {
    throw Errors.validation({ host: "string target host is required" });
  }

  const result = await protocolTraceService.traceTarget(body.host);
  return NextResponse.json(result);
});
