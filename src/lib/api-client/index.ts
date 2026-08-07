import type { GraphViewModel } from "@/services/graph.service";
import type { SearchResultItem } from "@/services/search.service";
import type { IdentityViewModel } from "@/services/identity.service";
import type { TimelineEntryViewModel } from "@/services/timeline.service";
import type { IntelligenceResponse } from "@/services/intelligence.service";
import type { IntelligenceSnapshotViewModel } from "@/services/intelligence-snapshot.service";

class BaseApiClient {
  protected async fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });
    if (!res.ok) {
      throw new Error(`API call failed [${res.status}]: ${url}`);
    }
    return res.json();
  }
}

export class GraphServiceClient extends BaseApiClient {
  async getGraph(): Promise<GraphViewModel> {
    return this.fetchJson<GraphViewModel>("/api/graph");
  }
}

export class SearchServiceClient extends BaseApiClient {
  async search(query: string): Promise<SearchResultItem[]> {
    if (!query.trim()) return [];
    const data = await this.fetchJson<{ results: SearchResultItem[] }>(
      `/api/search?q=${encodeURIComponent(query)}`
    );
    return data.results || [];
  }
}

export class ExperimentServiceClient extends BaseApiClient {
  async getExperiments(): Promise<Record<string, unknown>[]> {
    const data = await this.fetchJson<{ experiments: Record<string, unknown>[] }>("/api/experiments");
    return data.experiments || [];
  }

  async execute(id: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return this.fetchJson(`/api/experiments/${id}/execute`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  }
}

export class IdentityServiceClient extends BaseApiClient {
  async getProfile(): Promise<IdentityViewModel> {
    return this.fetchJson<IdentityViewModel>("/api/identity");
  }
}

export class TimelineServiceClient extends BaseApiClient {
  async getTimeline(): Promise<TimelineEntryViewModel[]> {
    const data = await this.fetchJson<{ timeline: TimelineEntryViewModel[] }>("/api/timeline");
    return data.timeline || [];
  }
}

export class ReasoningServiceClient extends BaseApiClient {
  async evaluate(prompt: string, includeTrace = true): Promise<IntelligenceResponse> {
    return this.fetchJson<IntelligenceResponse>("/api/reasoning", {
      method: "POST",
      body: JSON.stringify({ prompt, includeTrace }),
    });
  }
}

export class EyeServiceClient extends BaseApiClient {
  async getSnapshot(): Promise<IntelligenceSnapshotViewModel> {
    return this.fetchJson<IntelligenceSnapshotViewModel>("/api/eye");
  }
}

export const graphClient = new GraphServiceClient();
export const searchClient = new SearchServiceClient();
export const experimentClient = new ExperimentServiceClient();
export const identityClient = new IdentityServiceClient();
export const timelineClient = new TimelineServiceClient();
export const reasoningClient = new ReasoningServiceClient();
export const eyeClient = new EyeServiceClient();
