export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ id: "exp-1" }];
}
import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { Errors } from "@/lib/errors";
import { experimentService } from "@/lib/services/experiment.service";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const GET = withApiHandler(async (req: NextRequest, ctx: any) => {
  await enforceRateLimit(req);
  const params = await ctx?.params;
  const id = params?.id;

  if (!id) {
    throw Errors.validation({ id: "Experiment slug is required" });
  }

  const item = await experimentService.getExperimentBySlug(id);
  if (!item) {
    throw Errors.notFound("Experiment");
  }

  return NextResponse.json(item);
});
