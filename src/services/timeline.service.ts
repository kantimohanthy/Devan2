import { prisma } from "@/lib/prisma";
import { timeline as fallbackTimeline } from "@/data/content";

export interface TimelineEntryViewModel {
  date: string;
  title: string;
  description: string;
  category: string;
  links?: Array<{ label: string; url: string }>;
}

export class TimelineService {
  async getTimeline(): Promise<TimelineEntryViewModel[]> {
    try {
      const [decisions, experiments] = await Promise.all([
        prisma.decision.findMany({ take: 20, orderBy: { createdAt: "desc" } }).catch(() => []),
        prisma.experiment.findMany({ take: 20, orderBy: { createdAt: "desc" } }).catch(() => []),
      ]);

      if (decisions.length > 0 || experiments.length > 0) {
        const events: TimelineEntryViewModel[] = [];

        for (const d of decisions) {
          events.push({
            date: d.createdAt.toISOString().split("T")[0],
            title: `Decision: ${d.title}`,
            description: `${d.context} — ${d.decision}`,
            category: "Architecture",
            links: [{ label: "Reasoning Replay", url: `/reasoning/${d.slug}` }],
          });
        }

        for (const e of experiments) {
          events.push({
            date: e.createdAt.toISOString().split("T")[0],
            title: `Experiment: ${e.title}`,
            description: `${e.identityDimension} · ${e.category} — ${e.objective}`,
            category: "Experiment",
            links: [{ label: "Lab Terminal", url: `/laboratory/${e.slug}` }],
          });
        }

        events.sort((a, b) => b.date.localeCompare(a.date));
        return events;
      }
    } catch (err) {
      console.warn("TimelineService DB lookup fallback:", err);
    }

    return fallbackTimeline.map((t) => ({
      date: t.date,
      title: t.title,
      description: t.description,
      category: t.category,
      links: ((t as unknown as Record<string, unknown>).links as Array<{ label: string; url: string }>) || [],
    }));
  }
}

export const timelineService = new TimelineService();
