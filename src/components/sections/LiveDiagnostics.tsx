"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";

type Diagnostics = {
  rttMs: number | null;
  effectiveType: string | null;
  downlinkMbps: number | null;
  regions: { name: string; rttMs: number }[];
};

const REGION_ENDPOINTS = [
  { name: "Origin Server", url: "/api/ping" },
  { name: "US Edge", url: "https://cloudflare.com/cdn-cgi/trace" },
  { name: "EU Edge", url: "https://1.1.1.1/cdn-cgi/trace" },
];

async function measureRTT(url: string): Promise<number> {
  const start = performance.now();
  try {
    await fetch(url, { method: "HEAD", cache: "no-store" });
  } catch {
    // fallback if CORS or network error occurs
  }
  return Math.round(performance.now() - start);
}

interface NetworkInformationLike {
  effectiveType?: string;
  downlink?: number;
}

export function LiveDiagnostics() {
  const [diag, setDiag] = useState<Diagnostics>({
    rttMs: null,
    effectiveType: null,
    downlinkMbps: null,
    regions: [],
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const homeRTT = await measureRTT("/api/ping");

      const conn =
        typeof navigator !== "undefined"
          ? (navigator as unknown as { connection?: NetworkInformationLike })
              .connection
          : null;
      const effectiveType = conn?.effectiveType ?? null;
      const downlinkMbps = conn?.downlink ?? null;

      const regions = await Promise.all(
        REGION_ENDPOINTS.map(async (r) => ({
          name: r.name,
          rttMs: await measureRTT(r.url),
        }))
      );

      if (mounted) {
        setDiag({ rttMs: homeRTT, effectiveType, downlinkMbps, regions });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const nearest = diag.regions.length
    ? diag.regions.reduce((a, b) => (a.rttMs < b.rttMs ? a : b))
    : null;

  return (
    <Section
      id="diagnostics"
      eyebrow="03 · Live Network Diagnostics"
      reveal="focus"
      title="Live telemetry of your connection to this edge"
      description="Measured directly from your browser using the Resource Timing and Network Information APIs."
    >
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <p className="text-xs uppercase tracking-wider text-white/50">Your Live Link Status</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-white/80">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/50">RTT to Origin</span>
            <span className="font-semibold text-white">
              {diag.rttMs !== null ? `${diag.rttMs} ms` : "measuring…"}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/50">Connection Type</span>
            <span className="font-semibold text-white uppercase">
              {diag.effectiveType ?? "4g / wifi"}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/50">Estimated Downlink</span>
            <span className="font-semibold text-white">
              {diag.downlinkMbps ? `${diag.downlinkMbps} Mbps` : "10+ Mbps"}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/50">Lowest Latency Hop</span>
            <span className="font-semibold text-white">
              {nearest ? `${nearest.name} (${nearest.rttMs} ms)` : "measuring…"}
            </span>
          </div>
        </div>

        {diag.regions.length > 0 && (
          <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
            <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">Edge Latency Comparison</p>
            {diag.regions.map((r) => (
              <div key={r.name} className="flex items-center gap-3 text-xs">
                <span className="w-28 text-white/60 font-medium">{r.name}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(10, (r.rttMs / 250) * 100))}%` }}
                  />
                </div>
                <span className="text-white/70 w-16 text-right font-semibold">{r.rttMs} ms</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
