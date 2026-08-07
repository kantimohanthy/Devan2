"use client";

import { useState } from "react";
import { CommandBar } from "./CommandBar";
import { FilterRail, FilterState } from "./FilterRail";
import { GraphCanvas, NodeItem } from "./GraphCanvas";
import { IntelligencePanel } from "./IntelligencePanel";
import { StatusStrip } from "./StatusStrip";
import { CommandPalette } from "./CommandPalette";
import { knowledgeNodes } from "@/data/content";

export function DevanShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Knowledge");
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    domains: new Set(),
    minEvidenceDepth: 0,
    minWeight: 0,
  });

  const handleSelectNodeById = (nodeId: string) => {
    const kn = knowledgeNodes.find((n) => n.id === nodeId);
    if (kn) {
      setSelectedNode({
        id: kn.id,
        label: kn.label,
        summary: kn.summary,
        type: kn.projects.length > 0 ? "project" : "concept",
        domain: kn.domain,
        evidenceDepth: 4,
        density: 85,
        x: 500,
        y: 350,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0A0B0D] overflow-hidden text-[#F5F5F5]">
      {/* Region 1: Top Command Bar (56px) */}
      <CommandBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Fluid Region: Filter Rail + Canvas + Intelligence Panel */}
      <div className="flex flex-1 w-full h-[calc(100vh-84px)] overflow-hidden relative">
        {/* Region 2: Filter Rail (240px) */}
        <FilterRail filters={filters} setFilters={setFilters} />

        {/* Region 3: Fluid Knowledge Graph Canvas */}
        <GraphCanvas
          filters={filters}
          searchQuery={searchQuery}
          selectedNodeId={selectedNode?.id ?? null}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        {/* Region 4: Intelligence Panel (360px) */}
        <IntelligencePanel
          selectedNode={selectedNode}
          onSelectNode={(node) => setSelectedNode(node)}
        />
      </div>

      {/* Region 5: Bottom Status Strip (28px) */}
      <StatusStrip filteredCount={12} />

      {/* Global Cmd+K Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectNode={handleSelectNodeById}
      />
    </div>
  );
}
