"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { NodeItem } from "./GraphCanvas";
import { knowledgeNodes, knowledgeEdges } from "@/data/content";
import { artifacts } from "@/data/artifacts";
import { dnsResolutionEvidenceRecord } from "@/data/evidence-records";
import { deriveEvidenceState } from "@/data/evidence-schema";
import { ONTOLOGY_CLAIMS } from "@/lib/ontology/store";
import { IntelligenceMetrics } from "@/components/ontology/IntelligenceMetrics";
import { IntelligenceFeed } from "@/components/ontology/IntelligenceFeed";
import { MissionsDeck } from "@/components/ontology/MissionsDeck";
import { ReasoningReplay } from "@/components/ontology/ReasoningReplay";
import { ExternalLink, GitCommit, Layers, ArrowUpRight, Sparkles, Play, CheckCircle2, Award, FileCode2, BookOpen, RotateCcw } from "lucide-react";

interface IntelligencePanelProps {
  selectedNode: NodeItem | null;
  onSelectNode: (node: NodeItem) => void;
}

export function IntelligencePanel({
  selectedNode,
  onSelectNode,
}: IntelligencePanelProps) {
  const [executing, setExecuting] = useState(false);
  const [telemetryResult, setTelemetryResult] = useState<any>(null);
  const [reasoningClaimId, setReasoningClaimId] = useState<string | null>(null);

  const runLiveTelemetry = async () => {
    if (!selectedNode) return;
    setExecuting(true);
    try {
      const res = await fetch("/api/net/protocol-trace", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ host: "kantimohanthy.dev" }),
      });
      if (res.ok) {
        const data = await res.json();
        setTelemetryResult(data);
      }
    } catch (err) {
      console.error("Telemetry trace failed:", err);
    } finally {
      setExecuting(false);
    }
  };

  // If no node selected, show quiet active registry + Ontology Metrics + Feed + Missions
  if (!selectedNode) {
    return (
      <aside className="w-[360px] shrink-0 h-full border-l border-[#20252B] bg-[#101317] p-5 flex flex-col gap-5 overflow-y-auto select-none font-sans text-xs">
        <div className="border-b border-[#20252B] pb-3">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#8A9098] uppercase flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#4F8CFF]" />
            Cognitive Intelligence OS v2
          </span>
          <p className="mt-1 text-[11px] text-[#8A9098]/70 leading-relaxed">
            Select any node on the ontology canvas to launch Reasoning Replays, inspect evidence ledgers, and execute telemetry.
          </p>
        </div>

        {/* Cognitive Intelligence Metrics */}
        <IntelligenceMetrics />

        {/* Operational Missions */}
        <MissionsDeck />

        {/* Real-Time Feed */}
        <IntelligenceFeed />

        {/* Reasoning Replay Modal */}
        <ReasoningReplay
          claimId={reasoningClaimId}
          onClose={() => setReasoningClaimId(null)}
        />
      </aside>
    );
  }

  // Active connected edges
  const connectedEdges = knowledgeEdges.filter(
    (e) => e.from === selectedNode.id || e.to === selectedNode.id
  );

  const connectedNodes = connectedEdges.map((e) => {
    const otherId = e.from === selectedNode.id ? e.to : e.from;
    const kn = knowledgeNodes.find((n) => n.id === otherId);
    return {
      id: otherId,
      label: kn?.label ?? otherId,
      edgeLabel: e.label,
    };
  });

  const isDnsOrNetworking = selectedNode.id.includes("dns") || selectedNode.id.includes("network");
  const derivedState = isDnsOrNetworking ? deriveEvidenceState(dnsResolutionEvidenceRecord) : "TESTED";

  const relatedArtifact = artifacts.find(
    (a) => a.id.includes(selectedNode.id) || a.title.toLowerCase().includes(selectedNode.id)
  );

  const claimMatch = ONTOLOGY_CLAIMS.find((c) => c.domain.toLowerCase() === selectedNode.domain.toLowerCase()) ?? ONTOLOGY_CLAIMS[0];

  return (
    <aside className="w-[360px] shrink-0 h-full border-l border-[#20252B] bg-[#101317] p-5 flex flex-col gap-5 overflow-y-auto font-sans text-xs select-none">
      {/* 1. Header & Metadata */}
      <div className="border-b border-[#20252B] pb-4 space-y-1.5">
        <div className="flex items-center justify-between font-mono text-[10px] text-[#8A9098]">
          <span className="uppercase tracking-widest text-[#4F8CFF] font-semibold">
            {selectedNode.type} · {selectedNode.domain}
          </span>
          <span className="rounded bg-[#31D07D]/15 px-2 py-0.5 text-[#31D07D] font-mono text-[10px] font-bold">
            {derivedState}
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#F5F5F5] pt-1">
          {selectedNode.label}
        </h2>
        <p className="text-xs text-[#8A9098] leading-relaxed">{selectedNode.summary}</p>
      </div>

      {/* 2. Reasoning Replay Trigger Card */}
      <div className="rounded-xl border border-[#4F8CFF]/40 bg-[#4F8CFF]/10 p-3.5 space-y-2.5 font-mono">
        <div className="flex items-center justify-between text-[#4F8CFF]">
          <span className="text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <RotateCcw size={13} /> Verified Claim Audit Trail
          </span>
          <span className="text-[10px] text-[#31D07D] font-bold">{claimMatch.confidence}% CONFIDENCE</span>
        </div>

        <p className="text-xs text-[#F5F5F5] font-semibold leading-snug">
          &quot;{claimMatch.statement}&quot;
        </p>

        <button
          type="button"
          onClick={() => setReasoningClaimId(claimMatch.id)}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#4F8CFF] bg-[#4F8CFF] px-3 py-2 text-xs font-bold text-[#0A0B0D] hover:bg-[#4F8CFF]/90 transition-all cursor-pointer shadow-md"
        >
          Launch Reasoning Replay <ArrowUpRight size={13} />
        </button>
      </div>

      {/* 3. Canonical 6-Stage Evidence Record Section */}
      {isDnsOrNetworking && (
        <div className="space-y-3 rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3.5 font-mono text-[11px]">
          <div className="flex items-center justify-between border-b border-[#20252B] pb-2 text-[#4F8CFF]">
            <span className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <BookOpen size={12} /> Stage 1-6 Evidence Record
            </span>
            <span className="text-[#31D07D] font-bold text-[10px]">VERIFIED</span>
          </div>

          <div className="space-y-1.5 text-[#8A9098]">
            <p className="text-[#F5F5F5] font-bold text-[10px] uppercase">1. Source Anchor</p>
            <a
              href={dnsResolutionEvidenceRecord.source.url}
              target="_blank"
              rel="noreferrer"
              className="text-[#4F8CFF] hover:underline flex items-center gap-1"
            >
              {dnsResolutionEvidenceRecord.source.label} <ExternalLink size={10} />
            </a>

            <p className="text-[#F5F5F5] font-bold text-[10px] uppercase pt-1">2. Hypothesis & Question</p>
            <p className="text-[#8A9098] leading-tight">{dnsResolutionEvidenceRecord.question.text}</p>

            <p className="text-[#F5F5F5] font-bold text-[10px] uppercase pt-1">3. Experiment Execution</p>
            <p className="text-[#8A9098] bg-[#101317] p-1.5 rounded border border-[#20252B] text-[10px]">
              {dnsResolutionEvidenceRecord.experiment.method}
            </p>

            <p className="text-[#F5F5F5] font-bold text-[10px] uppercase pt-1">4. Observed Result</p>
            <p className="text-[#31D07D] leading-tight">{dnsResolutionEvidenceRecord.outcome.expectedVsActual}</p>

            <p className="text-[#F5F5F5] font-bold text-[10px] uppercase pt-1">5. Diagnosis & Surprises</p>
            <p className="text-[#8A9098] leading-tight">{dnsResolutionEvidenceRecord.outcome.whatBrokeOrSurprised}</p>

            <p className="text-[#F5F5F5] font-bold text-[10px] uppercase pt-1">6. Raw Proof Artifacts</p>
            <div className="space-y-1 pt-0.5">
              {dnsResolutionEvidenceRecord.artifacts.map((art) => (
                <div key={art.id} className="flex items-center justify-between bg-[#101317] p-1.5 rounded border border-[#20252B]">
                  <span className="text-[#F5F5F5] font-mono text-[10px] flex items-center gap-1">
                    <FileCode2 size={11} className="text-[#4F8CFF]" /> {art.path}
                  </span>
                  <span className="text-[9px] text-[#8A9098] uppercase">{art.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Live Telemetry Execution Launcher */}
      <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3.5 space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#8A9098]">Live System Execution</span>
          <Award size={13} className="text-[#31D07D]" />
        </div>

        <button
          type="button"
          onClick={runLiveTelemetry}
          disabled={executing}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#4F8CFF] bg-[#4F8CFF]/15 px-3 py-2 text-xs font-semibold text-[#4F8CFF] hover:bg-[#4F8CFF]/25 transition-all disabled:opacity-50 cursor-pointer"
        >
          {executing ? (
            <>
              <span className="h-3 w-3 rounded-full border-2 border-[#4F8CFF] border-t-transparent animate-spin" />
              Profiling Latency…
            </>
          ) : (
            <>
              <Play size={13} /> Run Live Telemetry Trace
            </>
          )}
        </button>

        {telemetryResult && (
          <div className="mt-2 rounded-lg border border-[#20252B] bg-[#101317] p-2.5 space-y-1.5 text-[10px]">
            <div className="flex justify-between text-[#31D07D] font-bold">
              <span>Total RTT Span:</span>
              <span>{telemetryResult.totalDurationMs} ms</span>
            </div>
            <div className="flex justify-between text-[#8A9098]">
              <span>DoH DNS Lookup:</span>
              <span>{telemetryResult.dnsMs} ms</span>
            </div>
            <div className="flex justify-between text-[#8A9098]">
              <span>TLS 1.3 Handshake:</span>
              <span>{telemetryResult.tlsMs} ms</span>
            </div>
            <div className="flex justify-between text-[#8A9098]">
              <span>HTTP First-Byte (TTFB):</span>
              <span>{telemetryResult.ttfbMs} ms</span>
            </div>
          </div>
        )}
      </div>

      {/* 5. Derived Evidence Trail */}
      <div className="space-y-2 border-b border-[#20252B] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#424750] font-bold">
          Derived Evidence Trail
        </p>
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center gap-2 text-[#8A9098]">
            <CheckCircle2 size={12} className="text-[#31D07D]" />
            <span>2026-08-07: RFC 1035 Iterative Dig Trace Logged</span>
          </div>
          <div className="flex items-center gap-2 text-[#8A9098]">
            <CheckCircle2 size={12} className="text-[#31D07D]" />
            <span>2026-08-07: Wireshark UDP 53 PCAP Capture Verified</span>
          </div>
        </div>
      </div>

      {/* 6. Connected Nodes */}
      {connectedNodes.length > 0 && (
        <div className="space-y-2 border-b border-[#20252B] pb-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#424750] font-bold flex items-center gap-1">
            <Layers size={11} /> Connected Topology ({connectedNodes.length})
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {connectedNodes.map((cn) => (
              <button
                key={cn.id}
                type="button"
                onClick={() => {
                  const kn = knowledgeNodes.find((n) => n.id === cn.id);
                  onSelectNode({
                    id: cn.id,
                    label: cn.label,
                    summary: kn?.summary ?? "",
                    type: "concept",
                    domain: kn?.domain ?? "networking",
                    evidenceDepth: 4,
                    density: 75,
                    x: 500,
                    y: 350,
                  });
                }}
                className="rounded-md border border-[#20252B] bg-[#0A0B0D] px-2.5 py-1 text-[11px] font-mono text-[#8A9098] hover:border-[#4F8CFF] hover:text-[#F5F5F5] transition-colors cursor-pointer"
              >
                {cn.label} <span className="text-[#424750]">· {cn.edgeLabel}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 7. Related Repositories */}
      <div className="space-y-2 border-b border-[#20252B] pb-4 font-mono">
        <p className="text-[10px] uppercase tracking-wider text-[#424750] font-bold flex items-center gap-1">
          <GitCommit size={11} /> Evidence Repository
        </p>
        <a
          href="https://github.com/kantimohanthy/Devan2"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg border border-[#20252B] bg-[#0A0B0D] p-2.5 text-[#4F8CFF] hover:border-[#4F8CFF] transition-colors"
        >
          <span className="text-[11px]">kantimohanthy/Devan2</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* 8. Suggested Exploration */}
      {relatedArtifact && (
        <div className="space-y-2 font-mono">
          <p className="text-[10px] uppercase tracking-wider text-[#424750] font-[#424750] font-bold">
            Suggested Case Study
          </p>
          <a
            href={`/artifacts/${relatedArtifact.id}`}
            className="flex items-center justify-between rounded-lg border border-[#4F8CFF]/30 bg-[#4F8CFF]/10 p-3 text-[#4F8CFF] hover:bg-[#4F8CFF]/20 transition-all"
          >
            <div>
              <p className="font-semibold text-xs text-[#F5F5F5]">{relatedArtifact.title}</p>
              <p className="text-[10px] text-[#8A9098] mt-0.5">{relatedArtifact.summary}</p>
            </div>
            <ArrowUpRight size={14} className="shrink-0" />
          </a>
        </div>
      )}

      {/* Reasoning Replay Modal */}
      <ReasoningReplay
        claimId={reasoningClaimId}
        onClose={() => setReasoningClaimId(null)}
      />
    </aside>
  );
}
