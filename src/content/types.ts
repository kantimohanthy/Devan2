export type VerificationStatus = "verified" | "reported" | "unverified";

export type ProjectStatus =
  | "submitted"
  | "ongoing"
  | "in-progress"
  | "draft-under-review"
  | "completed";

export interface EvidenceLedgerEntry {
  id: string;
  claim: string;
  source: string;
  date: string; // ISO yyyy-mm or yyyy-mm-dd
  verificationStatus: VerificationStatus;
  publishableWording: string;
  artifactUrl?: string;
  artifactLabel?: string;
}

export interface TracerouteHop {
  id: string;
  hopNumber: number;
  label: string; // e.g. "problem", "constraints", "decision", "artifact", "result", "limitation", "next hop"
  summary: string;
  details: string[];
  evidenceIds?: string[];
  diagramKind?: "loop-pipeline" | "daser-split" | "devan-evidence" | "tvws-topology" | "cineforge-pipeline";
  diagramCaption?: string;
  codeSnippet?: string;
  commandSample?: string;
  mediaStatus?: {
    kind: "screenshot" | "diagram" | "capture";
    available: boolean;
    note: string;
  };
  externalLinks?: { label: string; href: string }[];
  /** Real screenshots or photos that document this hop. */
  media?: { src: string; srcSet?: string; alt: string; caption: string; width: number; height: number }[];
}

export interface ProjectRecord {
  slug: string;
  aliases?: string[];
  title: string;
  shortTitle: string;
  kicker: string;
  organization: string;
  role: string;
  period: string;
  start: string;
  status: ProjectStatus;
  statusLabel: string;
  featuredOnHome: boolean;
  isResearch?: boolean;
  summary: string;
  problem: string;
  contributionOneLiner: string;
  repoUrl?: string;
  repoSlug?: string; // matches github-activity.generated.json name
  primaryArtifactLabel: string;
  primaryArtifactHref: string;
  evidenceIds: string[];
  hops: TracerouteHop[];
  missions: string[];
  lastReviewed: string;
  meshCoord: { x: number; y: number }; // 0..1000 x 0..540 deterministic terrain coordinates
}

export interface DecisionRecord {
  id: string;
  projectSlug: string;
  title: string;
  context: string;
  constraint: string;
  alternatives: { name: string; tradeoff: string }[];
  choice: string;
  why: string;
  consequence: string;
  evidenceIds: string[];
  source: string;
  reviewedDate: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  sort: string;
  title: string;
  org: string;
  body: string;
  kind: "Education" | "Work" | "Research" | "Leadership" | "Talk" | "Build";
  href?: string;
  evidenceId: string;
}

export interface RouteSectionNode {
  id: string;
  hop: number;
  label: string;
  href: string;
  edgesTo: string[];
}

export type AtlasNodeKind = "project" | "decision" | "concept" | "artifact";

export interface AtlasNode {
  id: string;
  kind: AtlasNodeKind;
  title: string;
  subtitle: string;
  status?: string;
  summary: string;
  url: string;
  x: number; // 0..1000 deterministic canvas coords
  y: number; // 0..560 deterministic canvas coords
  evidenceIds: string[];
  relatedIds: string[];
  details: string[];
  externalHref?: string;
  externalLabel?: string;
}

export interface AtlasEdge {
  from: string;
  to: string;
  relation: string;
}

export interface GitHubRepoSnapshot {
  projectSlug: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  pushedAt: string;
  defaultBranch: string;
  language: string | null;
  stars: number;
  recentCommitSha: string | null;
  recentCommitDate: string | null;
  latestRelease: {
    tagName: string;
    publishedAt: string;
    url: string;
  } | null;
  staleFallback?: boolean;
}
