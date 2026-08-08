/**
 * @file Ujwal Canon (Engineering Evolution)
 * @purpose Contains verified evidence-backed structure of Ujwal Kantimohanthy's engineering journey.
 * @principle Identity -> Mission -> Academic Journey -> Professional Journey -> Research -> Projects -> Leadership -> Engineering Philosophy -> Learning Philosophy -> Evidence Timeline -> Future Missions.
 */

export interface UjwalIdentity {
  name: string;
  role: string;
  location: string;
  focusDomains: string[];
}

export interface UjwalEngineeringPhilosophy {
  coreTenet: string;
  principles: string[];
}

export interface UjwalLearningPhilosophy {
  method: string;
  approach: string;
}

export interface UjwalAcademicJourney {
  degree: string;
  institution: string;
  major: string;
  courses: Array<{ code: string; title: string; conceptIds: string[] }>;
}

export interface UjwalResearchRef {
  title: string;
  focus: string;
  conceptsDemonstrated: string[];
  evidenceId: string;
}

export interface UjwalProjectRef {
  slug: string;
  title: string;
  description: string;
  conceptIds: string[];
  repositoryUrl: string;
}

export interface UjwalLeadershipRef {
  role: string;
  organization: string;
  impact: string;
}

export interface UjwalEvidenceTimelineItem {
  timestamp: string;
  title: string;
  evidenceId: string;
}

export interface UjwalCanonStructure {
  identity: UjwalIdentity;
  mission: string;
  academicJourney: UjwalAcademicJourney;
  professionalJourney: string[];
  research: UjwalResearchRef[];
  projects: UjwalProjectRef[];
  leadership: UjwalLeadershipRef[];
  engineeringPhilosophy: UjwalEngineeringPhilosophy;
  learningPhilosophy: UjwalLearningPhilosophy;
  evidenceTimeline: UjwalEvidenceTimelineItem[];
  futureMissions: string[];
}

export const UJWAL_CANON: UjwalCanonStructure = {
  identity: {
    name: "Ujwal Kantimohanthy",
    role: "Network Systems Architect & Distributed Systems Engineer",
    location: "Global",
    focusDomains: ["Networking", "Operating Systems", "Distributed Systems", "AI Systems"],
  },
  mission: "Wireless Mesh Networks + TV White Space for Rural Connectivity",
  academicJourney: {
    degree: "Bachelor of Science",
    institution: "University ICT Program",
    major: "Information & Communication Technology (ICT)",
    courses: [
      { code: "ICT-401", title: "Computer Networking & Internet Engineering", conceptIds: ["dns-iterative-resolution", "tcp-protocol", "bgp-routing"] },
      { code: "ICT-402", title: "Wireless Communications & Mobile Networks", conceptIds: ["tvws-rf-propagation", "longley-rice-itm", "olsr-mesh-routing"] },
      { code: "ICT-403", title: "Operating Systems & System Programming", conceptIds: ["posix-sockets", "linux-ebpf-telemetry"] },
    ],
  },
  professionalJourney: [
    "Lead Software Architect & Developer — DEVAN OS Platform",
    "Distributed Systems Researcher — Rural Broadband Wireless Mesh",
  ],
  research: [
    {
      title: "Wireless Mesh Networks + TV White Space for Rural Connectivity",
      focus: "Sub-1GHz spectrum propagation & reactive/proactive mesh routing in mountainous terrain",
      conceptsDemonstrated: ["tvws-rf-propagation", "longley-rice-itm", "olsr-mesh-routing", "aodv-mesh-routing"],
      evidenceId: "ev-thesis-wmn-tvws",
    },
  ],
  projects: [
    {
      slug: "devan-os",
      title: "DEVAN Engineering Intelligence OS",
      description: "Cognitive operating system modeling engineering intelligence.",
      conceptIds: ["repository-pattern", "linux-ebpf-telemetry", "vector-search-ann"],
      repositoryUrl: "https://github.com/kantimohanthy/Devan2",
    },
    {
      slug: "cineforge-ai-pro",
      title: "CineForge AI Pro",
      description: "Bilingual AI pre-production video generation suite.",
      conceptIds: ["vector-search-ann", "onnx-wasm-runtime"],
      repositoryUrl: "https://github.com/kantimohanthy/cineforge",
    },
    {
      slug: "cosmohub",
      title: "CosmoHub",
      description: "Space economy telemetry aggregation platform.",
      conceptIds: ["raft-consensus", "tcp-protocol"],
      repositoryUrl: "https://github.com/kantimohanthy/cosmohub",
    },
  ],
  leadership: [
    {
      role: "Lead Software Architect",
      organization: "DEVAN OS Core Team",
      impact: "Architected and delivered the Cognitive Core kernel and Decision Intelligence layer.",
    },
  ],
  engineeringPhilosophy: {
    coreTenet: "Evidence over claims; understand down to the packet, socket, and kernel wire level.",
    principles: [
      "Never claim mastery without raw verification (passing CI tests, PCAP datagrams, benchmark traces).",
      "Decouple domain logic from persistence mechanisms via clean repository contracts.",
      "Prefer low-level wire specifications and Standards RFCs over framework abstractions.",
    ],
  },
  learningPhilosophy: {
    method: "Compiler Paradigm & Constructive Building",
    approach: "Learn by implementing wire-level protocols, RFC parsers, and zero-copy packet engines.",
  },
  evidenceTimeline: [
    { timestamp: "2025-06-15", title: "Wireless Mesh TVWS Thesis Defense", evidenceId: "ev-thesis-wmn-tvws" },
    { timestamp: "2026-08-07", title: "DNS PCAP Datagram Verification", evidenceId: "ev-pcap-dns-trace" },
    { timestamp: "2026-08-08", title: "DEVAN OS Platform Engine Release", evidenceId: "ev-repo-devan2" },
  ],
  futureMissions: [
    "Deploy 100-node TVWS wireless mesh field trial in challenging terrain",
    "Build zero-copy eBPF XDP packet router operating at 10Gbps line rate",
  ],
};
