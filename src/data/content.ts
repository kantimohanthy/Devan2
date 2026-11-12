import {
  Article,
  Experiment,
  KnowledgeEdge,
  KnowledgeNode,
  NetworkNode,
  Project,
  ResearchItem,
  TimelineEntry,
  Venture,
} from "./types";

export const identity = {
  name: "Ujwal Shyam Kantimohanthy",
  handle: "UJ",
  role: "Engineering student building reliable web systems, evidence-grounded AI tools and network experiments",
  location: "Rome, Italy",
  mission:
    "Most of what I work on comes down to one question: what is holding this system up, and can you verify it directly? Networks expose failures in real time, so I apply that habit across infrastructure, web tenancy, and data evaluation.",
  currentFocus: [
    "LOOP — multi-tenant feedback intelligence built during Zidio Development internship",
    "DASER-Net — real-corpus speech validation & reproducible splits at INFERENCE Lab",
    "Undergraduate thesis on Wireless Mesh + TV White Space for rural terrain connectivity",
    "DEVAN — static-first evidence ledger powering kantimohanthy.dev",
  ],
  principles: [
    {
      title: "Evidence over percentages",
      description:
        "No proficiency bars or readiness scores appear here. Every claim resolves to inspectable repositories, dated logs, or honest limitations.",
      related: { kind: "experiment", ref: "Evidence Integrity Validator" },
    },
    {
      title: "Show what broke",
      description:
        "Documenting constraints, private access boundaries, and captured bugs (such as loopback DNS capture filters) keeps work trustworthy.",
      related: { kind: "research", ref: "Evidence States for a Portfolio Graph" },
    },
    {
      title: "Build the layer underneath",
      description:
        "Focusing on protocols, relational permissions, schemas, and data splits — the unglamorous infrastructure everything else relies on.",
      related: { kind: "research", ref: "Wireless Mesh Networks + TV White Space for Rural Connectivity" },
    },
  ],
};

export const knowledgeNodes: KnowledgeNode[] = [
  {
    id: "networking",
    domain: "build",
    label: "Networking",
    summary: "Internet engineering, protocols, rural mesh connectivity",
    detail:
      "BSc Engineering Sciences studies at the University of Rome Tor Vergata (expected 2027). Thesis models wireless mesh topologies paired with UHF TV White Space spectrum across obstructed terrain.",
    projects: ["Wireless Mesh + TV White Space thesis", "DEVAN"],
    x: 400,
    y: 70,
  },
  {
    id: "ai",
    domain: "explore",
    label: "Applied AI",
    summary: "Evidence-grounded tools & cross-corpus validation",
    detail:
      "Grounded question answering over tenant feedback in LOOP, bilingual extraction pipelines in CineForge AI Pro, and speaker-disjoint dataset splits for DASER-Net.",
    projects: ["LOOP", "DASER-Net", "CineForge AI Pro"],
    x: 534,
    y: 126,
  },
  {
    id: "systems",
    domain: "build",
    label: "Systems",
    summary: "Schemas, multi-tenancy, static determinism",
    detail:
      "Typed evidence ledgers, Next.js static export guarantees, PostgreSQL tenancy boundaries, and deterministic CI test suites.",
    projects: ["DEVAN", "LOOP"],
    x: 400,
    y: 450,
  },
  {
    id: "cybersecurity",
    domain: "build",
    label: "Integrity",
    summary: "RBAC isolation, evidence verification, secret scanning",
    detail:
      "Four-role RBAC checks and spreadsheet formula escaping in LOOP alongside build-output guardrail scanning across kantimohanthy.dev.",
    projects: ["LOOP", "DEVAN"],
    x: 534,
    y: 394,
  },
];

export const knowledgeEdges: KnowledgeEdge[] = [
  { from: "networking", to: "systems", label: "Protocol level design" },
  { from: "systems", to: "cybersecurity", label: "Ledger & boundary verification" },
  { from: "ai", to: "systems", label: "Reproducible pipelines" },
];

export const projects: Project[] = [
  {
    slug: "project-loop",
    title: "LOOP",
    tagline: "Multi-tenant customer feedback intelligence platform",
    status: "Submitted",
    problem: "Product teams lose user feedback in ungrounded spreadsheets without tenant boundaries.",
    solution: "Built CSV/API ingestion, role-scoped dashboards, and Ask LOOP grounded in raw entries.",
    architecture: ["CSV/API Ingestion -> Zod validation -> Org-scoped storage -> Trend & Q&A"],
    stack: ["Next.js", "TypeScript", "Supabase Postgres RLS", "Vitest"],
    lessons: "Author-run unit suite 13/13 passed; live Supabase RLS deployment remains unverified.",
    domain: ["systems", "ai"],
    atmosphere: { tint: "#7CC488", label: "Submitted" },
  },
  {
    slug: "cineforge-ai-pro",
    title: "CineForge AI Pro",
    tagline: "Bilingual Arabic/English script preproduction team submission",
    status: "Submitted",
    problem: "Manual script breakdown across bilingual film preproduction sets.",
    solution: "Python pipeline parsing raw scripts into structured JSON scene/shot breakdowns.",
    architecture: ["Script upload -> parsing -> scene segmentation -> JSON breakdown"],
    stack: ["Python"],
    lessons: "IBM SkillsBuild AI Builders Challenge team submission delivered July 2026.",
    domain: ["ai", "systems"],
    atmosphere: { tint: "#F2A65A", label: "Submission" },
  },
];

