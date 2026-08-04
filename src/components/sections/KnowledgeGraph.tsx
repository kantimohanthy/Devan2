"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState, useCallback, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { knowledgeNodes, knowledgeEdges } from "@/data/content";
import type { NodeId } from "@/data/types";
import { AnimatePresence, motion } from "framer-motion";
import { usePresence } from "@/hooks/usePresence";

// react-force-graph touches window at import time — must be client-only, no SSR
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const nodeById = Object.fromEntries(knowledgeNodes.map((n) => [n.id, n]));

export function KnowledgeGraph() {
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

    return {
      nodes: knowledgeNodes.map((n) => ({
        id: n.id,
        label: n.label,
        summary: n.summary,
        dimmed: activeNodeId ? !connected.has(n.id) : false,
      })),
      links: knowledgeEdges.map((e) => ({
        source: e.from,
        target: e.to,
        label: e.label,
        dimmed: activeNodeId
          ? !(e.from === activeNodeId || e.to === activeNodeId)
          : false,
      })),
    };
  }, [activeNodeId]);

  const handleNodeClick = useCallback((node: any) => {
    if (node && node.id) {
      setActiveNodeId(node.id);
    }
  }, []);

  return (
    <Section
      id="knowledge-graph"
      eyebrow="02 · Knowledge Graph"
      reveal="focus"
      title="One connected map, not eight separate résumés"
      description="These disciplines don't sit in isolation — every edge here is a real project that pulled two of them together. Click a node to explore connections."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 lg:col-span-3">
          {/* Peer presence indicator */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/70 backdrop-blur">
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
                ? "#4F8CFF"
                : n.dimmed
                ? "rgba(255,255,255,0.15)"
                : "#ffffff"
            }
            nodeRelSize={7}
            linkColor={(l: any) =>
              l.dimmed ? "rgba(255,255,255,0.05)" : "#4F8CFF"
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
              className="rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-400">
                {activeNode.summary}
              </p>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {activeNode.label}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-white/70">
                {activeNode.detail}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeNode.projects.map((p) => (
                  <Tag key={p} tone="accent">
                    {p}
                  </Tag>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-white/40">
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
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 hover:border-white/30 hover:text-white transition-colors"
                        >
                          {otherNode?.label}
                          <span className="ml-1 text-white/40">· {e.label}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
