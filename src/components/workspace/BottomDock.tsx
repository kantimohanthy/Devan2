"use client";

import React, { useEffect, useState } from "react";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { Terminal, ShieldCheck, History, Activity, ChevronUp, ChevronDown } from "lucide-react";

export function BottomDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "Terminal" | "Evidence" | "Timeline" | "Logs" | "Diagnostics" | "Activity" | "Experiments"
  >("Terminal");
  const [logs] = useState<string[]>([]);

  useEffect(() => {
    setIsOpen(workspaceStore.getState().dockOpen);
    const tab = workspaceStore.getState().dockActiveTab;
    if (tab === "Oracle" as unknown) {
      setActiveTab("Terminal");
    } else {
      setActiveTab(tab as typeof activeTab);
    }

    return workspaceStore.subscribe((state) => {
      setIsOpen(state.dockOpen);
      if (state.dockActiveTab === "Oracle" as unknown) {
        setActiveTab("Terminal");
      } else {
        setActiveTab(state.dockActiveTab as typeof activeTab);
      }
    });
  }, []);

  const tabs = [
    { id: "Terminal", icon: Terminal },
    { id: "Evidence", icon: ShieldCheck },
    { id: "Timeline", icon: History },
    { id: "Logs", icon: Activity },
  ] as const;

  return (
    <div className="border-t border-[#20252B] bg-[#0A0B0D]/95 font-mono text-xs shrink-0 select-none">
      {/* Dock Bar Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#20252B] px-3 py-1.5 min-h-9 overflow-x-auto">
        <div className="flex items-center gap-1 shrink-0">
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
          aria-label={isOpen ? "Collapse bottom dock" : "Expand bottom dock"}
          className="rounded p-1 text-[#8A9098] hover:text-[#F5F5F5]"
        >
          {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Dock Content Window */}
      {isOpen && (
        <div className="h-44 p-4 overflow-y-auto bg-[#07080A]">
          {activeTab === "Terminal" && (
            <div className="font-mono text-[11px] text-emerald-400 space-y-1">
              <div>devan@os-kernel:~$ dig +trace example.com</div>
              <div>devan@os-kernel:~$ ss -tani state established</div>
              <div>devan@os-kernel:~$ tshark -i eth0 -f &apos;port 53&apos;</div>
              <div className="text-[#8A9098]">Interactive terminal session ready.</div>
            </div>
          )}

          {activeTab === "Logs" && (
            <div className="space-y-1 text-[10px] text-[#8A9098]">
              {logs.length === 0 ? (
                <div>No session logs recorded in active session.</div>
              ) : (
                logs.map((log, i) => <div key={i}>• {log}</div>)
              )}
            </div>
          )}

          {activeTab === "Evidence" && (
            <div className="text-[11px] text-[#8A9098]">
              Evidence records loaded. Inspect verified claims and derived evidence states on /evidence.
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="text-[11px] text-[#8A9098]">
              Chronological experience and education milestones.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
