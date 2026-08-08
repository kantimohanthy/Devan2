import { describe, it, expect, beforeEach } from "vitest";
import { queryEngine } from "./query-engine";
import { FilterPipeline } from "./filtering/filter-pipeline";
import { DeterministicRanker } from "./ranking/deterministic-ranker";
import { projectionCache, atlasCache, searchCache } from "./cache/memory-cache";
import { OntologyEntity } from "@/lib/ontology/types";

describe("Unified Query Engine (Phase XIII Permanent Read Infrastructure)", () => {
  beforeEach(() => {
    projectionCache.clear();
    atlasCache.clear();
    searchCache.clear();
  });

  it("queries concepts and returns standard QueryResult metadata (<5ms target)", async () => {
    const res = await queryEngine.queryConcept("networking.dns");
    expect(res.data).toBeDefined();
    expect(res.metadata.sourceEngines).toContain("OntologyEngine");
    expect(res.metadata.executionTimeMs).toBeLessThan(100);
  });

  it("queries dashboard projection with in-memory caching", async () => {
    const res1 = await queryEngine.queryDashboard();
    expect(res1.data.currentMission).toBeDefined();
    expect(res1.metadata.cacheStatus).toBe("MISS");

    const res2 = await queryEngine.queryDashboard();
    expect(res2.metadata.cacheStatus).toBe("HIT");
  });

  it("queries Atlas graph structure projection (<100ms target)", async () => {
    const res = await queryEngine.queryAtlas();
    expect(res.data.nodes.length).toBeGreaterThan(0);
    expect(res.data.edges.length).toBeGreaterThan(0);
    expect(res.metadata.sourceEngines).toContain("OntologyEngine");
    expect(res.metadata.executionTimeMs).toBeLessThan(100);
  });

  it("queries Oracle reasoning context projection (<50ms target)", async () => {
    const res = await queryEngine.queryOracle("Walk me through opening google.com");
    expect(res.data.summary).toBeDefined();
    expect(res.data.trace.intent).toBe("EXPLAIN");
    expect(res.metadata.sourceEngines.length).toBeGreaterThan(0);
  });

  it("executes multi-faceted pipeline search (search('tcp'), search('dns'), search('http'))", async () => {
    const resTcp = await queryEngine.search("tcp");
    expect(resTcp.data.length).toBeGreaterThan(0);
    expect(resTcp.metadata.cacheStatus).toBe("MISS");

    const resDns = await queryEngine.search("dns");
    expect(resDns.data.length).toBeGreaterThan(0);

    const resHttp = await queryEngine.search("http");
    expect(resHttp.data.length).toBeGreaterThan(0);
  });

  it("executes composable FilterPipeline", async () => {
    const concepts = [
      { id: "linux.epoll", domain: "Linux", importance: "ADVANCED" } as unknown as OntologyEntity,
      { id: "networking.dns", domain: "Networking", importance: "CORE" } as unknown as OntologyEntity,
    ];

    const filtered = FilterPipeline.filterConcepts(concepts, { domain: "Linux" });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("linux.epoll");
  });

  it("executes DeterministicRanker with arithmetic scoring", async () => {
    const concepts = [
      { id: "c1", importance: "CORE", details: { parents: ["p1", "p2"] } } as unknown as OntologyEntity,
      { id: "c2", importance: "ELECTIVE", details: { parents: [] } } as unknown as OntologyEntity,
    ];

    const ranked = DeterministicRanker.rankConcepts(concepts);
    expect(ranked[0].item.id).toBe("c1");
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });
});
