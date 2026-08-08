"use client";

import React from "react";
import { ReactGraph } from "@/components/workspace/ReactGraph";
import { ContextInspector } from "@/components/workspace/ContextInspector";
import { KnowledgeBreadcrumbs } from "@/components/workspace/KnowledgeBreadcrumbs";
import { DensityToggle } from "@/components/workspace/DensityToggle";
import { Waypoints } from "lucide-react";

export default function VisualizationPage() {
  return (
    <div className="flex h-full gap-6">
      {/* Main Workspace */}
      <div className="flex-1 space-y-4">
        <KnowledgeBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Atlas", href: "/visualization" },
            { label: "Interactive Knowledge Graph" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#F5F5F5] flex items-center gap-2 font-mono">
              <Waypoints className="h-5 w-5 text-[#4F8CFF]" /> Cognitive Atlas Knowledge Graph
            </h1>
            <p className="text-xs text-[#8A9098] font-mono">
              Interactive 2D topological mapping of concepts, RFC standards, protocol dependencies, and ground evidence.
            </p>
          </div>
          <DensityToggle />
        </div>

        <ReactGraph width={900} height={600} />
      </div>

      {/* Synchronized Context Inspector Panel */}
      <ContextInspector />
    </div>
  );
}
