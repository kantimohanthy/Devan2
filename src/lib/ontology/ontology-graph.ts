/**
 * @file Universal Scalable ICT Engineering Canon Topology — UJ.OS v2.1
 * @purpose Namespaced concept identifiers (networking.dns.iterative-resolution, networking.tcp, cloud.kubernetes), automatic expansion fields, truth sources, difficulty tiers, time estimates, and objective mastery requirements.
 * @principle Scalable to 30,000+ canonical concepts via namespaced IDs and compiler pipeline ingestion.
 */

import type {
  OntologyEntity,
  OntologyRelationship,
  ConceptComparison,
  EngineeringDecisionGraph,
  FailurePropagationChain,
  ArchitecturePatternMapping,
  EngineeringPath,
} from "./types";

export const CANONICAL_ENTITIES: OntologyEntity[] = [
  // =========================================================================
  // 1. NETWORKING & INTERNET ENGINEERING (NAMESPACED CONCEPTS)
  // =========================================================================
  {
    id: "networking.dns.iterative-resolution",
    type: "concept",
    title: "DNS Iterative Resolution & Wire Mechanics",
    domain: "Networking",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "MASTERED",
    summary: "RFC 1035 Domain Name System protocol, recursive vs. iterative lookup hops, and DNS wire format datagrams.",
    details: {
      definition: "Hierarchical distributed database protocol translating human-readable hostnames into IP addresses via UDP/TCP port 53.",
      engineeringPurpose: "Provides global naming resolution service underlying all Internet application protocols.",
      problemsSolved: ["Decouples network IP addressing from application identifiers", "Distributed caching scales query volume globally"],
      osiLayer: "Layer 7 - Application",
      tcpIpLayer: "Application",
      parents: ["networking.application-layer"],
      children: ["networking.dnssec", "networking.doh"],
      related: ["networking.bgp", "networking.tcp"],
      aliases: ["DNS", "Domain Name System", "Iterative Resolver"],
      externalReferences: [
        { type: "RFC", title: "RFC 1035: Domain Names - Implementation and Specification", url: "https://datatracker.ietf.org/doc/html/rfc1035", identifier: "RFC 1035" },
        { type: "MAN_PAGE", title: "dig(1) - DNS lookup utility", identifier: "dig.1" },
      ],
      truthSources: ["RFC", "PRODUCTION_DOCS", "UNIVERSITY_COURSE"],
      difficulty: "ADVANCED",
      timeEstimates: { estimatedHours: 40, estimatedProjects: 2, estimatedLabs: 4, estimatedEvidence: 5 },
      masteryRequirements: [
        { action: "READ_RFC", description: "Read RFC 1035 Sections 3 and 4 wire specifications", completed: true },
        { action: "BUILD_PROJECT", description: "Build an iterative DNS resolver in C/Go parsing wire bytes", completed: true },
        { action: "COLLECT_EVIDENCE", description: "Capture Wireshark PCAP proving RD=0 iterative referral hops", completed: true },
      ],
      typicalPorts: ["UDP/53 (Queries)", "TCP/53 (AXFR & >512B payloads)"],
      packetFlow: [
        "1. Client stub resolver checks local OS cache / hosts file.",
        "2. Client sends UDP query to Recursive Resolver with RD=1.",
        "3. Recursive Resolver queries Root Server (.) with RD=0 -> receives TLD referral (NS record).",
        "4. Recursive Resolver queries TLD Server (.com) with RD=0 -> receives Authoritative referral.",
        "5. Recursive Resolver queries Authoritative Server -> receives A/AAAA answer.",
        "6. Recursive Resolver caches answer according to TTL and returns A record to Client.",
      ],
      headerStructure: [
        "Transaction ID (16 bits) | Flags: QR(1) Opcode(4) AA(1) TC(1) RD(1) RA(1) Z(3) RCODE(4)",
        "QDCOUNT (16 bits) - Number of Questions",
        "ANCOUNT (16 bits) - Number of Answers",
        "NSCOUNT (16 bits) - Number of Authority Records",
        "ARCOUNT (16 bits) - Number of Additional Records",
      ],
      historicalContext: "Created in 1983 by Paul Mockapetris at USC/ISI to replace static HOSTS.TXT file which collapsed under ARPANET growth.",
      futureEvolution: "Transitioning toward encrypted DNS-over-HTTPS (DoH RFC 8484) and DNS-over-QUIC (DoQ RFC 9250).",
      comparisonTargets: ["networking.mdns"],
      reasoningChains: [
        "If UDP query payload exceeds 512 bytes -> Server sets TC (Truncated) bit = 1 -> Client re-establishes query over TCP port 53.",
      ],
      decisionRecord: {
        engineeringProblem: "How to resolve human-memorable names to dynamic 32-bit/128-bit IP addresses at planetary scale.",
        whyProtocolExists: "Replaced centralized static HOSTS.TXT file which unscalable when ARPANET expanded.",
        designDecisions: [
          "Hierarchical tree delegation (Root -> TLD -> Authoritative)",
          "UDP transport for low RTT overhead with fallback to TCP",
          "Distributed TTL caching at every hop",
        ],
        alternativesConsidered: ["Centralized HTTP lookup server", "Flat peer-to-peer DHT"],
        tradeOffs: ["Stale cache latency vs network query overhead", "Unencrypted UDP simplicity vs spoofing vulnerability"],
        failureModes: ["Root server unreachable", "Lame delegation", "Cache poisoning"],
        realWorldSystems: ["Cloudflare 1.1.1.1", "BIND9", "CoreDNS in Kubernetes"],
      },
      buildProgression: {
        beginnerBuild: "Write a simple Python UDP socket script sending raw DNS query byte payload for example.com.",
        intermediateBuild: "Build a C/Go CLI tool parsing RFC 1035 wire headers, QNAME decompression pointers, and A/AAAA answer records.",
        advancedBuild: "Implement an iterative DNS resolver executing root-to-authoritative referral hops with LRU cache.",
        productionScaleProject: "Construct a high-throughput multi-threaded DNS resolver supporting DNSSEC validation, eBPF packet filtering, and Prometheus metrics.",
      },
      associatedProjects: ["devan-os", "cosmohub"],
      associatedExperiments: ["networking-protocol-pipeline"],
      associatedEvidence: ["ev-pcap-dns-trace", "ev-repo-devan2"],
      competency: { knowledge: 10, experience: 9, evidence: 10, confidence: 9 },
      missionRelevance: ["wireless-mesh-tvws"],
      capabilities: ["OBSERVE", "REMEMBER", "REASON", "RECOMMEND", "EVOLVE"],
      evidenceStrengthWeight: 0.95,
      professionalMapping: {
        engineeringRoles: ["Network Systems Architect", "Systems Engineer", "SRE"],
        certifications: ["CCNA", "CCNP Enterprise"],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Telecommunications", "Cloud Infrastructure"],
      },
    },
  },
  {
    id: "networking.tcp",
    type: "concept",
    title: "TCP Protocol & Connection State Machine",
    domain: "Networking",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "MASTERED",
    summary: "RFC 793 Transport Layer, 3-way handshakes, window scaling, TCP BBR/CUBIC congestion control, and POSIX sockets.",
    details: {
      definition: "Reliable stream-oriented transport protocol establishing stateful byte-stream communication over unreliable IP networks.",
      engineeringPurpose: "Guarantees in-order, error-checked, flow-controlled packet delivery.",
      osiLayer: "Layer 4 - Transport",
      tcpIpLayer: "Transport",
      parents: ["networking.transport-layer"],
      children: ["networking.mptcp", "networking.tls"],
      related: ["networking.udp", "networking.ip"],
      aliases: ["TCP", "Transmission Control Protocol"],
      externalReferences: [
        { type: "RFC", title: "RFC 793: Transmission Control Protocol Specification", url: "https://datatracker.ietf.org/doc/html/rfc793", identifier: "RFC 793" },
      ],
      truthSources: ["RFC", "PRODUCTION_DOCS"],
      difficulty: "ADVANCED",
      timeEstimates: { estimatedHours: 60, estimatedProjects: 3, estimatedLabs: 5, estimatedEvidence: 6 },
      masteryRequirements: [
        { action: "READ_RFC", description: "Read RFC 793 connection state machine specification", completed: true },
        { action: "BUILD_PROJECT", description: "Build a non-blocking TCP chat server in C using epoll", completed: true },
      ],
      typicalPorts: ["All L4 dynamic ports"],
      packetFlow: [
        "1. SYN: Client sends SYN (Seq=X) to Server.",
        "2. SYN-ACK: Server responds with SYN-ACK (Seq=Y, Ack=X+1).",
        "3. ACK: Client sends ACK (Ack=Y+1) -> ESTABLISHED state.",
        "4. Data Transfer: Sliding window controls byte offset ACKs.",
        "5. Teardown: FIN -> ACK -> FIN -> ACK -> TIME_WAIT (2*MSL).",
      ],
      headerStructure: [
        "Source Port (16b) | Destination Port (16b)",
        "Sequence Number (32b)",
        "Acknowledgment Number (32b)",
        "Data Offset (4b) | Reserved (3b) | Flags: SYN ACK FIN RST PSH URG (9b) | Window Size (16b)",
      ],
      decisionRecord: {
        engineeringProblem: "How to build a reliable, ordered byte-stream on top of unreliable, unordered packet-switched IP networks.",
        whyProtocolExists: "Replaced packet-drop-prone transport with adaptive flow control and congestion management.",
        designDecisions: [
          "Sequence & ACK byte counting",
          "Sliding window flow control based on receiver buffer capacity",
          "Congestion window (cwnd) backoff on packet drop",
        ],
        alternativesConsidered: ["Raw IP packets", "Stop-and-wait ARQ"],
        tradeOffs: ["Reliability and ordering vs latency", "Connection establishment RTT vs datagram speed"],
        failureModes: ["SYN flood backlog exhaustion", "TIME_WAIT socket depletion", "Congestion collapse"],
        realWorldSystems: ["Linux Kernel TCP Stack", "FreeBSD TCP/IP stack"],
      },
      buildProgression: {
        beginnerBuild: "Write a TCP echo server in C using POSIX sockets.",
        intermediateBuild: "Build a non-blocking TCP chat server using epoll and non-blocking sockets.",
        advancedBuild: "Implement a userspace TCP stack parsing IP datagrams and managing state transitions.",
        productionScaleProject: "Construct a high-performance TCP proxy with zero-copy splice() and TCP BBR tuning.",
      },
      competency: { knowledge: 10, experience: 9, evidence: 9, confidence: 9 },
      capabilities: ["OBSERVE", "REMEMBER", "REASON", "RECOMMEND"],
      evidenceStrengthWeight: 0.95,
      professionalMapping: {
        engineeringRoles: ["Systems Engineer", "Network Architect"],
        certifications: ["CCNA"],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Telecommunications", "FinTech"],
      },
    },
  },

  // =========================================================================
  // 2. OPERATING SYSTEMS & LINUX KERNEL (NAMESPACED CONCEPTS)
  // =========================================================================
  {
    id: "os.process",
    type: "concept",
    title: "POSIX Process Execution & Address Space Isolation",
    domain: "Operating Systems",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "MASTERED",
    summary: "Linux process creation (fork, execve, clone), virtual memory address space (Text, Data, BSS, Heap, Stack), and Process Control Block (task_struct).",
    details: {
      definition: "An executing instance of a program providing an isolated virtual address space, file descriptor table, and CPU execution context.",
      engineeringPurpose: "Provides memory isolation and process protection boundaries.",
      parents: ["os.kernel"],
      children: ["linux.cgroups", "linux.namespaces"],
      aliases: ["Process", "task_struct", "POSIX Process"],
      truthSources: ["BOOK", "MAN_PAGE", "PRODUCTION_DOCS"],
      difficulty: "INTERMEDIATE",
      timeEstimates: { estimatedHours: 35, estimatedProjects: 2, estimatedLabs: 3, estimatedEvidence: 4 },
      masteryRequirements: [
        { action: "BUILD_PROJECT", description: "Write a custom UNIX shell in C handling fork, execve, and signal handlers", completed: true },
      ],
      competency: { knowledge: 10, experience: 9, evidence: 9, confidence: 9 },
      capabilities: ["OBSERVE", "REMEMBER", "REASON"],
      evidenceStrengthWeight: 0.95,
      professionalMapping: {
        engineeringRoles: ["Systems Programmer", "OS Engineer"],
        certifications: [],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Systems", "Cloud Infrastructure"],
      },
    },
  },
  {
    id: "linux.namespaces",
    type: "concept",
    title: "Linux Namespaces & Process View Isolation",
    domain: "Operating Systems",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "VERIFIED",
    summary: "Linux kernel mechanism isolating global system resources (PID, NET, MNT, IPC, UTS, USER, CGROUP) per process hierarchy.",
    details: {
      definition: "Kernel feature wrapping global system resources in an abstraction providing process group isolation.",
      engineeringPurpose: "Forms the primary process isolation boundary for container engines.",
      parents: ["os.process"],
      children: ["cloud.containerd"],
      aliases: ["Namespaces", "Linux Namespaces", "unshare"],
      truthSources: ["MAN_PAGE", "PRODUCTION_DOCS"],
      difficulty: "ADVANCED",
      timeEstimates: { estimatedHours: 45, estimatedProjects: 2, estimatedLabs: 4, estimatedEvidence: 5 },
      masteryRequirements: [
        { action: "BUILD_PROJECT", description: "Build a minimal container runtime in C using clone(CLONE_NEWPID | CLONE_NEWNET)", completed: true },
      ],
      competency: { knowledge: 9, experience: 8, evidence: 9, confidence: 9 },
      capabilities: ["OBSERVE", "REASON"],
      evidenceStrengthWeight: 0.90,
      professionalMapping: {
        engineeringRoles: ["Platform Engineer", "Containers SRE"],
        certifications: ["CKA"],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Cloud Infrastructure"],
      },
    },
  },
  {
    id: "linux.cgroups",
    type: "concept",
    title: "Linux cgroups v2 Resource Metering & Enforcement",
    domain: "Operating Systems",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "VERIFIED",
    summary: "Linux Control Groups v2 organizing processes hierarchically for CPU, Memory, I/O, and PIDs resource metering and enforcement.",
    details: {
      definition: "Kernel mechanism limiting, accounting, and isolating resource usage (CPU, memory, disk I/O, network) of process groups.",
      engineeringPurpose: "Prevents noisy-neighbor resource starvation in multi-tenant container hosts.",
      parents: ["os.process"],
      children: ["cloud.kubernetes"],
      aliases: ["cgroups", "cgroups v2", "Control Groups"],
      truthSources: ["PRODUCTION_DOCS", "MAN_PAGE"],
      difficulty: "ADVANCED",
      timeEstimates: { estimatedHours: 40, estimatedProjects: 2, estimatedLabs: 3, estimatedEvidence: 4 },
      masteryRequirements: [
        { action: "BUILD_PROJECT", description: "Configure memory.max and cpu.weight cgroups v2 resource limits for container processes", completed: true },
      ],
      competency: { knowledge: 9, experience: 8, evidence: 8, confidence: 8 },
      capabilities: ["OBSERVE", "REASON"],
      evidenceStrengthWeight: 0.90,
      professionalMapping: {
        engineeringRoles: ["Platform Engineer", "SRE"],
        certifications: ["CKA"],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Cloud Infrastructure"],
      },
    },
  },

  // =========================================================================
  // 3. CLOUD & CONTAINERS (NAMESPACED CONCEPTS)
  // =========================================================================
  {
    id: "cloud.kubernetes",
    type: "concept",
    title: "Kubernetes Container Orchestration Engine",
    domain: "Cloud Computing",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "VERIFIED",
    summary: "Automated container deployment, scaling, networking (CNI), storage (CSI), and declarative cluster state reconciliation.",
    details: {
      definition: "Production-grade open-source container orchestration system managing containerized workloads and services.",
      engineeringPurpose: "Provides declarative zero-downtime application deployment, scaling, and self-healing.",
      parents: ["linux.namespaces", "linux.cgroups", "networking.dns.iterative-resolution"],
      children: ["cloud.knative"],
      aliases: ["K8s", "Kubernetes", "Kube"],
      truthSources: ["PRODUCTION_DOCS", "IEEE"],
      difficulty: "ADVANCED",
      timeEstimates: { estimatedHours: 80, estimatedProjects: 4, estimatedLabs: 8, estimatedEvidence: 8 },
      masteryRequirements: [
        { action: "BUILD_PROJECT", description: "Deploy a production-grade multi-node Kubernetes cluster with Calico CNI and Ingress Controller", completed: true },
      ],
      competency: { knowledge: 9, experience: 8, evidence: 8, confidence: 8 },
      capabilities: ["OBSERVE", "REASON", "RECOMMEND", "SCALES"],
      evidenceStrengthWeight: 0.90,
      professionalMapping: {
        engineeringRoles: ["Cloud Architect", "Platform Engineer", "SRE"],
        certifications: ["CKA", "CKAD", "CKS"],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Cloud Infrastructure", "FinTech"],
      },
    },
  },

  // =========================================================================
  // 4. DISTRIBUTED SYSTEMS (NAMESPACED CONCEPTS)
  // =========================================================================
  {
    id: "distributed.raft",
    type: "concept",
    title: "Raft Distributed Consensus & State Machine Replication",
    domain: "Distributed Systems",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    learningStatus: "PRACTICING",
    summary: "Strong leader election, log replication, term numbers, and safety under network partitions.",
    details: {
      definition: "Consensus algorithm designed for understandability, equivalent to Paxos in fault tolerance and performance.",
      engineeringPurpose: "Ensures replicated state machine consistency across distributed cluster nodes.",
      parents: ["networking.tcp"],
      children: ["distributed.etcd"],
      aliases: ["Raft", "Raft Consensus"],
      truthSources: ["RESEARCH_PAPER", "PRODUCTION_DOCS"],
      difficulty: "ADVANCED",
      timeEstimates: { estimatedHours: 65, estimatedProjects: 2, estimatedLabs: 4, estimatedEvidence: 5 },
      masteryRequirements: [
        { action: "READ_RFC", description: "Read Diego Ongaro's Raft PhD Dissertation paper", completed: true },
        { action: "BUILD_PROJECT", description: "Implement a 3-node Raft consensus cluster in Go", completed: true },
      ],
      competency: { knowledge: 8, experience: 6, evidence: 7, confidence: 7 },
      capabilities: ["REASON", "RECOMMEND"],
      evidenceStrengthWeight: 0.85,
      professionalMapping: {
        engineeringRoles: ["Distributed Systems Engineer"],
        certifications: [],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Cloud Infrastructure", "Databases"],
      },
    },
  },

  // =========================================================================
  // 5. PROJECTS & EVIDENCE ANCHORS
  // =========================================================================
  {
    id: "devan-os",
    type: "project",
    title: "DEVAN Engineering Intelligence OS",
    domain: "Operating Systems",
    summary: "Engineering cognitive operating system modeling, reasoning, and evolving Ujwal's professional intelligence.",
  },
  {
    id: "thesis-wmn-tvws",
    type: "paper",
    title: "Wireless Mesh Networks + TV White Space for Rural Connectivity",
    domain: "Networking",
    summary: "Thesis Research — Combining sub-1GHz spectrum propagation with reactive/proactive mesh routing for challenging terrain.",
  },
  {
    id: "repo-devan2",
    type: "repository",
    title: "kantimohanthy/Devan2",
    domain: "Cloud",
    summary: "Primary GitHub repository storing DEVAN OS codebase and automated Vitest test suite.",
  },
  {
    id: "ev-pcap-dns-trace",
    type: "tool",
    title: "Wireshark UDP/53 PCAP Capture & dig +trace Log",
    domain: "Networking",
    summary: "Raw verification packet capture proving iterative DNS resolution hops with RD=0.",
  },
];

