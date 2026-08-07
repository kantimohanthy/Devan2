"use client";

import { useState, useRef } from "react";
import type { Experiment } from "@/lib/types";

export function LabTerminal({ experiment }: { experiment: Experiment }) {
  const [lines, setLines] = useState<string[]>([
    ...experiment.commands.map((c) => `$ ${c}`),
    "— idle, press Run to execute —",
  ]);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState(experiment.lastRun ?? "never");
  const termRef = useRef<HTMLDivElement>(null);

  if (!experiment.executable) {
    return (
      <div>
        <div className="inline-block text-[12px] text-text-3 border border-dashed border-border rounded-lg px-3.5 py-2.5">
          Not yet executable — no run backend wired for this experiment.
        </div>
      </div>
    );
  }

  const run = () => {
    setRunning(true);
    setLines([]);
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, experiment.outputLines[i]]);
      termRef.current?.scrollTo({ top: termRef.current.scrollHeight });
      i++;
      if (i >= experiment.outputLines.length) {
        clearInterval(interval);
        setRunning(false);
        setLastRun("just now");
      }
    }, 220);
  };

  return (
    <div>
      <div className="flex items-center gap-3.5 mb-5">
        <button
          onClick={run}
          disabled={running}
          className="bg-blue text-bg font-semibold text-[13px] px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {running ? "Running…" : "Run " + experiment.name.split(" ").slice(0, 2).join(" ")}
        </button>
        <span className="text-[12px] text-text-3">last run {lastRun}</span>
      </div>
      <div
        ref={termRef}
        className="bg-surface border border-border rounded-lg p-4 font-mono text-[12.5px] leading-[1.7] text-text-2 min-h-[120px] max-h-[280px] overflow-y-auto whitespace-pre-wrap"
      >
        {lines.map((line, i) => (
          <div key={i} className={i === lines.length - 1 && running ? "text-text" : ""}>
            {line}
          </div>
        ))}
      </div>

      {experiment.timelineSpans && !running && lines.length > 2 && (
        <div className="mt-4 flex items-center gap-1 h-2">
          {experiment.timelineSpans.map((span) => (
            <div
              key={span.label}
              title={`${span.label}: ${span.ms}ms`}
              className="h-full bg-blue/40 rounded-sm"
              style={{ width: `${span.ms * 3}px` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
