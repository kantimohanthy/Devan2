/**
 * Public content for kantimohanthy.dev. This file is the single source for the
 * personal site: identity, projects, missions, decisions, timeline.
 *
 * Editorial rules
 *  - Only publish what an artifact supports. Otherwise bound the wording or leave it out.
 *  - Status is written in words. No percentages, levels or scores.
 *  - `lastReviewed` is the date a human (or Claude, on request) actually checked
 *    the entry against its sources. Update it by hand; never at build time.
 *  - Illustrative diagrams are labelled as illustrative wherever they appear.
 *  - Nothing private goes in here: this module ships to the browser.
 */

export type Status = "In progress" | "Draft under review" | "Submitted" | "Early stage" | "Completed" | "Ongoing role";

export interface Artifact {
  label: string;
  href?: string; // omitted when the artifact exists but is not public
  type: "Repository" | "Evidence record" | "Case study" | "Interactive" | "Document" | "Test run" | "Talk";
  date?: string; // ISO yyyy-mm or yyyy-mm-dd
  note?: string;
}

export interface Decision {
  id: string;
  project: string; // project slug
  title: string;
  context: string;
  options: { name: string; tradeoff: string }[];
  choice: string;
  why: string;
  cost: string;
  source: string; // where this decision is documented
}

export interface Project {
  slug: string;
  title: string;
  kicker: string; // short subject line
  organization: string;
  role: string;
  start: string; // ISO yyyy-mm
  end?: string;
  status: Status;
  summary: string;
  problem: string;
  constraints?: string[];
  contributions: string[];
  architecture?: { body: string; points?: string[] };
  decision?: string; // Decision id
  validation?: string[];
  artifacts: Artifact[];
  limitations?: string[];
  next?: string; // planned, labelled as such
  figure: "pipeline" | "topology" | "graph" | "waveform" | "orbit";
  figureCaption: string;
  missions: string[];
  featured?: boolean;
  lastReviewed: string;
}

export interface Mission {
  slug: string;
  title: string;
  question: string;
  why: string;
  projects: string[];
  decisions: string[];
  next: string;
  // position on the field map (0..100 viewBox units), illustrative layout only
  x: number;
  y: number;
}

export interface TimelineEntry {
  date: string; // display
  sort: string; // ISO for ordering
  title: string;
  org: string;
  body: string;
  kind: "Education" | "Work" | "Research" | "Leadership" | "Venture" | "Talk" | "Build";
  href?: string;
}

export const LAST_REVIEWED = "2026-10-03";

export const person = {
  name: "Ujwal Shyam Kantimohanthy",
  short: "Ujwal Kantimohanthy",
  initials: "UK",
  positioning:
    "Software & AI Engineer. I build AI applications and investigate the systems underneath them, from data pipelines and model evaluation to networks and deployment.",
  approach:
    "I learn a system by building something inside it, testing what I assumed, and writing down what the evidence actually says.",
  location: "Rome, Italy",
  email: "hello@kantimohanthy.dev",
  linkedin: "https://www.linkedin.com/in/ujwalshyam-kantimohanthy/",
  github: "https://github.com/kantimohanthy",
  about: [
    "I study Engineering Sciences at the University of Rome Tor Vergata (uniroma2, expected graduation 2027). My thesis asks how wireless mesh networks and TV White Space spectrum could bring connectivity to rural and mountainous places that cables do not reach.",
    "Most of my work happens at the point where a system meets the people who depend on it: a feedback platform a team has to trust, a speech model that has to work on voices it has never heard, a network that has to stay up on a hillside.",
    "I treat my own progress like a long game. I pick a hard mission, learn the rules of the system, build something, check what I assumed, and let the evidence choose the next move. Systems and infrastructure engineering is where I am heading. I am not there yet, and this site shows the path rather than pretending otherwise.",
    "Independent experiments live under Arylax Labs, my lab identity for this kind of exploration.",
  ],
  interests: [
    "Network infrastructure and rural connectivity",
    "Reliable full stack systems",
    "Evaluating AI models on data they were not trained on",
    "Knowledge systems that keep evidence attached to claims",
    "Learning paths into space technology",
  ],
};

