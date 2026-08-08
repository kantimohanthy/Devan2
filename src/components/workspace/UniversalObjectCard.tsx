"use client";

import React from "react";
import { Network, Terminal, ShieldCheck, Target, Boxes, Layers, FileText, ArrowUpRight } from "lucide-react";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { useRouter } from "next/navigation";

export interface UniversalObjectData {
  id: string;
  type: "CONCEPT" | "REPOSITORY" | "EXPERIMENT" | "EVIDENCE" | "MISSION" | "RFC" | "PROJECT" | "EXECUTION_STACK";
  title: string;
  subtitle?: string;
  status?: string;
  confidence?: number;
  evidenceCount?: number;
  tags?: string[];
  href: string;
}

export function UniversalObjectCard({ data }: { data: UniversalObjectData }) {
  const router = useRouter();

  const handleSelect = () => {
    const state = workspaceStore.getState();
    const existing = state.openTabs.find((t) => t.id === data.id);
    const updatedTabs = [...state.openTabs];
    if (!existing) {
      updatedTabs.push({
        id: data.id,
        title: data.title,
        type: (data.type === "REPOSITORY" || data.type === "PROJECT" ? "CONCEPT" : data.type) as "CONCEPT" | "EXPERIMENT" | "EVIDENCE" | "MISSION" | "GRAPH" | "EXECUTION_STACK",
        href: data.href,
      });
    }

    workspaceStore.setState({
      openTabs: updatedTabs,
      activeTabId: data.id,
      selectedConceptId: data.id,
    });

    router.push(data.href);
  };

  const renderIcon = () => {
    switch (data.type) {
      case "CONCEPT":
        return <Network className="h-4 w-4 text-[#4F8CFF]" />;
      case "EXECUTION_STACK":
        return <Terminal className="h-4 w-4 text-emerald-400" />;
      case "EVIDENCE":
        return <ShieldCheck className="h-4 w-4 text-amber-400" />;
      case "MISSION":
        return <Target className="h-4 w-4 text-cyan-400" />;
      case "PROJECT":
        return <Boxes className="h-4 w-4 text-purple-400" />;
      case "REPOSITORY":
        return <Layers className="h-4 w-4 text-blue-400" />;
      default:
        return <FileText className="h-4 w-4 text-[#8A9098]" />;
    }
  };

  return (
    <div
      onClick={handleSelect}
      className="group relative rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-4 font-mono text-xs cursor-pointer hover:border-[#4F8CFF] transition-all space-y-3 shadow-lg hover:shadow-2xl"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-[#121418] p-2 border border-[#20252B]">{renderIcon()}</div>
          <div>
            <h4 className="font-bold text-[#F5F5F5] group-hover:text-[#4F8CFF] transition-colors">{data.title}</h4>
            {data.subtitle && <p className="text-[10px] text-[#8A9098] line-clamp-1">{data.subtitle}</p>}
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-[#8A9098] group-hover:text-[#4F8CFF] transition-colors" />
      </div>

      {data.tags && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {data.tags.map((tag) => (
            <span key={tag} className="rounded bg-[#121418] px-2 py-0.5 text-[9px] text-[#8A9098] border border-[#20252B]">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-[#20252B] pt-2 text-[10px] text-[#8A9098]">
        {data.status && (
          <span className="rounded bg-[#161B22] px-1.5 py-0.5 text-emerald-400 border border-[#20252B]">
            {data.status}
          </span>
        )}
        {data.confidence !== undefined && <span className="text-amber-400">{data.confidence}% Confidence</span>}
        {data.evidenceCount !== undefined && <span>{data.evidenceCount} Ground Proofs</span>}
      </div>
    </div>
  );
}
