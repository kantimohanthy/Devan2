"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import type { ProtocolTraceResult, ProtocolSpan } from "@/lib/protocol-engine/types";
import { Activity, Cpu, Play, CheckCircle2, AlertTriangle } from "lucide-react";

const SPAN_COLORS: Record<ProtocolSpan["category"], string> = {
  dns: "#4C8BF5",
  tcp: "#10B981",
  tls: "#E8A33D",
  http: "#8A63F5",
  asn: "#EC4899",
};

export function ProtocolTraceDeck() {
  const [targetHost, setTargetHost] = useState("kantimohanthy.dev");
  const [loading, setLoading] = useState(false);
  const [trace, setTrace] = useState<ProtocolTraceResult | null>(null);

  const runTrace = async () => {
    if (!targetHost.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/net/protocol-trace", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ host: targetHost }),
      });
      if (res.ok) {
        const data = await res.json();
        setTrace(data);
      }
    } catch (err) {
      console.error("Protocol trace execution error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      id="protocol-lab"
      eyebrow="04 · Distributed Systems & Protocol Execution Engine"
      reveal="focus"
      title="Live Hop-by-Hop Multi-Layer Telemetry Profiler"
      description="Executes a real-time protocol execution trace across DNS (DoH), TCP/SYN-ACK, TLS 1.3 Handshakes, HTTP/TTFB, and BGP ASN routing topologies."
    >
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-quiet)] p-6 font-mono text-sm backdrop-blur-md">
        {/* Top Control Rail */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--hairline)] pb-4">
          <div className="flex flex-1 items-center gap-3 min-w-[280px]">
            <span className="text-xs uppercase tracking-wider text-[var(--signal-blue)] font-bold flex items-center gap-1.5">
              <Cpu size={14} /> Target Host:
            </span>
            <input
              type="text"
              value={targetHost}
              onChange={(e) => setTargetHost(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runTrace()}
              placeholder="e.g. kantimohanthy.dev"
              className="flex-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-3.5 py-1.5 text-xs text-[var(--text)] outline-none focus:border-[var(--signal-blue)]"
            />
          </div>

          <button
            type="button"
            onClick={runTrace}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-[var(--signal-blue)] bg-[var(--signal-blue)]/15 px-4 py-2 text-xs font-semibold text-[var(--signal-blue)] hover:bg-[var(--signal-blue)]/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-[var(--signal-blue)] border-t-transparent animate-spin" />
                Tracing Spans…
              </>
            ) : (
              <>
                <Play size={13} />
                Execute Trace Pipeline
              </>
            )}
          </button>
        </div>

        {/* Live Telemetry Display */}
        {trace ? (
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3">
                <span className="text-[var(--text-dim)]">Total RTT Span</span>
                <p className="mt-1 text-base font-bold text-white">{trace.totalDurationMs} ms</p>
              </div>
              <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3">
                <span className="text-[var(--text-dim)]">Resolved IPv4/v6</span>
                <p className="mt-1 text-xs font-bold text-[var(--signal-blue)] truncate">
                  {trace.resolvedIp ?? "127.0.0.1"}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3">
                <span className="text-[var(--text-dim)]">TLS Certificate CA</span>
                <p className="mt-1 text-xs font-bold text-[var(--signal-amber)] truncate">
                  {trace.tlsIssuer ?? "GTS CA 1P5"}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3">
                <span className="text-[var(--text-dim)]">Autonomous System</span>
                <p className="mt-1 text-xs font-bold text-emerald-400 truncate">
                  {trace.asnNumber ? `${trace.asnNumber} (${trace.asnOrg})` : "AS13335 (Cloudflare)"}
                </p>
              </div>
            </div>

            {/* Timing Waterfall Chart */}
            <div className="space-y-3 border-t border-[var(--hairline)] pt-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-bold">
                Span Execution Waterfall Timeline
              </p>
              {trace.spans.map((span, idx) => {
                const color = SPAN_COLORS[span.category];
                const widthPct = Math.min(100, Math.max(8, (span.durationMs / Math.max(1, trace.totalDurationMs)) * 100));

                return (
                  <div key={idx} className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-2">
                        {span.status === "ok" ? (
                          <CheckCircle2 size={13} className="text-emerald-400" />
                        ) : (
                          <AlertTriangle size={13} className="text-amber-400" />
                        )}
                        {span.name}
                      </span>
                      <span className="font-mono text-[var(--text-dim)]">{span.durationMs} ms</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden border border-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${widthPct}%`, backgroundColor: color }}
                      />
                    </div>

                    {/* Metadata attributes */}
                    {span.metadata && (
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[var(--text-dim)]">
                        {Object.entries(span.metadata).map(([k, v]) => (
                          <span key={k} className="rounded bg-white/5 px-2 py-0.5 font-mono border border-white/5">
                            <span className="text-[var(--text-faint)]">{k}:</span> {String(v)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[var(--text-dim)]">
            <Activity size={24} className="mx-auto mb-2 text-[var(--signal-blue)] opacity-60 animate-pulse" />
            <p>Click <strong className="text-white">Execute Trace Pipeline</strong> to profile a live network protocol target.</p>
          </div>
        )}
      </div>
    </Section>
  );
}
