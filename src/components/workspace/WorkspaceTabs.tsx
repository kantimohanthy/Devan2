"use client";

import React, { useEffect, useState } from "react";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { WorkspaceTab } from "@/lib/workspace/workspace-state";
import { X, Network, Terminal, ShieldCheck, Target, Waypoints } from "lucide-react";
import { useRouter } from "next/navigation";

export function WorkspaceTabs() {
  const [tabs, setTabs] = useState<WorkspaceTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setTabs(workspaceStore.getState().openTabs);
    setActiveTabId(workspaceStore.getState().activeTabId);

    return workspaceStore.subscribe((state) => {
      setTabs(state.openTabs);
      setActiveTabId(state.activeTabId);
    });
  }, []);

  const handleSelectTab = (tab: WorkspaceTab) => {
    workspaceStore.setState({ activeTabId: tab.id, selectedConceptId: tab.id });
    router.push(tab.href);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    const updated = tabs.filter((t) => t.id !== tabId);
    const nextActive = updated.length > 0 ? updated[updated.length - 1].id : "";
    workspaceStore.setState({ openTabs: updated, activeTabId: nextActive });
  };

  const renderIcon = (type: WorkspaceTab["type"]) => {
    switch (type) {
      case "CONCEPT":
        return <Network className="h-3 w-3 text-[#4F8CFF]" />;
      case "EXECUTION_STACK":
        return <Terminal className="h-3 w-3 text-emerald-400" />;
      case "EVIDENCE":
        return <ShieldCheck className="h-3 w-3 text-amber-400" />;
      case "MISSION":
        return <Target className="h-3 w-3 text-cyan-400" />;
      default:
        return <Waypoints className="h-3 w-3 text-purple-400" />;
    }
  };

  return (
    <div className="flex items-center gap-1 border-b border-[#20252B] bg-[#0A0B0D] px-2 font-mono text-xs overflow-x-auto select-none shrink-0 h-9">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => handleSelectTab(tab)}
            className={`group flex items-center gap-2 rounded-t-lg border-t border-x px-3 py-1.5 cursor-pointer transition-colors ${
              isActive
                ? "border-[#20252B] bg-[#121418] text-[#F5F5F5] font-semibold"
                : "border-transparent text-[#8A9098] hover:text-[#F5F5F5] hover:bg-[#121418]/50"
            }`}
          >
            {renderIcon(tab.type)}
            <span className="truncate max-w-[140px] text-[11px]">{tab.title}</span>
            <button
              onClick={(e) => handleCloseTab(e, tab.id)}
              className="rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-[#20252B] transition-opacity"
            >
              <X className="h-3 w-3 text-[#8A9098]" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
