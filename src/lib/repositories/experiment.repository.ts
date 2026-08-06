/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { ExperimentRecord } from "@/lib/experiment-engine/types";
import { logger } from "@/lib/logger";

const FALLBACK_EXPERIMENTS: ExperimentRecord[] = [
  {
    id: "exp_1",
    slug: "networking-protocol-pipeline",
    title: "Hop-by-Hop Multi-Layer Telemetry Profiler",
    category: "networking",
    identityDimension: "BUILD",
    objective: "Profile multi-span latency breakdown from DoH resolution to TLS 1.3 handshake and HTTP TTFB.",
    problem: "Traditional benchmark tools measure total time without isolating layer-by-layer network bottlenecks.",
    motivation: "Understanding whether latency spikes stem from DNS, TLS negotiation, or origin server response.",
    status: "completed",
    evidenceScore: 95,
    architecture: [
      { component: "Cloudflare DoH Resolver", description: "Queries port 443 via HTTPS JSON format." },
      { component: "TLS 1.3 Handshake Inspector", description: "Validates socket handshake and X.509 peer certs." },
      { component: "BGP ASN Lookup", description: "Queries Team Cymru WHOIS-over-DNS for autonomous system info." },
    ],
    telemetry: [
      { name: "DNS Resolution (DoH)", category: "dns", durationMs: 12, status: "ok" },
      { name: "TCP Handshake (SYN-ACK)", category: "tcp", durationMs: 18, status: "ok" },
      { name: "TLS 1.3 Handshake", category: "tls", durationMs: 24, status: "ok" },
      { name: "HTTP First-Byte (TTFB)", category: "http", durationMs: 52, status: "ok" },
    ],
    benchmarks: [
      { metric: "Total RTT Span", value: "106 ms", context: "Hop-by-hop multi-layer span" },
      { metric: "DoH DNS Lookup", value: "12 ms", context: "Cloudflare 1.1.1.1 DoH endpoint" },
    ],
    tradeoffs: [
      "DoH resolution incurs ~10ms HTTPS overhead vs raw UDP/53 sockets but bypasses local DNS hijacking.",
    ],
    lessonsLearned: [
      "TLS handshake duration dominates connection setup time on modern HTTP/2 endpoints.",
    ],
    githubRepo: "https://github.com/kantimohanthy/Devan2",
    relatedKnowledgeNodes: ["networking", "distributed-systems"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "exp_2",
    slug: "vector-search-benchmark",
    title: "In-Browser Vector Cosine Similarity Benchmarking",
    category: "ai",
    identityDimension: "EXPLORE",
    objective: "Benchmark 384-dimensional ONNX vector extraction and normalized dot product loop latency.",
    problem: "Executing client-side RAG search requires high precision without blocking main looper threads.",
    motivation: "Proving browser-based semantic search can achieve sub-20ms precision without backend dependencies.",
    status: "completed",
    evidenceScore: 90,
    architecture: [
      { component: "Xenova Transformers Pipeline", description: "Loads all-MiniLM-L6-v2 ONNX model in WebAssembly." },
      { component: "Normalized Cosine Comparator", description: "Executes SIMD-optimized dot product loop." },
    ],
    telemetry: [
      { name: "ONNX Memory Allocation", category: "http", durationMs: 1.2, status: "ok" },
      { name: "Cosine Similarity Loop", category: "http", durationMs: 14.5, status: "ok" },
    ],
    benchmarks: [
      { metric: "Inference Loop Latency", value: "14.5 ms", context: "1000 iterations over 384-dim vectors" },
    ],
    tradeoffs: [
      "In-browser embedding download (~24MB) is cached locally via LRU to prevent repetitive network fetches.",
    ],
    lessonsLearned: [
      "Hybrid search blending keyword scoring (0.3) with semantic vector similarity (0.7) eliminates false positives.",
    ],
    githubRepo: "https://github.com/kantimohanthy/Devan2",
    relatedKnowledgeNodes: ["ai", "systems-thinking"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class ExperimentRepository {
  private formatRecord(r: any): ExperimentRecord {
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category as any,
      identityDimension: r.identityDimension as any,
      objective: r.objective,
      problem: r.problem,
      motivation: r.motivation,
      status: r.status as any,
      evidenceScore: r.evidenceScore,
      architecture: JSON.parse(r.architectureDetails ?? "[]"),
      telemetry: JSON.parse(r.telemetrySpans ?? "[]"),
      benchmarks: JSON.parse(r.benchmarksData ?? "[]"),
      tradeoffs: JSON.parse(r.tradeoffsData ?? "[]"),
      lessonsLearned: JSON.parse(r.lessonsLearnedData ?? "[]"),
      githubRepo: r.githubRepo,
      relatedKnowledgeNodes: JSON.parse(r.relatedKnowledgeNodes ?? "[]"),
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
  }

  async findAll(): Promise<ExperimentRecord[]> {
    try {
      const records = await prisma.experiment.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.length > 0 ? records.map((r) => this.formatRecord(r)) : FALLBACK_EXPERIMENTS;
    } catch (err) {
      logger.warn({ err }, "Database query failed, returning fallback experiment records");
      return FALLBACK_EXPERIMENTS;
    }
  }

  async findBySlug(slug: string): Promise<ExperimentRecord | null> {
    try {
      const r = await prisma.experiment.findUnique({ where: { slug } });
      return r ? this.formatRecord(r) : (FALLBACK_EXPERIMENTS.find((e) => e.slug === slug) ?? null);
    } catch (err) {
      logger.warn({ err, slug }, "Database query failed, returning fallback experiment by slug");
      return FALLBACK_EXPERIMENTS.find((e) => e.slug === slug) ?? null;
    }
  }

  async upsertExperiment(data: Partial<ExperimentRecord> & { slug: string; title: string }) {
    try {
      const r = await prisma.experiment.upsert({
        where: { slug: data.slug },
        update: {
          title: data.title,
          category: data.category ?? "networking",
          identityDimension: data.identityDimension ?? "BUILD",
          objective: data.objective ?? "",
          problem: data.problem ?? "",
          motivation: data.motivation ?? "",
          status: data.status ?? "planned",
          evidenceScore: data.evidenceScore ?? 85,
          architectureDetails: JSON.stringify(data.architecture ?? []),
          telemetrySpans: JSON.stringify(data.telemetry ?? []),
          benchmarksData: JSON.stringify(data.benchmarks ?? []),
          tradeoffsData: JSON.stringify(data.tradeoffs ?? []),
          lessonsLearnedData: JSON.stringify(data.lessonsLearned ?? []),
          githubRepo: data.githubRepo ?? null,
          relatedKnowledgeNodes: JSON.stringify(data.relatedKnowledgeNodes ?? []),
        },
        create: {
          slug: data.slug,
          title: data.title,
          category: data.category ?? "networking",
          identityDimension: data.identityDimension ?? "BUILD",
          objective: data.objective ?? "",
          problem: data.problem ?? "",
          motivation: data.motivation ?? "",
          status: data.status ?? "planned",
          evidenceScore: data.evidenceScore ?? 85,
          architectureDetails: JSON.stringify(data.architecture ?? []),
          telemetrySpans: JSON.stringify(data.telemetry ?? []),
          benchmarksData: JSON.stringify(data.benchmarks ?? []),
          tradeoffsData: JSON.stringify(data.tradeoffs ?? []),
          lessonsLearnedData: JSON.stringify(data.lessonsLearned ?? []),
          githubRepo: data.githubRepo ?? null,
          relatedKnowledgeNodes: JSON.stringify(data.relatedKnowledgeNodes ?? []),
        },
      });
      return this.formatRecord(r);
    } catch (err) {
      logger.warn({ err, slug: data.slug }, "Database mutation failed, returning formatted fallback record");
      const fallback = FALLBACK_EXPERIMENTS.find((e) => e.slug === data.slug) ?? FALLBACK_EXPERIMENTS[0];
      return {
        ...fallback,
        title: data.title,
        status: (data.status as any) ?? fallback.status,
        evidenceScore: data.evidenceScore ?? fallback.evidenceScore,
        telemetry: data.telemetry ?? fallback.telemetry,
        benchmarks: data.benchmarks ?? fallback.benchmarks,
      };
    }
  }
}

export const experimentRepository = new ExperimentRepository();
