import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { timelineService } from "@/services/timeline.service";

export const GET = withApiHandler(async () => {
  const timeline = await timelineService.getTimeline();
  return NextResponse.json({ timeline });
});
