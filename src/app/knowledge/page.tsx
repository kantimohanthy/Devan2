"use client";

import React, { useEffect, useState } from "react";
import { ContextInspector } from "@/components/workspace/ContextInspector";
import { KnowledgeBreadcrumbs } from "@/components/workspace/KnowledgeBreadcrumbs";
import { DensityToggle } from "@/components/workspace/DensityToggle";
import { QuickPeekCard } from "@/components/workspace/QuickPeekCard";
import { ontologyEngine } from "@/lib/ontology";
import { OntologyEntity } from "@/lib/ontology/types";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { BookOpen, Terminal, FileText, ShieldCheck } from "lucide-react";

export default function KnowledgePage() {
  const [concepts, setConcepts] = useState<OntologyEntity[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<OntologyEntity | undefined>(undefined);

  useEffect(() => {
    const all = ontologyEngine.getAllEntities();
    setConcepts(all);

    const loadState = () => {
      const state = workspaceStore.getState();
      const current = ontologyEngine.getEntity(state.selectedConceptId) || all[0];
      setSelectedConcept(current);
    };

    loadState();
    return workspaceStore.subscribe(loadState);
  }, []);

  const handleSelect = (id: string) => {
    workspaceStore.setState({ selectedConceptId: id });
    setSelectedConcept(ontologyEngine.getEntity(id));
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left Concept Tree Panel */}
      <div className="w-64 border-r border-[#20252B] p-4 font-mono text-xs space-y-3 shrink-0">
        <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-[#4F8CFF]" /> Concept Index
        </span>
        <div className="space-y-1 overflow-y-auto max-h-[700px]">
          {concepts.map((c) => {
            const isSelected = selectedConcept?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`w-full text-left rounded-lg px-2.5 py-1.5 transition-colors text-[11px] ${
                  isSelected ? "bg-[#20252B] text-[#4F8CFF] font-semibold" : "text-[#8A9098] hover:text-[#F5F5F5]"
                }`}
              >
                {c.title || c.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Main Workspace */}
      <div className="flex-1 space-y-4">
        <KnowledgeBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Knowledge Workspace", href: "/knowledge" },
            { label: selectedConcept?.title || "Concept" },
          ]}
        />

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#F5F5F5] font-mono">{selectedConcept?.title}</h1>
          <DensityToggle />
        </div>

        <p className="text-xs text-[#8A9098] font-mono leading-relaxed">{selectedConcept?.summary}</p>

        {/* Diagnostic Tools & RFCs */}
        <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-2">
            <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-purple-400" /> Observability & Tools
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(selectedConcept?.details?.debuggingTechniques || ["dig", "tshark", "perf"]).map((t) => (
                <span key={t} className="rounded bg-[#121418] px-2 py-1 text-[11px] text-[#4F8CFF] border border-[#20252B]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 space-y-2">
            <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-emerald-400" /> Ground References
            </span>
            <div className="space-y-1 text-[11px] text-[#8A9098]">
              {(selectedConcept?.details?.externalReferences || []).map((r) => (
                <div key={r.title}>• {r.title} ({r.identifier})</div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Quick Peek Preview */}
        <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 font-mono text-xs space-y-2">
          <span className="text-[10px] uppercase text-[#8A9098] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Topological Dependencies
          </span>
          <div className="flex items-center gap-3">
            <span>Prerequisite:</span>
            <QuickPeekCard conceptId="networking.dns">
              <span>networking.dns</span>
            </QuickPeekCard>
            <span>→</span>
            <QuickPeekCard conceptId="networking.tcp">
              <span>networking.tcp</span>
            </QuickPeekCard>
          </div>
        </div>
      </div>

      {/* Right Synchronized Context Inspector Panel */}
      <ContextInspector />
    </div>
  );
}
