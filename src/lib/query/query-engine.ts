/**
 * @file QueryEngine (The Primary Read Gateway Façade of DEVAN)
 * @purpose Façade orchestrating reads across specialized query modules, projections, and memory cache. Read-only. Zero mutated state.
 * @principle Every present and future UI interface (The Eye, Atlas, Forge, Oracle, Timeline, Knowledge Explorer) queries this engine exclusively.
 */

import { conceptQuery } from "./concept-query";
import { evidenceQuery } from "./evidence-query";
import { missionQuery } from "./mission-query";
import { careerQuery } from "./career-query";
import { timelineQuery } from "./timeline-query";
import { executionStackQuery } from "./execution-stack-query";
import { dashboardQuery } from "./dashboard-query";
import { searchQuery, SearchResultItem } from "./search-query";
import { DashboardProjection, DashboardViewModel } from "./projections/dashboard.projection";
import { AtlasProjection, AtlasViewModel } from "./projections/atlas.projection";
import { OracleProjection, OracleViewModel } from "./projections/oracle.projection";
import { MissionProjection, MissionViewModel } from "./projections/mission.projection";
import { TimelineProjection, TimelineViewModel } from "./projections/timeline.projection";
import { ForgeProjection, ForgeViewModel } from "./projections/forge.projection";
import { ontologyEngine } from "@/lib/ontology";
import { oracleOrchestrator } from "@/lib/intelligence/oracle-orchestrator";
import { projectionCache, atlasCache, searchCache, oracleCache } from "./cache/memory-cache";

import { contextQuery } from "./context-query";
import { ContextInspectorViewModel } from "./projections/context-inspector.projection";

export interface QueryResultMetadata {
  sourceEngines: string[];
  executionTimeMs: number;
  evidenceCount: number;
  ontologyNodes: number;
  confidence: number;
  cacheStatus: "HIT" | "MISS";
}

export interface QueryResult<T> {
  data: T;
  metadata: QueryResultMetadata;
}

export class QueryEngine {
  // 1. Concept Query
  async queryConcept(id: string) {
    return conceptQuery.execute(id);
  }

  // 1b. Context Inspector Query
  async queryContext(conceptId = "networking.dns"): Promise<QueryResult<ContextInspectorViewModel>> {
    return contextQuery.execute(conceptId);
  }

  // 2. Evidence Query
  async queryEvidence(id?: string) {
    return evidenceQuery.execute(id);
  }

  // 3. Mission Query
  async queryMission(id = "wireless-mesh-tvws"): Promise<QueryResult<MissionViewModel>> {
    const res = await missionQuery.execute(id);
    return {
      data: MissionProjection.createProjection(res.data),
      metadata: res.metadata,
    };
  }

  // 4. Career Query
  async queryCareer(role = "Systems Engineer") {
    return careerQuery.execute(role);
  }

  // 5. Timeline Query & Projection
  async queryTimeline(limit = 20): Promise<QueryResult<TimelineViewModel>> {
    const res = await timelineQuery.execute(limit);
    return {
      data: TimelineProjection.createProjection(res.data),
      metadata: res.metadata,
    };
  }

  // 6. Execution Stack Query
  async queryExecutionStack(id?: string) {
    return executionStackQuery.execute(id);
  }

  // 7. Dashboard Query & Projection
  async queryDashboard(): Promise<QueryResult<DashboardViewModel>> {
    const cacheKey = "proj:dashboard";
    const cached = projectionCache.get(cacheKey) as QueryResult<DashboardViewModel> | undefined;
    if (cached) return { ...cached, metadata: { ...cached.metadata, cacheStatus: "HIT" } };

    const res = await dashboardQuery.execute();
    const result: QueryResult<DashboardViewModel> = {
      data: DashboardProjection.createProjection(res.data),
      metadata: res.metadata,
    };

    projectionCache.set(cacheKey, result);
    return result;
  }

  // 8. Atlas Graph Projection
  async queryAtlas(): Promise<QueryResult<AtlasViewModel>> {
    const cacheKey = "proj:atlas";
    const cached = atlasCache.get(cacheKey) as QueryResult<AtlasViewModel> | undefined;
    if (cached) return { ...cached, metadata: { ...cached.metadata, cacheStatus: "HIT" } };

    const startTime = Date.now();
    const concepts = ontologyEngine.getAllEntities();
    const relationships = ontologyEngine.getAllRelationships();
    const projection = AtlasProjection.createProjection(concepts, relationships);
    const executionTimeMs = Date.now() - startTime;

    const result: QueryResult<AtlasViewModel> = {
      data: projection,
      metadata: {
        sourceEngines: ["OntologyEngine"],
        executionTimeMs,
        evidenceCount: 0,
        ontologyNodes: projection.totalNodes,
        confidence: 100,
        cacheStatus: "MISS",
      },
    };

    atlasCache.set(cacheKey, result);
    return result;
  }

  // 9. Oracle Query & Projection
  async queryOracle(queryStr: string, conceptId?: string): Promise<QueryResult<OracleViewModel>> {
    const cacheKey = `proj:oracle:${queryStr}:${conceptId || ""}`;
    const cached = oracleCache.get(cacheKey) as QueryResult<OracleViewModel> | undefined;
    if (cached) return { ...cached, metadata: { ...cached.metadata, cacheStatus: "HIT" } };

    const startTime = Date.now();
    const response = await oracleOrchestrator.processQuery(queryStr, conceptId);
    const projection = OracleProjection.createProjection(response);
    const executionTimeMs = Date.now() - startTime;

    const result: QueryResult<OracleViewModel> = {
      data: projection,
      metadata: {
        sourceEngines: response.trace.reasonersInvoked,
        executionTimeMs,
        evidenceCount: response.evidence.length,
        ontologyNodes: response.trace.ontologyNodesTraversed.length,
        confidence: Math.round(response.trace.confidence * 100),
        cacheStatus: "MISS",
      },
    };

    oracleCache.set(cacheKey, result);
    return result;
  }

  // 10. Forge Workspace Projection
  async queryForge(): Promise<QueryResult<ForgeViewModel>> {
    const startTime = Date.now();
    const projects = [
      { id: "proj-1", name: "devan-os", repoUrl: "https://github.com/ujwalk/devan-os", status: "ACTIVE" },
      { id: "proj-2", name: "cosmos-hub", repoUrl: "https://github.com/ujwalk/cosmos-hub", status: "ACTIVE" },
    ];
    const projection = ForgeProjection.createProjection(projects);
    const executionTimeMs = Date.now() - startTime;

    return {
      data: projection,
      metadata: {
        sourceEngines: ["SearchRepository"],
        executionTimeMs,
        evidenceCount: projects.length,
        ontologyNodes: 0,
        confidence: 100,
        cacheStatus: "MISS",
      },
    };
  }

  // 11. Multi-Faceted Pipeline Search
  async search(queryStr: string): Promise<QueryResult<SearchResultItem[]>> {
    const cacheKey = `search:${queryStr.toLowerCase().trim()}`;
    const cached = searchCache.get(cacheKey) as QueryResult<SearchResultItem[]> | undefined;
    if (cached) return { ...cached, metadata: { ...cached.metadata, cacheStatus: "HIT" } };

    const result = await searchQuery.execute(queryStr);
    searchCache.set(cacheKey, result);
    return result;
  }
}

export const queryEngine = new QueryEngine();
