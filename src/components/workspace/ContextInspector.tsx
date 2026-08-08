"use client";

import React, { useEffect, useState } from "react";
import { queryEngine } from "@/lib/query/client-query-engine";
import { ContextInspectorViewModel } from "@/lib/query/projections/context-inspector.projection";
import { Network, FileText, ShieldCheck, Terminal, Award, Briefcase } from "lucide-react";
import { workspaceStore } from "@/lib/workspace/workspace-store";

export function ContextInspector() {
  const [context, setContext] = useState<ContextInspectorViewModel | null>(null);

  useEffect(() => {
    const loadContext = async () => {
      const state = workspaceStore.getState();
      const res = await queryEngine.queryContext(state.selectedConceptId);
      setContext(res.data);
    };

    loadContext();
    return workspaceStore.subscribe(loadContext);
  }, []);

  if (!context) {
    return (
      <div className="w-80 border-l border-[#20252B] bg-[#0A0B0D]/60 p-4 font-mono text-xs text-[#8A9098]">
        Loading Context Inspector...
      </div>
    );
  }

  return (
    <aside className="w-80 border-l border-[#20252B] bg-[#0A0B0D]/80 p-4 font-mono text-xs space-y-5 overflow-y-auto">
      {/* Target Concept Summary */}
      <div className="space-y-1.5 border-b border-[#20252B] pb-3">
        <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
          <Network className="h-3.5 w-3.5 text-[#4F8CFF]" /> Active Intelligence Target
        </span>
        <h4 className="text-sm font-semibold text-[#F5F5F5]">{context.targetConcept?.title || "Networking Concept"}</h4>
        <p className="text-[11px] text-[#8A9098] line-clamp-2">{context.targetConcept?.summary}</p>
      </div>

      {/* Active Execution Stack */}
      {context.executionStacks.length > 0 && (
        <div className="space-y-2 border-b border-[#20252B] pb-3">
          <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" /> Active Execution Path
          </span>
          <div className="rounded bg-[#121418] p-2 border border-[#20252B] space-y-1">
            <div className="text-[11px] text-[#F5F5F5] font-semibold">{context.executionStacks[0].title}</div>
            <div className="text-[10px] text-[#8A9098]">{context.executionStacks[0].purpose}</div>
          </div>
        </div>
      )}

      {/* Verification Evidence */}
      {context.evidenceList.length > 0 && (
        <div className="space-y-2 border-b border-[#20252B] pb-3">
          <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Ground Proof Evidence
          </span>
          {context.evidenceList.slice(0, 2).map((ev) => (
            <div key={ev.id} className="rounded bg-[#121418] p-2 border border-[#20252B] space-y-1">
              <div className="text-[11px] text-[#F5F5F5] font-semibold">{ev.title}</div>
              <div className="flex items-center justify-between text-[10px] text-[#8A9098]">
                <span>{ev.type}</span>
                <span className="text-emerald-400">{ev.verificationLevel}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diagnostic Tools & Commands */}
      <div className="space-y-2 border-b border-[#20252B] pb-3">
        <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-purple-400" /> Observability & Tools
        </span>
        <div className="flex flex-wrap gap-1">
          {context.diagnosticTools.map((tool) => (
            <span key={tool} className="rounded bg-[#20252B] px-2 py-0.5 text-[10px] text-[#4F8CFF]">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* RFC & Standards */}
      {context.rfcsAndManPages.length > 0 && (
        <div className="space-y-2 border-b border-[#20252B] pb-3">
          <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-[#8A9098]" /> Standards & Man Pages
          </span>
          <div className="space-y-1">
            {context.rfcsAndManPages.map((ref) => (
              <div key={ref} className="text-[10px] text-[#8A9098] hover:text-[#4F8CFF] cursor-pointer">
                • {ref}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Mapping */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-cyan-400" /> Career Engineering Role
        </span>
        <div className="flex flex-wrap gap-1">
          {context.careerImpact.map((role) => (
            <span key={role} className="rounded bg-[#161B22] px-2 py-0.5 text-[10px] text-emerald-400 border border-[#20252B]">
              {role}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
