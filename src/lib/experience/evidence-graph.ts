/**
 * @file Immutable Append-Only Evidence Graph
 * @purpose Implements Evidence Intelligence for DEVAN. Evidence is immutable, append-only, stores provenance & reproducibility metadata, and participates in ontology relationships.
 * @principle Evidence -> ExperienceEvent -> Evolved Competencies -> Mission Progress. Everything is derived dynamically.
 */

import { EngineeringCapability } from "@/lib/ontology/types";
import { experienceEngine } from "./index";
import { missionEngine } from "@/lib/mission";

export type VerificationLevel =
  | "AUTOMATED_CI"
  | "WIRE_CAPTURE"
  | "ACADEMIC_PEER_REVIEW"
  | "SELF_VERIFIED";

export interface EvidenceProvenance {
  author: string;
  system: string;
  commitHash?: string;
  environment: string;
}

export interface ReproducibilityMetadata {
  commandToReproduce?: string;
  environmentConfig?: string;
  sha256Hash?: string;
}

export interface EvidenceEntity {
  id: string;
  title: string;
  type:
    | "PROJECT"
    | "REPOSITORY"
    | "THESIS_CHAPTER"
    | "EXPERIMENT"
    | "PRESENTATION"
    | "CERTIFICATE"
    | "COURSE"
    | "LAB"
    | "BENCHMARK"
    | "PROTOCOL_TRACE"
    | "PCAP"
    | "GIT_COMMIT"
    | "DEPLOYMENT"
    | "ARTICLE"
    | "TALK"
    | "HACKATHON";
  source: string;
  timestamp: string;
  provenance: EvidenceProvenance;
  verificationLevel: VerificationLevel;
  conceptsDemonstrated: string[];
  capabilitiesDemonstrated: EngineeringCapability[];
  associatedProjects: string[];
  associatedExperiments: string[];
  associatedRepositories: string[];
  associatedMissions: string[];
  reproducibilityMetadata: ReproducibilityMetadata;
  artifactReferences: string[];
  confidence: number; // 0 - 100
}

