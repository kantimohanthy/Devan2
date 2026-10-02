/**
 * @file Ujwal Canon (Engineering Evolution)
 * @purpose Contains verified evidence backed structure of Ujwal Kantimohanthy's engineering journey.
 * @principle Identity → Mission → Academic Journey → Professional Journey → Research → Projects → Leadership → Engineering Philosophy → Learning Philosophy → Evidence Timeline → Future Missions.
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
    role: "ICT engineer: network infrastructure",
    location: "Rome · Paris",
    focusDomains: ["Networking", "Operating Systems", "Distributed Systems", "AI Systems"],
  },
  mission: "Wireless Mesh Networks + TV White Space for Rural Connectivity",
  academicJourney: {
    degree: "BSc",
    institution: "University of Rome Tor Vergata",
    major: "Engineering Sciences",
    courses: [
      { code: "", title: "Computer Networking & Internet Engineering", conceptIds: ["dns-iterative-resolution", "tcp-protocol", "bgp-routing"] },
      { code: "", title: "Wireless Communications & Mobile Networks", conceptIds: ["tvws-rf-propagation", "longley-rice-itm", "olsr-mesh-routing"] },
      { code: "", title: "Operating Systems & System Programming", conceptIds: ["posix-sockets", "linux-ebpf-telemetry"] },
    ],
  },
  professionalJourney: [
    "Web Development Intern, Zidio Development (Aug 2026 –)",
    "Thesis research, Wireless Mesh + TV White Space (ongoing)",
    "Events Lead, EuroTech Federation",
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
      title: "DEVAN",
      description: "Evidence graph and engineering workspace behind kantimohanthy.dev.",
      conceptIds: ["repository-pattern", "linux-ebpf-telemetry", "vector-search-ann"],
      repositoryUrl: "https://github.com/kantimohanthy/Devan2",
    },
    {
      slug: "cineforge-ai-pro",
      title: "CineForge AI Pro",
      description: "Bilingual AI preproduction video generation suite.",
      conceptIds: ["vector-search-ann", "onnx-wasm-runtime"],
      repositoryUrl: "https://github.com/kantimohanthy/ClineForge-Pro",
    },
    {
      slug: "cosmohub",
      title: "CosmoHub",
      description: "Learning platform for space technology, early stage, built through STATION F Landing Zone.",
      conceptIds: ["raft-consensus", "tcp-protocol"],
      repositoryUrl: "https://github.com/kantimohanthy/Cosmohub",
    },
  ],
  leadership: [
    {
      role: "Events Lead",
      organization: "EuroTech Federation",
      impact: "First point of contact for inbound event requests; designing the team's intake process.",
    },
  ],
  engineeringPhilosophy: {
    coreTenet: "Evidence over claims; understand down to the packet, socket, and kernel wire level.",
    principles: [
      "Never claim mastery without raw verification (passing CI tests, PCAP datagrams, benchmark traces).",
      "Decouple domain logic from persistence mechanisms via clean repository contracts.",
      "Prefer low level wire specifications and Standards RFCs over framework abstractions.",
    ],
  },
  learningPhilosophy: {
    method: "Compiler Paradigm & Constructive Building",
    approach: "Learn by implementing wire level protocols, RFC parsers, and zero-copy packet engines.",
  },
  evidenceTimeline: [
    { timestamp: "2026-08-07", title: "DNS PCAP Datagram Verification", evidenceId: "ev-pcap-dns-trace" },
    { timestamp: "2026-08-08", title: "DEVAN OS Platform Engine Release", evidenceId: "ev-repo-devan2" },
  ],
  futureMissions: [
    "Deploy 100-node TVWS wireless mesh field trial in challenging terrain",
    "Build zero-copy eBPF XDP packet router operating at 10Gbps line rate",
  ],
};
