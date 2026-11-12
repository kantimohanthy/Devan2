/**
 * Consolidated compatibility facade — single source of truth lives in src/content/.
 */
export {
  person,
  projects,
  decisions,
  timeline,
  LAST_REVIEWED,
  formatMonth,
  getProjectBySlug as getProject,
  getDecisionById as getDecision,
  featuredWorkProjects as featuredProjects,
} from "@/content";

export const now = [
  { label: "Writing", value: "BSc thesis draft on wireless mesh + TV White Space", href: "/work/wireless-mesh-tvws/" },
  { label: "Researching", value: "Cross-corpus speech emotion recognition data validation", href: "/work/daser-net/" },
  { label: "Building", value: "DEVAN evidence ledger and routed architecture", href: "/work/devan/" },
];

export const missions = [
  {
    slug: "reliable-software",
    title: "Build reliable software",
    question: "How do I ship software whose behaviour other people can check?",
    why: "Users trust a product long before they can inspect it. I want that trust earned by tests, permissions, and honest scope.",
    projects: ["project-loop", "devan"],
    decisions: ["dec-static-export", "why-postgresql"],
    next: "Planned: verify LOOP's row level security against a live Postgres deployment.",
    x: 20,
    y: 30,
  },
  {
    slug: "understand-networks",
    title: "Understand networks",
    question: "What happens between a request and a reply, and how do you extend links across obstructed terrain?",
    why: "Networks expose every failure cleanly through packet traces and signal margins.",
    projects: ["wireless-mesh-tvws", "devan"],
    decisions: ["dec-static-export"],
    next: "Planned: finalize thesis review and compare routing protocols under the terrain model.",
    x: 52,
    y: 16,
  },
  {
    slug: "validate-ai",
    title: "Validate AI",
    question: "Does a model still hold on unseen speakers and cite real sources?",
    why: "A demo on training data proves little; speaker-disjoint splits and grounded citations make results checkable.",
    projects: ["daser-net", "project-loop"],
    decisions: [],
    next: "Planned: first cross-corpus baseline evaluation on real speech corpora.",
    x: 82,
    y: 42,
  },
  {
    slug: "organize-communities",
    title: "Organise communities",
    question: "How do you keep technical events and student groups coordinated reliably?",
    why: "Engineering collaboration depends on transparent intake and review workflows.",
    projects: [],
    decisions: [],
    next: "Planned: structured event intake flow for EuroTech Federation.",
    x: 34,
    y: 78,
  },
];
