"use client";

import React, { useState } from "react";
import { ontologyEngine } from "@/lib/ontology";
import { OntologyEntity } from "@/lib/ontology/types";
import { Info } from "lucide-react";

interface QuickPeekCardProps {
  conceptId: string;
  children: React.ReactNode;
}

export function QuickPeekCard({ conceptId, children }: QuickPeekCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [concept, setConcept] = useState<OntologyEntity | undefined>(undefined);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!concept) {
      setConcept(ontologyEngine.getEntity(conceptId));
    }
  };

  return (
    <span className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsHovered(false)}>
      <span className="cursor-pointer text-[#4F8CFF] underline decoration-dotted underline-offset-4 hover:text-[#70A3FF]">
        {children}
      </span>

      {isHovered && concept && (
        <div className="absolute left-0 top-full z-40 mt-1 w-72 rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3 shadow-2xl font-mono text-xs space-y-2 pointer-events-none">
          <div className="flex items-center justify-between border-b border-[#20252B] pb-1.5">
            <span className="font-semibold text-[#F5F5F5] flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-[#4F8CFF]" /> {concept.title}
            </span>
            <span className="rounded bg-[#20252B] px-1.5 py-0.5 text-[9px] text-emerald-400">{concept.domain}</span>
          </div>
          <p className="text-[10px] text-[#8A9098] line-clamp-2">{concept.summary}</p>
          {concept.details?.debuggingTechniques && (
            <div className="flex flex-wrap gap-1 pt-1">
              {concept.details.debuggingTechniques.map((t) => (
                <span key={t} className="rounded bg-[#121418] px-1.5 py-0.5 text-[9px] text-purple-400 border border-[#20252B]">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </span>
  );
}
