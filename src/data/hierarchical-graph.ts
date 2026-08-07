export type KnowledgeNodeKind =
  | "root-category"
  | "protocol"
  | "rfc"
  | "experiment"
  | "repository"
  | "artifact"
  | "benchmark"
  | "paper"
  | "lesson"
  | "pattern"
  | "technology";

export interface HierarchicalKnowledgeNode {
  id: string;
  label: string;
  kind: KnowledgeNodeKind;
  parentId?: string;
  domain: string;
  summary: string;
  detail: string;
  evidenceDepth: number; // 0..5 (ENCOUNTERED -> DEFENDED)
  density: number; // 10..100
  metadata?: {
    path?: string;
    url?: string;
    metrics?: string;
    status?: string;
  };
}

export interface HierarchicalKnowledgeEdge {
  fromId: string;
  toId: string;
  label: string;
}

export const HIERARCHICAL_ROOT_CATEGORIES = [
  { id: "cat-networking", label: "Computer Networking", domain: "networking" },
  { id: "cat-ai", label: "AI Systems & MLOps", domain: "ai" },
  { id: "cat-[#distributed]", label: "Distributed Systems", domain: "distributed-systems" },
  { id: "cat-security", label: "Cybersecurity & Evidence", domain: "security" },
  { id: "cat-space", label: "Space Infrastructure", domain: "space" },
];

