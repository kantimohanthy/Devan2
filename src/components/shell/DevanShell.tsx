"use client";

import { useState } from "react";
import { CommandBar } from "./CommandBar";
import { FilterRail, FilterState } from "./FilterRail";
import { GraphCanvas, NodeItem } from "./GraphCanvas";
import { IntelligencePanel } from "./IntelligencePanel";
import { StatusStrip } from "./StatusStrip";
import { CommandPalette } from "./CommandPalette";
import { HIERARCHICAL_KNOWLEDGE_NODES } from "@/data/hierarchical-graph";
import { knowledgeNodes } from "@/data/content";

export function DevanShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Knowledge");
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    domains: new Set(),
    showAllNodes: false,
  });

  const handleSelectNodeById = (nodeId: string) => {
    const hNode = HIERARCHICAL_KNOWLEDGE_NODES.find((n) => n.id === nodeId);
    if (hNode) {
      setSelectedNode({
        id: hNode.id,
        label: hNode.label,
        kind: hNode.kind,
        summary: hNode.summary,
        detail: hNode.detail,
        domain: hNode.domain,
        evidenceDepth: hNode.evidenceDepth,
        density: hNode.density,
        featured: true,
        x: 500,
        y: 350,
      });
      return;
    }

    const kn = knowledgeNodes.find((n) => n.id === nodeId);
    if (kn) {
      setSelectedNode({
        id: kn.id,
        label: kn.label,
        kind: kn.projects.length > 0 ? "repository" : "technology",
        summary: kn.summary,
        detail: kn.detail,
        domain: kn.domain,
        evidenceDepth: 4,
        density: 85,
        featured: true,
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

        {/* Region 3: Hierarchical Knowledge Map Canvas */}
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
      <StatusStrip filteredCount={HIERARCHICAL_KNOWLEDGE_NODES.length} />

      {/* Global Cmd+K Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectNode={handleSelectNodeById}
      />
    </div>
  );
}
