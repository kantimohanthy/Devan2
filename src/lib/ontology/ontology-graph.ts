/**
 * @file Canonical Scalable ICT Engineering Canon Topology — Decision Intelligence Layer
 * @purpose Enriches concepts with reasoning chains, historical context, future evolution, and exports Decision Graphs, Comparison Graphs, Failure Chains, and Architecture Patterns.
 * @principle Scalable to 3,000 - 5,000 concepts without structural changes.
 */

import type {
  OntologyEntity,
  OntologyRelationship,
  ConceptComparison,
  EngineeringDecisionGraph,
  FailurePropagationChain,
  ArchitecturePatternMapping,
} from "./types";

export const CANONICAL_ENTITIES: OntologyEntity[] = [
  // =========================================================================
  // 1. APPLICATION LAYER (L7) NETWORKING CONCEPTS (ENRICHED WITH REASONING)
  // =========================================================================
  {
    id: "dns-iterative-resolution",
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
      rfcs: ["RFC 1034", "RFC 1035", "RFC 2181"],
      standards: ["IETF RFC 1035", "EDNS0 RFC 6891"],
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
      historicalContext: "Created in 1983 by Paul Mockapetris at USC/ISI to replace the flat, centralized HOSTS.TXT file maintained manually by SRI-NIC, which collapsed under ARPANET growth.",
      futureEvolution: "Transitioning toward encrypted DNS-over-HTTPS (DoH RFC 8484), DNS-over-TLS (DoT RFC 7858), and DNS-over-QUIC (DoQ RFC 9250) to mitigate pervasive surveillance and ISP hijacking.",
      comparisonTargets: ["m-dns-service-discovery"],
      reasoningChains: [
        "If UDP query payload exceeds 512 bytes (or EDNS0 buffer limit) -> Server sets TC (Truncated) bit = 1 -> Client re-establishes query over TCP port 53.",
        "If Authoritative DNS server goes down -> Recursive Resolvers serve stale cached entries until TTL expires -> Applications lose connection once TTL reaches 0.",
      ],
      decisionRecord: {
        engineeringProblem: "How to resolve human-memorable names to dynamic 32-bit/128-bit IP addresses at planetary scale without single point of failure.",
        whyProtocolExists: "Replaced centralized static HOSTS.TXT file which unscalable when ARPANET expanded.",
        designDecisions: [
          "Hierarchical tree delegation (Root -> TLD -> Authoritative)",
          "UDP transport for low RTT overhead with fallback to TCP for truncated packets",
          "Distributed TTL caching at every hop",
        ],
        alternativesConsidered: ["Centralized HTTP lookup server", "Flat peer-to-peer DHT (Distributed Hash Table)"],
        tradeOffs: ["Stale cache latency vs network query overhead", "Unencrypted UDP simplicity vs spoofing vulnerability"],
        failureModes: ["Root server unreachable", "Lame delegation", "Cache poisoning"],
        realWorldSystems: ["Cloudflare 1.1.1.1", "BIND9", "CoreDNS in Kubernetes"],
      },
      buildProgression: {
        beginnerBuild: "Write a simple Python UDP socket script sending raw DNS query byte payload for example.com to 8.8.8.8.",
        intermediateBuild: "Build a C/Go CLI tool parsing RFC 1035 wire headers, QNAME decompression pointers, and A/AAAA answer records.",
        advancedBuild: "Implement an iterative DNS resolver executing root-to-authoritative referral hops with LRU cache and EDNS0 support.",
        productionScaleProject: "Construct a high-throughput multi-threaded DNS resolver supporting DNSSEC validation, eBPF packet filtering, and Prometheus metrics.",
      },
      associatedProjects: ["devan-os", "cosmohub"],
      associatedExperiments: ["networking-protocol-pipeline"],
      associatedEvidence: ["pcap-dns-trace", "repo-devan2"],
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
    id: "http-https-protocol",
    type: "concept",
    title: "HTTP/1.1, HTTP/2 & HTTP/3 Web Protocols",
    domain: "Networking",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "MASTERED",
    summary: "RFC 7230, RFC 7540, RFC 9114 stateless application layer protocols powering web APIs and data transfer.",
    details: {
      definition: "Application-level protocol for distributed, collaborative, hypermedia information systems.",
      engineeringPurpose: "Standardizes request-response messaging between web clients and backend servers.",
      osiLayer: "Layer 7 - Application",
      tcpIpLayer: "Application",
      rfcs: ["RFC 7230", "RFC 7540", "RFC 9114"],
      typicalPorts: ["TCP/80 (HTTP)", "TCP/443 (HTTPS)", "UDP/443 (HTTP/3 QUIC)"],
      historicalContext: "Designed by Tim Berners-Lee in 1989 for simple text document fetching over TCP; evolved through HTTP/1.1 persistent connections, HTTP/2 binary framing multiplexing, to HTTP/3 QUIC UDP streaming.",
      futureEvolution: "HTTP/3 QUIC becoming the global default, eliminating TCP Head-of-Line blocking and enabling connection migration across Wi-Fi and 5G networks.",
      comparisonTargets: ["grpc-protobuf"],
      reasoningChains: [
        "If a single TCP packet drops during HTTP/2 multiplexing -> All multiplexed streams pause waiting for TCP retransmission (Head-of-Line blocking) -> HTTP/3 solves this by multiplexing streams over independent QUIC UDP channels.",
      ],
      decisionRecord: {
        engineeringProblem: "How to transfer hypermedia documents statelessly across heterogeneous operating systems.",
        whyProtocolExists: "Replaced Gopher and FTP with a uniform URI/URL resource identifier model.",
        designDecisions: ["Stateless request-response paradigm", "Extensible header key-value structure"],
        alternativesConsidered: ["Stateful RPC connections", "FTP file transfer"],
        tradeOffs: ["Stateless simplicity vs session state overhead (Cookies/JWT)", "Head-of-line blocking in HTTP/1.1 vs HTTP/2 binary framing"],
        failureModes: ["Connection reset by peer", "TLS handshake timeout", "502 Bad Gateway"],
        realWorldSystems: ["Nginx", "Envoy Proxy", "Cloudflare Edge"],
      },
      buildProgression: {
        beginnerBuild: "Write a raw socket HTTP/1.1 GET client in C parsing response headers.",
        intermediateBuild: "Build a non-blocking multithreaded HTTP/1.1 web server in C using epoll.",
        advancedBuild: "Implement an HTTP/2 proxy with HPACK header compression and binary frame parser.",
        productionScaleProject: "Construct a zero-copy HTTP/3 QUIC reverse proxy with TLS 1.3 termination and eBPF socket routing.",
      },
      competency: { knowledge: 10, experience: 9, evidence: 9, confidence: 9 },
      capabilities: ["OBSERVE", "REMEMBER", "REASON"],
      evidenceStrengthWeight: 0.95,
      professionalMapping: {
        engineeringRoles: ["Backend Engineer", "Web Systems Architect"],
        certifications: [],
        interviewDepth: "DEEP_DIVE",
        industrySectors: ["Web Technologies", "FinTech"],
      },
    },
  },

  // =========================================================================
  // 2. TRANSPORT LAYER (L4) CONCEPTS (ENRICHED WITH REASONING)
  // =========================================================================
  {
    id: "tcp-protocol",
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
      rfcs: ["RFC 793", "RFC 5681", "RFC 7323"],
      typicalPorts: ["All L4 dynamic ports"],
      historicalContext: "Created in 1974 by Vint Cerf and Bob Kahn as part of DARPA internetworking research; split from monolithic IP into separate TCP (L4) and IP (L3) layers in 1978.",
      futureEvolution: "Replacing traditional loss-based CUBIC congestion control with delay-based BBRv3, and migrating web traffic to UDP-based QUIC.",
      comparisonTargets: ["udp-protocol"],
      reasoningChains: [
        "If network experiences packet drop -> TCP receiver holding out-of-order segments cannot pass data to application -> Application stream stalls until sender receives DUP ACK and retransmits missing segment.",
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
        tradeOffs: ["Reliability and ordering vs latency (Head-of-Line blocking)", "Connection establishment RTT vs datagram speed"],
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
  {
    id: "udp-protocol",
    type: "concept",
    title: "UDP Datagram Transport Protocol",
    domain: "Networking",
    importance: "CORE",
    maturity: "INDUSTRY",
    learningStatus: "MASTERED",
    summary: "RFC 768 minimal, un-connection-oriented transport protocol with minimal header overhead.",
    details: {
      definition: "Connectionless transport layer protocol providing lightweight datagram transmission without guaranteed delivery or ordering.",
      engineeringPurpose: "Provides low-latency transmission for real-time and query-based application protocols.",
      osiLayer: "Layer 4 - Transport",
      tcpIpLayer: "Transport",
      rfcs: ["RFC 768"],
      typicalPorts: ["UDP/53 (DNS)", "UDP/67,68 (DHCP)", "UDP/123 (NTP)", "UDP/443 (QUIC)"],
      historicalContext: "Designed by David P. Reed in 1980 to provide a direct, minimal transport mechanism without connection state overhead.",
      futureEvolution: "Serving as the substrate for modern transport innovations (QUIC RFC 9000, WireGuard VPN, WebRTC) that implement custom reliability in user space.",
      comparisonTargets: ["tcp-protocol"],
      reasoningChains: [
        "If application requires sub-10ms real-time audio/video streaming -> TCP retransmission delays are useless because late frames are discarded -> UDP with forward error correction (FEC) is chosen.",
      ],
      decisionRecord: {
        engineeringProblem: "How to transmit small messages without the RTT delay and memory overhead of TCP state machines.",
        whyProtocolExists: "Enables real-time applications (DNS, VoIP, Gaming, QUIC) where low latency supersedes packet ordering.",
        designDecisions: ["Zero handshake RTT", "Fixed 8-byte header minimal overhead"],
        alternativesConsidered: ["TCP stream transport"],
        tradeOffs: ["Low latency vs zero packet delivery guarantees", "Simple header vs application-level loss handling needed"],
        failureModes: ["Uncontrolled buffer overflow drop", "UDP amplification reflection attacks"],
        realWorldSystems: ["DNS Resolvers", "QUIC Protocol", "WireGuard VPN"],
      },
      buildProgression: {
        beginnerBuild: "Write a UDP ping-pong client/server in C.",
        intermediateBuild: "Build a UDP TFTP server with stop-and-wait ARQ.",
        advancedBuild: "Implement a reliable UDP protocol overlay with selective ACK and sequence numbers.",
        productionScaleProject: "Construct a zero-copy UDP packet forwarder processing 10Gbps via eBPF XDP.",
      },
      competency: { knowledge: 10, experience: 9, evidence: 9, confidence: 9 },
      capabilities: ["OBSERVE", "REMEMBER"],
      evidenceStrengthWeight: 0.95,
      professionalMapping: {
        engineeringRoles: ["Systems Programmer", "Streaming Systems Engineer"],
        certifications: [],
        interviewDepth: "INTERMEDIATE",
        industrySectors: ["Telecommunications", "Gaming"],
      },
    },
  },

  // =========================================================================
  // 3. PROJECTS & EVIDENCE ANCHORS
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
    id: "pcap-dns-trace",
    type: "tool",
    title: "Wireshark UDP/53 PCAP Capture & dig +trace Log",
    domain: "Networking",
    summary: "Raw verification packet capture proving iterative DNS resolution hops with RD=0.",
  },
];

export const CANONICAL_RELATIONSHIPS: OntologyRelationship[] = [
  { fromId: "dns-iterative-resolution", toId: "tcp-protocol", type: "DEPENDS_ON", note: "DNS queries travel over UDP/TCP port 53" },
  { fromId: "dns-iterative-resolution", toId: "udp-protocol", type: "DEPENDS_ON", note: "DNS queries use UDP by default" },
  { fromId: "http-https-protocol", toId: "tcp-protocol", type: "DEPENDS_ON", note: "HTTP/1.1 & HTTP/2 run over TCP" },
  { fromId: "pcap-dns-trace", toId: "dns-iterative-resolution", type: "EVIDENCE_FOR" },
  { fromId: "devan-os", toId: "dns-iterative-resolution", type: "IMPLEMENTS" },
  { fromId: "repo-devan2", toId: "devan-os", type: "EVIDENCE_FOR" },
];

// =========================================================================
// CANONICAL PAIRWISE COMPARISON GRAPHS
// =========================================================================
export const CANONICAL_COMPARISONS: ConceptComparison[] = [
  {
    conceptAId: "tcp-protocol",
    conceptBId: "udp-protocol",
    comparisonDomain: "Networking Transport",
    keyDifferences: [
      { dimension: "Connection State", conceptAValue: "Stateful (3-way handshake SYN/ACK)", conceptBValue: "Connectionless (Zero handshake)" },
      { dimension: "Reliability", conceptAValue: "Guaranteed in-order delivery via ACKs & Retransmission", conceptBValue: "Best-effort delivery (Packets can be lost/reordered)" },
      { dimension: "Header Overhead", conceptAValue: "20 - 60 Bytes", conceptBValue: "Fixed 8 Bytes" },
      { dimension: "Flow & Congestion Control", conceptAValue: "Window scaling + CUBIC/BBR backoff", conceptBValue: "None (Application must handle congestion)" },
    ],
    whenToUseA: "When data completeness, ordering, and accuracy are mandatory (Web APIs, File Transfer, Database Queries, SSH).",
    whenToUseB: "When sub-10ms low latency supersedes packet loss (DNS Queries, VoIP, Real-Time Gaming, QUIC Substrate).",
    tradeOffSummary: "TCP guarantees zero data loss at the expense of handshake latency and Head-of-Line blocking. UDP provides maximum raw transmission speed at the expense of application-managed reliability.",
  },
  {
    conceptAId: "http-https-protocol",
    conceptBId: "grpc-protobuf",
    comparisonDomain: "API Communication & Serialization",
    keyDifferences: [
      { dimension: "Data Format", conceptAValue: "Human-readable JSON / HTML text payload", conceptBValue: "Binary Protocol Buffers (Protobuf)" },
      { dimension: "Transport Layer", conceptAValue: "HTTP/1.1 or HTTP/2 over TCP", conceptBValue: "Strictly HTTP/2 multiplexed streams over TCP" },
      { dimension: "Contract Definition", conceptAValue: "OpenAPI / Swagger (Optional)", conceptBValue: "Strict compile-time .proto schema contracts" },
      { dimension: "Streaming Capabilities", conceptAValue: "Request-Response (SSE/WebSockets required for push)", conceptBValue: "Native Unary, Client, Server, and Bi-directional streaming" },
    ],
    whenToUseA: "Public facing web/mobile client APIs, browser applications, and RESTful service interfaces.",
    whenToUseB: "High-throughput internal microservice-to-microservice RPC communication.",
    tradeOffSummary: "REST/JSON offers universal browser compatibility and human readability; gRPC/Protobuf offers 5-10x smaller payload sizes and compile-time contract safety across microservices.",
  },
];

// =========================================================================
// CANONICAL ENGINEERING DECISION GRAPHS
// =========================================================================
export const CANONICAL_DECISION_GRAPHS: EngineeringDecisionGraph[] = [
  {
    id: "decision-dns-transport-selection",
    engineeringProblem: "How to handle DNS payload size expansion beyond the historical 512-byte UDP limit without incurring TCP handshake overhead for 99% of normal queries.",
    context: "EDNS0 (RFC 6891) allows clients to advertise larger UDP buffer sizes (e.g. 1232 bytes to prevent IP fragmentation). However, large DNSSEC responses can still exceed buffer thresholds.",
    constraints: ["Sub-20ms query latency requirement", "Middlebox firewall blocking of fragmented UDP packets", "Backwards compatibility with legacy resolvers"],
    candidateSolutions: [
      "Strict UDP with packet truncation fallback to TCP (RFC 1035 standard)",
      "Strict TCP-only DNS for all queries",
      "DNS-over-HTTPS (DoH) for all queries",
    ],
    decisionCriteria: ["Latency impact", "Payload size handling", "Compatibility", "Security"],
    tradeOffs: [
      "UDP fallback to TCP causes 2 additional RTTs on truncation, but keeps 99% of queries at 1 RTT.",
      "Strict TCP adds 1 RTT handshake overhead to 100% of queries.",
    ],
    finalRecommendation: "Advertise 1232-byte EDNS0 buffer over UDP. Fallback to TCP port 53 when TC=1 is set.",
    whyAlternativesRejected: ["Strict TCP adds unacceptable latency overhead for lightweight 64-byte A record lookups."],
    realWorldImplementations: ["Cloudflare 1.1.1.1", "Google Public DNS 8.8.8.8", "CoreDNS"],
    failurePropagation: [
      "Firewall blocks TCP port 53 -> DNS queries over 512B fail with RCODE SERVFAIL -> Applications cannot resolve domains.",
    ],
    operationalChecklist: [
      "Verify UDP port 53 and TCP port 53 are open on host firewalls.",
      "Set EDNS0 buffer size to 1232 bytes in resolver configuration to avoid path MTU fragmentation.",
      "Monitor DNS TC bit response rates in Prometheus.",
    ],
    buildRecommendations: [
      "Build a C CLI resolver that automatically retries over TCP port 53 upon receiving a TC=1 response flag.",
    ],
  },
];

// =========================================================================
// CANONICAL FAILURE PROPAGATION CHAINS
// =========================================================================
export const CANONICAL_FAILURE_CHAINS: FailurePropagationChain[] = [
  {
    rootConceptId: "dns-iterative-resolution",
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

// =========================================================================
// CANONICAL ARCHITECTURE PATTERN MAPPINGS
// =========================================================================
export const CANONICAL_ARCHITECTURE_PATTERNS: ArchitecturePatternMapping[] = [
  {
    patternName: "Decoupled Persistence & Domain Engine",
    coreConcepts: ["repository-pattern", "linux-ebpf-telemetry", "vector-search-ann"],
    realWorldUseCases: [
      "DEVAN OS Cognitive Core engine decouples PostgreSQL Prisma persistence from Ontology reasoning algorithms.",
    ],
  },
];
