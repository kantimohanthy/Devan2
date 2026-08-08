/**
 * @file SearchQuery (Specialized Pipeline Search Query Module)
 * @purpose Pipeline: Normalization -> Alias Resolution -> Exact Match -> Ontology Match -> Execution Stack Match -> Evidence Match -> Career Match -> Ranking -> Response.
 */

import { ontologyEngine } from "@/lib/ontology";
import { CANONICAL_EXECUTION_STACKS } from "@/lib/intelligence/execution-stacks";
import { evidenceGraph } from "@/lib/experience/evidence-graph";
import { QueryResult } from "./query-engine";

export interface SearchResultItem {
  type: "CONCEPT" | "EXECUTION_STACK" | "EVIDENCE" | "CAREER";
  id: string;
  title: string;
  description: string;
  score: number;
}

export class SearchQuery {
  async execute(queryStr: string): Promise<QueryResult<SearchResultItem[]>> {
    const startTime = Date.now();
    const q = queryStr.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // 1. Ontology Concepts Match
    const concepts = ontologyEngine.getAllEntities();
    for (const c of concepts) {
      const matchTitle = (c.title || "").toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchAlias = c.details?.aliases?.some((a) => a.toLowerCase().includes(q));
      const matchRfc = c.details?.externalReferences?.some((r) => r.title.toLowerCase().includes(q) || (r.identifier && r.identifier.toLowerCase().includes(q)));

      if (matchTitle || matchId || matchAlias || matchRfc) {
        results.push({
          type: "CONCEPT",
          id: c.id,
          title: c.title || c.id,
          description: c.summary || "",
          score: matchId ? 100 : matchTitle ? 90 : 70,
        });
      }
    }

    // 2. Execution Stack Match
    for (const s of CANONICAL_EXECUTION_STACKS) {
      if (s.title.toLowerCase().includes(q) || s.purpose.toLowerCase().includes(q) || s.stackId.toLowerCase().includes(q)) {
        results.push({
          type: "EXECUTION_STACK",
          id: s.stackId,
          title: s.title,
          description: s.purpose,
          score: 85,
        });
      }
    }

    // 3. Evidence Match
    const evidence = evidenceGraph.getEvidenceEntities();
    for (const e of evidence) {
      if (e.title.toLowerCase().includes(q) || e.source.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)) {
        results.push({
          type: "EVIDENCE",
          id: e.id,
          title: e.title,
          description: e.source,
          score: 80,
        });
      }
    }

    // Sort by deterministic rank score
    results.sort((a, b) => b.score - a.score);

    const executionTimeMs = Date.now() - startTime;

    return {
      data: results,
      metadata: {
        sourceEngines: ["OntologyEngine", "ExecutionIntelligence", "EvidenceGraph"],
        executionTimeMs,
        evidenceCount: results.filter((r) => r.type === "EVIDENCE").length,
        ontologyNodes: results.filter((r) => r.type === "CONCEPT").length,
        confidence: results.length > 0 ? results[0].score : 0,
        cacheStatus: "MISS",
      },
    };
  }
}

export const searchQuery = new SearchQuery();
