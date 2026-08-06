import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { experimentService } from "@/lib/services/experiment.service";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const items = await experimentService.getAllExperiments();
  return NextResponse.json({ experiments: items });
});
