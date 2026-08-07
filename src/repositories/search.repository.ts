import { prisma } from "@/lib/prisma";
import { knowledgeNodes } from "@/data/content";
import { artifacts } from "@/data/artifacts";
import {
  concepts,
  experiments as fallbackExperiments,
  decisions as fallbackDecisions,
  repositories as fallbackRepositories,
  projects as fallbackProjects,
  missions as fallbackMissions,
} from "@/lib/data";

export interface RawSearchData {
  concepts: Array<{ slug: string; title: string; domain: string; summary: string; description: string }>;
  experiments: Array<{ slug: string; title: string; category: string; identityDimension: string; objective: string; problem: string }>;
  decisions: Array<{ slug: string; title: string; context: string; decision: string; rationale: string }>;
  repositories: Array<{ slug: string; name: string; description: string; language: string }>;
  projects: Array<{ slug: string; title: string; summary: string; description: string }>;
  missions: Array<{ slug: string; title: string; objective: string; domain: string }>;
  artifacts: Array<{ id: string; title: string; summary: string; problem: string }>;
  knowledgeNodes: Array<{ id: string; label: string; summary: string; detail: string; domain: string }>;
  protocolTraces: Array<{ id: string; targetHost: string; resolvedIp: string | null; stepDetails: string }>;
}

export class SearchRepository {
  async fetchAllSearchData(): Promise<RawSearchData> {
    try {
      const [
        dbConcepts,
        dbExperiments,
        dbDecisions,
        dbRepositories,
        dbProjects,
        dbMissions,
        dbTraces,
      ] = await Promise.all([
        prisma.concept.findMany({ take: 50 }).catch(() => []),
        prisma.experiment.findMany({ take: 50 }).catch(() => []),
        prisma.decision.findMany({ take: 50 }).catch(() => []),
        prisma.repository.findMany({ take: 50 }).catch(() => []),
        prisma.project.findMany({ take: 50 }).catch(() => []),
        prisma.mission.findMany({ take: 50 }).catch(() => []),
        prisma.protocolTrace.findMany({ take: 20 }).catch(() => []),
      ]);

      const conceptList =
        dbConcepts.length > 0
          ? dbConcepts.map((c) => ({
              slug: c.slug,
              title: c.title,
              domain: c.domain,
              summary: c.summary,
              description: c.description,
            }))
          : concepts.map((c) => ({
              slug: c.slug,
              title: c.name,
              domain: c.domain,
              summary: c.description,
              description: c.description,
            }));

      const experimentList =
        dbExperiments.length > 0
          ? dbExperiments.map((e) => ({
              slug: e.slug,
              title: e.title,
              category: e.category,
              identityDimension: e.identityDimension,
              objective: e.objective,
              problem: e.problem,
            }))
          : fallbackExperiments.map((e) => ({
              slug: e.slug,
              title: e.name,
              category: "Networking",
              identityDimension: "System Mechanics",
              objective: e.commands.join("; "),
              problem: e.description,
            }));

      const decisionList =
        dbDecisions.length > 0
          ? dbDecisions.map((d) => ({
              slug: d.slug,
              title: d.title,
              context: d.context,
              decision: d.decision,
              rationale: d.rationale,
            }))
          : fallbackDecisions.map((d) => ({
              slug: d.slug,
              title: d.question,
              context: d.summary,
              decision: d.decision,
              rationale: d.requirements,
            }));

      const repositoryList =
        dbRepositories.length > 0
          ? dbRepositories.map((r) => ({
              slug: r.slug,
              name: r.name,
              description: r.description,
              language: r.language,
            }))
          : fallbackRepositories.map((r) => ({
              slug: r.slug,
              name: r.name,
              description: r.description,
              language: "TypeScript",
            }));

      const projectList =
        dbProjects.length > 0
          ? dbProjects.map((p) => ({
              slug: p.slug,
              title: p.title,
              summary: p.summary,
              description: p.description,
            }))
          : fallbackProjects.map((p) => ({
              slug: p.slug,
              title: p.name,
              summary: p.description,
              description: p.description,
            }));

      const missionList =
        dbMissions.length > 0
          ? dbMissions.map((m) => ({
              slug: m.slug,
              title: m.title,
              objective: m.objective,
              domain: m.domain,
            }))
          : fallbackMissions.map((m) => ({
              slug: m.slug,
              title: m.name,
              objective: m.objective,
              domain: "Networking",
            }));

      return {
        concepts: conceptList,
        experiments: experimentList,
        decisions: decisionList,
        repositories: repositoryList,
        projects: projectList,
        missions: missionList,
        artifacts: artifacts.map((a) => ({
          id: a.id,
          title: a.title,
          summary: a.summary,
          problem: a.problem,
        })),
        knowledgeNodes: knowledgeNodes.map((n) => ({
          id: n.id,
          label: n.label,
          summary: n.summary,
          detail: n.detail,
          domain: n.domain,
        })),
        protocolTraces: dbTraces.map((t) => ({
          id: t.id,
          targetHost: t.targetHost,
          resolvedIp: t.resolvedIp,
          stepDetails: t.stepDetails,
        })),
      };
    } catch (err) {
      console.warn("SearchRepository fetch fallback:", err);
      return {
        concepts: concepts.map((c) => ({
          slug: c.slug,
          title: c.name,
          domain: c.domain,
          summary: c.description,
          description: c.description,
        })),
        experiments: fallbackExperiments.map((e) => ({
          slug: e.slug,
          title: e.name,
          category: "Networking",
          identityDimension: "System Mechanics",
          objective: e.commands.join("; "),
          problem: e.description,
        })),
        decisions: fallbackDecisions.map((d) => ({
          slug: d.slug,
          title: d.question,
          context: d.summary,
          decision: d.decision,
          rationale: d.requirements,
        })),
        repositories: fallbackRepositories.map((r) => ({
          slug: r.slug,
          name: r.name,
          description: r.description,
          language: "TypeScript",
        })),
        projects: fallbackProjects.map((p) => ({
          slug: p.slug,
          title: p.name,
          summary: p.description,
          description: p.description,
        })),
        missions: fallbackMissions.map((m) => ({
          slug: m.slug,
          title: m.name,
          objective: m.objective,
          domain: "Networking",
        })),
        artifacts: artifacts.map((a) => ({
          id: a.id,
          title: a.title,
          summary: a.summary,
          problem: a.problem,
        })),
        knowledgeNodes: knowledgeNodes.map((n) => ({
          id: n.id,
          label: n.label,
          summary: n.summary,
          detail: n.detail,
          domain: n.domain,
        })),
        protocolTraces: [],
      };
    }
  }
}

export const searchRepository = new SearchRepository();
