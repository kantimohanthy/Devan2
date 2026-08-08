/**
 * @file Professional Canon (Engineering Reference Standards)
 * @purpose Reference mappings for world-class engineering organizations. Does NOT duplicate ontology concepts.
 * @structure Organization -> Engineering Culture -> Architecture Style -> Open Source -> Infrastructure -> Research -> Engineering Principles -> Production Lessons.
 */

export interface OrganizationReference {
  id: string;
  name: string;
  domainFocus: string;
  engineeringCulture: string;
  architectureStyle: string;
  openSourceProjects: string[];
  infrastructureComponents: string[];
  researchVenues: string[];
  engineeringPrinciples: string[];
  productionLessons: string[];
  referencedConceptIds: string[];
}

export const PROFESSIONAL_CANON: OrganizationReference[] = [
  {
    id: "org-cloudflare",
    name: "Cloudflare",
    domainFocus: "Global CDN, Edge Computing, Anycast BGP Routing, Web Security",
    engineeringCulture: "Build on open standards (IETF, W3C), heavy Rust & Go adoption, eBPF in production.",
    architectureStyle: "Globally distributed Anycast network edge with V8 isolate worker execution.",
    openSourceProjects: ["pingora", "bpf-tools", "boringtun", "quiche"],
    infrastructureComponents: ["Unicast to Anycast BGP Steering", "Maglev L4 Load Balancing", "Pingora Rust Proxy"],
    researchVenues: ["IETF", "SIGCOMM"],
    engineeringPrinciples: ["Run the same software stack on every server worldwide.", "Eliminate single points of failure via Anycast."],
    productionLessons: ["Replacing Nginx with Rust Pingora dropped memory consumption by 70% and latency by 33%."],
    referencedConceptIds: ["dns-iterative-resolution", "bgp-routing", "tls-13-handshake", "http-https-protocol", "linux-ebpf-telemetry"],
  },
  {
    id: "org-google",
    name: "Google",
    domainFocus: "Planetary Distributed Systems, Search, Cloud Infrastructure",
    engineeringCulture: "SRE discipline, post-mortem culture, monorepo engineering, C++ / Go systems.",
    architectureStyle: "Planet-scale microservices orchestrated by Borg / Kubernetes with Paxos/Spanner state.",
    openSourceProjects: ["kubernetes", "grpc", "protobuf", "abseil", "v8"],
    infrastructureComponents: ["B4 Software-Defined Network WAN", "Spanner Globally-Distributed DB", "Borg Cluster Manager"],
    researchVenues: ["OSDI", "NSDI", "SIGCOMM", "SOSP"],
    engineeringPrinciples: ["Automation over manual intervention.", "Error budgets govern release velocity."],
    productionLessons: ["TrueTime hardware atomic clocks eliminate consensus RTTs in Spanner global transactions."],
    referencedConceptIds: ["raft-consensus", "k8s-cni-networking", "tcp-protocol", "vector-search-ann"],
  },
];
