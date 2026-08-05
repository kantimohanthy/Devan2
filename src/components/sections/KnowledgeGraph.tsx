"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState, useCallback, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { knowledgeNodes, knowledgeEdges } from "@/data/content";
import type { NodeId, Domain } from "@/data/types";
import { AnimatePresence, motion } from "framer-motion";
import { usePresence } from "@/hooks/usePresence";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const nodeById = Object.fromEntries(knowledgeNodes.map((n) => [n.id, n]));

interface KnowledgeGraphProps {
  headless?: boolean;
  filterDomain?: Domain | null;
}

export function KnowledgeGraph({
  headless = false,
  filterDomain = null,
}: KnowledgeGraphProps) {
  const [activeNodeId, setActiveNodeId] = useState<NodeId>("networking");
  const fgRef = useRef<any>(null);
  const peers = usePresence(activeNodeId);

  const activeNode = nodeById[activeNodeId] || knowledgeNodes[0];

  const graphData = useMemo(() => {
    const connected = new Set<string>();
    if (activeNodeId) {
      connected.add(activeNodeId);
      knowledgeEdges.forEach((e) => {
        if (e.from === activeNodeId) connected.add(e.to);
        if (e.to === activeNodeId) connected.add(e.from);
      });
    }

    const filteredNodeIds = filterDomain
      ? new Set(knowledgeNodes.filter((n) => n.domain === filterDomain).map((n) => n.id))
      : null;

    return {
      nodes: knowledgeNodes.map((n) => {
        const matchesFilter = !filteredNodeIds || filteredNodeIds.has(n.id);
        return {
          id: n.id,
          label: n.label,
          summary: n.summary,
          dimmed: activeNodeId
            ? !connected.has(n.id) || !matchesFilter
            : !matchesFilter,
          highlighted: matchesFilter && filterDomain !== null,
        };
      }),
      links: knowledgeEdges.map((e) => ({
        source: e.from,
        target: e.to,
        label: e.label,
        dimmed: activeNodeId
          ? !(e.from === activeNodeId || e.to === activeNodeId)
          : false,
      })),
    };
  }, [activeNodeId, filterDomain]);

  const handleNodeClick = useCallback((node: any) => {
    if (node && node.id) {
      setActiveNodeId(node.id);
    }
  }, []);

  const content = (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="relative h-[480px] w-full overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface-quiet)] lg:col-span-3">
        {/* Peer presence indicator */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-[var(--text-dim)] backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {peers.length > 0
              ? `${peers.length} peer${peers.length > 1 ? "s" : ""} exploring live`
              : "Live topology active"}
          </span>
        </div>

        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={(n: any) => `${n.label}\n${n.summary}`}
          nodeColor={(n: any) =>
            n.id === activeNodeId
              ? "#4C8BF5"
              : n.highlighted
              ? "#E8A33D"
              : n.dimmed
              ? "rgba(255,255,255,0.12)"
              : "#ffffff"
          }
          nodeRelSize={7}
          linkColor={(l: any) =>
            l.dimmed ? "rgba(255,255,255,0.04)" : "rgba(76,139,245,0.5)"
          }
          linkWidth={(l: any) => (l.dimmed ? 0.5 : 1.8)}
          linkDirectionalParticles={(l: any) => (l.dimmed ? 0 : 2)}
          linkDirectionalParticleSpeed={0.004}
          onNodeClick={handleNodeClick}
          onBackgroundClick={() => {}}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          backgroundColor="rgba(0,0,0,0)"
        />
      </div>

      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 backdrop-blur"
          >
            <p className="mb-1 text-xs font-mono font-medium uppercase tracking-wide text-[var(--signal-blue)]">
              {activeNode.summary}
            </p>
            <h3 className="mb-3 text-xl font-semibold text-[var(--text)]">
              {activeNode.label}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-[var(--text-dim)]">
              {activeNode.detail}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeNode.projects.map((p) => (
                <Tag key={p} tone="accent">
                  {p}
                </Tag>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--hairline)] pt-4">
              <p className="mb-2 text-xs uppercase tracking-wide text-[var(--text-faint)]">
                Connected to
              </p>
              <div className="flex flex-wrap gap-2">
                {knowledgeEdges
                  .filter((e) => e.from === activeNodeId || e.to === activeNodeId)
                  .map((e) => {
                    const otherId = e.from === activeNodeId ? e.to : e.from;
                    const otherNode = nodeById[otherId];
                    return (
                      <button
                        key={otherId}
                        onClick={() => setActiveNodeId(otherId)}
                        className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-[var(--text-dim)] hover:border-white/30 hover:text-[var(--text)] transition-colors"
                      >
                        {otherNode?.label}
                        <span className="ml-1 text-[var(--text-faint)]">· {e.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  if (headless) {
    return content;
  }

  return (
    <Section
      id="knowledge-graph"
      eyebrow="02 · Knowledge Graph"
      reveal="focus"
      title="One connected map, not eight separate résumés"
      description="These disciplines don't sit in isolation — every edge here is a real project that pulled two of them together. Click a node to explore connections."
    >
      {content}
    </Section>
  );
}
