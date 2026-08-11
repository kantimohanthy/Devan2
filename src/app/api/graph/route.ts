export const dynamic = "force-static";
import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { graphService } from "@/services/graph.service";

export const GET = withApiHandler(async () => {
  const graph = await graphService.getGraph();
  return NextResponse.json(graph, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
