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
  role: "Internet engineer — networking, AI systems, space infrastructure",
  location: "Currently in Rome, relocating to Paris (STATION F Landing Zone)",
  mission:
    "Most of what I work on comes down to the same question: what's actually holding this up, and can I trust it? I studied internet engineering because networks are one of the few systems you can watch fail in real time. I still think in that shape — trace the problem down to the layer underneath, then build there.",
  currentFocus: [
    "Preparing to relocate to Paris for STATION F's Landing Zone (Aug 10 – Sep 10)",
    "A vertical slice through Computer Networking — one topic, DNS or HTTP, taken from source to real experiment to artifact",
    "3D cell tracking for the Kaggle × ChanZuckerberg Biohub competition, due late September",
  ],
  principles: [
    {
      title: "Evidence over percentages",
      description:
        "I don't put skill bars or proficiency scores on anything here. If I can't point to the artifact — code, a config, a diagram, a number someone else can check — I don't claim it.",
      related: { kind: "experiment", ref: "Evidence Integrity Validator" },
    },
    {
      title: "Show what broke",
      description:
        "Most write-ups skip the part where the plan didn't work. I try not to. The middle of a project is usually more useful than the pitch.",
      related: { kind: "article", ref: "What Broke in the CineForge Provider Layer" },
    },
    {
      title: "Build the layer underneath",
      description:
        "Given a choice between the visible feature and the thing it depends on, I'll usually pick the dependency. Networks, ontologies, validators — unglamorous, but everything else stands on them.",
      related: { kind: "project", ref: "CosmoHub" },
    },
    {
      title: "One connected map",
      description:
        "Math, electronics, networks, distributed systems, AI — I stopped treating these as separate subjects a while ago. They're one map at different zoom levels.",
      related: { kind: "research", ref: "Wireless Mesh Networks + TV White Space for Rural Connectivity" },
    },
  ],
};

export const knowledgeNodes: KnowledgeNode[] = [
  {
    id: "networking",
    label: "Networking",
    summary: "Internet engineering, protocols, rural connectivity",
    detail:
      "Core discipline from my Internet Engineering degree at the University of Rome Tor Vergata. Thesis work on wireless mesh networks combined with TV white space for connectivity in challenging terrain.",
    projects: ["Wireless Mesh + TV White Space thesis", "CosmoHub"],
    x: 400,
    y: 70,
  },
  {
    id: "ai",
    label: "AI",
    summary: "Multi-agent systems, applied ML pipelines",
    detail:
      "Building production pipelines around foundation models — scene reasoning and generation for CineForge AI Pro, adversarial multi-agent verification for Sentinel AI.",
    projects: ["CineForge AI Pro", "Sentinel AI"],
    x: 534,
    y: 126,
  },
  {
    id: "cloud",
    label: "Cloud",
    summary: "Inference infrastructure, deployment",
    detail:
      "Provider architecture and deployment for AI pipelines — Hugging Face and IBM watsonx/Granite as interchangeable inference backends, containerized services.",
    projects: ["CineForge AI Pro"],
    x: 590,
    y: 260,
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    summary: "Network hardening, evidence integrity",
    detail:
      "TLS/DNSSEC posture on infrastructure I run, and CI-enforced schema validators that keep a knowledge graph honest before content goes anywhere near a frontend.",
    projects: ["Evidence Integrity Validator"],
    x: 534,
    y: 394,
  },
  {
    id: "systems",
    label: "Systems",
    summary: "Pipelines, schemas, protocol-level design",
    detail:
      "The connective tissue between disciplines — FastAPI pipelines, Ajv-backed JSON Schema as a single structural authority, graph validators for reference resolution.",
    projects: ["Evidence Integrity Validator", "CineForge AI Pro"],
    x: 400,
    y: 450,
  },
  {
    id: "finance",
    label: "Finance",
    summary: "Market structure, venture evaluation",
    detail:
      "Personal investing and a habit of stress-testing financial claims — including flagging inflated ROI/IRR assumptions in a bio-energy investment framework.",
    projects: ["Independent venture evaluation"],
    x: 266,
    y: 394,
  },
  {
    id: "space",
    label: "Space",
    summary: "Satellite comms, space-sector intelligence",
    detail:
      "CosmoHub grew out of a simple observation: there's no clear path into space-tech careers. Now it's an ontology-driven intelligence layer for the space economy.",
    projects: ["CosmoHub", "AgriSat"],
    x: 210,
    y: 260,
  },
  {
    id: "distributed-systems",
    label: "Distributed Systems",
    summary: "Graphs, consensus, multi-agent coordination",
    detail:
      "Event Relationship Graphs for incident intelligence, a knowledge graph for how I document my own work, coordination logic across agent pipelines.",
    projects: ["Sentinel AI", "Evidence Integrity Validator"],
    x: 266,
    y: 126,
  },
];

