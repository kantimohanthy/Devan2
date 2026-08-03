export const NAV_ITEMS = [
  { id: "identity", label: "Identity" },
  { id: "knowledge-graph", label: "Knowledge Graph" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experiments", label: "Experiments" },
  { id: "ventures", label: "Ventures" },
  { id: "writing", label: "Writing" },
  { id: "timeline", label: "Timeline" },
  { id: "network", label: "Network" },
  { id: "now", label: "Now" },
  { id: "vision", label: "Vision" },
] as const;

// Deliberately not part of NAV_ITEMS or the command palette — a quieter,
// slightly hidden entry point to the personal notebook layer.
export const HIDDEN_NAV_ITEM = { id: "uj", label: "UJ" } as const;
