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
  {
    slug: "cosmohub",
    title: "CosmoHub",
    shortTitle: "CosmoHub",
    kicker: "Space education platform · STATION F Landing Zone",
    organization: "CosmoHub (founder-led, early stage) · STATION F Landing Zone, Paris",
    role: "Founder: product direction and retrieval prototype",
    period: "2026 – present",
    start: "2026-08",
    status: "in-progress",
    statusLabel: "In progress · Early prototype",
    featuredOnHome: false,
    isResearch: true,
    summary:
      "A learning platform for anyone curious about space, from first questions to advanced topics, organised as a game-like progression rather than a course catalogue. Early prototype; no public usage figures.",
    problem:
      "Space is easy to be curious about and hard to learn in order. Material is scattered across agencies, courses and news, with no clear path from a first question to deeper topics.",
    contributionOneLiner:
      "I define the product, the topic and relationship model behind the learning paths, and the retrieval prototype that grounds answers in cited space-sector sources.",
    primaryArtifactLabel: "Case study & limits",
    primaryArtifactHref: "/work/cosmohub/",
    evidenceIds: ["E13"],
    missions: [],
    lastReviewed: "2026-11-12",
    meshCoord: { x: 470, y: 90 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Learners cannot tell what to study next in space, or which sources to trust.",
        details: [
          "Information about space missions, funding and technology is spread across many organisations and formats.",
          "CosmoHub's aim is a structured path from stage zero onward, with each answer traceable to a source.",
        ],
        evidenceIds: ["E13"],
      },
      {
        id: "architecture",
        hopNumber: 2,
        label: "contribution & prototype",
        summary: "Topic and relationship model plus a retrieval prototype for space-sector questions.",
        details: [
          "Done: defined the product concept and a gamified progression model for learners.",
          "Done: built an early retrieval prototype over space-sector material, including a funding-query slice.",
        ],
        evidenceIds: ["E13"],
      },
      {
        id: "limitation",
        hopNumber: 3,
        label: "limitation",
        summary: "Early prototype: no public repository, live demo, or usage figures yet.",
        details: [
          "No latency, accuracy, or user numbers are published because none are independently documented.",
          "STATION F participation is reported by me; a public proof link is pending.",
        ],
        evidenceIds: ["E13"],
      },
      {
        id: "next-hop",
        hopNumber: 4,
        label: "next hop",
        summary: "Publish a small, reproducible funding-query example with its sources, then test the learning path with real learners.",
        details: [
          "Document the data sources and retrieval steps so another person can rerun the slice.",
        ],
        evidenceIds: ["E13"],
      },
    ],
  },
  {
    slug: "g-core",
    aliases: ["gcore", "team-empty"],
    title: "G-Core",
    shortTitle: "G-Core",
    kicker: "Behavioral banking loyalty prototype · Adria Hack Sarajevo 2026",
    organization: "Team EMPTY · Adria Hack Sarajevo 2026 (24-hour hackathon)",
    role: "Team member and repository owner",
    period: "Sep 2026",
    start: "2026-09",
    status: "completed",
    statusLabel: "Completed · Hackathon prototype",
    featuredOnHome: false,
    summary:
      "A prototype that rewards financial consistency measured against a customer's own history instead of spending volume. It scores five weighted habits with plain rules, protects unavoidable health costs, and ignores transfers that only move money between a person's own accounts.",
    problem:
      "Many bank loyalty programmes reward transaction volume or account value, and give little recognition to steady financial behaviour.",
    contributionOneLiner:
      "I own the repository for Team EMPTY's prototype: a deterministic five-dimension scoring engine, a protected-expense rule, an anti-gaming transfer filter and an interactive demo with simulated data.",
    repoUrl: "https://github.com/kantimohanthy/Team-Empty-Sarajevo-Hackathon",
    repoSlug: "Team-Empty-Sarajevo-Hackathon",
    primaryArtifactLabel: "Source code",
    primaryArtifactHref: "https://github.com/kantimohanthy/Team-Empty-Sarajevo-Hackathon",
    evidenceIds: ["E14"],
    missions: [],
    lastReviewed: "2026-11-12",
    meshCoord: { x: 330, y: 290 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Loyalty schemes reward spending, not steady behaviour.",
        details: [
          "G-Core asks whether consistency, measured against a customer's own last three months, can work as a loyalty signal.",
          "The repository states plainly that this is a hackathon prototype and not an empirical claim about existing loyalty models.",
        ],
        evidenceIds: ["E14"],
      },
      {
        id: "constraints",
        hopNumber: 2,
        label: "constraints",
        summary: "24 hours, no labelled financial outcome data, and a need to explain every score.",
        details: [
          "Scoring is deterministic rather than machine learning, because there was no labelled data to train or validate a model responsibly.",
          "Raw transactions stay on the bank side; only a pseudonymous ID, points, tier and eligibility flags reach the loyalty layer.",
        ],
        evidenceIds: ["E14"],
      },
      {
        id: "architecture",
        hopNumber: 3,
        label: "decision & pipeline",
        summary: "Five weighted habits, with two rules that stop the score being unfair or gameable.",
        details: [
          "Weights: budget discipline 30%, payment consistency 25%, savings consistency 20%, liquidity resilience 15%, goal consistency 10%. The repository labels these as design parameters, not calibrated coefficients.",
          "A protected-expense rule keeps a health cost out of discretionary scoring, so an emergency does not cost the customer their streak.",
          "An anti-gaming rule finds a transfer out and a matching transfer back between the customer's own accounts and excludes both from savings progress.",
        ],
        evidenceIds: ["E14"],
      },
      {
        id: "artifact",
        hopNumber: 4,
        label: "artifact",
        summary: "Public Next.js and TypeScript repository with an interactive demo running on synthetic data.",
        details: [
          "The screenshots below come from the demo, which uses a made-up customer and a made-up bank.",
          "The repository lists a GitHub Pages demo; I could not open it from my checking environment, so confirm it loads before sharing the link.",
        ],
        media: [
          {
            src: "/work/g-core/ecosystem-1280.webp",
            srcSet: "/work/g-core/ecosystem-640.webp 640w, /work/g-core/ecosystem-1280.webp 1280w",
            alt: "G-Core overview screen showing a monthly behavioural plan with budget, overdraft, balance and savings goals beside a tier ladder",
            caption: "Monthly plan and tier ladder, computed from the customer's own last three months (demo data).",
            width: 1280,
            height: 800,
          },
          {
            src: "/work/g-core/healthcare-1280.webp",
            srcSet: "/work/g-core/healthcare-640.webp 640w, /work/g-core/healthcare-1280.webp 1280w",
            alt: "G-Core screen with a green banner saying a protected 450 euro healthcare expense was detected and excluded from evaluation",
            caption: "A protected healthcare expense is excluded, so the streak is unaffected.",
            width: 1280,
            height: 800,
          },
          {
            src: "/work/g-core/transfer-1280.webp",
            srcSet: "/work/g-core/transfer-640.webp 640w, /work/g-core/transfer-1280.webp 1280w",
            alt: "G-Core activity screen with a banner saying an internal 500 euro transfer between own accounts was detected and excluded",
            caption: "An internal transfer between the customer's own accounts is detected and excluded.",
            width: 1280,
            height: 800,
          },
        ],
        externalLinks: [
          { label: "GitHub: Team-Empty-Sarajevo-Hackathon", href: "https://github.com/kantimohanthy/Team-Empty-Sarajevo-Hackathon" },
        ],
        evidenceIds: ["E14"],
      },
      {
        id: "limitation",
        hopNumber: 5,
        label: "limitation",
        summary: "Customer data, bank-wide analytics, network scale and merchant inventory are all simulated.",
        details: [
          "Not a credit score and not validated across customer groups; the weights are untested design choices.",
          "A production version would need open-banking connectors, authentication, key management, a privacy impact assessment and a fairness review.",
        ],
        evidenceIds: ["E14"],
      },
    ],
  },
  {
    slug: "data-quality-platform",
    aliases: ["dqp"],
    title: "Data Quality Platform",
    shortTitle: "Data Quality Platform",
    kicker: "Coursework project · C# / .NET 10",
    organization: "University coursework (C# and software design)",
    role: "Author",
    period: "Sep 2026",
    start: "2026-09",
    status: "completed",
    statusLabel: "Completed · Coursework",
    featuredOnHome: false,
    summary:
      "A console application that loads customer data from CSV, checks it against configurable quality rules, scores it, applies undoable clean-up steps, exports the result and keeps a history in SQLite.",
    problem:
      "Customer files arrive with missing columns, duplicates and invalid values, and a team needs to see what is wrong before they trust the data.",
    contributionOneLiner:
      "I wrote the application in C# with Entity Framework Core and SQLite, using MVC, observers, factories and snapshot-based undo, plus 34 unit test methods.",
    repoUrl: "https://github.com/kantimohanthy/FinalProjectBase--1-",
    repoSlug: "FinalProjectBase--1-",
    primaryArtifactLabel: "Source code",
    primaryArtifactHref: "https://github.com/kantimohanthy/FinalProjectBase--1-",
    evidenceIds: ["E15"],
    missions: [],
    lastReviewed: "2026-11-12",
    meshCoord: { x: 330, y: 430 },
    hops: [
      {
        id: "problem",
        hopNumber: 1,
        label: "problem",
        summary: "Raw customer CSV files need checking, profiling and cleaning before use.",
        details: [
          "Input must contain CustomerId, Name, Email, Age, Country, SignupDate and TotalSpent.",
          "The platform validates the file, profiles each column, runs quality rules, scores the dataset and reports each issue.",
        ],
        evidenceIds: ["E15"],
      },
      {
        id: "architecture",
        hopNumber: 2,
        label: "decision & structure",
        summary: "MVC with separate quality rules, transformations, exporters and repositories, so each can change on its own.",
        details: [
          "Transformations run in insertion order and each saves a snapshot, so a step can be undone.",
          "Observers are notified when a pipeline step starts, completes or fails.",
          "Quality-rule settings can be created, read, updated and deleted, and every run and its issues are stored in SQLite.",
        ],
        evidenceIds: ["E15"],
      },
      {
        id: "artifact",
        hopNumber: 3,
        label: "artifact",
        summary: "Public repository with about 2,700 lines of C#, class and use-case diagrams, and 12 test files.",
        details: [
          "I counted 34 test methods in the repository. I did not re-run them for this site.",
        ],
        externalLinks: [
          { label: "GitHub: FinalProjectBase--1-", href: "https://github.com/kantimohanthy/FinalProjectBase--1-" },
        ],
        evidenceIds: ["E15"],
      },
      {
        id: "limitation",
        hopNumber: 4,
        label: "limitation",
        summary: "A console tool for a simple CSV format, built for coursework.",
        details: [
          "No quoted commas or multi-line fields; no web interface; not deployed anywhere.",
        ],
        evidenceIds: ["E15"],
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
  {
    id: "tl-cosmohub",
    date: "2026",
    sort: "2026-08-20",
    title: "Founder · CosmoHub",
    org: "STATION F Landing Zone, Paris",
    body: "Building a space-education platform with a game-like learning path and a source-grounded retrieval prototype. Early stage.",
    kind: "Build",
    href: "/work/cosmohub/",
    evidenceId: "E13",
  },
  {
    id: "tl-gcore",
    date: "Sep 2026",
    sort: "2026-09-14",
    title: "Team EMPTY · G-Core",
    org: "Adria Hack Sarajevo 2026",
    body: "Built a behavioral banking loyalty prototype in a 24-hour hackathon: explainable scoring, protected health expenses and an anti-gaming transfer rule.",
    kind: "Build",
    href: "/work/g-core/",
    evidenceId: "E14",
  },
  {
    id: "tl-dqp",
    date: "Sep 2026",
    sort: "2026-09-10",
    title: "Data Quality Platform",
    org: "University coursework",
    body: "Wrote a C# / .NET 10 console application that validates, scores and cleans customer CSV data, with SQLite history and unit tests.",
    kind: "Build",
    href: "/work/data-quality-platform/",
    evidenceId: "E15",
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
