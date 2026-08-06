"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import type { ExperimentRecord, IdentityDimension } from "@/lib/experiment-engine/types";
import { Play, CheckCircle2, Award, FileCode2, ExternalLink } from "lucide-react";

const DIMENSION_COLORS: Record<IdentityDimension, string> = {
  BUILD: "#4C8BF5",
  UNDERSTAND: "#10B981",
  EXPLORE: "#E8A33D",
  LEAD: "#EC4899",
};

export function ExperimentConsole() {
  const [experiments, setExperiments] = useState<ExperimentRecord[]>([]);
  const [selectedDim, setSelectedDim] = useState<IdentityDimension | "ALL">("ALL");
  const [activeSlug, setActiveSlug] = useState<string>("networking-protocol-pipeline");
  const [loading, setLoading] = useState(false);
  const [activeExp, setActiveExp] = useState<ExperimentRecord | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/experiments");
        if (res.ok) {
          const data = await res.json();
          setExperiments(data.experiments ?? []);
          if (data.experiments?.length > 0) {
            setActiveExp(data.experiments[0]);
            setActiveSlug(data.experiments[0].slug);
          }
        }
      } catch (err) {
        console.error("Failed to load experiments:", err);
      }
    })();
  }, []);

  const runExperiment = async () => {
    if (!activeSlug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/experiments/${activeSlug}/execute`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ host: "kantimohanthy.dev", iterations: 1000 }),
      });
      if (res.ok) {
        const updated = await res.json();
        setActiveExp(updated);
        setExperiments((prev) => prev.map((e) => (e.slug === updated.slug ? updated : e)));
      }
    } catch (err) {
      console.error("Experiment execution failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = selectedDim === "ALL"
    ? experiments
    : experiments.filter((e) => e.identityDimension === selectedDim);

  return (
    <Section
      id="experiments-engine"
      eyebrow="03 · UJ.OS Core Experiment Engine"
      reveal="focus"
      title="Engineering Knowledge Generation Platform"
      description="Every experiment executed inside DEVAN yields live telemetry, architecture benchmarks, tradeoffs, and evidence scores connecting directly back to Ujwal's professional identity."
    >
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-quiet)] p-6 backdrop-blur-md">
        {/* Identity Dimension Filter Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline)] pb-4">
          <div className="flex flex-wrap gap-2">
            {(["ALL", "BUILD", "UNDERSTAND", "EXPLORE", "LEAD"] as const).map((dim) => {
              const color = dim === "ALL" ? "#ffffff" : DIMENSION_COLORS[dim];
              const isSelected = selectedDim === dim;
              return (
                <button
                  key={dim}
                  type="button"
                  onClick={() => setSelectedDim(dim)}
                  className={`rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-dim)] hover:text-white"
                  }`}
                >
                  <span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ backgroundColor: color }} />
                  {dim}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={runExperiment}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-[var(--signal-blue)] bg-[var(--signal-blue)]/15 px-4 py-2 font-mono text-xs font-semibold text-[var(--signal-blue)] hover:bg-[var(--signal-blue)]/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-[var(--signal-blue)] border-t-transparent animate-spin" />
                Executing Pipeline…
              </>
            ) : (
              <>
                <Play size={13} />
                Run Live Experiment
              </>
            )}
          </button>
        </div>

        {/* Experiment Selector List & Details Deck */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Rail: List */}
          <div className="space-y-3 lg:col-span-1">
            <p className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono font-bold">
              Active Experiments ({filtered.length})
            </p>
            {filtered.map((exp) => {
              const isSelected = activeSlug === exp.slug;
              const dimColor = DIMENSION_COLORS[exp.identityDimension];
              return (
                <button
                  key={exp.slug}
                  type="button"
                  onClick={() => {
                    setActiveSlug(exp.slug);
                    setActiveExp(exp);
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[var(--signal-blue)] bg-[var(--surface)] shadow-lg"
                      : "border-[var(--hairline)] bg-black/20 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                    <span className="font-semibold uppercase tracking-wider" style={{ color: dimColor }}>
                      {exp.identityDimension} · {exp.category}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <Award size={12} /> {exp.evidenceScore}/100
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white leading-snug">{exp.title}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--text-dim)]">{exp.objective}</p>
                </button>
              );
            })}
          </div>

          {/* Right Area: Deep Telemetry & Evidence Details */}
          {activeExp && (
            <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5 space-y-6 lg:col-span-2 font-mono text-xs">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--hairline)] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${DIMENSION_COLORS[activeExp.identityDimension]}20`,
                        color: DIMENSION_COLORS[activeExp.identityDimension],
                      }}
                    >
                      {activeExp.identityDimension}
                    </span>
                    <span className="text-[var(--text-dim)] uppercase">• {activeExp.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{activeExp.title}</h3>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 size={16} /> Evidence Score: {activeExp.evidenceScore}/100
                  </div>
                  <span className="text-[10px] text-[var(--text-faint)]">Verified via Live Telemetry</span>
                </div>
              </div>

              {/* Problem & Engineering Motivation */}
              <div className="space-y-2">
                <p className="text-[var(--text-faint)] uppercase font-bold text-[10px]">Engineering Motivation & Context</p>
                <p className="text-[var(--text-dim)] leading-relaxed">{activeExp.motivation}</p>
              </div>

              {/* Benchmarks Evidence Table */}
              {activeExp.benchmarks.length > 0 && (
                <div className="space-y-2 border-t border-[var(--hairline)] pt-4">
                  <p className="text-[var(--text-faint)] uppercase font-bold text-[10px]">Quantitative Benchmarks</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeExp.benchmarks.map((b, idx) => (
                      <div key={idx} className="rounded-lg border border-[var(--hairline)] bg-black/40 p-2.5">
                        <span className="text-[var(--text-dim)] text-[10px]">{b.metric}</span>
                        <p className="text-sm font-bold text-white mt-0.5">{b.value}</p>
                        <span className="text-[10px] text-[var(--text-faint)]">{b.context}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Nodes */}
              {activeExp.architecture.length > 0 && (
                <div className="space-y-2 border-t border-[var(--hairline)] pt-4">
                  <p className="text-[var(--text-faint)] uppercase font-bold text-[10px]">Architecture Components</p>
                  <div className="space-y-1.5">
                    {activeExp.architecture.map((arch, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <FileCode2 size={13} className="text-[var(--signal-blue)] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-white">{arch.component}:</strong>{" "}
                          <span className="text-[var(--text-dim)]">{arch.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tradeoffs & Lessons */}
              {activeExp.tradeoffs.length > 0 && (
                <div className="space-y-2 border-t border-[var(--hairline)] pt-4">
                  <p className="text-[var(--text-faint)] uppercase font-bold text-[10px]">Tradeoffs & Lessons Learned</p>
                  <ul className="list-disc list-inside space-y-1 text-[var(--text-dim)] leading-relaxed">
                    {activeExp.tradeoffs.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* GitHub Evidence Repo Link */}
              {activeExp.githubRepo && (
                <div className="border-t border-[var(--hairline)] pt-4 flex items-center justify-between text-xs">
                  <span className="text-[var(--text-faint)]">GitHub Verification Source:</span>
                  <a
                    href={activeExp.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[var(--signal-blue)] hover:underline font-semibold"
                  >
                    View Source Repo <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
