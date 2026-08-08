/**
 * @file ClientQueryEngine (Browser-Safe Fetch Gateway for Client Components)
 * @purpose Provides client components with identical QueryResult APIs via /api/query without bundling Node.js/Prisma database dependencies into client bundles.
 */

import { QueryResult } from "./query-engine";
import { DashboardViewModel } from "./projections/dashboard.projection";
import { AtlasViewModel } from "./projections/atlas.projection";
import { OracleViewModel } from "./projections/oracle.projection";
import { MissionViewModel } from "./projections/mission.projection";
import { TimelineViewModel } from "./projections/timeline.projection";
import { ForgeViewModel } from "./projections/forge.projection";
import { ContextInspectorViewModel } from "./projections/context-inspector.projection";
import { SearchResultItem } from "./search-query";

export class ClientQueryEngine {
  async queryConcept(id: string) {
    const res = await fetch(`/api/query?type=concept&id=${encodeURIComponent(id)}`);
    return res.json();
  }

  async queryContext(conceptId = "networking.dns"): Promise<QueryResult<ContextInspectorViewModel>> {
    const res = await fetch(`/api/query?type=context&id=${encodeURIComponent(conceptId)}`);
    return res.json();
  }

  async queryEvidence(id?: string) {
    const res = await fetch(`/api/query?type=evidence${id ? `&id=${encodeURIComponent(id)}` : ""}`);
    return res.json();
  }

  async queryMission(id = "wireless-mesh-tvws"): Promise<QueryResult<MissionViewModel>> {
    const res = await fetch(`/api/query?type=mission&id=${encodeURIComponent(id)}`);
    return res.json();
  }

  async queryCareer(role = "Systems Engineer") {
    const res = await fetch(`/api/query?type=career&role=${encodeURIComponent(role)}`);
    return res.json();
  }

  async queryTimeline(limit = 20): Promise<QueryResult<TimelineViewModel>> {
    const res = await fetch(`/api/query?type=timeline&limit=${limit}`);
    return res.json();
  }

  async queryDashboard(): Promise<QueryResult<DashboardViewModel>> {
    const res = await fetch("/api/query?type=dashboard");
    return res.json();
  }

  async queryAtlas(): Promise<QueryResult<AtlasViewModel>> {
    const res = await fetch("/api/query?type=atlas");
    return res.json();
  }

  async queryOracle(queryStr: string, conceptId?: string): Promise<QueryResult<OracleViewModel>> {
    const res = await fetch(`/api/query?type=oracle&q=${encodeURIComponent(queryStr)}${conceptId ? `&id=${encodeURIComponent(conceptId)}` : ""}`);
    return res.json();
  }

  async queryForge(): Promise<QueryResult<ForgeViewModel>> {
    const res = await fetch("/api/query?type=forge");
    return res.json();
  }

  async search(queryStr: string): Promise<QueryResult<SearchResultItem[]>> {
    const res = await fetch(`/api/query?type=search&q=${encodeURIComponent(queryStr)}`);
    return res.json();
  }
}

export const queryEngine = new ClientQueryEngine();
