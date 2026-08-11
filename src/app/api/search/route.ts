export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { searchService } from "@/services/search.service";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  let q = "";
  try {
    q = req.nextUrl?.searchParams?.get("q") ?? "";
  } catch {
    // Static build time
  }
  const results = await searchService.search(q);
  return NextResponse.json({ results });
});