export const HIERARCHICAL_KNOWLEDGE_NODES: HierarchicalKnowledgeNode[] = [
  // Root Category 1: Computer Networking
  {
    id: "cat-networking",
    label: "Computer Networking",
    kind: "root-category",
    domain: "networking",
    summary: "Root domain: Protocols, RFCs, wire formats, and socket profilers.",
    detail: "Core discipline from Internet Engineering degree. Expand tree to explore real protocols and experiments.",
    evidenceDepth: 5,
    density: 100,
  },
  {
    id: "node-rfc1035",
    label: "RFC 1035 Spec",
    kind: "rfc",
    parentId: "cat-networking",
    domain: "networking",
    summary: "Domain Names: Implementation and Specification.",
    detail: "Defines 12-byte DNS headers, query sections, and RR format rules.",
    evidenceDepth: 5,
    density: 95,
    metadata: { url: "https://www.rfc-editor.org/rfc/rfc1035" },
  },
  {
    id: "node-dns-wire-format",
    label: "DNS Wire Format",
    kind: "protocol",
    parentId: "node-rfc1035",
    domain: "networking",
    summary: "Header encoding & 2-bit name compression pointers.",
    detail: "Handcrafted UDP/53 binary encoder walking referral resource records.",
    evidenceDepth: 5,
    density: 90,
  },
  {
    id: "node-exp-dig-trace",
    label: "dig +trace Experiment",
    kind: "experiment",
    parentId: "node-dns-wire-format",
    domain: "networking",
    summary: "4-Hop iterative DNS referral trace test.",
    detail: "Captured RD=0 iterative referral chain across Root, TLD, and Authoritative servers.",
    evidenceDepth: 4,
    density: 88,
  },
  {
    id: "node-art-pcap",
    label: "dns-trace.pcap",
    kind: "artifact",
    parentId: "node-exp-dig-trace",
    domain: "networking",
    summary: "Wireshark packet capture of 8 UDP/53 datagrams.",
    detail: "Raw packet trace proving RD=0 header flag on iterative referrals.",
    evidenceDepth: 4,
    density: 85,
    metadata: { path: "/evidence/dns/dns-trace-001.pcap" },
  },
  {
    id: "node-art-dig-log",
    label: "dig-trace-001.log",
    kind: "artifact",
    parentId: "node-exp-dig-trace",
    domain: "networking",
    summary: "Raw stdout log of 4-hop dig referral chain.",
    detail: "Terminal stdout dump verifying RCODE 0 and Authority section glue records.",
    evidenceDepth: 4,
    density: 80,
    metadata: { path: "/evidence/dns/dig-trace-001.log" },
  },
  {
    id: "node-bench-doh",
    label: "DoH 12ms Lookup",
    kind: "benchmark",
    parentId: "node-dns-wire-format",
    domain: "networking",
    summary: "Cloudflare 1.1.1.1 HTTPS DoH resolution benchmark.",
    detail: "Profiles sub-15ms DoH resolution over encrypted TLS 1.3 socket.",
    evidenceDepth: 4,
    density: 75,
    metadata: { metrics: "12 ms latency" },
  },
  {
    id: "node-thesis-mesh",
    label: "Wireless Mesh Thesis",
    kind: "paper",
    parentId: "cat-networking",
    domain: "networking",
    summary: "Wireless Mesh Networks + TV White Space for Rural Connectivity.",
    detail: "Thesis on combining mesh topologies with spectrum white space in hard terrain.",
    evidenceDepth: 4,
    density: 70,
  },

  // Root Category 2: AI Systems & MLOps
  {
    id: "cat-ai",
    label: "AI Systems & MLOps",
    kind: "root-category",
    domain: "ai",
    summary: "Root domain: Multi-agent pipelines, WASM SIMD ONNX engines, and 3D vision.",
    detail: "Production inference pipelines, adversarial agent validation, and volumetric cell tracking.",
    evidenceDepth: 5,
    density: 95,
  },
  {
    id: "node-pattern-adversarial",
    label: "Adversarial Verification",
    kind: "pattern",
    parentId: "cat-ai",
    domain: "ai",
    summary: "Multi-agent Granite adversarial cross-checking.",
    detail: "Agents evaluate each other productively to surface disagreements explicitly.",
    evidenceDepth: 4,
    density: 85,
  },
  {
    id: "node-repo-sentinel",
    label: "Sentinel AI Repo",
    kind: "repository",
    parentId: "node-pattern-adversarial",
    domain: "ai",
    summary: "Explainable incident intelligence platform.",
    detail: "Event Relationship Graph storing evidence trails rather than raw verdicts.",
    evidenceDepth: 4,
    density: 80,
    metadata: { url: "https://github.com/kantimohanthy/Devan2" },
  },
  {
    id: "node-exp-simd",
    label: "SIMD Vector Benchmark",
    kind: "experiment",
    parentId: "node-pattern-adversarial",
    domain: "ai",
    summary: "In-browser ONNX Float32 cosine similarity loop.",
    detail: "Executes 1,000 SIMD vector iterations over 384 dimensions.",
    evidenceDepth: 4,
    density: 82,
  },
  {
    id: "node-bench-simd",
    label: "14.5ms SIMD Loop",
    kind: "benchmark",
    parentId: "node-exp-simd",
    domain: "ai",
    summary: "Normalized dot product loop latency benchmark.",
    detail: "Sub-20ms precision achieved client-side without backend dependencies.",
    evidenceDepth: 4,
    density: 78,
    metadata: { metrics: "14.5 ms latency" },
  },
  {
    id: "node-tech-cellpose",
    label: "Cellpose 3D Vision",
    kind: "technology",
    parentId: "cat-ai",
    domain: "ai",
    summary: "3D cell segmentation pipeline for Kaggle CZ Biohub.",
    detail: "Segments 3D microscopy volumes across temporal zebrafish embryo lineages.",
    evidenceDepth: 4,
    density: 75,
  },
  {
    id: "node-lesson-anisotropic",
    label: "Anisotropic Voxel Depth",
    kind: "lesson",
    parentId: "node-tech-cellpose",
    domain: "ai",
    summary: "Non-uniform depth voxel scaling correction.",
    detail: "Treating z-spacing same as x/y breaks lineage tracking; fixed via z-rescaling.",
    evidenceDepth: 4,
    density: 70,
  },

  // Root Category 3: Distributed Systems Architecture
  {
    id: "cat-[#distributed]",
    label: "Distributed Systems",
    kind: "root-category",
    domain: "distributed-systems",
    summary: "Root domain: Monorepos, async provider abstraction, and failover design.",
    detail: "Architecture patterns ensuring seamless provider failover and pipeline isolation.",
    evidenceDepth: 4,
    density: 90,
  },
  {
    id: "node-pattern-provider",
    label: "Provider Abstraction Layer",
    kind: "pattern",
    parentId: "cat-[#distributed]",
    domain: "distributed-systems",
    summary: "Interchangeable Hugging Face & watsonx inference providers.",
    detail: "Decoupled pipeline logic ensuring zero downtime whenwatsonx access blocked.",
    evidenceDepth: 4,
    density: 85,
  },
  {
    id: "node-repo-cineforge",
    label: "CineForge AI Monorepo",
    kind: "repository",
    parentId: "node-pattern-provider",
    domain: "distributed-systems",
    summary: "Bilingual Arabic/English script breakdown pipeline.",
    detail: "FastAPI inference backend executing scene reasoning & storyboard prompt generation.",
    evidenceDepth: 4,
    density: 82,
  },

  // Root Category 4: Cybersecurity & Evidence Integrity
  {
    id: "cat-security",
    label: "Cybersecurity & Evidence",
    kind: "root-category",
    domain: "security",
    summary: "Root domain: CI schema validators and TLS socket inspection.",
    detail: "Enforcing structural integrity and wire-level certificate validation.",
    evidenceDepth: 5,
    density: 90,
  },
  {
    id: "node-pattern-validator",
    label: "JSON Schema Validator",
    kind: "pattern",
    parentId: "cat-security",
    domain: "security",
    summary: "CI-enforced Ajv validator for evidence graph integrity.",
    detail: "Validates ID uniqueness and reference resolution before frontend deployment.",
    evidenceDepth: 5,
    density: 88,
  },
  {
    id: "node-protocol-tls13",
    label: "TLS 1.3 Handshake",
    kind: "protocol",
    parentId: "cat-security",
    domain: "security",
    summary: "Socket handshake & X.509 peer cert inspector.",
    detail: "Verifies cipher suite negotiation and issuer certificate authority.",
    evidenceDepth: 4,
    density: 84,
  },

  // Root Category 5: Space Infrastructure
  {
    id: "cat-space",
    label: "Space Infrastructure",
    kind: "root-category",
    domain: "space",
    summary: "Root domain: CosmoHub ontology and satellite telemetry.",
    detail: "Ontology-driven intelligence platform unifying space-sector research data.",
    evidenceDepth: 4,
    density: 85,
  },
  {
    id: "node-repo-cosmohub",
    label: "CosmoHub Ontology",
    kind: "repository",
    parentId: "cat-space",
    domain: "space",
    summary: "Objects, properties, and links data model for space tech.",
    detail: "Connective intelligence layer uniting space institutions, companies, and missions.",
    evidenceDepth: 4,
    density: 80,
  },
];

