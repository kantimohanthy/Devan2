import { prisma } from "@/lib/prisma";
import { knowledgeNodes, knowledgeEdges } from "@/data/content";
import { concepts as fallbackConcepts, experiments as fallbackExperiments, repositories as fallbackRepositories } from "@/lib/data";

export interface RawGraphData {
  concepts: Array<{ slug: string; title: string; domain: string; summary: string; state?: string }>;
  experiments: Array<{ slug: string; title: string; category: string; state?: string }>;
  repositories: Array<{ slug: string; name: string; description: string; ciStatus?: string }>;
  staticNodes: typeof knowledgeNodes;
  staticEdges: typeof knowledgeEdges;
}

export class GraphRepository {
  async getRawGraphData(): Promise<RawGraphData> {
    try {
      const [dbConcepts, dbExperiments, dbRepositories] = await Promise.all([
        prisma.concept.findMany({ take: 50 }).catch(() => []),
        prisma.experiment.findMany({ take: 50 }).catch(() => []),
        prisma.repository.findMany({ take: 50 }).catch(() => []),
      ]);

      const concepts =
        dbConcepts.length > 0
          ? dbConcepts.map((c) => ({
              slug: c.slug,
              title: c.title,
              domain: c.domain,
              summary: c.summary,
              state: c.evidenceState,
            }))
          : fallbackConcepts.map((c) => ({
              slug: c.slug,
              title: c.name,
              domain: c.domain,
              summary: c.description,
              state: c.state,
            }));

      const experiments =
        dbExperiments.length > 0
          ? dbExperiments.map((e) => ({
              slug: e.slug,
              title: e.title,
              category: e.category,
              state: e.status,
            }))
          : fallbackExperiments.map((e) => ({
              slug: e.slug,
              title: e.name,
              category: "Networking",
              state: e.state,
            }));

      const repositories =
        dbRepositories.length > 0
          ? dbRepositories.map((r) => ({
              slug: r.slug,
              name: r.name,
              description: r.description,
              ciStatus: r.ciStatus,
            }))
          : fallbackRepositories.map((r) => ({
              slug: r.slug,
              name: r.name,
              description: r.description,
              ciStatus: r.ciStatus,
            }));

      return {
        concepts,
        experiments,
        repositories,
        staticNodes: knowledgeNodes,
        staticEdges: knowledgeEdges,
      };
    } catch (err) {
      console.warn("GraphRepository fallback warning:", err);
      return {
        concepts: fallbackConcepts.map((c) => ({
          slug: c.slug,
          title: c.name,
          domain: c.domain,
          summary: c.description,
          state: c.state,
        })),
        experiments: fallbackExperiments.map((e) => ({
          slug: e.slug,
          title: e.name,
          category: "Networking",
          state: e.state,
        })),
        repositories: fallbackRepositories.map((r) => ({
          slug: r.slug,
          name: r.name,
          description: r.description,
          ciStatus: r.ciStatus,
        })),
        staticNodes: knowledgeNodes,
        staticEdges: knowledgeEdges,
      };
    }
  }
}

export const graphRepository = new GraphRepository();