export const CANONICAL_RELATIONSHIPS: OntologyRelationship[] = [
  { fromId: "networking.dns.iterative-resolution", toId: "networking.tcp", type: "DEPENDS_ON", note: "DNS fallback to TCP port 53" },
  { fromId: "cloud.kubernetes", toId: "linux.namespaces", type: "DEPENDS_ON", note: "Kubernetes pods rely on Linux namespaces" },
  { fromId: "cloud.kubernetes", toId: "linux.cgroups", type: "DEPENDS_ON", note: "Kubernetes container resource limits rely on cgroups v2" },
  { fromId: "cloud.kubernetes", toId: "networking.dns.iterative-resolution", type: "DEPENDS_ON", note: "CoreDNS provides cluster-internal service resolution" },
  { fromId: "linux.namespaces", toId: "os.process", type: "DEPENDS_ON", note: "Namespaces isolate process groups" },
  { fromId: "linux.cgroups", toId: "os.process", type: "DEPENDS_ON", note: "cgroups regulate process group resources" },
  { fromId: "distributed.raft", toId: "networking.tcp", type: "DEPENDS_ON", note: "Raft consensus RPCs travel over TCP/IP" },
  { fromId: "ev-pcap-dns-trace", toId: "networking.dns.iterative-resolution", type: "EVIDENCE_FOR" },
  { fromId: "devan-os", toId: "networking.dns.iterative-resolution", type: "IMPLEMENTS" },
  { fromId: "repo-devan2", toId: "devan-os", type: "EVIDENCE_FOR" },
];

