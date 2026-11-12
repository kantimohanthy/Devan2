import githubActivityRaw from "@/data/github-activity.generated.json";
import type {
  ProjectRecord,
  DecisionRecord,
  TimelineItem,
  RouteSectionNode,
  GitHubRepoSnapshot,
} from "./types";

export const LAST_REVIEWED = "2026-11-11";

export const githubSnapshot: {
  source: string;
  syncedAt: string | null;
  repos: GitHubRepoSnapshot[];
} = (() => {
  if (Array.isArray(githubActivityRaw)) {
    return { source: "legacy", syncedAt: null, repos: [] };
  }
  return githubActivityRaw as {
    source: string;
    syncedAt: string | null;
    repos: GitHubRepoSnapshot[];
  };
})();

export function getRepoSnapshot(projectSlug: string): GitHubRepoSnapshot | undefined {
  return githubSnapshot.repos.find((r) => r.projectSlug === projectSlug);
}

/** Deterministic build-relative label (uses syncedAt so SSR & client never diverge). */
export function formatBuildRelativePush(repo?: GitHubRepoSnapshot): string | null {
  if (!repo || !repo.pushedAt) return null;
  const pushed = Date.parse(repo.pushedAt);
  const buildTime = githubSnapshot.syncedAt ? Date.parse(githubSnapshot.syncedAt) : pushed;
  if (Number.isNaN(pushed) || Number.isNaN(buildTime)) return null;
  const diffDays = Math.max(0, Math.round((buildTime - pushed) / (1000 * 60 * 60 * 24)));
  const sha = repo.recentCommitSha ? ` · ${repo.recentCommitSha}` : "";
  const mode = repo.staleFallback ? " · cached" : "";
  if (diffDays === 0) return `pushed same day as build${sha}${mode}`;
  if (diffDays === 1) return `pushed 1 day before this build${sha}${mode}`;
  return `pushed ${diffDays} days before this build${sha}${mode}`;
}

export function formatMonth(iso: string): string {
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(iso);
  if (!m) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (m[3]) return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
  if (m[2]) return `${months[Number(m[2]) - 1]} ${m[1]}`;
  return m[1];
}

export const person = {
  firstAndMiddle: "Ujwal Shyam",
  surname: "Kantimohanthy",
  name: "Ujwal Shyam Kantimohanthy",
  short: "Ujwal Kantimohanthy",
  initials: "UJ",
  positioning:
    "Engineering student building reliable web systems, evidence-grounded AI tools and network experiments.",
  subline:
    "Systems & infrastructure engineering direction · BSc Engineering Sciences, University of Rome Tor Vergata (expected 2027)",
  approach:
    "I learn a system by building inside it, testing what I assumed, and keeping the proof attached to the claim.",
  location: "Rome, Italy",
  email: "hello@kantimohanthy.dev",
  linkedin: "https://www.linkedin.com/in/ujwalshyam-kantimohanthy/",
  github: "https://github.com/kantimohanthy",
  about: [
    "I study Engineering Sciences at the University of Rome Tor Vergata (expected graduation 2027). My bachelor thesis asks how wireless mesh networks and TV White Space spectrum can improve connectivity across rural and obstructed terrain.",
    "Across web engineering and applied ML, I focus on the boundary where a system can quietly mislead people: isolating multi-tenant permissions on a feedback platform, preventing speaker leakage in cross-corpus speech evaluation, or refusing to publish network claims without packet captures.",
    "Independent technical experiments live under Arylax Labs, my umbrella lab identity for systems and protocol prototypes — listed once under my work rather than counted twice.",
  ],
  interests: [
    "Network infrastructure & rural mesh connectivity",
    "Static-first, evidence-grounded web systems",
    "Cross-corpus ML data validation",
    "Protocol observability (DNS, TCP/IP, routing)",
  ],
  now: [
    {
      label: "Writing",
      value: "BSc thesis draft on wireless mesh + TV White Space propagation modeling",
      href: "/work/wireless-mesh-tvws/",
      evidenceId: "E04",
    },
    {
      label: "Researching",
      value: "Real speech corpus validation & evaluation scripts for DASER-Net",
      href: "/work/daser-net/",
      evidenceId: "E05",
    },
    {
      label: "Building",
      value: "DEVAN evidence ledger and traceroute portfolio architecture",
      href: "/work/devan/",
      evidenceId: "E06",
    },
  ],
};

