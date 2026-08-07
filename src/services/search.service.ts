import { searchRepository, RawSearchData } from "@/repositories/search.repository";

export interface SearchResultItem {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  score: number;
  icon?: string;
  route: string;
  metadata?: Record<string, unknown>;
}

export class SearchService {

  async search(rawQuery: string): Promise<SearchResultItem[]> {
    const query = rawQuery.trim().toLowerCase();
    if (!query) return [];

    const data: RawSearchData = await searchRepository.fetchAllSearchData();
    const queryTerms = query.split(/\s+/).filter(Boolean);

    const calculateScore = (title: string, text: string): number => {
      const tLower = title.toLowerCase();
      const bodyLower = text.toLowerCase();

      let score = 0;
      if (tLower === query) score += 1.0;
      else if (tLower.startsWith(query)) score += 0.8;
      else if (tLower.includes(query)) score += 0.6;

      for (const term of queryTerms) {
        if (tLower.includes(term)) score += 0.3;
        if (bodyLower.includes(term)) score += 0.15;
      }
      return parseFloat(score.toFixed(3));
    };

    const results: SearchResultItem[] = [];

    // 1. Concepts
    for (const c of data.concepts) {
      const score = calculateScore(c.title, `${c.summary} ${c.description} ${c.domain}`);
      if (score > 0) {
        results.push({
          type: "Concept",
          id: c.slug,
          title: c.title,
          subtitle: c.summary,
          score,
          icon: "Diamond",
          route: `/knowledge/${c.slug}`,
          metadata: { domain: c.domain },
        });
      }
    }

    // 2. Experiments
    for (const e of data.experiments) {
      const score = calculateScore(e.title, `${e.objective} ${e.problem} ${e.category} ${e.identityDimension}`);
      if (score > 0) {
        results.push({
          type: "Experiment",
          id: e.slug,
          title: e.title,
          subtitle: `${e.identityDimension} · ${e.category}`,
          score,
          icon: "SquareStack",
          route: `/laboratory/${e.slug}`,
          metadata: { category: e.category },
        });
      }
    }

    // 3. Decisions / Reasoning
    for (const d of data.decisions) {
      const score = calculateScore(d.title, `${d.context} ${d.decision} ${d.rationale}`);
      if (score > 0) {
        results.push({
          type: "Decision",
          id: d.slug,
          title: d.title,
          subtitle: d.context,
          score,
          icon: "Compass",
          route: `/reasoning/${d.slug}`,
        });
      }
    }

    // 4. Repositories
    for (const r of data.repositories) {
      const score = calculateScore(r.name, `${r.description} ${r.language}`);
      if (score > 0) {
        results.push({
          type: "Repository",
          id: r.slug,
          title: r.name,
          subtitle: r.description,
          score,
          icon: "Layers",
          route: `/repositories/${r.slug}`,
          metadata: { language: r.language },
        });
      }
    }

    // 5. Projects
    for (const p of data.projects) {
      const score = calculateScore(p.title, `${p.summary} ${p.description}`);
      if (score > 0) {
        results.push({
          type: "Project",
          id: p.slug,
          title: p.title,
          subtitle: p.summary,
          score,
          icon: "Boxes",
          route: `/projects/${p.slug}`,
        });
      }
    }

    // 6. Missions
    for (const m of data.missions) {
      const score = calculateScore(m.title, `${m.objective} ${m.domain}`);
      if (score > 0) {
        results.push({
          type: "Mission",
          id: m.slug,
          title: m.title,
          subtitle: m.objective,
          score,
          icon: "Circle",
          route: `/missions/${m.slug}`,
        });
      }
    }

    // 7. Artifacts
    for (const a of data.artifacts) {
      const score = calculateScore(a.title, `${a.summary} ${a.problem}`);
      if (score > 0) {
        results.push({
          type: "Artifact",
          id: a.id,
          title: a.title,
          subtitle: a.summary,
          score,
          icon: "SquareStack",
          route: `/evidence`,
        });
      }
    }

    // 8. Knowledge Nodes
    for (const n of data.knowledgeNodes) {
      const score = calculateScore(n.label, `${n.summary} ${n.detail} ${n.domain}`);
      if (score > 0 && !results.some((r) => r.title.toLowerCase() === n.label.toLowerCase())) {
        results.push({
          type: "Concept",
          id: n.id,
          title: n.label,
          subtitle: n.summary,
          score,
          icon: "Diamond",
          route: `/knowledge/${n.id}`,
        });
      }
    }

    // Sort by relevance score descending
    return results.sort((a, b) => b.score - a.score);
  }
}

export const searchService = new SearchService();