export const knowledgeEdges: KnowledgeEdge[] = [
  { from: "networking", to: "space", label: "Satellite communications" },
  { from: "networking", to: "cybersecurity", label: "Network hardening" },
  { from: "networking", to: "systems", label: "Protocol-level design" },
  { from: "ai", to: "cloud", label: "Inference infrastructure" },
  { from: "ai", to: "systems", label: "Multi-agent orchestration" },
  { from: "ai", to: "distributed-systems", label: "Agent coordination" },
  { from: "cybersecurity", to: "distributed-systems", label: "Evidence integrity" },
  { from: "space", to: "finance", label: "Space-economy intelligence" },
];

export const projects: Project[] = [
  {
    slug: "cineforge-ai-pro",
    title: "CineForge AI Pro",
    tagline: "A bilingual AI pre-production assistant for filmmakers",
    status: "Shipped",
    problem:
      "Independent film pre-production is fragmented across script breakdown, storyboarding, budgeting, and — for Arabic/English productions — translation overhead on top of all of it.",
    solution:
      "An end-to-end pipeline that takes a raw script and produces scene breakdowns, cinematic prompts, storyboard frames, a rough soundscape, an animatic, and a budget estimate, in both Arabic and English.",
    architecture: [
      "Script upload → parsing → scene extraction",
      "AI scene reasoning → cinematic prompt generation",
      "Storyboard image generation → audio/soundscape layer",
      "Animatic assembly → budget estimation → export",
    ],
    stack: ["FastAPI", "Python", "Hugging Face Inference", "IBM Granite / watsonx (secondary provider)"],
    lessons:
      "Built the provider layer so Hugging Face and watsonx are interchangeable — when watsonx access became a blocker mid-build, the pipeline kept running on Hugging Face alone. Built with a team for the IBM SkillsBuild AI Builders Challenge; the submission was completed and delivered by the July 31 deadline.",
    domain: ["ai", "cloud", "systems"],
    atmosphere: { tint: "#F5B942", label: "Cinematic" },
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel AI",
    tagline: "Explainable incident intelligence for creative industries",
    status: "Submitted",
    problem:
      "Incident response tools tend to produce a verdict without a legible trail — you get an answer, not a reason to trust it.",
    solution:
      "A multi-agent architecture built on IBM Granite where agents cross-verify each other adversarially, backed by an Event Relationship Graph that stores evidence rather than conclusions, plus a structured model for expressing uncertainty explicitly.",
    architecture: [
      "Multi-agent Granite pipeline with adversarial verification",
      "Event Relationship Graph as the evidence store",
      "Structured Uncertainty Model surfaced alongside every output",
    ],
    stack: ["IBM Granite", "watsonx", "Python", "ReportLab"],
    lessons:
      "Served as Integration Lead for the IBM watsonx Challenge 2026 (Creative Industries track). Writing the 13-page build document in parallel with the architecture forced a lot of decisions about the uncertainty model to get made earlier than they otherwise would have.",
    domain: ["ai", "distributed-systems", "systems"],
    atmosphere: { tint: "#F05252", label: "Investigative" },
  },
  {
    slug: "cosmohub",
    title: "CosmoHub",
    tagline: "An intelligence and discovery layer for the space economy",
    status: "In build",
    problem:
      "Space research, missions, companies, universities, and opportunities are fragmented across sources — and there's no clear on-ramp into space-tech careers the way there is for, say, software.",
    solution:
      "An ontology-driven platform — objects, properties, and links, in the spirit of Palantir Gotham's data model — that unifies space-sector data and lets applications be built on top of it, rather than a course marketplace.",
    architecture: [
      "Ontology layer: objects / properties / links",
      "Applications built on top of the shared ontology",
      "Positioned as the connective layer between institutes, companies, and people",
    ],
    stack: ["Ontology modeling", "Knowledge graphs", "Applied AI"],
    lessons:
      "Started inside the Universeh Student Fellowship (an 8-university consortium) as AgriSat's sibling project. Rewriting the pitch for INFERENCE Lab forced the framing down to one sentence: the news and the venture capital layer, for space.",
    domain: ["space", "distributed-systems", "finance"],
    atmosphere: { tint: "#4F8CFF", label: "Orbital" },
  },
  {
    slug: "zebrafish-cell-tracking",
    title: "3D Zebrafish Cell Tracking",
    tagline: "Kaggle × ChanZuckerberg Biohub competition entry",
    status: "In build",
    problem:
      "Tracking individual cells through 3D microscopy volumes of developing zebrafish embryos, where voxel spacing is anisotropic and cells divide, move, and disappear from view.",
    solution:
      "A tracking pipeline that segments cells per volume and links them across time into consistent lineages, correcting for the non-uniform voxel scale along the depth axis.",
    architecture: [
      "Cellpose for per-frame 3D segmentation",
      "btrack for cell tracking across timepoints",
      "zarr for chunked volumetric data access",
      "NetworkX for lineage graph construction",
    ],
    stack: ["Python", "Cellpose", "btrack", "zarr", "NetworkX"],
    lessons:
      "Anisotropic voxel scaling turned out to matter far more than expected — treating z-spacing the same as x/y silently breaks tracking quality. Deadline is late September 2026.",
    domain: ["ai", "distributed-systems"],
    atmosphere: { tint: "#31C48D", label: "Biological" },
  },
  {
    slug: "netlaunch",
    title: "NetLaunch",
    tagline: "A ₹999 networking bootcamp, built and shipped solo",
    status: "Live",
    problem:
      "Networking fundamentals are usually taught either too academically or too certification-focused, with no course positioned for someone starting from zero at an accessible price.",
    solution:
      "A course website with a real curriculum, transformation stories, and a working checkout flow — built to actually sell a ₹999 bootcamp, not just describe one.",
    architecture: [
      "Marketing site with curriculum display",
      "Transformation-story section",
      "Checkout modal wired to a real payment flow",
    ],
    stack: ["Web frontend", "Payment integration"],
    lessons:
      "Shipping the checkout modal — not just the curriculum page — was the part that made this a real product instead of a landing page.",
    domain: ["systems", "networking"],
    atmosphere: { tint: "#B8B8B8", label: "Practical" },
  },
];

