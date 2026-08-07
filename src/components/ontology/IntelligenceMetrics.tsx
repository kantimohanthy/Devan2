"use client";

import { COGNITIVE_METRICS } from "@/lib/ontology/store";

export function IntelligenceMetrics() {
  const metrics = [
    { label: "Domains", value: COGNITIVE_METRICS.domains },
    { label: "Evidence Records", value: COGNITIVE_METRICS.evidenceRecords },
    { label: "Experiments", value: COGNITIVE_METRICS.experiments },
    { label: "Artifacts", value: COGNITIVE_METRICS.artifacts.toLocaleString() },
    { label: "Verified Claims", value: COGNITIVE_METRICS.verifiedClaims },
    { label: "Repositories", value: COGNITIVE_METRICS.repositories },
    { label: "Books Indexed", value: COGNITIVE_METRICS.booksIndexed },
    { label: "Research Papers", value: COGNITIVE_METRICS.researchPapers },
    { label: "Knowledge Connections", value: COGNITIVE_METRICS.knowledgeConnections.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 font-mono text-xs">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-[#20252B] bg-[#0A0B0D] p-2.5 hover:border-[#4F8CFF]/50 transition-colors"
        >
          <span className="text-[10px] text-[#8A9098] uppercase block truncate">{m.label}</span>
          <span className="text-sm font-bold text-[#F5F5F5] mt-0.5 block">{m.value}</span>
        </div>
      ))}
    </div>
  );
}