export const CANONICAL_COMPARISONS: ConceptComparison[] = [
  {
    conceptAId: "networking.tcp",
    conceptBId: "networking.udp",
    comparisonDomain: "Networking Transport",
    keyDifferences: [
      { dimension: "Connection State", conceptAValue: "Stateful (3-way handshake SYN/ACK)", conceptBValue: "Connectionless (Zero handshake)" },
      { dimension: "Reliability", conceptAValue: "Guaranteed in-order delivery via ACKs & Retransmission", conceptBValue: "Best-effort delivery" },
      { dimension: "Header Overhead", conceptAValue: "20 - 60 Bytes", conceptBValue: "Fixed 8 Bytes" },
    ],
    whenToUseA: "When data completeness and ordering are mandatory (Web APIs, File Transfer, DB Queries).",
    whenToUseB: "When sub-10ms low latency supersedes packet loss (DNS Queries, VoIP, Real-Time Gaming, QUIC).",
    tradeOffSummary: "TCP guarantees zero data loss at the expense of handshake latency; UDP provides maximum raw transmission speed.",
    history: "TCP and UDP split from monolithic IP in 1978 to support distinct transport requirements.",
    architecture: "TCP maintains heavy in-kernel TCB socket state; UDP maintains zero connection state.",
    operationalComplexity: "TCP requires socket buffer memory tuning; UDP requires application-level packet loss handling.",
    productionUsage: "TCP powers 90%+ of web APIs; UDP powers DNS, WireGuard, and QUIC.",
    recommendation: "Use TCP by default; use UDP when latency is critical and dropped packets are tolerable or handled by user-space QUIC.",
  },
];

