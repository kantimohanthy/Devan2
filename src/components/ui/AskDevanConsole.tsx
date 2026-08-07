"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Activity, Terminal } from "lucide-react";
import { reasoningClient } from "@/lib/api-client";
import type { IntelligenceResponse } from "@/services/intelligence.service";

const PRESET_QUESTIONS = [
  "What am I weakest at?",
  "Compare me with a Systems Engineer",
  "Which projects prove my networking skills?",
  "Suggest next experiment",
];

export function AskDevanConsole() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IntelligenceResponse | null>(null);

  const handleExecute = async (queryToRun?: string) => {
    const q = queryToRun || prompt;
    if (!q.trim() || loading) return;
    setLoading(true);
    try {
      const res = await reasoningClient.evaluate(q);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D]/90 p-6 backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-[#4F8CFF]" />
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]">
          Ask DEVAN · Multi-Reasoner Pipeline
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleExecute()}
          placeholder="Ask DEVAN to reason over Ujwal's engineering intelligence..."
          className="flex-1 rounded-xl border border-[#20252B] bg-[#101317] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#8A9098]/60 focus:border-[#4F8CFF] focus:outline-none font-mono"
        />
        <button
          type="button"
          onClick={() => handleExecute()}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#4F8CFF] px-6 py-3 font-mono text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Reasoning..." : "Reason"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {PRESET_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setPrompt(q);
              handleExecute(q);
            }}
            className="rounded-full border border-[#20252B] bg-[#101317] px-3.5 py-1.5 font-mono text-[11px] text-[#8A9098] hover:border-[#4F8CFF]/50 hover:text-[#F5F5F5] transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {response && (
        <div className="space-y-4 rounded-xl border border-[#20252B] bg-[#101317] p-5 font-mono">
          <div className="flex items-center justify-between border-b border-[#20252B] pb-3 text-xs">
            <span className="uppercase text-[#4F8CFF] font-semibold flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> Intent: {response.intent}
            </span>
            <span className="text-[#8A9098]">
              Overall Score: <strong className="text-white">{response.overallReadinessScore}/100</strong>
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#F5F5F5]">{response.summary}</p>

          {response.insights.length > 0 && (
            <div className="space-y-1.5 text-xs text-[#8A9098]">
              <p className="font-bold text-[#424750] uppercase tracking-wider text-[10px]">
                Reasoner Insights
              </p>
              {response.insights.map((ins, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#4F8CFF]">→</span>
                  <span>{ins}</span>
                </div>
              ))}
            </div>
          )}

          {response.recommendations.length > 0 && (
            <div className="space-y-1.5 text-xs text-emerald-400">
              <p className="font-bold text-[#424750] uppercase tracking-wider text-[10px]">
                Recommended Actions
              </p>
              {response.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>✓</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          )}

          {response.trace && response.trace.length > 0 && (
            <details className="border-t border-[#20252B] pt-3 text-[10px] text-[#8A9098]">
              <summary className="cursor-pointer font-bold uppercase tracking-wider text-[#424750] hover:text-[#8A9098] flex items-center gap-1">
                <Terminal className="h-3 w-3" /> View Execution Trace ({response.trace.length} stages)
              </summary>
              <div className="mt-2 space-y-1 pl-2 border-l border-[#20252B]">
                {response.trace.map((step, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{step.stage}</span>
                    <span className="text-[#4F8CFF]">{step.durationMs}ms</span>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