export const HIERARCHICAL_KNOWLEDGE_EDGES: HierarchicalKnowledgeEdge[] = [
  { fromId: "cat-networking", toId: "node-rfc1035", label: "DEFINES" },
  { fromId: "node-rfc1035", toId: "node-dns-wire-format", label: "IMPLEMENTS" },
  { fromId: "node-dns-wire-format", toId: "node-exp-dig-trace", label: "TESTS" },
  { fromId: "node-exp-dig-trace", toId: "node-art-pcap", label: "GENERATES" },
  { fromId: "node-exp-dig-trace", toId: "node-art-dig-log", label: "GENERATES" },
  { fromId: "node-dns-wire-format", toId: "node-bench-doh", label: "PROVES" },
  { fromId: "cat-networking", toId: "node-thesis-mesh", label: "RESEARCHES" },

  { fromId: "cat-ai", toId: "node-pattern-adversarial", label: "DESIGNS" },
  { fromId: "node-pattern-adversarial", toId: "node-repo-sentinel", label: "IMPLEMENTS" },
  { fromId: "node-pattern-adversarial", toId: "node-exp-simd", label: "BENCHMARKS" },
  { fromId: "node-exp-simd", toId: "node-bench-simd", label: "PROVES" },
  { fromId: "cat-ai", toId: "node-tech-cellpose", label: "USES" },
  { fromId: "node-tech-cellpose", toId: "node-lesson-anisotropic", label: "LESSON_FROM" },

  { fromId: "cat-[#distributed]", toId: "node-pattern-provider", label: "DESIGNS" },
  { fromId: "node-pattern-provider", toId: "node-repo-cineforge", label: "IMPLEMENTS" },

  { fromId: "cat-security", toId: "node-pattern-validator", label: "ENFORCES" },
  { fromId: "cat-security", toId: "node-protocol-tls13", label: "INSPECTS" },

  { fromId: "cat-space", toId: "node-repo-cosmohub", label: "BUILDS" },
];