export const decisions: Decision[] = [
  {
    id: "why-postgresql",
    project: "devan",
    title: "Why PostgreSQL?",
    context:
      "Choosing PostgreSQL as the foundational relational database for identity, projects, and evidence tracking.",
    options: [
      { name: "SQLite", tradeoff: "Zero config, but single-writer lock limits concurrency under serverless." },
      { name: "MongoDB", tradeoff: "Schema-less flexibility, but lacks strict relation enforcement." },
    ],
    choice: "PostgreSQL with PgBouncer connection pooling.",
    why: "Serverless functions exhaust direct 5432 connections quickly; transaction pooling on port 6543 is essential.",
    cost: "Requires managed connection pooling configuration and transaction-mode pooling.",
    source: "DEVAN platform setup and evidence schema",
  },
];

export const projects: Project[] = [
  {
    slug: "project-loop",
    title: "Project LOOP",
    kicker: "Customer feedback intelligence",
    organization: "Zidio Development · web development internship, team project",
    role: "Full stack developer",
    start: "2026-08",
    status: "Submitted",
    summary:
      "A multi tenant platform that turns raw customer feedback into themes, trends and grounded answers, with each role seeing only what it should.",
    problem:
      "Teams collect feedback from support tickets, surveys and reviews, then lose it in spreadsheets. LOOP ingests that feedback, classifies it, spots emerging themes and answers questions with citations back to the original comments.",
    constraints: [
      "Organisations must never see each other's data.",
      "Four roles (owner, admin, analyst, viewer) with different permissions.",
      "Evaluators had to run it without paid AI keys.",
    ],
    contributions: [
      "CSV ingestion with header mapping and row validation, plus manual and API ingestion.",
      "Role aware interface and server side permission checks.",
      "Trend engine comparing time windows, and Ask LOOP: question answering grounded in stored feedback with evidence citations.",
      "Formula injection escaping on CSV export.",
    ],
    architecture: {
      body: "Next.js App Router with TypeScript and Tailwind. Supabase Postgres and Auth, with row level security policies scoping every query to the user's organisation. Zod validation, Recharts dashboards.",
    },
    validation: [
      "Unit tests: 13 of 13 passing across 6 files (trend engine, tenancy and roles, CSV, fallback analyzer, Ask LOOP, permissions). Run by me on 3 Oct 2026 against commit 1b898e9 (29 Sep 2026). Playwright end to end tests were not run.",
    ],
    artifacts: [
      { label: "Source code", href: "https://github.com/kantimohanthy/zidio-Web-dev", type: "Repository", date: "2026-09-29" },
    ],
    limitations: [
      "The evaluator demo runs on seeded sample data with one click role switching. That is demo behaviour, not production customer persistence.",
      "Row level security is defined in the schema migration. I have not verified it against a production deployment, and there are no production users.",
      "A public demo URL is not listed yet.",
    ],
    next: "Planned: publish the evaluator demo and document the RLS checks against a live Supabase project.",
    figure: "pipeline",
    figureCaption: "Illustrative. How feedback moves through LOOP, from ingestion to role scoped views.",
    missions: ["reliable-software", "validate-ai"],
    featured: true,
    lastReviewed: "2026-10-03",
  },
  {
    slug: "wireless-mesh-tvws",
    title: "Wireless Mesh + TV White Space",
    kicker: "Thesis research",
    organization: "University of Rome Tor Vergata",
    role: "Thesis author",
    start: "2025",
    status: "Draft under review",
    summary:
      "Leveraging wireless mesh networks and TV White Space technology to improve connectivity in challenging terrain and rural areas.",
    problem:
      "Rural and mountainous areas are expensive to connect. Line of sight links get blocked by terrain, and fibre rarely pays back. TV White Space, unused spectrum in the broadcast bands, travels further and through obstacles better than typical WiFi frequencies. The thesis asks whether a mesh built on top of it can extend coverage where conventional networks stop.",
    constraints: [
      "Sparse nodes, long links, varying altitude.",
      "Spectrum shared with licensed TV broadcasters, so devices must avoid occupied channels.",
      "Regulation differs by country.",
    ],
    contributions: [
      "Literature review of mesh architectures, routing protocols and TVWS deployments in rural areas.",
      "MATLAB simulation of a mesh across mountainous terrain: node density, transmit power, noise and mobility as parameters; throughput, latency and signal strength as outputs.",
      "MATLAB simulation of TVWS spectrum management: a base station and devices sharing spectrum with incumbent broadcasters.",
      "A flat mesh topology with nodes placed on peaks and valley entrances to maximise coverage.",
    ],
    artifacts: [{ label: "Thesis draft", type: "Document", note: "Under review, not public" }],
    limitations: [
      "The draft is still under review. Simulation figures are not published here until the thesis is approved.",
      "Simulation only. No field deployment.",
    ],
    next: "Planned: finalise the simulation chapter after review, then compare reactive and proactive routing under the same terrain model.",
    figure: "topology",
    figureCaption: "Illustrative. A flat mesh with relays on ridgelines; not simulation output.",
    missions: ["understand-networks"],
    featured: true,
    lastReviewed: "2026-10-03",
  },
  {
    slug: "devan",
    title: "DEVAN",
    kicker: "Evidence graph and engineering workspace",
    organization: "Personal project",
    role: "Designer and developer",
    start: "2026-07",
    status: "In progress",
    summary:
      "The workspace behind this site. Concepts, experiments and artifacts are linked so that a state like tested is derived from evidence instead of typed in.",
    problem:
      "Portfolios say proficient in DNS and stop there. I wanted every claim on my site to point at something checkable: the source I learned from, the experiment I ran and its raw output.",
    contributions: [
      "An evidence record schema: source, concept, question, experiment, outcome, artifacts.",
      "A derivation function that returns Encountered, Studied, Implemented or Tested from the record's contents.",
      "UJ.OS, the architecture behind the experience: an ontology of concepts and projects, an append only log of experience events, and presentation kept separate from that logic.",
      "The first real record: iterative DNS resolution traced with dig and tshark.",
    ],
    architecture: {
      body: "Next.js and TypeScript, exported as a static site on GitHub Pages. Prisma models for concepts, experiments, decisions and experience events. Because the host is static, API routes do not run in production and the interface falls back to seeded records, which it labels as such.",
    },
    decision: "why-postgresql",
    validation: [
      "DEVAN test suite: 34 passing tests.",
    ],
    artifacts: [
      { label: "Open DEVAN", href: "/devan/", type: "Interactive" },
      { label: "DNS evidence record", href: "/evidence/", type: "Evidence record", date: "2026-08-07" },
      { label: "Source code", href: "https://github.com/kantimohanthy/Devan2", type: "Repository" },
    ],
    limitations: [
      "Tested state is derived strictly from verified artifact proofs. Only one complete evidence record so far (DNS iterative trace).",
      "Earlier versions showed confidence badges that no evidence supported. They have been permanently removed.",
    ],
    next: "Planned: commit raw dig log and packet capture as downloads, and add records beyond DNS before any question answering layer.",
    figure: "graph",
    figureCaption: "Illustrative. The evidence chain each DEVAN record follows.",
    missions: ["understand-networks", "reliable-software"],
    featured: true,
    lastReviewed: "2026-10-15",
  },
  {
    slug: "daser-net",
    title: "DASER-Net",
    kicker: "Cross corpus speech emotion recognition",
    organization: "INFERENCE Lab · research collaboration",
    role: "Collaborator: real data validation and reproducible evaluation",
    start: "2026",
    status: "In progress",
    summary:
      "Disentangled Adversarial Speech Emotion Recognition with Hierarchical Bottleneck Fusion for Cross Corpus Generalization.",
    problem:
      "Can an emotion recognition model trained on one speech dataset work reliably on another? Models often learn the recording conditions and the speakers of their training set instead of the emotion itself. DASER-Net tries to separate those factors.",
    contributions: [
      "Done: a validated ingestion pipeline for the CREMA-D speech dataset, with audio checks.",
      "Done: deterministic, speaker disjoint train, validation and test splits (no speaker appears in two splits) with a frozen manifest.",
      "Done: a waveform dataset and batching layer for real audio, with a global speaker namespace so speakers stay unique across corpora.",
      "Current: an audio baseline to sanity check the pipeline before the full model.",
    ],
    architecture: {
      body: "The model architecture and the initial synthetic pilot were authored by Muhammad Khubaib Ahmad. My work is the real data side: getting actual speech corpora into the pipeline reproducibly so results can be trusted.",
    },
    validation: [
      "Real data pipeline commits dated 2 Oct 2026 in the collaboration repository, each with its own validation script.",
    ],
    artifacts: [{ label: "Collaboration repository", type: "Repository", note: "Not public" }],
    limitations: [
      "No cross corpus results yet. Figures in the repository come from a synthetic pilot, not real data, and are not shown here.",
      "No publication or authorship claim at this stage.",
    ],
    next: "Planned: train on one corpus and evaluate on others, then run ablations to see which part of the model carries the generalisation.",
    figure: "waveform",
    figureCaption: "Illustrative. Train on one corpus, test on another; the planned evaluation matrix, not results.",
    missions: ["validate-ai"],
    featured: true,
    lastReviewed: "2026-10-03",
  },
  {
    slug: "cosmohub",
    title: "ORVYRA (formerly CosmoHub)",
    kicker: "Intelligence for the space economy",
    organization: "Early stage venture · STATION F Landing Zone participant",
    role: "Founder",
    start: "2026-07",
    status: "Early stage",
    summary:
      "INTELLIGENCE FOR THE SPACE ECONOMY. An intelligence and discovery layer connecting space enterprises, research topics, and evidence.",
    problem:
      "Space research, missions, companies, and investments are fragmented across disparate sources. ORVYRA provides an evidence-backed intelligence layer.",
    contributions: [
      "20 seed organizations resolved through ROR with 99 verified relationships and coordinates.",
      "OpenAlex integration: 72 topics, 144 relationships, 323 evidence records.",
      "Data honesty model distinguishing LIVE, SOURCE_FIXTURE, and SYNTHETIC records.",
    ],
    artifacts: [
      { label: "ORVYRA repository", href: "https://github.com/kantimohanthy/Orvyra", type: "Repository" },
      { label: "CosmoHub lineage repo", href: "https://github.com/kantimohanthy/Cosmohub", type: "Repository" },
      { label: "Live prototype", href: "https://kantimohanthy.github.io/Cosmohub", type: "Interactive" },
      { label: "Talk: Building a Sustainable Space Economy", type: "Talk", date: "2026-09", note: "Sustainable Space Conference, Tor Vergata" },
    ],
    limitations: [
      "Some ROR names resolve ambiguously and are not auto-accepted (Polish Space Agency, Luxembourg Space Agency, BELSPO, Austrian Space Applications Programme, DTU).",
      "Taking part in STATION F's Landing Zone is context; it is not investment, endorsement or a partnership.",
    ],
    next: "Planned: improve entity disambiguation heuristics and ingest European space patent datasets.",
    figure: "orbit",
    figureCaption: "Illustrative. Space sector intelligence graph topology.",
    missions: ["space-learning"],
    featured: true,
    lastReviewed: "2026-10-15",
  },
  {
    slug: "cineforge-ai-pro",
    title: "CineForge AI Pro",
    kicker: "Bilingual AI preproduction assistant",
    organization: "IBM SkillsBuild AI Builders Challenge · team submission",
    role: "Integration Lead & Backend Engineer",
    start: "2026-06",
    end: "2026-07",
    status: "Completed",
    summary:
      "A bilingual Arabic and English preproduction assistant that takes screenwriters and filmmakers from script scene extraction to character breakdowns, shot suggestions, and storyboards.",
    problem:
      "Filmmakers and production teams waste days manually segmenting scripts into shot lists, prop inventories, and character breakdown sheets. Existing commercial tools lack Arabic language support and impose rigid proprietary workflows.",
    constraints: [
      "Strict July 31 challenge submission deadline.",
      "Dual language support (Arabic and English) across prompt templates and parsed JSON structures.",
    ],
    contributions: [
      "Architected the modular orchestration service connecting script parser, scene segmenter, and storyboard generator.",
      "Engineered prompt templates and structured JSON parsing for bilingual script breakdown.",
      "Delivered team challenge submission on July 31, 2026.",
    ],
    artifacts: [
      { label: "Source code", href: "https://github.com/kantimohanthy/ClineForge-Pro", type: "Repository", date: "2026-07-31" },
    ],
    limitations: [
      "TODO(UJ): confirm the tech stack before stating FastAPI / watsonx / Hugging Face.",
      "Team submission built for a hackathon challenge; not currently hosted as a public commercial service.",
    ],
    next: "Planned: export scene breakdowns to standard Final Draft / PDF industry formats.",
    figure: "pipeline",
    figureCaption: "Illustrative. Script ingestion, scene extraction, and breakdown delivery.",
    missions: ["reliable-software", "validate-ai"],
    lastReviewed: "2026-10-15",
  },
];

