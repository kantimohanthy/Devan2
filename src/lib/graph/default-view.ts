export interface CuratedNodeData {
  id: string;
  label: string;
  featured?: boolean;
  lastActivity?: string;
  domain: string;
}

const DEFAULT_FEATURED_LIMIT = 8;

export function getDefaultVisibleNodeIds(nodes: CuratedNodeData[]): Set<string> {
  const featured = nodes.filter((n) => n.featured);

  if (featured.length > 0) {
    return new Set(featured.slice(0, DEFAULT_FEATURED_LIMIT).map((n) => n.id));
  }

  // Fallback to most recently active
  const byRecency = [...nodes].sort((a, b) =>
    (b.lastActivity ?? "").localeCompare(a.lastActivity ?? "")
  );
  return new Set(byRecency.slice(0, DEFAULT_FEATURED_LIMIT).map((n) => n.id));
}
