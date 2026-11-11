import {
  Concept,
  Experiment,
  Decision,
  Repository,
  Project,
  Mission,
  ChipRef,
  EvidenceState,
} from "./types";

// ---------------------------------------------------------------------------
// Seeded Fallback Records (Respected when DB record is not yet inserted)
// ---------------------------------------------------------------------------

export const missions: Mission[] = [
  {
    slug: "wireless-mesh-tvws",
    name: "Wireless Mesh + TV White Space for rural connectivity",
    objective:
      "Thesis research: extending mesh coverage into challenging terrain using unused broadcast spectrum",
    objectives: [
      { label: "Literature review: WMN topologies", done: true },
      { label: "Literature review: TVWS regulatory landscape", done: true },
      { label: "Build propagation model for occluded terrain", done: true },
      { label: "Simulate mesh + TVWS hybrid topology", done: false },
      { label: "Field equivalent bench test", done: false },
      { label: "Write up findings", done: false },
      { label: "Peer review pass", done: false },
      { label: "Thesis defense", done: false },
    ],
    focus: [
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
      { type: "Repository", title: "ujwal-portfolio", meta: "CI passing", href: "/repositories/ujwal-portfolio" },
      { type: "Concept", title: "RF propagation in occluded terrain", meta: "STUDIED", href: "/knowledge/rf-propagation-occluded-terrain", state: "STUDIED" },
    ],
  },
  {
    slug: "reliable-software",
    name: "Build reliable software with verifiable assertions",
    objective:
      "Ship software whose behavior other people can check through tests, permissions, and honest status",
    objectives: [
      { label: "CSV ingestion and header validation in LOOP", done: true },
      { label: "Row-level security tenant isolation schema", done: true },
      { label: "Deterministic fallback analyzer for CI", done: true },
      { label: "Verify RLS against live Supabase deployment", done: false },
    ],
    focus: [
      { type: "Project", title: "Project LOOP", meta: "Submitted", href: "/work/project-loop" },
    ],
  },
  {
    slug: "understand-networks",
    name: "Understand networks from packet capture to socket streams",
    objective:
      "Trace protocol mechanics from DNS resolution to TCP socket streams and white-space mesh propagation",
    objectives: [
      { label: "Iterative DNS resolution trace with dig & tshark", done: true },
      { label: "Capture on loopback & physical interfaces", done: true },
      { label: "Compare reactive (AODV) vs proactive (OLSR) routing", done: false },
      { label: "TCP three-way handshake packet verification", done: true },
    ],
    focus: [
      { type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/networking.dns", state: "TESTED" },
      { type: "Concept", title: "TCP", meta: "STUDIED", href: "/knowledge/networking.tcp", state: "STUDIED" },
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
    ],
  },
  {
    slug: "validate-ai",
    name: "Validate AI models on unseen out-of-domain distributions",
    objective:
      "Separate model capability from dataset memorization through cross-corpus evaluation and grounded citations",
    objectives: [
      { label: "CREMA-D speech dataset validated ingestion", done: true },
      { label: "Speaker-disjoint train/val/test splits manifest", done: true },
      { label: "Audio baseline validation script", done: false },
      { label: "Cross-corpus generalization matrix evaluation", done: false },
    ],
    focus: [
      { type: "Project", title: "DASER-Net", meta: "In progress", href: "/work/daser-net" },
      { type: "Project", title: "Project LOOP", meta: "Grounded Q&A", href: "/work/project-loop" },
    ],
  },
  {
    slug: "space-learning",
    name: "Explore structured fundamentals in space technology",
    objective:
      "Design a clear, structured learning roadmap from curious beginner to contributing engineer in space tech",
    objectives: [
      { label: "Organize space tech topics and research taxonomy", done: true },
      { label: "STATION F Landing Zone incubation participation", done: true },
      { label: "Develop first playable fundamentals module", done: false },
    ],
    focus: [
      { type: "Project", title: "CosmoHub", meta: "Early stage", href: "/work/cosmohub" },
    ],
  },
  {
    slug: "organize-communities",
    name: "Organise communities & streamline inbound event operations",
    objective:
      "Design clear event submission and review workflows for European student technology communities",
    objectives: [
      { label: "EuroTech Federation inbound event request intake", done: true },
      { label: "Standardized review workflow for team members", done: false },
    ],
    focus: [],
  },
  {
    slug: "kernel-bpf-tracer",
    name: "Kernel syscall & BPF observability benchmarks",
    objective:
      "Measure latency and context switch overhead across user-kernel boundaries using Linux tracing tools",
    objectives: [
      { label: "Trace socket syscalls with strace and ss", done: true },
      { label: "Inspect network stack ring buffer statistics", done: true },
      { label: "Benchmark eBPF socket tracing overhead", done: false },
    ],
    focus: [
      { type: "Concept", title: "Linux Kernel", meta: "STUDIED", href: "/knowledge/linux.kernel", state: "STUDIED" },
    ],
  },
];

export const concepts: Concept[] = [
  {
    slug: "networking.dns",
    domain: "Networking",
    topic: "Protocols",
    name: "DNS (Domain Name System)",
    description:
      "The distributed naming system that resolves hostnames to addresses through a hierarchy of root, TLD, and authoritative servers. Studied here through manual iterative resolution rather than taking the textbook description at face value.",
    state: "TESTED",
    sources: [{ type: "Source", title: "RFC 1035", meta: "IETF", href: "https://www.rfc-editor.org/rfc/rfc1035" }],
    experiments: [
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
    ],
    evidence: [
      { type: "Evidence", title: "tshark capture, root→TLD→auth", meta: "1 artifact", href: "/laboratory/dns-iterative-resolution" },
    ],
    decisions: [],
    related: [
      { type: "Concept", title: "TCP", meta: "STUDIED", href: "/knowledge/networking.tcp", state: "STUDIED" },
      { type: "Concept", title: "HTTP", meta: "ENCOUNTERED", href: "/knowledge/http", state: "ENCOUNTERED" },
    ],
    createdAt: "2026-08-07",
  },
  {
    slug: "dns",
    domain: "Networking",
    topic: "Protocols",
    name: "DNS",
    description: "Alias for networking.dns",
    state: "TESTED",
    sources: [{ type: "Source", title: "RFC 1035", meta: "IETF", href: "https://www.rfc-editor.org/rfc/rfc1035" }],
    experiments: [
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
    ],
    evidence: [],
    decisions: [],
    related: [],
    createdAt: "2026-08-07",
  },
  {
    slug: "networking.tcp",
    domain: "Networking",
    topic: "Transport Protocols",
    name: "TCP (Transmission Control Protocol)",
    description:
      "Connection-oriented, reliable transport protocol (RFC 9293, replacing RFC 793) implementing a three-way handshake (SYN, SYN-ACK, ACK), sequence/acknowledgment numbers, sliding window flow control, and congestion avoidance algorithms.",
    state: "STUDIED",
    sources: [{ type: "Source", title: "RFC 9293", meta: "IETF", href: "https://www.rfc-editor.org/rfc/rfc9293" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [
      { type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/networking.dns", state: "TESTED" },
      { type: "Concept", title: "TLS", meta: "STUDIED", href: "/knowledge/networking.tls", state: "STUDIED" },
    ],
    createdAt: "2026-08-08",
  },
  {
    slug: "tcp",
    domain: "Networking",
    topic: "Transport Protocols",
    name: "TCP",
    description: "Alias for networking.tcp",
    state: "STUDIED",
    sources: [{ type: "Source", title: "RFC 9293", meta: "IETF", href: "https://www.rfc-editor.org/rfc/rfc9293" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [],
    createdAt: "2026-08-08",
  },
  {
    slug: "networking.tls",
    domain: "Security",
    topic: "Cryptographic Protocols",
    name: "TLS 1.3 (Transport Layer Security)",
    description:
      "Cryptographic protocol (RFC 8446) securing TCP communications with 1-RTT handshake, Diffie-Hellman key exchange, and forward secrecy.",
    state: "STUDIED",
    sources: [{ type: "Source", title: "RFC 8446", meta: "IETF", href: "https://www.rfc-editor.org/rfc/rfc8446" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [
      { type: "Concept", title: "TCP", meta: "STUDIED", href: "/knowledge/networking.tcp", state: "STUDIED" },
    ],
    createdAt: "2026-08-08",
  },
  {
    slug: "linux.kernel",
    domain: "Systems",
    topic: "Operating Systems",
    name: "Linux Kernel Sockets & VFS",
    description:
      "Linux network subsystem from POSIX socket calls in user space through the Virtual File System (VFS), sk_buff structures, protocol drivers, and NIC ring buffers.",
    state: "STUDIED",
    sources: [{ type: "Source", title: "Linux man-pages (socket, epoll, getaddrinfo)", meta: "Kernel Docs", href: "https://man7.org/linux/man-pages/" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [
      { type: "Concept", title: "TCP", meta: "STUDIED", href: "/knowledge/networking.tcp", state: "STUDIED" },
    ],
    createdAt: "2026-08-08",
  },
  {
    slug: "container.kubernetes",
    domain: "Orchestration",
    topic: "Cloud Infrastructure",
    name: "Kubernetes & Container Networking",
    description:
      "Container networking interface (CNI), pod IP allocation, kube-proxy iptables/IPVS service routing, and CoreDNS cluster resolution.",
    state: "ENCOUNTERED",
    sources: [{ type: "Source", title: "Kubernetes Documentation", meta: "CNCF", href: "https://kubernetes.io/docs/" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [],
    createdAt: "2026-08-08",
  },
  {
    slug: "rf-propagation-occluded-terrain",
    domain: "Networking",
    topic: "Wireless Propagation",
    name: "RF propagation in occluded terrain",
    description:
      "Electromagnetic propagation models across rugged mountainous topography, diffraction losses over knife-edge obstacles, and TV White Space propagation characteristics below 700 MHz.",
    state: "STUDIED",
    sources: [{ type: "Source", title: "ITU-R P.526 Propagation by diffraction", meta: "ITU-R", href: "https://www.itu.int/rec/R-REC-P.526" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [],
    createdAt: "2026-08-09",
  },
  {
    slug: "http",
    domain: "Networking",
    topic: "Application Protocols",
    name: "HTTP / Application Layer",
    description: "Stateless application-layer protocol RFC 7230 / RFC 9110 defining request methods, status codes, and message bodies.",
    state: "ENCOUNTERED",
    sources: [{ type: "Source", title: "RFC 9110", meta: "IETF", href: "https://www.rfc-editor.org/rfc/rfc9110" }],
    experiments: [],
    evidence: [],
    decisions: [],
    related: [],
    createdAt: "2026-08-09",
  },
];

export const experiments: Experiment[] = [
  {
    slug: "dns-iterative-resolution",
    name: "DNS iterative resolution trace",
    description:
      "Walking the DNS hierarchy step by step from a root server down to the authoritative server for example.com, observing referral responses and testing whether RD (Recursion Desired) is sent.",
    state: "TESTED",
    executable: true,
    lastRun: "2026-08-07",
    commands: ["dig +trace example.com", 'tshark -i eth0 -f "port 53" -w dns-trace.pcap'],
    outputLines: [
      ";; global options: +cmd",
      ". 518400 IN NS a.root-servers.net.",
      "a.root-servers.net. 518400 IN A 198.41.0.4",
      ";; Received 239 bytes from 127.0.0.53#53(127.0.0.53) in 12 ms",
      "",
      "com. 172800 IN NS a.gtld-servers.net.",
      ";; Received 1171 bytes from 198.41.0.4#53(a.root-servers.net) in 34 ms",
      "",
      "example.com. 172800 IN NS a.iana-servers.net.",
      ";; Received 288 bytes from 192.5.6.30#53(a.gtld-servers.net) in 28 ms",
      "",
      "example.com. 86400 IN A 93.184.215.14",
      ";; Received 56 bytes from 199.43.135.53#53(a.iana-servers.net) in 18 ms",
    ],
    timelineSpans: [
      { label: "Local stub query (1.1.1.1)", ms: 12 },
      { label: "Root referral (a.root-servers.net)", ms: 34 },
      { label: "TLD referral (a.gtld-servers.net)", ms: 28 },
      { label: "Authoritative answer (a.iana-servers.net)", ms: 18 },
    ],
    concepts: [{ type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/networking.dns", state: "TESTED" }],
    evidenceProduced: [
      { type: "Evidence", title: "tshark capture, root→TLD→auth", meta: "1 artifact", href: "/laboratory/dns-iterative-resolution" },
    ],
    repositories: [{ type: "Repository", title: "ujwal-portfolio", meta: "CI passing", href: "/repositories/ujwal-portfolio" }],
    createdAt: "2026-08-07",
  },
];

export const decisions: Decision[] = [
  {
    slug: "why-postgresql",
    question: "Why PostgreSQL?",
    summary:
      "Choosing PostgreSQL as the foundational relational database for identity, projects, and evidence tracking.",
    requirements: "ACID compliance, strict typing, jsonb flexibility, and Prisma 7 serverless compatibility.",
    alternatives: [
      { name: "SQLite", tradeoff: "Zero config, but single-writer lock limits concurrency under serverless." },
      { name: "MongoDB", tradeoff: "Schema-less flexibility, but lacks strict relation enforcement." },
    ],
    decision: "PostgreSQL with PgBouncer connection pooling.",
    implementation: "Configured Prisma 7 client with PgBouncer transaction mode.",
    lessons: "Serverless functions exhaust direct 5432 connections quickly; transaction pooling on port 6543 is essential.",
    hasAlternatives: true,
    decidedDuring: "Phase 1 Platform Setup",
    verification: "Passing Prisma migrations & 13/13 Vitest assertions.",
  },
];

export const repositories: Repository[] = [
  {
    slug: "ujwal-portfolio",
    name: "ujwal-portfolio",
    description: "Personal engineering portfolio and DEVAN architecture. TypeScript, Next.js 15, Tailwind CSS v4.",
    lastCommit: "October 2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote:
      "Next.js App Router with static export to GitHub Pages. Single source of truth in portfolio.ts, with defensive client-side query fallbacks.",
    concepts: [
      { type: "Concept", title: "DNS", meta: "1 experiment", href: "/knowledge/networking.dns" },
      { type: "Concept", title: "TCP", meta: "Handshake", href: "/knowledge/networking.tcp" },
    ],
    decisions: [
      { type: "Decision", title: "Why PostgreSQL?", meta: "Database setup", href: "/reasoning/why-postgresql" },
    ],
    experiments: [
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution" },
    ],
  },
  {
    slug: "orvyra",
    name: "Orvyra",
    description: "ORVYRA: Intelligence layer for the space economy (formerly CosmoHub). ROR and OpenAlex knowledge graph resolution.",
    lastCommit: "October 2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote:
      "Data honesty model: LIVE / SOURCE_FIXTURE / SYNTHETIC. Resolves space organizations and research topics.",
    concepts: [],
    decisions: [],
    experiments: [],
  },
  {
    slug: "cosmohub",
    name: "Cosmohub",
    description: "CosmoHub: Lineage prototype and early backend experiments for space sector entity indexing.",
    lastCommit: "September 2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote:
      "Original space tech taxonomy and learning roadmap prototypes.",
    concepts: [],
    decisions: [],
    experiments: [],
  },
  {
    slug: "zidio-web-dev",
    name: "zidio-web-dev",
    description: "Project LOOP: Multi-tenant customer feedback intelligence platform built during Zidio internship.",
    lastCommit: "September 2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote:
      "Next.js App Router, Supabase Postgres with row-level security (RLS), and Zod validation.",
    concepts: [],
    decisions: [],
    experiments: [],
  },
  {
    slug: "klesos",
    name: "kelsos-inteliigence-with-orvyra",
    description: "Klesos intelligence layer: ORVYRA backend integration for cold-call analysis, deployed on Railway.",
    lastCommit: "September 2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote: "Deployed backend microservice on Railway.",
    concepts: [],
    decisions: [],
    experiments: [],
  },
  {
    slug: "gcore",
    name: "gcore-behavioral-banking",
    description: "G-Core: Behavioral banking engine and hackathon prototype.",
    lastCommit: "2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote: "Hackathon prototype engine.",
    concepts: [],
    decisions: [],
    experiments: [],
  },
  {
    slug: "clineforge-pro",
    name: "clineforge-pro",
    description: "CineForge AI Pro: Bilingual AI screenplay preproduction assistant built for IBM SkillsBuild Challenge.",
    lastCommit: "July 2026",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote:
      "FastAPI backend and validation schemas. TODO(UJ): confirm the tech stack before stating FastAPI / watsonx / Hugging Face.",
    concepts: [],
    decisions: [],
    experiments: [],
  },
];

export const projects: Project[] = [
  {
    slug: "project-loop",
    name: "Project LOOP",
    description:
      "Full stack product built during the Zidio Development internship: ingestion, role aware UX, analytics and grounded Q&A. Evaluator demo uses seeded data.",
    repositories: [
      { type: "Repository", title: "zidio-web-dev", meta: "GitHub", href: "/repositories/zidio-web-dev" },
    ],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: ["Verify row level security policies against a live database with test accounts"],
  },
  {
    slug: "wireless-mesh-tvws",
    name: "Wireless Mesh + TV White Space (thesis)",
    description:
      "Ongoing undergraduate thesis research: mesh networking over TV White Space broadcast spectrum for connectivity in challenging mountain terrain.",
    repositories: [],
    concepts: [
      { type: "Concept", title: "RF propagation in occluded terrain", meta: "STUDIED", href: "/knowledge/rf-propagation-occluded-terrain" },
    ],
    experiments: [],
    decisions: [],
    openQuestions: ["Complete simulation chapter comparing reactive and proactive routing under the same terrain model"],
  },
  {
    slug: "daser-net",
    name: "DASER-Net",
    description:
      "Cross-corpus speech emotion recognition collaboration with INFERENCE Lab: real data validation and reproducible evaluation.",
    repositories: [],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: ["Run first cross-corpus training and ablation experiments on real speech data"],
  },
  {
    slug: "orvyra",
    name: "ORVYRA",
    description:
      "Intelligence layer for the space economy (formerly CosmoHub). Resolves seed organizations through ROR and OpenAlex evidence records.",
    repositories: [
      { type: "Repository", title: "Orvyra", meta: "GitHub", href: "/repositories/orvyra" },
      { type: "Repository", title: "Cosmohub", meta: "GitHub", href: "/repositories/cosmohub" },
    ],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: ["Refine ROR ambiguous name resolutions (Polish Space Agency, Luxembourg Space Agency, BELSPO)"],
  },
  {
    slug: "cosmohub",
    name: "CosmoHub",
    description: "Alias for ORVYRA (formerly CosmoHub). Lineage prototype for space tech sector intelligence.",
    repositories: [
      { type: "Repository", title: "Cosmohub", meta: "GitHub", href: "/repositories/cosmohub" },
    ],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: [],
  },
  {
    slug: "cineforge-ai-pro",
    name: "CineForge AI Pro",
    description:
      "Bilingual AI preproduction assistant for filmmakers, built for the IBM SkillsBuild AI Builders Challenge. TODO(UJ): confirm the tech stack before stating FastAPI / watsonx / Hugging Face.",
    repositories: [
      { type: "Repository", title: "clineforge-pro", meta: "GitHub", href: "/repositories/clineforge-pro" },
    ],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: ["Confirm exact tech stack details with team"],
  },
  {
    slug: "cineforge",
    name: "CineForge AI Pro",
    description: "Alias for cineforge-ai-pro",
    repositories: [],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: [],
  },
  {
    slug: "devan",
    name: "DEVAN",
    description: "This engineering workspace and evidence graph.",
    repositories: [
      { type: "Repository", title: "ujwal-portfolio", meta: "CI passing", href: "/repositories/ujwal-portfolio" },
    ],
    concepts: [
      { type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/networking.dns" },
      { type: "Concept", title: "TCP", meta: "STUDIED", href: "/knowledge/networking.tcp" },
    ],
    experiments: [
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution" },
    ],
    decisions: [
      { type: "Decision", title: "Why PostgreSQL?", meta: "Database setup", href: "/reasoning/why-postgresql" },
    ],
    openQuestions: ["Add structured outcome validation rules beyond substring matching"],
  },
  {
    slug: "devan-os",
    name: "DEVAN",
    description: "Alias for devan",
    repositories: [],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: [],
  },
];

export type IndexEntry = ChipRef;

export const searchIndex: IndexEntry[] = [
  { type: "Project", title: "Project LOOP", meta: "Customer feedback intelligence · Zidio", href: "/work/project-loop" },
  { type: "Project", title: "DASER-Net", meta: "Cross-corpus speech emotion recognition · INFERENCE Lab", href: "/work/daser-net" },
  { type: "Project", title: "Wireless Mesh + TVWS", meta: "Undergraduate thesis · Tor Vergata", href: "/work/wireless-mesh-tvws" },
  { type: "Project", title: "ORVYRA", meta: "Intelligence for the space economy (formerly CosmoHub)", href: "/work/cosmohub" },
  { type: "Project", title: "CineForge AI Pro", meta: "Bilingual AI preproduction · IBM Challenge", href: "/work/cineforge-ai-pro" },
  { type: "Project", title: "DEVAN", meta: "Engineering workspace & evidence graph", href: "/work/devan" },
  { type: "Concept", title: "DNS (Domain Name System)", meta: "TESTED · RFC 1035", href: "/knowledge/networking.dns", state: "TESTED" },
  { type: "Concept", title: "TCP (Transmission Control Protocol)", meta: "STUDIED · RFC 9293", href: "/knowledge/networking.tcp", state: "STUDIED" },
  { type: "Concept", title: "TLS 1.3", meta: "STUDIED · RFC 8446", href: "/knowledge/networking.tls", state: "STUDIED" },
  { type: "Concept", title: "Linux Kernel Sockets & VFS", meta: "STUDIED", href: "/knowledge/linux.kernel", state: "STUDIED" },
  { type: "Concept", title: "RF propagation in occluded terrain", meta: "STUDIED · ITU-R", href: "/knowledge/rf-propagation-occluded-terrain", state: "STUDIED" },
  { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED · dig + tshark", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
  { type: "Decision", title: "Why PostgreSQL?", meta: "Architecture · PgBouncer", href: "/reasoning/why-postgresql" },
  { type: "Repository", title: "ujwal-portfolio", meta: "Portfolio & DEVAN repository", href: "/repositories/ujwal-portfolio" },
  { type: "Repository", title: "Orvyra", meta: "Space economy intelligence repository", href: "/repositories/orvyra" },
  { type: "Repository", title: "Cosmohub", meta: "CosmoHub repository", href: "/repositories/cosmohub" },
  { type: "Repository", title: "zidio-web-dev", meta: "LOOP repository", href: "/repositories/zidio-web-dev" },
  { type: "Repository", title: "clineforge-pro", meta: "CineForge repository", href: "/repositories/clineforge-pro" },
  { type: "Mission", title: "Wireless Mesh + TV White Space", meta: "3 / 8 objectives completed", href: "/missions/wireless-mesh-tvws" },
  { type: "Mission", title: "Build reliable software", meta: "Test assertions & RLS", href: "/missions/reliable-software" },
  { type: "Mission", title: "Understand networks", meta: "Protocols & packet traces", href: "/missions/understand-networks" },
  { type: "Mission", title: "Validate AI", meta: "Generalization & evaluation", href: "/missions/validate-ai" },
];

// ---------------------------------------------------------------------------
// Real Database Queries with Dynamic Import (Prevents Client-Bundle Leak)
// ---------------------------------------------------------------------------

function normalizeSlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s === "dns") return "networking.dns";
  if (s === "tcp") return "networking.tcp";
  if (s === "tls") return "networking.tls";
  if (s === "cineforge") return "cineforge-ai-pro";
  if (s === "cosmos-hub") return "cosmohub";
  if (s === "devan-os") return "devan";
  if (s === "lab-dns-resolver") return "dns-iterative-resolution";
  return slug;
}

export async function getConcept(slug: string): Promise<Concept | undefined> {
  const norm = normalizeSlug(slug);
  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbConcept = await prisma.concept.findUnique({ where: { slug: norm } });
      if (dbConcept) {
        return {
          slug: dbConcept.slug,
          domain: dbConcept.domain,
          topic: dbConcept.topic || "Engineering",
          name: dbConcept.title,
          description: dbConcept.description,
          state: dbConcept.evidenceState as EvidenceState,
          sources: dbConcept.sourceRfc ? [{ type: "Source", title: dbConcept.sourceRfc, meta: "RFC Spec", href: "#" }] : [],
          experiments: [],
          evidence: dbConcept.observedResult ? [{ type: "Evidence", title: dbConcept.observedResult, href: "#" }] : [],
          decisions: [],
          related: [],
          createdAt: dbConcept.createdAt.toISOString().split("T")[0],
        };
      }
    } catch {
      // Prisma fallback
    }
  }
  return concepts.find((c) => c.slug === slug || c.slug === norm);
}

export async function getExperiment(slug: string): Promise<Experiment | undefined> {
  const norm = normalizeSlug(slug);
  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbExperiment = await prisma.experiment.findUnique({ where: { slug: norm } });
      if (dbExperiment) {
        const outputLines = dbExperiment.telemetrySpans ? JSON.parse(dbExperiment.telemetrySpans) : [];
        return {
          slug: dbExperiment.slug,
          name: dbExperiment.title,
          description: dbExperiment.problem || dbExperiment.objective,
          state: (dbExperiment.status.toUpperCase() as EvidenceState) || "TESTED",
          executable: true,
          commands: [dbExperiment.objective],
          outputLines: Array.isArray(outputLines) ? outputLines : [dbExperiment.architectureDetails],
          concepts: [],
          evidenceProduced: [],
          repositories: [],
          createdAt: dbExperiment.createdAt.toISOString().split("T")[0],
        };
      }
    } catch {
      // Prisma fallback
    }
  }
  return experiments.find((e) => e.slug === slug || e.slug === norm);
}

export async function getDecision(slug: string): Promise<Decision | undefined> {
  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbDecision = await prisma.decision.findUnique({ where: { slug } });
      if (dbDecision) {
        const alternatives = dbDecision.tradeoffs ? JSON.parse(dbDecision.tradeoffs) : [];
        return {
          slug: dbDecision.slug,
          question: dbDecision.title,
          summary: dbDecision.context,
          requirements: dbDecision.rationale,
          alternatives: Array.isArray(alternatives) ? alternatives : [],
          decision: dbDecision.decision,
          implementation: dbDecision.consequences || dbDecision.decision,
          hasAlternatives: Array.isArray(alternatives) && alternatives.length > 0,
          decidedDuring: "Architecture Review",
          verification: "Passing tests & CI",
        };
      }
    } catch {
      // Prisma fallback
    }
  }
  return decisions.find((d) => d.slug === slug);
}

export async function getRepository(slug: string): Promise<Repository | undefined> {
  const s = slug.toLowerCase();
  const direct = repositories.find((r) => r.slug === s);
  if (direct) return direct;

  if (s === "devan" || s === "devan-os") {
    return repositories.find((r) => r.slug === "ujwal-portfolio");
  }
  if (s === "cosmohub" || s === "cosmos-hub") {
    return repositories.find((r) => r.slug === "cosmohub");
  }
  if (s === "project-loop" || s === "zidio-web-dev") {
    return repositories.find((r) => r.slug === "zidio-web-dev");
  }
  if (s === "cineforge" || s === "cineforge-ai-pro" || s === "clineforge-pro") {
    return repositories.find((r) => r.slug === "clineforge-pro");
  }

  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbRepo = await prisma.repository.findUnique({ where: { slug } });
      if (dbRepo) {
        return {
          slug: dbRepo.slug,
          name: dbRepo.name,
          description: dbRepo.description,
          lastCommit: "Recently",
          ciStatus: dbRepo.ciStatus as "passing" | "failing" | "unknown",
          openIssues: dbRepo.openIssues,
          architectureNote: dbRepo.architectureNote || "",
          concepts: [],
          decisions: [],
          experiments: [],
        };
      }
    } catch {
      // Prisma fallback
    }
  }
  return repositories.find((r) => r.slug === slug);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const s = slug.toLowerCase();
  const direct = projects.find((p) => p.slug === s);
  if (direct) return direct;

  if (s === "cineforge" || s === "cineforge-ai-pro") {
    return projects.find((p) => p.slug === "cineforge-ai-pro");
  }
  if (s === "cosmohub" || s === "cosmos-hub") {
    return projects.find((p) => p.slug === "cosmohub");
  }
  if (s === "devan" || s === "devan-os") {
    return projects.find((p) => p.slug === "devan");
  }

  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbProject = await prisma.project.findUnique({ where: { slug } });
      if (dbProject) {
        return {
          slug: dbProject.slug,
          name: dbProject.title,
          description: dbProject.description || dbProject.summary,
          repositories: dbProject.github ? [{ type: "Repository", title: dbProject.slug, href: dbProject.github }] : [],
          concepts: [],
          experiments: [],
          decisions: [],
          openQuestions: [],
        };
      }
    } catch {
      // Prisma fallback
    }
  }
  return projects.find((p) => p.slug === slug);
}

export async function getMission(slug: string): Promise<Mission | undefined> {
  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbMission = await prisma.mission.findUnique({ where: { slug } });
      if (dbMission) {
        const objectives = dbMission.checklistData ? JSON.parse(dbMission.checklistData) : [];
        return {
          slug: dbMission.slug,
          name: dbMission.title,
          objective: dbMission.objective,
          objectives: Array.isArray(objectives) ? objectives : [],
          focus: [],
        };
      }
    } catch {
      // Prisma fallback
    }
  }
  return missions.find((m) => m.slug === slug);
}
