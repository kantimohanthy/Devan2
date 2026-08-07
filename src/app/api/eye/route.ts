import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { intelligenceSnapshotService } from "@/services/intelligence-snapshot.service";

export const GET = withApiHandler(async () => {
  const snapshot = await intelligenceSnapshotService.getSnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
});