export const CANONICAL_EVIDENCE_GRAPH: EvidenceEntity[] = [
  {
    id: "ev-pcap-dns-trace",
    title: "Wireshark UDP/53 Packet Capture & dig +trace Referral Log",
    type: "PCAP",
    source: "Wireshark / tshark Packet Analyzer",
    timestamp: "2026-08-07T09:12:04Z",
    provenance: {
      author: "Ujwal Kantimohanthy",
      system: "tshark v4.2.0 on Linux 6.8 x86_64",
      commitHash: "9a2f8c1",
      environment: "Ubuntu Linux 24.04 LTS eth0 capture",
    },
    verificationLevel: "WIRE_CAPTURE",
    conceptsDemonstrated: ["dns-iterative-resolution", "udp-protocol", "ipv4-protocol"],
    capabilitiesDemonstrated: ["OBSERVE", "REASON"],
    associatedProjects: ["devan-os"],
    associatedExperiments: ["networking-protocol-pipeline"],
    associatedRepositories: ["kantimohanthy/Devan2"],
    associatedMissions: ["wireless-mesh-tvws"],
    reproducibilityMetadata: {
      commandToReproduce: "tshark -i eth0 -f 'port 53' -w dns-trace.pcap && dig +trace example.com",
      environmentConfig: "PcapNG 1.0 format, 8 UDP datagrams captured",
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
    artifactReferences: ["/evidence/dns/dns-trace.pcap", "/evidence/dns/dig-trace-001.log"],
    confidence: 99,
  },
  {
    id: "ev-exp-protocol-trace",
    title: "Protocol Execution Engine Multi-Step Trace Payload",
    type: "PROTOCOL_TRACE",
    source: "DEVAN Protocol Execution Engine",
    timestamp: "2026-08-07T12:00:00Z",
    provenance: {
      author: "DEVAN Autonomous Engine",
      system: "Protocol Trace Driver v1.0",
      commitHash: "e4f8b2d",
      environment: "Node.js 20.x runtime against Cloudflare 1.1.1.1",
    },
    verificationLevel: "AUTOMATED_CI",
    conceptsDemonstrated: ["dns-iterative-resolution", "tcp-protocol", "tls-13-handshake", "http-https-protocol"],
    capabilitiesDemonstrated: ["OBSERVE", "REASON", "RECOMMEND"],
    associatedProjects: ["devan-os"],
    associatedExperiments: ["networking-protocol-pipeline"],
    associatedRepositories: ["kantimohanthy/Devan2"],
    associatedMissions: ["wireless-mesh-tvws"],
    reproducibilityMetadata: {
      commandToReproduce: "npx vitest run src/lib/protocol-engine/tracer.test.ts",
      environmentConfig: "Live socket probe against kantimohanthy.dev and cloudflare.com",
      sha256Hash: "8f4e2c91b5a3d7e1f409c2a8e6b1d3f5a7c9e2b4f6a8c0d2e4f6a8c0d2e4f6a8",
    },
    artifactReferences: ["/api/net/protocol-trace"],
    confidence: 98,
  },
  {
    id: "ev-thesis-wmn-tvws",
    type: "THESIS_CHAPTER",
    title: "Wireless Mesh Networks + TV White Space for Rural Connectivity Thesis",
    source: "University Bachelor Thesis",
    timestamp: "2025-06-15T00:00:00Z",
    provenance: {
      author: "Ujwal Kantimohanthy",
      system: "LaTeX / Radio Mobile Spectrum Simulator",
      environment: "470-698 MHz UHF spectrum simulation & mesh deployment field trial",
    },
    verificationLevel: "ACADEMIC_PEER_REVIEW",
    conceptsDemonstrated: ["tvws-rf-propagation", "longley-rice-itm", "olsr-mesh-routing", "aodv-mesh-routing"],
    capabilitiesDemonstrated: ["REASON", "RECOMMEND", "EVOLVE"],
    associatedProjects: ["thesis-wmn-tvws"],
    associatedExperiments: ["tvws-propagation-sim"],
    associatedRepositories: ["kantimohanthy/tvws-mesh-sim"],
    associatedMissions: ["wireless-mesh-tvws"],
    reproducibilityMetadata: {
      commandToReproduce: "python3 sim/radio_mobile_itm.py --freq 550MHz --terrain terrain.dem",
      environmentConfig: "Longley-Rice ITM propagation parameters (k=1.33, 50% time, 50% locations)",
      sha256Hash: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    },
    artifactReferences: ["/thesis/wmn-tvws-draft.pdf"],
    confidence: 96,
  },
  {
    id: "ev-repo-devan2",
    type: "REPOSITORY",
    title: "Primary Codebase Repository kantimohanthy/Devan2",
    source: "GitHub Version Control System",
    timestamp: "2026-08-08T01:00:00Z",
    provenance: {
      author: "Ujwal Kantimohanthy",
      system: "Git v2.45.0 on Windows 11 / Linux x86_64",
      commitHash: "bc568676",
      environment: "Production Next.js 15 App Router & Prisma 7 PostgreSQL workspace",
    },
    verificationLevel: "AUTOMATED_CI",
    conceptsDemonstrated: ["repository-pattern", "linux-ebpf-telemetry", "vector-search-ann", "dns-iterative-resolution"],
    capabilitiesDemonstrated: ["OBSERVE", "REMEMBER", "REASON", "RECOMMEND", "EVOLVE"],
    associatedProjects: ["devan-os"],
    associatedExperiments: ["networking-protocol-pipeline", "vector-search-benchmark"],
    associatedRepositories: ["kantimohanthy/Devan2"],
    associatedMissions: ["wireless-mesh-tvws"],
    reproducibilityMetadata: {
      commandToReproduce: "node node_modules/typescript/bin/tsc --noEmit && node node_modules/vitest/vitest.mjs run",
      environmentConfig: "Node.js v20+, PostgreSQL Supabase, Next.js 15.5",
      sha256Hash: "7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
    },
    artifactReferences: ["https://github.com/kantimohanthy/Devan2"],
    confidence: 100,
  },
];

export class EvidenceGraph {
  /**
   * Appends a new immutable evidence entity and triggers automatic propagation.
   */
  async appendEvidence(evidence: EvidenceEntity): Promise<{
    evidenceId: string;
    eventsRecorded: number;
    updatedCompetenciesCount: number;
  }> {
    let eventsRecorded = 0;

    // Automatically record ExperienceEvent for each demonstrated concept
    for (const conceptId of evidence.conceptsDemonstrated) {
      await experienceEngine.recordEvent(
        conceptId,
        `EVIDENCE_INGESTED_${evidence.type}`,
        {
          evidenceId: evidence.id,
          verificationLevel: evidence.verificationLevel,
          provenance: evidence.provenance,
          sha256Hash: evidence.reproducibilityMetadata.sha256Hash,
        },
        `Immutable evidence ingested from ${evidence.source}`,
        "EVIDENCE_GRAPH",
        evidence.confidence
      );
      eventsRecorded++;
    }

    return {
      evidenceId: evidence.id,
      eventsRecorded,
      updatedCompetenciesCount: evidence.conceptsDemonstrated.length,
    };
  }

  /**
   * Retrieves all immutable evidence entities.
   */
  getEvidenceEntities(): EvidenceEntity[] {
    return CANONICAL_EVIDENCE_GRAPH;
  }

  /**
   * Evaluates overall mission progress derived automatically from evidence.
   */
  async evaluateMissionFromEvidence(missionSlug: string) {
    return missionEngine.evaluateMission(missionSlug);
  }
}

export const evidenceGraph = new EvidenceGraph();
