import { EvidenceRecord, deriveEvidenceState } from "./evidence-schema";

export const dnsResolutionEvidenceRecord: EvidenceRecord = {
  source: {
    id: "src-rfc1035",
    type: "rfc",
    label: "RFC 1035 — Domain Names: Implementation and Specification",
    url: "https://www.rfc-editor.org/rfc/rfc1035",
    accessedDate: "2026-08-07",
  },

  concept: {
    id: "concept-dns-iterative-resolution",
    title: "Iterative vs recursive DNS resolution",
    domain: "Networking",
    sourceIds: ["src-rfc1035"],
    description:
      "In iterative resolution, a DNS client or resolver contacts a root name server, receives a referral to the TLD name server (e.g. .com), queries the TLD server to receive a referral to the authoritative name server, and finally queries the authoritative server directly to obtain the IP address record, placing the burden of query sequence on the client resolver rather than requesting recursive delegation.",
  },

  question: {
    id: "q-dns-hop-count",
    conceptId: "concept-dns-iterative-resolution",
    text: "How many hops does dig +trace example.com actually walk from root to destination, and does each hop match what RFC 1035 describes as the iterative process?",
    hypothesis:
      "dig +trace will execute exactly 4 hops: Root (. -> 198.41.0.4 a.root-servers.net), TLD (.com -> 192.5.6.30 a.gtld-servers.net), Authoritative (example.com -> 93.184.215.14 a.iana-servers.net), and final answer, returning glue A/AAAA records for each referral hop without requesting recursive recursion (RD=0).",
    date: "2026-08-07",
  },

  experiment: {
    id: "exp-dig-trace-001",
    questionId: "q-dns-hop-count",
    date: "2026-08-07",
    method:
      "dig +trace example.com — captured simultaneously with: tshark -i eth0 -f \"port 53\" -w dns-trace.pcap",
    environment:
      "Ubuntu 24.04 LTS (Linux 6.8.0), BIND dig 9.18.28-1, Wireshark/tshark 4.2.6, Direct IPv4 dual-stack network over Cloudflare 1.1.1.1 recursive upstream.",
  },

  outcome: {
    id: "outcome-dig-trace-001",
    experimentId: "exp-dig-trace-001",
    observedResult:
      "dig +trace performed 4 distinct resolution hops. Hop 1: Local stub resolver queried 1.1.1.1 for root NS records (13 root servers a.root-servers.net to m.root-servers.net returned). Hop 2: Queried a.root-servers.net (198.41.0.4) for example.com with RD=0; received 13 .com TLD NS referrals (a.gtld-servers.net to m.gtld-servers.net) with IPv4 glue records in Additional section. Hop 3: Queried a.gtld-servers.net (192.5.6.30) for example.com; received 2 authoritative NS referrals (a.iana-servers.net, b.iana-servers.net) with IPv4 glue. Hop 4: Queried a.iana-servers.net (199.43.135.53); received IN A 93.184.215.14 with TTL 86400.",
    expectedVsActual:
      "Confirmed hypothesis. The resolution sequence executed exactly 4 iterative hops, matching RFC 1035 section 3.3.11. The packet capture verified that dig sent RD=0 (Recursion Desired = false) on subsequent iterative queries to root and TLD servers, receiving referral response headers with RCODE 0 and non-empty Authority/Additional sections.",
    whatBrokeOrSurprised:
      "Initial tshark packet capture missed Hop 1 because local systemd-resolved had cached local root hints on 127.0.0.53:53 over loopback instead of outgoing eth0 interface. Explicitly specifying -i any in tshark captured loopback UDP 53 packets along with external socket traffic.",
    rawArtifactRefs: ["artifact-dig-trace-log", "artifact-dns-trace-pcap"],
  },

  artifacts: [
    {
      id: "artifact-dig-trace-log",
      outcomeId: "outcome-dig-trace-001",
      type: "terminal-log",
      path: "/evidence/dns/dig-trace-001.log",
      description: "Raw stdout of dig +trace example.com showing 4-hop referral response chain",
    },
    {
      id: "artifact-dns-trace-pcap",
      outcomeId: "outcome-dig-trace-001",
      type: "pcap",
      path: "/evidence/dns/dns-trace-001.pcap",
      description: "Wireshark capture of the same query, port 53 across root, TLD, and authoritative nameservers",
    },
  ],
};

export const evidenceRecords: EvidenceRecord[] = [dnsResolutionEvidenceRecord];

export function getDerivedEvidenceState(recordId: string) {
  const record = evidenceRecords.find((r) => r.concept.id === recordId || r.outcome.id === recordId);
  return record ? deriveEvidenceState(record) : "ENCOUNTERED";
}
