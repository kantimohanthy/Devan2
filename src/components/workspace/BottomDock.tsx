"use client";

import React, { useEffect, useState } from "react";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { queryEngine } from "@/lib/query/client-query-engine";
import { Terminal, ShieldCheck, History, Activity, Sparkles, ChevronUp, ChevronDown } from "lucide-react";

export function BottomDock() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "Oracle" | "Terminal" | "Evidence" | "Timeline" | "Logs" | "Diagnostics" | "Activity" | "Experiments"
  >("Oracle");
  const [oracleOutput, setOracleOutput] = useState<string>("Oracle standby. Query target concept or click suggestion.");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setIsOpen(workspaceStore.getState().dockOpen);
    setActiveTab(workspaceStore.getState().dockActiveTab);

    return workspaceStore.subscribe((state) => {
      setIsOpen(state.dockOpen);
      setActiveTab(state.dockActiveTab);
    });
  }, []);

  const tabs = [
    { id: "Oracle", icon: Sparkles },
    { id: "Terminal", icon: Terminal },
    { id: "Evidence", icon: ShieldCheck },
    { id: "Timeline", icon: History },
    { id: "Logs", icon: Activity },
  ] as const;

  const handleRunOracle = async (prompt: string) => {
    const state = workspaceStore.getState();
    setOracleOutput(`Evaluating Oracle reasoning query: "${prompt}"...`);
    const res = await queryEngine.queryOracle(prompt, state.selectedConceptId);
    setOracleOutput(res.data.summary);
    setLogs((prev) => [`[ORACLE TRACE] Intent: ${res.data.trace.intent} | Score: ${res.data.trace.confidence}`, ...prev]);
  };

  return (
    <div className="border-t border-[#20252B] bg-[#0A0B0D]/95 font-mono text-xs shrink-0 select-none">
      {/* Dock Bar Header */}
      <div className="flex items-center justify-between border-b border-[#20252B] px-4 py-1.5 h-8">
        <div className="flex items-center gap-1">
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setIsOpen(true);
                workspaceStore.setState({ dockOpen: true, dockActiveTab: id });
              }}
              className={`flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[11px] transition-colors ${
                isOpen && activeTab === id
                  ? "bg-[#20252B] text-[#4F8CFF] font-semibold"
                  : "text-[#8A9098] hover:text-[#F5F5F5]"
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{id}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            workspaceStore.setState({ dockOpen: next });
          }}
          className="rounded p-1 text-[#8A9098] hover:text-[#F5F5F5]"
        >
          {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Dock Content Window */}
      {isOpen && (
        <div className="h-44 p-4 overflow-y-auto bg-[#07080A]">
          {activeTab === "Oracle" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8A9098]">Contextual Oracle Suggestions:</span>
                <button
                  onClick={() => handleRunOracle("Explain target concept and packet flow")}
                  className="rounded bg-[#121418] px-2 py-0.5 text-[10px] text-[#4F8CFF] border border-[#20252B] hover:bg-[#20252B]"
                >
                  Explain Concept
                </button>
                <button
                  onClick={() => handleRunOracle("Analyze failure modes and production trade-offs")}
                  className="rounded bg-[#121418] px-2 py-0.5 text-[10px] text-amber-400 border border-[#20252B] hover:bg-[#20252B]"
                >
                  Failure Modes
                </button>
                <button
                  onClick={() => handleRunOracle("Show common interview questions and labs")}
                  className="rounded bg-[#121418] px-2 py-0.5 text-[10px] text-purple-400 border border-[#20252B] hover:bg-[#20252B]"
                >
                  Interview Questions
                </button>
              </div>

              <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3 text-[#F5F5F5] text-[11px] leading-relaxed">
                {oracleOutput}
              </div>
            </div>
          )}

          {activeTab === "Terminal" && (
            <div className="font-mono text-[11px] text-emerald-400 space-y-1">
              <div>devan@os-kernel:~$ tshark -i eth0 -f &apos;port 53&apos; -w dns-trace.pcap</div>
              <div>devan@os-kernel:~$ dig +trace example.com</div>
              <div>devan@os-kernel:~$ perf top -p $(pgrep epoll)</div>
              <div className="text-[#8A9098]">Interactive terminal session ready.</div>
            </div>
          )}

          {activeTab === "Logs" && (
            <div className="space-y-1 text-[10px] text-[#8A9098]">
              {logs.length === 0 ? (
                <div>No telemetry logs recorded in active session.</div>
              ) : (
                logs.map((log, i) => <div key={i}>• {log}</div>)
              )}
            </div>
          )}

          {activeTab === "Evidence" && (
            <div className="text-[11px] text-[#8A9098]">
              Immutable Evidence Proofs loaded. Select evidence entity from inspector to examine SHA256 hashes.
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="text-[11px] text-[#8A9098]">
              Chronological Experience Timeline synchronized with active concept.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