export const research: ResearchItem[] = [
  {
    type: "Thesis",
    title: "Wireless Mesh Networks + TV White Space for Rural Connectivity",
    context: "Internet Engineering thesis, University of Rome Tor Vergata",
    description:
      "Examines combining wireless mesh topologies with TV white space spectrum to extend connectivity into difficult terrain and underserved rural areas, where conventional infrastructure deployment is cost-prohibitive.",
    tags: ["Wireless Mesh", "TV White Space", "Rural Connectivity", "Thesis"],
  },
  {
    type: "Whitepaper",
    title: "CosmoHub: Ontology and Workflow Specification",
    context: "Internal strategy document, written for prospective collaborators",
    description:
      "Defines CosmoHub's ontology model — objects, properties, and links — and the workflows needed to build it, aimed at developers and insiders rather than a general audience.",
    tags: ["Ontology", "Knowledge Graphs", "Space Economy"],
  },
  {
    type: "Field notes",
    title: "Evidence States for a Portfolio Graph",
    context: "Personal engineering log",
    description:
      "Working notes on deriving evidence states — ENCOUNTERED, STUDIED, IMPLEMENTED, TESTED, and eventually APPLIED, DEFENDED — from real artifacts rather than assigning them by hand, plus the case for keeping structural validation (Ajv/JSON Schema) separate from graph-level checks like ID uniqueness and reference resolution.",
    tags: ["Knowledge Graphs", "JSON Schema", "CI"],
  },
  {
    type: "Field notes",
    title: "Adversarial Verification in Multi-Agent Pipelines",
    context: "Notes from building Sentinel AI",
    description:
      "How having Granite-based agents check each other adversarially — rather than trusting a single pass — surfaces disagreements worth flagging instead of silently averaging them away.",
    tags: ["Multi-agent", "IBM Granite", "Explainability"],
  },
];

