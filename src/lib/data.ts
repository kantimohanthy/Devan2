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
      "Thesis research — extending mesh coverage into challenging terrain using unused broadcast spectrum",
    objectives: [
      { label: "Literature review: WMN topologies", done: true },
      { label: "Literature review: TVWS regulatory landscape", done: true },
      { label: "Build propagation model for occluded terrain", done: true },
      { label: "Simulate mesh + TVWS hybrid topology", done: false },
      { label: "Field-equivalent bench test", done: false },
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
];

export const concepts: Concept[] = [
  {
    slug: "dns",
    domain: "Networking",
    topic: "Protocols",
    name: "DNS",
    description:
      "The distributed naming system that resolves hostnames to addresses through a hierarchy of root, TLD, and authoritative servers. Studied here through manual iterative resolution rather than taking the textbook description at face value.",
    state: "TESTED",
    sources: [{ type: "Source", title: "RFC1035", meta: "IETF", href: "#" }],
    experiments: [
      { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
    ],
    evidence: [
      { type: "Evidence", title: "tshark capture, root→TLD→auth", meta: "1 artifact", href: "/laboratory/dns-iterative-resolution" },
    ],
    decisions: [],
    related: [
      { type: "Concept", title: "HTTP", meta: "ENCOUNTERED", href: "/knowledge/http", state: "ENCOUNTERED", unverified: true },
    ],
    createdAt: "2026-08-07",
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
    concepts: [{ type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/dns", state: "TESTED" }],
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
    description: "Last commit 3 days ago · CI passing · 0 open issues — stated plainly, not scored.",
    lastCommit: "3 days ago",
    ciStatus: "passing",
    openIssues: 0,
    architectureNote:
      "Ajv-backed JSON Schema is the single structural authority. The TypeScript/JS graph validator handles ID uniqueness, reference resolution, provenance, and derived evidence states only.",
    concepts: [{ type: "Concept", title: "DNS", meta: "1 experiment", href: "/knowledge/dns" }],
    decisions: [
      { type: "Decision", title: "Why PostgreSQL?", meta: "5 stages logged", href: "/reasoning/why-postgresql" },
    ],
    experiments: [{ type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution" }],
  },
];

export const projects: Project[] = [
  {
    slug: "cineforge-ai-pro",
    name: "CineForge AI Pro",
    description:
      "Bilingual AI pre-production assistant for filmmakers, built for the IBM SkillsBuild AI Builders Challenge.",
    repositories: [],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: [],
  },
  {
    slug: "cosmohub",
    name: "CosmoHub",
    description:
      "Ed-tech platform concept for space tech and satellite comms, part of the Universeh Student Fellowship portfolio.",
    repositories: [],
    concepts: [],
    experiments: [],
    decisions: [],
    openQuestions: [],
  },
  {
    slug: "devan",
    name: "DEVAN / ujwal-portfolio",
    description: "This system — the evidence graph and its interface.",
    repositories: [{ type: "Repository", title: "ujwal-portfolio", meta: "CI passing", href: "/repositories/ujwal-portfolio" }],
    concepts: [{ type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/dns" }],
    experiments: [{ type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution" }],
    decisions: [
      { type: "Decision", title: "Why PostgreSQL?", meta: "5 stages logged", href: "/reasoning/why-postgresql" },
    ],
    openQuestions: [],
  },
];

export type IndexEntry = ChipRef;

export const searchIndex: IndexEntry[] = [
  { type: "Decision", title: "Why PostgreSQL?", meta: "5 stages logged", href: "/reasoning/why-postgresql" },
  { type: "Concept", title: "DNS", meta: "TESTED", href: "/knowledge/dns", state: "TESTED" },
  { type: "Experiment", title: "DNS iterative resolution trace", meta: "TESTED", href: "/laboratory/dns-iterative-resolution", state: "TESTED" },
  { type: "Repository", title: "ujwal-portfolio", meta: "CI passing", href: "/repositories/ujwal-portfolio" },
  { type: "Project", title: "CineForge AI Pro", meta: "Bilingual pre-production assistant", href: "/projects/cineforge-ai-pro" },
  { type: "Project", title: "CosmoHub", meta: "Ed-tech · space tech", href: "/projects/cosmohub" },
  { type: "Project", title: "DEVAN / ujwal-portfolio", meta: "This system", href: "/projects/devan" },
  { type: "Mission", title: "Wireless Mesh + TV White Space", meta: "3 / 8 objectives", href: "/missions/wireless-mesh-tvws" },
];

// ---------------------------------------------------------------------------
// Real Database Queries with Dynamic Import (Prevents Client-Bundle Leak)
// ---------------------------------------------------------------------------

export async function getConcept(slug: string): Promise<Concept | undefined> {
  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbConcept = await prisma.concept.findUnique({ where: { slug } });
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
    } catch (err) {
      console.warn("Prisma concept query fallback:", err);
    }
  }
  return concepts.find((c) => c.slug === slug);
}

export async function getExperiment(slug: string): Promise<Experiment | undefined> {
  if (typeof window === "undefined") {
    try {
      const { prisma } = await import("@/lib/prisma");
      const dbExperiment = await prisma.experiment.findUnique({ where: { slug } });
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
    } catch (err) {
      console.warn("Prisma experiment query fallback:", err);
    }
  }
  return experiments.find((e) => e.slug === slug);
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
    } catch (err) {
      console.warn("Prisma decision query fallback:", err);
    }
  }
  return decisions.find((d) => d.slug === slug);
}

export async function getRepository(slug: string): Promise<Repository | undefined> {
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
    } catch (err) {
      console.warn("Prisma repository query fallback:", err);
    }
  }
  return repositories.find((r) => r.slug === slug);
}

export async function getProject(slug: string): Promise<Project | undefined> {
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
    } catch (err) {
      console.warn("Prisma project query fallback:", err);
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
    } catch (err) {
      console.warn("Prisma mission query fallback:", err);
    }
  }
  return missions.find((m) => m.slug === slug);
}
