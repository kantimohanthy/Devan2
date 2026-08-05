import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const url = req.nextUrl.searchParams.get("url");
  if (!url) throw Errors.validation({ url: "required" });

  const start = performance.now();
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  const latencyMs = Math.round(performance.now() - start);

  return NextResponse.json({
    url,
    status: res.status,
    latencyMs,
    headers: Object.fromEntries(res.headers.entries()),
  });
});