export const experiments: Experiment[] = [
  {
    title: "Evidence Integrity Validator",
    status: "In progress",
    progress: 35,
    description:
      "A CI-enforced validator, built before any real content goes into the underlying knowledge graph — Ajv/JSON Schema as the single structural authority, a separate graph validator for ID uniqueness, reference resolution, and derived evidence states. First checkpoint committed with 22 passing tests.",
    tags: ["TypeScript", "Ajv", "JSON Schema", "CI"],
  },
  {
    title: "3D Cell Tracking — Anisotropic Voxel Correction",
    status: "In progress",
    progress: 40,
    description:
      "Refining the Cellpose → btrack → NetworkX pipeline for the Kaggle ChanZuckerberg Biohub competition ahead of the late-September deadline.",
    tags: ["Computer Vision", "Cellpose", "3D Microscopy"],
  },
  {
    title: "CineForge — Agentic Handoff",
    status: "Paused",
    progress: 60,
    description:
      "Phase 1 monorepo and both AI pipeline stages (scene reasoning, image generation) are merged to main. Next phase — frontend and further pipeline work — is being handed to an agentic coding tool for iteration.",
    tags: ["FastAPI", "Hugging Face", "Agentic coding"],
  },
  {
    title: "Computer Networking Vertical Slice",
    status: "In progress",
    progress: 20,
    description:
      "Running one real topic — DNS or HTTP, from Kurose & Ross's Computer Networking — through the full evidence pipeline: source → concept → question → real experiment → outcome → artifact, before any frontend work begins on the knowledge map.",
    tags: ["Networking", "Evidence Graph"],
  },
];

export const ventures: Venture[] = [
  {
    name: "CosmoHub",
    tagline: "The Bloomberg of space tech",
    problem:
      "There is no clear path from curiosity about space technology to a career or research fellowship in it — information about missions, institutions, and opportunities is scattered across a hundred disconnected sources.",
    market:
      "Space enthusiasts, students, professionals, universities, and the research institutions and companies trying to reach them.",
    stage: "Early build — ontology and strategy defined, pitching to potential collaborators",
    notes:
      "Originated inside the Universeh Student Fellowship, an 8-university consortium. Currently in conversation with INFERENCE Lab about overlap and collaboration.",
    vision:
      "A 10-year build toward becoming the connective layer for the global space ecosystem — the news outlet and the venture capital layer that finance already has, but for space.",
  },
  {
    name: "NetLaunch",
    tagline: "A ₹999 networking bootcamp for absolute beginners",
    problem:
      "Networking education sits at two extremes — dense academic theory or narrow certification cram — with nothing accessible for someone starting from zero.",
    market: "First-time networking learners priced out of traditional bootcamps and certification tracks.",
    stage: "Live — site, curriculum, and checkout shipped",
    notes: "Built solo end-to-end, including the payment flow, not just the marketing page.",
    vision: "A low-cost, high-clarity on-ramp into networking as a first technical discipline.",
  },
];

export const articles: Article[] = [
  {
    title: "Why There Are No Skill Bars Here",
    dek:
      "A percentage next to a skill name doesn't tell you anything except that someone was confident typing it. I'd rather show the artifact and let you decide.",
    date: "2026",
    readTime: "6 min",
    category: "Build log",
    featured: true,
  },
  {
    title: "What Broke in the CineForge Provider Layer",
    dek:
      "When watsonx access became a blocker mid-build, the pipeline needed to keep running on Hugging Face alone. Notes on designing for a provider to disappear.",
    date: "2026",
    readTime: "4 min",
    category: "Build log",
  },
  {
    title: "Voxel Anisotropy Will Quietly Ruin Your Cell Tracking",
    dek:
      "Treating z-spacing the same as x/y in 3D microscopy data breaks tracking in ways that are easy to miss until the lineages stop making sense.",
    date: "2026",
    readTime: "5 min",
    category: "Field notes",
  },
  {
    title: "Adversarial Agents, Not Averaging Agents",
    dek:
      "Building Sentinel AI's verification layer meant designing agents to disagree productively instead of quietly converging on a smoothed-over answer.",
    date: "2026",
    readTime: "5 min",
    category: "Field notes",
  },
];