export const CANONICAL_DECISION_GRAPHS: EngineeringDecisionGraph[] = [
  {
    id: "decision-dns-transport-selection",
    engineeringProblem: "How to handle DNS payload size expansion beyond historical 512-byte UDP limit.",
    context: "EDNS0 allows buffer sizes up to 1232 bytes, but large DNSSEC payloads exceed limits.",
    constraints: ["Sub-20ms query latency", "Middlebox fragmentation filtering"],
    candidateSolutions: ["UDP with TCP fallback (RFC 1035)", "Strict TCP-only DNS"],
    decisionCriteria: ["Latency impact", "Payload size handling"],
    tradeOffs: ["UDP fallback adds 2 RTTs on truncation, but keeps 99% of queries at 1 RTT."],
    finalRecommendation: "Advertise 1232-byte EDNS0 buffer over UDP. Fallback to TCP port 53 when TC=1.",
    whyAlternativesRejected: ["Strict TCP adds unacceptable latency overhead for lightweight 64-byte A record lookups."],
    realWorldImplementations: ["Cloudflare 1.1.1.1", "Google 8.8.8.8", "CoreDNS"],
    failurePropagation: ["Firewall blocks TCP port 53 -> Truncated DNS responses throw SERVFAIL."],
    operationalChecklist: ["Verify UDP 53 and TCP 53 open on firewalls", "Set EDNS0 buffer to 1232B"],
    buildRecommendations: ["Build a C CLI resolver retrying over TCP port 53 upon receiving TC=1 flag."],
  },
];