export const missions: Mission[] = [
  {
    slug: "reliable-software",
    title: "Build reliable software",
    question: "How do I ship software whose behaviour other people can check?",
    why: "Users trust a product long before they can inspect it. I want that trust to be earned by tests, permissions and honest status.",
    projects: ["project-loop", "devan"],
    decisions: ["why-postgresql"],
    next: "Planned: verify LOOP's row level security against a live database, not just the migration.",
    x: 18,
    y: 30,
  },
  {
    slug: "understand-networks",
    title: "Understand networks",
    question: "What happens between a request and a reply, and how do you extend a network where cables do not reach?",
    why: "Networks are one of the few systems you can watch fail in real time. That makes them a good teacher.",
    projects: ["wireless-mesh-tvws", "devan"],
    decisions: [],
    next: "Planned: compare reactive and proactive mesh routing under the same terrain model.",
    x: 50,
    y: 12,
  },
  {
    slug: "validate-ai",
    title: "Validate AI",
    question: "Does a model still work on data it was not trained on, and can its answers point to their sources?",
    why: "A model that only works on its own test set is a demo. Generalisation and grounding are what make it useful.",
    projects: ["daser-net", "project-loop"],
    decisions: [],
    next: "Planned: the first cross corpus run on real speech data.",
    x: 84,
    y: 38,
  },
  {
    slug: "space-learning",
    title: "Explore space learning",
    question: "How could a motivated beginner go from zero to useful in space technology?",
    why: "I came to space through fellowships and talks, not a curriculum. The path should not depend on luck.",
    projects: ["cosmohub"],
    decisions: [],
    next: "Planned: a first playable fundamentals module.",
    x: 62,
    y: 70,
  },
  {
    slug: "organize-communities",
    title: "Organise communities",
    question: "How do you make it easy for people to bring events and ideas to a group?",
    why: "Good engineering work still depends on people finding each other. Coordination is a system too.",
    projects: [],
    decisions: [],
    next: "Planned: a clear event request process for EuroTech Federation members.",
    x: 16,
    y: 80,
  },
];

