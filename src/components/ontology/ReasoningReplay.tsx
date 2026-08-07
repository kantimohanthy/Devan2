"use client";

import { useState } from "react";
import { REASONING_REPLAY_TRACES } from "@/lib/ontology/store";
import { ReasoningReplayStep } from "@/lib/ontology/types";
import { Play, CheckCircle2, AlertTriangle, FileCode2, ArrowRight, X, Sparkles, Terminal, Award } from "lucide-react";

interface ReasoningReplayProps {
  claimId: string | null;
  onClose: () => void;
}

export function ReasoningReplay({ claimId, onClose }: ReasoningReplayProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(11);

  if (!claimId) return null;

  const trace = REASONING_REPLAY_TRACES[claimId] ?? REASONING_REPLAY_TRACES["claim-dns-referral"];
  const steps = trace.steps;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="w-full max-w-3xl rounded-2xl border border-[#20252B] bg-[#101317] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#20252B] px-5 py-4 bg-[#0A0B0D]">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg border border-[#4F8CFF]/40 bg-[#4F8CFF]/15 p-2 text-[#4F8CFF]">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4F8CFF] font-semibold">
                Reasoning Replay Audit Trail
              </span>
              <h3 className="text-base font-bold text-[#F5F5F5]">{trace.title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#20252B] p-1.5 text-[#8A9098] hover:bg-[#20252B] hover:text-[#F5F5F5] cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Step Progress Controls */}
        <div className="flex items-center justify-between border-b border-[#20252B] px-5 py-2.5 bg-[#0D0F13] font-mono text-xs">
          <div className="flex items-center gap-2 text-[#8A9098]">
            <Play size={12} className="text-[#31D07D]" />
            <span>Audit Step: <strong className="text-[#F5F5F5]">{activeStepIndex + 1}</strong> / {steps.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveStepIndex((i) => Math.max(0, i - 1))}
              disabled={activeStepIndex === 0}
              className="rounded border border-[#20252B] bg-[#101317] px-2 py-0.5 text-[11px] text-[#8A9098] hover:text-[#F5F5F5] disabled:opacity-30 cursor-pointer"
            >
              ← Prev Step
            </button>
            <button
              type="button"
              onClick={() => setActiveStepIndex((i) => Math.min(steps.length - 1, i + 1))}
              disabled={activeStepIndex === steps.length - 1}
              className="rounded border border-[#20252B] bg-[#101317] px-2 py-0.5 text-[11px] text-[#8A9098] hover:text-[#F5F5F5] disabled:opacity-30 cursor-pointer"
            >
              Next Step →
            </button>
          </div>
        </div>

        {/* Audit Steps Timeline Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 font-mono text-xs">
          {steps.map((step: ReasoningReplayStep, idx: number) => {
            const isActive = idx === activeStepIndex;
            const isPassed = idx <= activeStepIndex;

            return (
              <div
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`rounded-xl border p-3.5 transition-all cursor-pointer ${
                  isActive
                    ? "border-[#4F8CFF] bg-[#4F8CFF]/10 shadow-lg"
                    : isPassed
                    ? "border-[#20252B] bg-[#0A0B0D]/80 opacity-90"
                    : "border-[#20252B]/40 bg-[#0A0B0D]/30 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#8A9098]">#{idx + 1}</span>
                    <span className="font-semibold text-[#F5F5F5] uppercase tracking-wider text-[11px]">
                      {step.stage}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#8A9098]">{step.timestamp}</span>
                    {step.status === "pass" ? (
                      <CheckCircle2 size={13} className="text-[#31D07D]" />
                    ) : step.status === "warn" ? (
                      <AlertTriangle size={13} className="text-[#F7B955]" />
                    ) : (
                      <Terminal size={13} className="text-[#4F8CFF]" />
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#8A9098] leading-relaxed">{step.detail}</p>

                {step.artifactRef && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#4F8CFF] bg-[#101317] p-1.5 rounded border border-[#20252B] w-fit">
                    <FileCode2 size={11} /> Evidence Artifact: <strong>{step.artifactRef}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-[#20252B] bg-[#0A0B0D] px-5 py-3 flex items-center justify-between font-mono text-[11px] text-[#8A9098]">
          <div className="flex items-center gap-1.5 text-[#31D07D]">
            <Award size={14} /> Claim Evidence State: <strong>DEFENDED (97% Confidence)</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 rounded-lg border border-[#20252B] bg-[#101317] px-3 py-1.5 text-xs font-semibold text-[#F5F5F5] hover:bg-[#20252B] cursor-pointer"
          >
            Close Audit Trail <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
