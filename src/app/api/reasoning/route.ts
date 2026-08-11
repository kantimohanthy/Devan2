export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { intelligenceService } from "@/services/intelligence.service";

export const POST = withApiHandler(async (req: Request) => {
  const body = await req.json().catch(() => ({}));
  const prompt = typeof body.prompt === "string" ? body.prompt : "What am I weakest at?";
  const includeTrace = body.includeTrace !== false;

  const result = await intelligenceService.evaluate(prompt, includeTrace);
  return NextResponse.json(result);
});
