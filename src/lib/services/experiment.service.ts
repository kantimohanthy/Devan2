import { experimentRepository } from "@/lib/repositories/experiment.repository";
import { getExperimentDriver } from "@/lib/experiment-engine/registry";
import { ExperimentRecord, ExperimentExecutionParams } from "@/lib/experiment-engine/types";
import { getCached, setCached } from "@/lib/cache";
import { logger } from "@/lib/logger";

const SEED_EXPERIMENTS: Array<Partial<ExperimentRecord> & { slug: string; title: string }> = [
  {
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
    tradeoffs: [
      "DoH resolution incurs ~10ms HTTPS overhead vs raw UDP/53 sockets but bypasses local DNS hijacking.",
      "Strict socket timeouts (4s) prevent hanging threads during serverless execution.",
    ],
    lessonsLearned: [
      "TLS handshake duration dominates connection setup time on modern HTTP/2 endpoints.",
      "Caching ASN lookups drastically cuts redundant DNS roundtrips.",
    ],
    githubRepo: "https://github.com/kantimohanthy/Devan2",
    relatedKnowledgeNodes: ["networking", "distributed-systems"],
  },
  {
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
    tradeoffs: [
      "In-browser embedding download (~24MB) is cached locally via LRU to prevent repetitive network fetches.",
    ],
    lessonsLearned: [
      "Hybrid search blending keyword scoring (0.3) with semantic vector similarity (0.7) eliminates false positives.",
    ],
    githubRepo: "https://github.com/kantimohanthy/Devan2",
    relatedKnowledgeNodes: ["ai", "systems-thinking"],
  },
];

export class ExperimentService {
  async getAllExperiments(): Promise<ExperimentRecord[]> {
    const cached = getCached<ExperimentRecord[]>("experiments:all");
    if (cached) return cached;

    let items = await experimentRepository.findAll();
    if (items.length === 0) {
      for (const seed of SEED_EXPERIMENTS) {
        await experimentRepository.upsertExperiment(seed);
      }
      items = await experimentRepository.findAll();
    }

    setCached("experiments:all", items, 30_000);
    return items;
  }

  async getExperimentBySlug(slug: string): Promise<ExperimentRecord | null> {
    const cached = getCached<ExperimentRecord>(`experiment:${slug}`);
    if (cached) return cached;

    let item = await experimentRepository.findBySlug(slug);
    if (!item) {
      const seedMatch = SEED_EXPERIMENTS.find((s) => s.slug === slug);
      if (seedMatch) {
        item = await experimentRepository.upsertExperiment(seedMatch);
      }
    }

    if (item) setCached(`experiment:${slug}`, item, 30_000);
    return item;
  }

  async executeExperiment(slug: string, params?: ExperimentExecutionParams): Promise<ExperimentRecord> {
    const driver = getExperimentDriver(slug);
    let item = await this.getExperimentBySlug(slug);

    if (!item) {
      throw new Error(`Experiment ${slug} not found`);
    }

    if (driver) {
      logger.info({ slug, params }, "Executing live experiment driver");
      const driverResult = await driver(params);

      const evidenceScore = Math.min(
        100,
        driverResult.telemetry.length * 15 +
          driverResult.benchmarks.length * 20 +
          item.tradeoffs.length * 10 +
          (item.githubRepo ? 20 : 0)
      );

      item = await experimentRepository.upsertExperiment({
        ...item,
        status: "completed",
        evidenceScore,
        telemetry: driverResult.telemetry,
        benchmarks: driverResult.benchmarks,
      });

      setCached(`experiment:${slug}`, item, 60_000);
      setCached("experiments:all", null, 0);
    }

    return item;
  }
}

export const experimentService = new ExperimentService();