export const timeline: TimelineEntry[] = [
  {
    date: "2021 – 2026",
    category: "Education",
    title: "Internet Engineering, University of Rome Tor Vergata",
    description:
      "Degree in Internet Engineering with a thesis on wireless mesh networks combined with TV white space for rural connectivity.",
  },
  {
    date: "2026",
    category: "Project",
    title: "Universeh Student Fellowship",
    description:
      "Built CosmoHub and AgriSat as part of an 8-university consortium fellowship focused on space technology.",
  },
  {
    date: "Jul 2026",
    category: "Project",
    title: "CineForge AI Pro submitted",
    description:
      "Bilingual Arabic/English AI pre-production assistant for filmmakers, submitted to the IBM SkillsBuild AI Builders Challenge.",
  },
  {
    date: "2026",
    category: "Project",
    title: "Sentinel AI — IBM watsonx Challenge",
    description:
      "Served as Integration Lead on an explainable incident-intelligence platform for the Creative Industries track.",
  },
  {
    date: "Aug 2026",
    category: "Award",
    title: "Selected for STATION F Landing Zone",
    description:
      "Selected for STATION F's Landing Zone program in Paris — relocating from Rome for a 30-day stint, August 10 to September 10.",
  },
  {
    date: "Sep 2026",
    category: "Research",
    title: "Kaggle × ChanZuckerberg Biohub competition",
    description:
      "3D microscopy cell-tracking submission for zebrafish embryo development data due late September.",
  },
];

export const network: NetworkNode[] = [
  {
    name: "Deaduramilade",
    role: "Team lead, CineForge AI Pro",
    context: "IBM SkillsBuild AI Builders Challenge",
  },
  {
    name: "Muhammad Khubaib Ahmad",
    role: "INFERENCE Lab",
    context: "Evaluating collaboration and overlap with CosmoHub",
  },
  {
    name: "Universeh Student Fellowship",
    role: "8-university consortium",
    context: "Origin of CosmoHub and AgriSat",
  },
  {
    name: "STATION F Landing Zone",
    role: "Paris program cohort",
    context: "Starting August 2026",
  },
];

export const now = {
  updated: "August 2026",
  items: [
    "Packing for Paris — STATION F's Landing Zone runs August 10 to September 10, and the Italian residence permit expires shortly after, on September 19.",
    "Working through DNS or HTTP as the first real vertical slice of the networking knowledge graph — source, concept, experiment, artifact, in that order.",
    "Segmenting and tracking cells through 3D zebrafish microscopy data for the Kaggle × ChanZuckerberg Biohub competition, due late September.",
    "CineForge AI Pro's next phase — frontend and further pipeline work — has been handed off to an agentic coding tool while attention moves to the above.",
  ],
};

export const contact = {
  heading: "Let's build something together",
  body:
    "If you're working on networking, AI infrastructure, or space-sector tooling and think there's an overlap, reach out. I read everything that comes in.",
  email: "hello@kantimohanthy.dev",
  linkedin: "https://linkedin.com/in/ujwalshyam-kantimohanthy",
  github: "https://github.com/kantimohanthy",
  schedulingNote: "Scheduling link coming soon — email works in the meantime.",
};

export const notebook = {
  intro:
    "A smaller, less edited layer. What's actually on my desk, not what's ready to present.",
  entries: [
    {
      label: "Reading through",
      value: "Kurose & Ross, Computer Networking — the source text for the current DNS/HTTP vertical slice.",
    },
    {
      label: "Stuck on",
      value:
        "Getting the anisotropic voxel correction right in the zebrafish tracking pipeline without breaking lineage continuity.",
    },
    {
      label: "Rewriting",
      value: "The CosmoHub pitch, again, this time for INFERENCE Lab — trying to get the problem statement down to one sentence.",
    },
    {
      label: "Watching the clock on",
      value: "The Italian residence permit — expires September 19, shortly after the Paris program ends.",
    },
  ],
};

export const vision = {
  statement:
    "Most of the internet's remaining problems aren't about speed anymore — they're about reach. There are still places a signal doesn't get to, and still ways of proving what you know that depend more on how you phrase it than on what you've actually built. Those are the two problems I keep coming back to.",
  direction: [
    "Paris next, then wherever the infrastructure problems are least solved",
    "Keeping my own work documented as a knowledge graph instead of a résumé",
    "CosmoHub, built out slowly, as real infrastructure rather than a pitch",
  ],
};