export const routeSections: RouteSectionNode[] = [
  { id: "hero", hop: 1, label: "terrain hero", href: "#hero", edgesTo: ["work"] },
  { id: "work", hop: 2, label: "selected work", href: "#work", edgesTo: ["research"] },
  { id: "research", hop: 3, label: "research", href: "#research", edgesTo: ["thinking"] },
  { id: "thinking", hop: 4, label: "how i think", href: "#thinking", edgesTo: ["experience"] },
  { id: "experience", hop: 5, label: "experience", href: "#experience", edgesTo: ["contact"] },
  { id: "contact", hop: 6, label: "contact", href: "#contact", edgesTo: [] },
];

export const decisions: DecisionRecord[] = [
  {
    id: "dec-static-export",
    projectSlug: "devan",
    title: "Why static HTML export + committed ledger instead of runtime DB APIs",
    context:
      "Earlier builds of DEVAN included Prisma Postgres queries, auth endpoints, and admin forms inside a Next.js repo deployed to GitHub Pages (kantimohanthy.dev). Under static hosting, server routes do not execute.",
    constraint:
      "GitHub Pages serves purely static assets with zero Node runtime. Meanwhile, external Postgres databases pause after inactivity, causing build-time queries to fail unless committed fallbacks exist.",
    alternatives: [
      {
        name: "Deploy a separate Node/Postgres server",
        tradeoff: "Enables runtime APIs and dynamic queries, but adds operational hosting cost, database sleep failures, and split domain routing.",
      },
      {
        name: "Keep client fetches firing against dead /api/* routes",
        tradeoff: "Creates console errors, misleading loading states, and silent synthetic fallbacks on production.",
      },
    ],
    choice: "Compile-time static export (`output: 'export'`) reading from a single typed TypeScript content & evidence ledger, paired with offline-safe build-time GitHub snapshots.",
    why: "Recruiters and engineers get instant zero-JS HTML from GitHub's edge CDN, zero secret exposure in client bundles, and build determinism validated before every deploy.",
    consequence:
      "Updates require a git commit + CI rebuild, interactive search runs strictly client-side over public JSON, and future AI Q&A stays out of scope until server retrieval is justified.",
    evidenceIds: ["E08", "E06"],
    source: "next.config.ts, .github/workflows/deploy.yml, scripts/sync-github.mjs",
    reviewedDate: "2026-11-11",
  },
  {
    id: "why-postgresql",
    projectSlug: "devan",
    title: "Why PostgreSQL with transaction pooling for DEVAN's backend schema",
    context:
      "Designing the optional relational backend schema for immutable ExperienceEvents, concepts, and evidence links during backend development.",
    constraint:
      "Serverless environments rapidly exhaust direct TCP port 5432 connections while relational foreign keys are needed between concepts and artifacts.",
    alternatives: [
      { name: "SQLite", tradeoff: "Simple single-file setup, but single-writer lock constrains concurrent requests." },
      { name: "MongoDB", tradeoff: "Flexible documents, but weak relational foreign-key guarantees across evidence chains." },
    ],
    choice: "PostgreSQL schema with Prisma and PgBouncer transaction pooling (fallback to static ledger during export).",
    why: "Preserves referential integrity between evidence hops when backed by a DB, while cleanly degrading to the committed TypeScript ledger during static GitHub Pages builds.",
    consequence: "Requires maintaining parity between Prisma schema models and static ledger exports; Prisma schema kept intact without live DB dependency in CI.",
    evidenceIds: ["E06", "E08"],
    source: "prisma/schema.prisma & src/content/evidence-ledger.ts",
    reviewedDate: "2026-10-30",
  },
];

