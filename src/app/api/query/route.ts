export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { queryEngine } from "@/lib/query/query-engine";

export async function GET(request: NextRequest) {
  let type = "dashboard";
  let id: string | undefined = undefined;
  let q: string | undefined = undefined;

  try {
    if (request && request.url) {
      const url = new URL(request.url);
      type = url.searchParams.get("type") || "dashboard";
      id = url.searchParams.get("id") || undefined;
      q = url.searchParams.get("q") || undefined;
    }
  } catch {
    // Static export build time
  }

  try {
    if (type === "dashboard") {
      const res = await queryEngine.queryDashboard();
      return NextResponse.json(res);
    } else if (type === "atlas") {
      const res = await queryEngine.queryAtlas();
      return NextResponse.json(res);
    } else if (type === "context") {
      const res = await queryEngine.queryContext(id);
      return NextResponse.json(res);
    } else if (type === "concept") {
      const res = await queryEngine.queryConcept(id || "networking.dns");
      return NextResponse.json(res);
    } else if (type === "timeline") {
      const res = await queryEngine.queryTimeline(20);
      return NextResponse.json(res);
    } else if (type === "search") {
      const res = await queryEngine.search(q || "");
      return NextResponse.json(res);
    }

    const res = await queryEngine.queryDashboard();
    return NextResponse.json(res);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
