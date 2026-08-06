import { NextRequest, NextResponse } from "next/server";
import { withApiHandler } from "@/lib/api-handler";
import { enforceRateLimit } from "@/lib/rate-limit";
import { knowledgeNodes } from "@/data/content";
import { artifacts } from "@/data/artifacts";
import { experimentService } from "@/lib/services/experiment.service";

export const GET = withApiHandler(async (req: NextRequest) => {
  await enforceRateLimit(req);
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase().trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const matchedNodes = knowledgeNodes
    .filter(
      (n) =>
        n.label.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.detail.toLowerCase().includes(q)
    )
    .map((n) => ({
      kind: "knowledge-node",
      id: n.id,
      title: n.label,
      summary: n.summary,
      url: `/#knowledge-graph?node=${n.id}`,
    }));

  const matchedArtifacts = artifacts
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.problem.toLowerCase().includes(q)
    )
    .map((a) => ({
      kind: "artifact",
      id: a.id,
      title: a.title,
      summary: a.summary,
      url: `/artifacts/${a.id}`,
    }));

  const allExperiments = await experimentService.getAllExperiments().catch(() => []);
  const matchedExperiments = allExperiments
    .filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.objective.toLowerCase().includes(q) ||
        e.problem.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.identityDimension.toLowerCase().includes(q)
    )
    .map((e) => ({
      kind: "experiment",
      id: e.slug,
      title: e.title,
      summary: `${e.identityDimension} · ${e.category} - ${e.objective}`,
      url: `/#experiments-engine`,
    }));

  return NextResponse.json({
    results: [...matchedNodes, ...matchedExperiments, ...matchedArtifacts],
  });
});