export const projects: ProjectRecord[] = [
  {
    slug: "project-loop",
    aliases: ["zidio-web-dev"],
    title: "LOOP",
    shortTitle: "LOOP",
    kicker: "Customer feedback intelligence · Zidio Development internship",
    organization: "Zidio Development (Bengaluru, hybrid internship · team project)",
    role: "Full-stack developer (internship)",
    period: "Aug – Sep 2026",
    start: "2026-08",
    status: "submitted",
    statusLabel: "Submitted · Demo",
    featuredOnHome: true,
    summary:
      "Multi-tenant customer feedback platform turning raw tickets, surveys, and CSVs into grounded themes, trends, and cited answers scoped strictly by organisation and role.",
    problem:
      "Product teams scatter user feedback across spreadsheets and support tickets, then summarize without keeping citations or organisation boundaries intact.",
    contributionOneLiner:
      "Built CSV/API ingestion with formula-injection escaping, four-role permission boundaries, time-window trend detection, and Ask LOOP grounded Q&A.",
    repoUrl: "https://github.com/kantimohanthy/zidio-Web-dev",
    repoSlug: "zidio-Web-dev",
    primaryArtifactLabel: "Source code",
    primaryArtifactHref: "https://github.com/kantimohanthy/zidio-Web-dev",
    evidenceIds: ["E02", "E03"],
    missions: ["reliable-software", "validate-ai"],
    lastReviewed: "2026-11-11",
    meshCoord: { x: 220, y: 270 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Unstructured feedback across tenants with zero citation lineage or strict role scoping.",
        details: [
          "Teams needed one workspace to ingest support comments via CSV, API, or manual entry.",
          "Every trend or AI-generated answer had to cite specific underlying feedback items instead of synthesizing unverified summaries.",
        ],
        evidenceIds: ["E02"],
      },
      {
        id: "constraints",
        hopNumber: 2,
        label: "constraints",
        summary: "Hard multi-tenant boundaries, 4 RBAC roles, and key-free local evaluator execution.",
        details: [
          "Strict organisation isolation across four roles: owner, admin, analyst, viewer.",
          "Evaluators needed deterministic local execution without external paid LLM API keys.",
          "CSV exports required protection against spreadsheet formula injection (=, +, -, @ prefixes).",
        ],
        evidenceIds: ["E03"],
      },
      {
        id: "architecture",
        hopNumber: 3,
        label: "decision & architecture",
        summary: "Next.js App Router + Supabase Postgres schema with RLS policies + deterministic fallback analyzer.",
        details: [
          "Implemented CSV ingestion with header mapping and Zod row validation alongside manual/API ingestion paths.",
          "Separated UI role awareness from server-side permission assertions; defined Row Level Security policies in schema migrations.",
          "Built a heuristic fallback classifier/trend comparator so core workflows run offline when no LLM key is set.",
        ],
        diagramKind: "loop-pipeline",
        diagramCaption: "Illustrative pipeline: CSV/API ingestion -> validation -> org-scoped storage -> trend & Ask LOOP citation path.",
        evidenceIds: ["E02", "E03"],
      },
      {
        id: "artifact",
        hopNumber: 4,
        label: "artifact",
        summary: "Public TypeScript repository pushed during internship (commit 1b898e9).",
        details: [
          "Repository contains full application source, schema migrations, and unit test suite.",
          "Note: UI screenshots have not yet been committed to this portfolio repository.",
        ],
        externalLinks: [
          { label: "GitHub: kantimohanthy/zidio-Web-dev", href: "https://github.com/kantimohanthy/zidio-Web-dev" },
        ],
        mediaStatus: {
          kind: "screenshot",
          available: false,
          note: "UI screenshot asset not yet provided in portfolio repo (logged in GAP-07). Inspect code directly via GitHub.",
        },
        evidenceIds: ["E02"],
      },
      {
        id: "result",
        hopNumber: 5,
        label: "result",
        summary: "13/13 Vitest unit tests passed in author run on 3 Oct 2026 against commit 1b898e9.",
        details: [
          "Covered modules: trend engine, tenancy & role enforcement, CSV parser/escaper, fallback analyzer, Ask LOOP grounder, and permission helpers.",
          "Executed locally by me (commit 1b898e9, pushed 29 Sep 2026). This count reflects LOOP's repository suite only, separate from this portfolio's tests.",
        ],
        commandSample: "npx vitest run  # 6 files · 13 tests passing (commit 1b898e9, 2026-10-03)",
        evidenceIds: ["E03"],
      },
      {
        id: "limitation",
        hopNumber: 6,
        label: "limitation",
        summary: "Seeded demo switching is not production multi-tenant traffic; live RLS and E2E remain unverified.",
        details: [
          "The evaluator demo runs on seeded sample data with one-click role switching — demo behavior, not production persistence or adoption.",
          "RLS policies exist in SQL migrations; they have not yet been verified via live multi-user Supabase queries.",
          "Playwright end-to-end tests were not run, and no public demo URL is hosted yet.",
        ],
        evidenceIds: ["E03"],
      },
      {
        id: "next-hop",
        hopNumber: 7,
        label: "next hop",
        summary: "Publish live evaluator sandbox and document end-to-end RLS isolation test output.",
        details: [
          "Run Playwright E2E scenarios verifying viewer vs owner isolation against an active Postgres/Supabase instance.",
          "Commit verified UI screenshots into the evidence ledger.",
        ],
        evidenceIds: ["E03"],
      },
    ],
  },
  {
    slug: "daser-net",
    title: "DASER-Net",
    shortTitle: "DASER-Net",
    kicker: "Cross-corpus speech emotion recognition · INFERENCE Lab",
    organization: "INFERENCE Lab (research collaboration · since Aug 2026)",
    role: "Collaborator: real-data validation & reproducible evaluation",
    period: "Aug 2026 – present",
    start: "2026-08",
    status: "ongoing",
    statusLabel: "Ongoing · Research",
    featuredOnHome: true,
    isResearch: true,
    summary:
      "Research investigating disentangled representations for speech emotion recognition across distinct corpora. My contribution: real-corpus data validation and speaker-disjoint evaluation.",
    problem:
      "Speech emotion classifiers often overfit microphone channel acoustics and training speaker identities instead of emotional prosody, collapsing on unseen datasets.",
    contributionOneLiner:
      "Engineered the real CREMA-D audio ingestion validation, frozen speaker-disjoint splits, and global speaker ID namespace so evaluation stays leak-free.",
    primaryArtifactLabel: "Case study & methodology",
    primaryArtifactHref: "/work/daser-net/",
    evidenceIds: ["E05"],
    missions: ["validate-ai"],
    lastReviewed: "2026-11-11",
    meshCoord: { x: 760, y: 175 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Acoustic and speaker leakage makes standard random splits look accurate on models that fail across corpora.",
        details: [
          "If the same speaker or recording room appears in both train and test folds, validation metrics measure speaker recognition rather than emotion generalization.",
          "Real multi-corpus training requires deterministic manifest freezing before comparing any neural architecture.",
        ],
        evidenceIds: ["E05"],
      },
      {
        id: "constraints",
        hopNumber: 2,
        label: "constraints",
        summary: "Zero speaker overlap across splits; reproducible dataset manifests across heterogeneous WAV corpora.",
        details: [
          "The model architecture and initial synthetic pilot were authored by lead researcher Muhammad Khubaib Ahmad; my remit is strictly real data integrity.",
          "Collaboration repository (Inference-LAB/DASER-Net) returned HTTP 404 to public unauthenticated requests on 11 Nov 2026 (private/restricted access).",
        ],
        evidenceIds: ["E05"],
      },
      {
        id: "architecture",
        hopNumber: 3,
        label: "contribution & pipeline",
        summary: "Validated CREMA-D ingestion, global speaker namespace, and waveform batching.",
        details: [
          "Done: built CREMA-D ingestion with integrity checks for duration, sample validity, and metadata consistency.",
          "Done: generated deterministic speaker-disjoint train/validation/test manifests so no speaker spans two partitions.",
          "Current: validating an audio baseline to sanity-check end-to-end feature loading prior to full cross-corpus runs.",
        ],
        diagramKind: "daser-split",
        diagramCaption: "Illustrative planned evaluation matrix (train on Corpus A -> evaluate unseen Corpus B). Diagram is structural, not benchmark output.",
        evidenceIds: ["E05"],
      },
      {
        id: "artifact",
        hopNumber: 4,
        label: "artifact",
        summary: "Real-data validation pipeline commits dated 2 Oct 2026 (private collaboration repo).",
        details: [
          "Each pipeline stage carries a standalone validation script inside the collaboration repo.",
          "Note: no public GitHub link is clickable because the repository is currently private (verified HTTP 404 on 11 Nov 2026).",
        ],
        mediaStatus: {
          kind: "screenshot",
          available: false,
          note: "Collaboration repository (Inference-LAB/DASER-Net) is currently private; no synthetic results or unconfirmed scores are published.",
        },
        evidenceIds: ["E05"],
      },
      {
        id: "limitation",
        hopNumber: 5,
        label: "limitation",
        summary: "No real cross-corpus accuracy metrics published yet; synthetic pilot numbers withheld intentionally.",
        details: [
          "Only a synthetic pilot ran earlier in the repo; synthetic numbers do not demonstrate real speech generalization and are excluded.",
          "No publication or authorship claims are asserted at this stage.",
        ],
        evidenceIds: ["E05"],
      },
      {
        id: "next-hop",
        hopNumber: 6,
        label: "next hop",
        summary: "Complete baseline training on CREMA-D and run cross-corpus ablation against held-out speech datasets.",
        details: [
          "Verify dataloader determinism across seeds and record first reproducible real-corpus F1/UAR baselines once approved for disclosure.",
        ],
        evidenceIds: ["E05"],
      },
    ],
  },
  {
    slug: "devan",
    aliases: ["devan-os", "ujwal-portfolio"],
    title: "DEVAN",
    shortTitle: "DEVAN",
    kicker: "Evidence ledger & static-first engineering portfolio · Personal / Arylax Labs",
    organization: "Personal engineering system (lab identity: Arylax Labs)",
    role: "Architect & developer",
    period: "Jul 2026 – present",
    start: "2026-07",
    status: "in-progress",
    statusLabel: "In progress · System",
    featuredOnHome: true,
    summary:
      "The evidence graph and UJ.OS interface powering kantimohanthy.dev: connecting sources, concepts, experiments, decisions, and artifacts with derived states instead of self-rated bars.",
    problem:
      "Engineering portfolios routinely claim '95% networking' or 'expert' without linking to anything checkable. I wanted every claim to resolve to a dated source, an experiment, and real output.",
    contributionOneLiner:
      "Designed UJ.OS architecture, strict state derivation (ENCOUNTERED -> STUDIED -> IMPLEMENTED -> TESTED), DNS iterative resolution proof, and static-export ledger.",
    repoUrl: "https://github.com/kantimohanthy/Devan2",
    repoSlug: "Devan2",
    primaryArtifactLabel: "Open DEVAN Atlas",
    primaryArtifactHref: "/atlas/",
    evidenceIds: ["E06", "E07", "E08", "E10"],
    missions: ["understand-networks", "reliable-software"],
    lastReviewed: "2026-11-11",
    meshCoord: { x: 485, y: 120 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Self-assigned skill bars and orphan claims break trust; portfolios rarely expose sources or what failed.",
        details: [
          "Replaced proficiency percentages and fabricated radar scores with a checkable ledger model.",
          "Separated the recruiter reading layer (/) from the deeper knowledge atlas (/atlas/ and /devan/) on one typed dataset.",
        ],
        evidenceIds: ["E06"],
      },
      {
        id: "constraints",
        hopNumber: 2,
        label: "constraints",
        summary: "Static hosting on GitHub Pages with zero backend runtime, zero secret exposure, and graceful offline fallbacks.",
        details: [
          "Custom domain kantimohanthy.dev serves static files via GitHub Actions; Prisma DB queries cannot run in user browsers.",
          "Previously hardcoded generateStaticParams in older commits caused 404s on detail slugs — fixed via unified ledger generation.",
        ],
        evidenceIds: ["E08"],
      },
      {
        id: "decision",
        hopNumber: 3,
        label: "decision",
        summary: "Single TypeScript evidence ledger + deriveEvidenceState() driving homepage, traceroutes, CV, sitemap, and atlas.",
        details: [
          "deriveEvidenceState() returns ENCOUNTERED -> STUDIED -> IMPLEMENTED -> TESTED purely from populated schema fields.",
          "Interactive 'Show evidence' mode (?evidence=1) annotates claims on demand without cluttering the 30-second first impression.",
        ],
        diagramKind: "devan-evidence",
        diagramCaption: "Illustrative evidence chain: Source (RFC) -> Question -> Experiment -> Outcome -> Derived State.",
        evidenceIds: ["E06", "E08"],
      },
      {
        id: "artifact",
        hopNumber: 4,
        label: "artifact",
        summary: "Verified 4-hop DNS resolution trace record (RFC 1035, 2026-08-07) + open Next.js static repository.",
        details: [
          "Logged full iterative DNS sequence: stub (127.0.0.53) -> root (198.41.0.4) -> .com TLD (192.5.6.30) -> authoritative (199.43.135.53) -> IN A 93.184.215.14.",
          "Documented bug discovered during capture: tshark initially missed Hop 1 on eth0 because systemd-resolved answered on loopback; solved with -i any.",
        ],
        commandSample: "dig +trace example.com  # 4 iterative hops observed (RD=0, 2026-08-07)",
        externalLinks: [
          { label: "GitHub: kantimohanthy/Devan2", href: "https://github.com/kantimohanthy/Devan2" },
          { label: "Inspect DNS Evidence Record", href: "/evidence/" },
        ],
        evidenceIds: ["E07"],
      },
      {
        id: "result",
        hopNumber: 5,
        label: "result",
        summary: "Static export builds cleanly with automated link checks, secret/DOB scanning, and zero fake percentage scores.",
        details: [
          "Build fetches public GitHub metadata into github-activity.generated.json at CI build time and falls back safely when offline.",
          "Guardrail suite checks exported HTML/JS/JSON directly in out/ for broken internal links, missing assets, and forbidden tokens.",
        ],
        evidenceIds: ["E08"],
      },
      {
        id: "limitation",
        hopNumber: 6,
        label: "limitation",
        summary: "Only DNS has a complete TESTED capture record today; raw .log/.pcap downloads are referenced by path, not yet committed.",
        details: [
          "TCP (RFC 9293) and TLS 1.3 concepts remain STUDIED; interactive protocol diagrams in DEVAN are labelled illustrative walkthroughs.",
          "A live Q&A assistant stays excluded until server-side citation retrieval, cost caps, and evaluation are built.",
        ],
        evidenceIds: ["E07", "E12"],
      },
      {
        id: "next-hop",
        hopNumber: 7,
        label: "next hop",
        summary: "Commit downloadable dig/tshark capture artifacts in public/evidence/ and expand records to TCP handshakes.",
        details: [
          "Attach public PCAP/log downloads and extend verified records to cover Linux socket/cgroups experiments.",
        ],
        evidenceIds: ["E07"],
      },
    ],
  },
  {
    slug: "wireless-mesh-tvws",
    title: "Wireless Mesh + TV White Space",
    shortTitle: "TVWS Mesh Thesis",
    kicker: "BSc Engineering Sciences Thesis · University of Rome Tor Vergata",
    organization: "University of Rome Tor Vergata",
    role: "Thesis author (in progress)",
    period: "2025 – expected 2027",
    start: "2025",
    status: "draft-under-review",
    statusLabel: "Ongoing · Draft under review",
    featuredOnHome: false,
    isResearch: true,
    summary:
      "Thesis modeling sub-GHz TV White Space wireless mesh links to extend reliable connectivity over mountainous and obstructed rural terrain.",
    problem:
      "Mountainous and sparse rural terrain blocks line-of-sight microwave links and makes fiber deployment uneconomic. Sub-GHz UHF TV White Space spectrum penetrates foliage and diffraction edges better than 2.4/5 GHz Wi-Fi bands.",
    contributionOneLiner:
      "Built MATLAB terrain mesh propagation simulations and incumbent-aware TVWS spectrum sharing models placing relays along ridgelines and valley entrances.",
    primaryArtifactLabel: "Thesis case study",
    primaryArtifactHref: "/work/wireless-mesh-tvws/",
    evidenceIds: ["E01", "E04"],
    missions: ["understand-networks"],
    lastReviewed: "2026-11-11",
    meshCoord: { x: 540, y: 390 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Conventional high-frequency links fail behind hills and heavy foliage; rural links face sparse node density.",
        details: [
          "Examines whether multi-hop wireless mesh relaying over UHF TV White Space bands maintains usable link margins across non-line-of-sight valley topologies.",
        ],
        evidenceIds: ["E04"],
      },
      {
        id: "constraints",
        hopNumber: 2,
        label: "constraints",
        summary: "Incumbent broadcaster protection, uneven elevation profiles, and region-specific TVWS rules.",
        details: [
          "Secondary mesh nodes must detect and avoid channels occupied by licensed DTT broadcasts.",
          "Topology must handle varying inter-node distances, altitude deltas, thermal noise, and intermittent mobility.",
        ],
        evidenceIds: ["E04"],
      },
      {
        id: "architecture",
        hopNumber: 3,
        label: "model & simulations",
        summary: "Two parametric MATLAB simulations: ridgeline terrain mesh propagation and TVWS spectrum coexistence.",
        details: [
          "Completed literature review comparing reactive and proactive mesh routing protocols in sparse deployments.",
          "Implemented MATLAB terrain simulation sweeping transmit power, node count, and noise against throughput, latency, and RSSI.",
          "Implemented coexistence simulation balancing base-station and secondary node allocations alongside incumbent TV channels.",
        ],
        diagramKind: "tvws-topology",
        diagramCaption: "Illustrative ridgeline relay geometry (structural diagram only, not simulation measurements).",
        evidenceIds: ["E04"],
      },
      {
        id: "limitation",
        hopNumber: 4,
        label: "limitation",
        summary: "Draft remains under faculty review; simulation numbers withheld until approved; zero hardware deployment.",
        details: [
          "No numerical throughput, latency, or BER figures are published here prior to thesis approval.",
          "Results remain MATLAB simulation only — no outdoor RF hardware testbed has been built yet.",
        ],
        mediaStatus: {
          kind: "diagram",
          available: false,
          note: "MATLAB plots withheld pending faculty thesis review (GAP-08).",
        },
        evidenceIds: ["E04"],
      },
      {
        id: "next-hop",
        hopNumber: 5,
        label: "next hop",
        summary: "Finalize thesis review edits and benchmark reactive vs proactive routing protocols under identical terrain loss.",
        details: [
          "Incorporate advisor feedback and compare AODV vs OLSR overhead under identical ridgeline path-loss conditions.",
        ],
        evidenceIds: ["E04"],
      },
    ],
  },
  {
    slug: "cineforge-ai-pro",
    aliases: ["cineforge"],
    title: "CineForge AI Pro",
    shortTitle: "CineForge AI Pro",
    kicker: "Supporting work · IBM SkillsBuild AI Builders Challenge submission",
    organization: "IBM SkillsBuild AI Builders Challenge (team project)",
    role: "Integration lead & backend engineer",
    period: "Jun – Jul 2026",
    start: "2026-06",
    status: "completed",
    statusLabel: "Completed · Team submission",
    featuredOnHome: false,
    summary:
      "Bilingual Arabic/English script-to-storyboard preproduction copilot built as a hackathon team submission. Supporting archived project, not a deployed SaaS product or award.",
    problem:
      "Preproduction teams manually parse scripts into scene breakdowns and shot sheets across bilingual production sets.",
    contributionOneLiner:
      "Connected Python script parsing, structured JSON extraction prompts, and scene segmentation pipelines for the July 2026 team submission.",
    repoUrl: "https://github.com/kantimohanthy/ClineForge-Pro",
    repoSlug: "ClineForge-Pro",
    primaryArtifactLabel: "Source code",
    primaryArtifactHref: "https://github.com/kantimohanthy/ClineForge-Pro",
    evidenceIds: ["E09"],
    missions: ["reliable-software", "validate-ai"],
    lastReviewed: "2026-11-11",
    meshCoord: { x: 260, y: 425 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Manual script segmentation delays preproduction across English and Arabic workflows.",
        details: [
          "Team aimed to automate initial scene boundary extraction, character inventories, and draft shot descriptions.",
        ],
        evidenceIds: ["E09"],
      },
      {
        id: "artifact",
        hopNumber: 2,
        label: "artifact",
        summary: "Public Python codebase delivered July 2026 (kantimohanthy/ClineForge-Pro).",
        details: [
          "Built orchestration layer transforming raw script text into structured JSON breakdown schemas.",
          "Honesty note: this was a challenge submission (not an award win and not hosted as an active user service).",
        ],
        diagramKind: "cineforge-pipeline",
        diagramCaption: "Illustrative challenge pipeline: Script input -> bilingual segmentation -> structured JSON breakdown.",
        externalLinks: [
          { label: "GitHub: kantimohanthy/ClineForge-Pro", href: "https://github.com/kantimohanthy/ClineForge-Pro" },
        ],
        evidenceIds: ["E09"],
      },
      {
        id: "limitation",
        hopNumber: 3,
        label: "limitation",
        summary: "Hackathon time-box prototype; archived after submission with no production hosting.",
        details: [
          "Requires external model credentials to execute full generation; not maintained as a deployed web application.",
        ],
        evidenceIds: ["E09"],
      },
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "tl-torvergata",
    date: "2022 – exp. 2027",
    sort: "2022-10-01",
    title: "BSc Engineering Sciences",
    org: "University of Rome Tor Vergata",
    body: "Undergraduate degree in Engineering Sciences (in progress, expected 2027). Bachelor thesis modeling wireless mesh networks and TV White Space spectrum for rural terrain.",
    kind: "Education",
    href: "/work/wireless-mesh-tvws/",
    evidenceId: "E01",
  },
  {
    id: "tl-aiesec",
    date: "Jan – Mar 2025",
    sort: "2025-01-01",
    title: "OGV Team Lead",
    org: "AIESEC Roma Tre",
    body: "Led an Outgoing Global Volunteer operations team at AIESEC Roma Tre.",
    kind: "Leadership",
    evidenceId: "E11",
  },
  {
    id: "tl-universeh",
    date: "Sep 2025",
    sort: "2025-09-15",
    title: "Student Fellow",
    org: "UNIVERSEH Student Fellowship (8-university European space consortium)",
    body: "Participated in eight-university European consortium student fellowship exploring space-sector fundamentals.",
    kind: "Research",
    evidenceId: "E11",
  },
  {
    id: "tl-cineforge",
    date: "Jul 2026",
    sort: "2026-07-24",
    title: "CineForge AI Pro (Team Submission)",
    org: "IBM SkillsBuild AI Builders Challenge",
    body: "Collaborated on backend orchestration for a bilingual English/Arabic script-to-storyboard preproduction prototype.",
    kind: "Build",
    href: "/work/cineforge-ai-pro/",
    evidenceId: "E09",
  },
  {
    id: "tl-daser",
    date: "Since Aug 2026",
    sort: "2026-08-13",
    title: "Research Collaborator (DASER-Net)",
    org: "INFERENCE Lab",
    body: "Real-corpus CREMA-D ingestion, audio integrity checks, and speaker-disjoint split generation for cross-corpus speech emotion recognition.",
    kind: "Research",
    href: "/work/daser-net/",
    evidenceId: "E05",
  },
  {
    id: "tl-zidio",
    date: "Since Aug 2026",
    sort: "2026-08-15",
    title: "Web Development Intern",
    org: "Zidio Development (Bengaluru, hybrid)",
    body: "Full-stack development on LOOP, a multi-tenant feedback intelligence demo with CSV formula escaping, RBAC, and grounded Q&A.",
    kind: "Work",
    href: "/work/project-loop/",
    evidenceId: "E02",
  },
  {
    id: "tl-eurotech",
    date: "Since Sep 2026",
    sort: "2026-09-02",
    title: "Events Lead",
    org: "EuroTech Federation",
    body: "First point of contact for inbound student engineering event proposals; structuring intake and review workflows.",
    kind: "Leadership",
    evidenceId: "E11",
  },
  {
    id: "tl-zishop",
    date: "Sep 2026",
    sort: "2026-09-09",
    title: "Website Diagnostics Audit",
    org: "ZiShop (separate organisation from Zidio Development)",
    body: "Diagnosed UX and technical reliability gaps on the public ZiShop storefront and delivered a prioritized written remediation report to founders.",
    kind: "Work",
    evidenceId: "E11",
  },
  {
    id: "tl-space-talk",
    date: "Sep 2026",
    sort: "2026-09-28",
    title: "Speaker · Building a Sustainable Space Economy",
    org: "Sustainable Space Conference, University of Rome Tor Vergata",
    body: "Student presentation examining trade-offs between commercial space growth and orbital sustainability.",
    kind: "Talk",
    evidenceId: "E11",
  },
];

export const featuredWorkProjects = projects.filter((p) => p.featuredOnHome);
export const researchProjects = projects.filter((p) => p.isResearch);

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find(
    (p) => p.slug === slug || (p.aliases && p.aliases.includes(slug))
  );
}

export function getDecisionById(id?: string): DecisionRecord | undefined {
  return decisions.find((d) => d.id === id);
}
