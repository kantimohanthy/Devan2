import { NextResponse } from "next/server";
import { knowledgeNodes, knowledgeEdges, projects } from "@/data/content";

export async function GET() {
  return NextResponse.json(
    {
      nodes: knowledgeNodes,
      edges: knowledgeEdges,
      projects: projects.map((p) => ({
        slug: p.slug,
        title: p.title,
        domain: p.domain,
        status: p.status,
        tagline: p.tagline,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
