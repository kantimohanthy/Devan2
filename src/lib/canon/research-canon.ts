/**
 * @file Research Canon Scaffolding
 * @purpose Reference structure for academic research papers, standards, and conference proceedings.
 * @structure Venue -> Paper -> Concepts -> Evidence -> Impact -> Future Work.
 */

export interface ResearchPaperReference {
  id: string;
  venue: "IETF_RFC" | "IEEE" | "SIGCOMM" | "OSDI" | "NSDI" | "SOSP" | "VLDB" | "NEURIPS" | "ICML" | "CVPR";
  title: string;
  authors: string[];
  publicationYear: number;
  concepts: string[];
  evidenceSummary: string;
  impact: string;
  futureWork: string;
  url?: string;
}

export const RESEARCH_CANON: ResearchPaperReference[] = [
  {
    id: "paper-rfc-1035",
    venue: "IETF_RFC",
    title: "Domain Names - Implementation and Specification (RFC 1035)",
    authors: ["Paul Mockapetris"],
    publicationYear: 1987,
    concepts: ["dns-iterative-resolution"],
    evidenceSummary: "Specifies DNS wire format, master files, resource record types (A, NS, CNAME, MX), and iterative referral resolver algorithms.",
    impact: "Formed the permanent naming backbone of the global Internet for 4+ decades.",
    futureWork: "Extending with DNSSEC signature validation (RFC 4033) and encrypted transport (DoH RFC 8484 / DoQ RFC 9250).",
    url: "https://datatracker.ietf.org/doc/html/rfc1035",
  },
  {
    id: "paper-rfc-793",
    venue: "IETF_RFC",
    title: "Transmission Control Protocol (RFC 793)",
    authors: ["Information Sciences Institute"],
    publicationYear: 1981,
    concepts: ["tcp-protocol"],
    evidenceSummary: "Specifies TCP state machine transitions (SYN, ESTABLISHED, FIN_WAIT, TIME_WAIT) and sliding window byte-sequence ACKs.",
    impact: "Established reliable byte-stream transport powering all web, SSH, database, and API communications.",
    futureWork: "Evolving congestion control from loss-based (CUBIC) to delay-based (BBRv3) and QUIC UDP transport.",
    url: "https://datatracker.ietf.org/doc/html/rfc793",
  },
];
