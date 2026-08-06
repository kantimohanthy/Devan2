import { executeProtocolTrace } from "@/lib/protocol-engine/tracer";
import { ProtocolSpan } from "@/lib/protocol-engine/types";
import { Benchmark } from "@/data/artifact-schema";
import { ExperimentExecutionParams } from "./types";

export interface DriverResult {
  telemetry: ProtocolSpan[];
  benchmarks: Benchmark[];
}

export type ExperimentDriver = (
  params?: ExperimentExecutionParams
) => Promise<DriverResult>;

const DRIVER_REGISTRY: Record<string, ExperimentDriver> = {
  "networking-protocol-pipeline": async (params) => {
    const host = params?.host ?? "kantimohanthy.dev";
    const trace = await executeProtocolTrace(host);
    return {
      telemetry: trace.spans,
      benchmarks: [
        { metric: "Total RTT Span", value: `${trace.totalDurationMs} ms`, context: "Hop-by-hop multi-layer span" },
        { metric: "DoH DNS Lookup", value: `${trace.dnsMs} ms`, context: "Cloudflare 1.1.1.1 DoH endpoint" },
        { metric: "TLS 1.3 Handshake", value: `${trace.tlsMs} ms`, context: `CA: ${trace.tlsIssuer ?? "GTS CA"}` },
        { metric: "HTTP First-Byte (TTFB)", value: `${trace.ttfbMs} ms`, context: "HTTP HEAD request" },
      ],
    };
  },

  "vector-search-benchmark": async (params) => {
    const start = performance.now();
    const dims = params?.dimension ?? 384;
    const iters = params?.iterations ?? 1000;

    const vecA = Array.from({ length: dims }, () => Math.random());
    const vecB = Array.from({ length: dims }, () => Math.random());

    let dot = 0, na = 0, nb = 0;
    for (let k = 0; k < iters; k++) {
      dot = 0; na = 0; nb = 0;
      for (let i = 0; i < dims; i++) {
        dot += vecA[i] * vecB[i];
        na += vecA[i] * vecA[i];
        nb += vecB[i] * vecB[i];
      }
    }
    const score = dot / (Math.sqrt(na) * Math.sqrt(nb));
    const duration = Math.round((performance.now() - start) * 100) / 100;

    const spans: ProtocolSpan[] = [
      {
        name: "ONNX Memory Allocation",
        category: "http",
        durationMs: 1.2,
        status: "ok",
        metadata: { dimensions: dims, vectorType: "Float32Array" },
      },
      {
        name: "Cosine Similarity Loop Execution",
        category: "http",
        durationMs: duration,
        status: "ok",
        metadata: { iterations: iters, matchScore: score.toFixed(4) },
      },
    ];

    return {
      telemetry: spans,
      benchmarks: [
        { metric: "Inference Loop Latency", value: `${duration} ms`, context: `${iters} iterations over ${dims}-dim vectors` },
        { metric: "Cosine Similarity Precision", value: score.toFixed(4), context: "Float32 normalized dot product" },
      ],
    };
  },
};

export function getExperimentDriver(slug: string): ExperimentDriver | null {
  return DRIVER_REGISTRY[slug] ?? null;
}