export const research: ResearchItem[] = [
  {
    type: "Thesis",
    title: "Wireless Mesh Networks + TV White Space for Rural Connectivity",
    context: "BSc Engineering Sciences thesis, University of Rome Tor Vergata",
    description:
      "Examines combining wireless mesh topologies with UHF TV White Space spectrum across obstructed mountain terrain via parametric MATLAB models.",
    tags: ["Wireless Mesh", "TV White Space", "Thesis"],
  },
  {
    type: "Field notes",
    title: "Evidence States for a Portfolio Graph",
    context: "DEVAN ledger specification",
    description:
      "Deriving ENCOUNTERED, STUDIED, IMPLEMENTED, and TESTED strictly from documented sources and observed outputs rather than manual ratings.",
    tags: ["Knowledge Graphs", "Evidence Ledger"],
  },
];

export const experiments: Experiment[] = [
  {
    title: "Computer Networking Vertical Slice (DNS)",
    status: "Complete",
    description: "Four-hop iterative resolution trace via dig +trace and tshark grounded in RFC 1035.",
    tags: ["Networking", "RFC 1035"],
  },
];

export const ventures: Venture[] = [];

export const articles: Article[] = [
  {
    title: "Why There Are No Skill Bars Here",
    dek: "A self-assigned percentage conveys zero checkable signal; attaching sources and limitations allows engineers to verify claims independently.",
    date: "2026",
    readTime: "4 min",
    category: "Field notes",
    featured: true,
  },
];

export const timeline: TimelineEntry[] = [
  {
    date: "2022 – exp. 2027",
    category: "Education",
    title: "BSc Engineering Sciences, University of Rome Tor Vergata",
    description:
      "Undergraduate degree in progress; thesis modeling wireless mesh networks and TV White Space spectrum for obstructed terrain.",
  },
  {
    date: "Jul 2026",
    category: "Project",
    title: "CineForge AI Pro (Team Submission)",
    description: "Bilingual Arabic/English script preproduction prototype for IBM SkillsBuild Challenge.",
  },
  {
    date: "Since Aug 2026",
    category: "Project",
    title: "Web Development Intern, Zidio Development",
    description: "Built LOOP multi-tenant feedback intelligence demo and unit test suite.",
  },
  {
    date: "Since Aug 2026",
    category: "Research",
    title: "Research Collaborator, INFERENCE Lab (DASER-Net)",
    description: "Real-corpus validation and speaker-disjoint split pipelines on CREMA-D.",
  },
];

export const network: NetworkNode[] = [
  {
    name: "Muhammad Khubaib Ahmad",
    role: "INFERENCE Lab",
    context: "DASER-Net research collaboration",
  },
  {
    name: "UNIVERSEH Student Fellowship",
    role: "Eight-university consortium",
    context: "Space fellowship cohort (Sep 2025)",
  },
];

export const now = {
  updated: "November 2026",
  items: [
    "Refining BSc thesis draft on wireless mesh and TV White Space propagation modeling.",
    "Validating real speech corpus pipelines for DASER-Net at INFERENCE Lab.",
    "Developing DEVAN evidence ledger workflows and routed documentation.",
  ],
};

export const contact = {
  heading: "Direct Contact",
  body: "Open to backend, infrastructure, networking, and applied AI engineering opportunities.",
  email: "hello@kantimohanthy.dev",
  linkedin: "https://www.linkedin.com/in/ujwalshyam-kantimohanthy/",
  github: "https://github.com/kantimohanthy",
  schedulingNote: "Direct email or LinkedIn works best.",
};

export const notebook = {
  intro: "Active working notes kept honest about limitations and next steps.",
  entries: [
    {
      label: "Networking lab",
      value: "Extending verified packet capture records beyond RFC 1035 iterative DNS traces.",
    },
    {
      label: "Thesis draft",
      value: "Finalizing faculty review edits before comparing routing overhead on mountain topologies.",
    },
  ],
};

export const vision = {
  statement:
    "Signals fail at edges — across obstructed mountain valleys and across claims that cannot point to their underlying proof.",
  direction: [
    "Network and distributed systems infrastructure",
    "Evidence-grounded engineering documentation",
  ],
};