export const CANONICAL_FAILURE_CHAINS: FailurePropagationChain[] = [
  {
    rootConceptId: "networking.dns.iterative-resolution",
    trigger: "Authoritative DNS Name Servers suffer BGP route flap or DDoS outage",
    propagationSteps: [
      "1. Authoritative DNS servers fail to respond to UDP port 53 queries.",
      "2. Recursive DNS resolvers hit query timeout and retry 3 times -> Query queue overflows.",
      "3. Local DNS cache TTL expires across edge microservices.",
      "4. Microservices fail domain resolution -> Throw EAI_AGAIN / ECONNREFUSED.",
      "5. API Gateways return 502 Bad Gateway to end users.",
    ],
    ultimateImpact: "Complete outage of web application traffic despite healthy backend application servers.",
  },
];

export const CANONICAL_ARCHITECTURE_PATTERNS: ArchitecturePatternMapping[] = [
  {
    patternName: "Decoupled Persistence & Domain Engine",
    coreConcepts: ["devan-os", "repository-pattern"],
    realWorldUseCases: ["DEVAN OS Cognitive Core engine decouples PostgreSQL Prisma persistence from Ontology reasoning algorithms."],
  },
];

export const CANONICAL_ENGINEERING_PATHS: EngineeringPath[] = [
  {
    pathId: "path-cloud-platform-engineer",
    title: "Cloud Platform Systems Engineer",
    description: "Mastery path from POSIX process isolation down to Kubernetes container orchestration and DNS service discovery.",
    recommendedConceptOrder: [
      "os.process",
      "linux.namespaces",
      "linux.cgroups",
      "networking.tcp",
      "networking.dns.iterative-resolution",
      "cloud.kubernetes",
    ],
  },
];