export const timeline: TimelineEntry[] = [
  {
    date: "Sep 2026",
    sort: "2026-09-28",
    title: "Talk: Building a Sustainable Space Economy",
    org: "Sustainable Space Conference, University of Rome Tor Vergata",
    body: "Student talk on balancing commercial growth, orbital responsibility and innovation in the space sector.",
    kind: "Talk",
  },
  {
    date: "Sep 2026",
    sort: "2026-09-09",
    title: "Website diagnostics",
    org: "ZiShop",
    body: "Diagnosed issues on the public web platform, prioritised them and delivered a written audit to the founders.",
    kind: "Work",
  },
  {
    date: "Since Sep 2026",
    sort: "2026-09-02",
    title: "Events Lead",
    org: "EuroTech Federation",
    body: "First point of contact for inbound event requests. Designing the submission and review process for team members.",
    kind: "Leadership",
  },
  {
    date: "Since Aug 2026",
    sort: "2026-08-15",
    title: "Web development intern",
    org: "Zidio Development",
    body: "Full stack work on Project LOOP, an AI customer-feedback platform: github.com/kantimohanthy/zidio-Web-dev.",
    kind: "Work",
    href: "/work/project-loop/",
  },
  {
    date: "Since Aug 2026",
    sort: "2026-08-13",
    title: "Research collaborator, DASER-Net",
    org: "INFERENCE Lab",
    body: "Real data validation and reproducible evaluation for cross corpus speech emotion recognition.",
    kind: "Research",
    href: "/work/daser-net/",
  },
  {
    date: "Aug – Sep 2026",
    sort: "2026-08-01",
    title: "Founder & Builder",
    org: "STATION F Landing Zone, Paris",
    body: "Incubated ORVYRA (formerly CosmoHub), an intelligence layer for the space economy.",
    kind: "Venture",
    href: "/work/cosmohub/",
  },
  {
    date: "Jul 2026",
    sort: "2026-07-31",
    title: "CineForge AI Pro",
    org: "IBM SkillsBuild AI Builders Challenge",
    body: "Team submission: a bilingual Arabic and English preproduction assistant for filmmakers.",
    kind: "Build",
    href: "https://github.com/kantimohanthy/ClineForge-Pro",
  },
  {
    date: "Sep 2025",
    sort: "2025-09-15",
    title: "Student Fellow",
    org: "UNIVERSEH Student Fellowship (8-university consortium)",
    body: "Built AgriSat and the first CosmoHub prototype exploring space tech learning fundamentals.",
    kind: "Research",
  },
  {
    date: "Jan to Mar 2025",
    sort: "2025-01-01",
    title: "OGV Team Lead",
    org: "AIESEC Roma Tre",
    body: "Led a team in AIESEC's outgoing global volunteer programme.",
    kind: "Leadership",
  },
  {
    date: "Since 2022",
    sort: "2022-10-01",
    title: "BSc Engineering Sciences",
    org: "University of Rome Tor Vergata (uniroma2)",
    body: "Expected graduation 2027. Thesis on wireless mesh networks combined with TV White Space spectrum for rural and occluded terrain connectivity.",
    kind: "Education",
    href: "/work/wireless-mesh-tvws/",
  },
];

export const now = [
  { label: "Building", value: "Project LOOP, submitted", href: "/work/project-loop/" },
  { label: "Researching", value: "Cross corpus speech emotion recognition", href: "/work/daser-net/" },
  { label: "Writing", value: "Thesis on mesh networks and TV White Space", href: "/work/wireless-mesh-tvws/" },
];

export const getProject = (slug: string) =>
  projects.find(
    (p) =>
      p.slug === slug ||
      ((slug === "cineforge" || slug === "cineforge-ai-pro") && p.slug === "cineforge-ai-pro") ||
      ((slug === "orvyra" || slug === "cosmohub" || slug === "cosmos-hub") && p.slug === "cosmohub") ||
      ((slug === "devan" || slug === "devan-os") && p.slug === "devan")
  );
export const getDecision = (id?: string) => decisions.find((d) => d.id === id);
export const featuredProjects = projects.filter((p) => p.featured);

export function formatMonth(iso: string) {
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(iso);
  if (!m) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (m[3]) return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
  if (m[2]) return `${months[Number(m[2]) - 1]} ${m[1]}`;
  return m[1];
}
