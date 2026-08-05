import { NextResponse } from "next/server";
import { renderPrometheus } from "@/lib/metrics";

export async function GET() {
  return new NextResponse(renderPrometheus(), {
    headers: { "content-type": "text/plain; version=0.0.4" },
  });
}
