"use client";

import React, { useState } from "react";
import Link from "next/link";
import { atlasEdges, atlasNodes, type AtlasNode } from "@/content";
import { EvidenceMarker } from "./EvidenceModeProvider";

export function DevanAtlasClient({ initialNodeId }: { initialNodeId?: string }) {
  const [selectedId, setSelectedId] = useState<string>(initialNodeId || atlasNodes[0].id);
  const activeNode: AtlasNode = atlasNodes.find((n) => n.id === selectedId) ?? atlasNodes[0];

  const incoming = atlasEdges.filter((e) => e.to === activeNode.id);
  const outgoing = atlasEdges.filter((e) => e.from === activeNode.id);

  return (
    <div className="space-y-12">
      {/* Curated Deterministic Graph + Inspector */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-start">
        <div className="min-w-0 rounded-lg border border-ivory/15 bg-[#181613] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-ivory/10 pb-2.5 font-mono text-[11px] uppercase tracking-wider text-ivory-3">
            <span>DEVAN Atlas Topology · {atlasNodes.length} nodes · {atlasEdges.length} typed edges</span>
            <span>Deterministic layout (not force simulation)</span>
          </div>

          <div className="overflow-x-auto rounded border border-ivory/10 bg-[#11100E]">
            <svg
              viewBox="0 0 1000 560"
              className="min-w-[680px] w-full h-auto block"
              role="group"
              aria-label="DEVAN curated ontology graph: projects, decisions and concepts, artifacts"
            >
              <title>DEVAN Curated Engineering Atlas</title>
              <desc>
                Three columns mapping Projects (left) to Decisions and Concepts (middle) to Artifacts (right). Press Enter or click any node to inspect links.
              </desc>

              {/* Column Header Annotations */}
              <text x="165" y="34" textAnchor="middle" fontSize="11.5" fill="#A89F8D" fontFamily="JetBrains Mono Variable, monospace">
                01 · PROJECTS
              </text>
              <text x="500" y="34" textAnchor="middle" fontSize="11.5" fill="#A89F8D" fontFamily="JetBrains Mono Variable, monospace">
                02 · DECISIONS &amp; CONCEPTS
              </text>
              <text x="835" y="34" textAnchor="middle" fontSize="11.5" fill="#A89F8D" fontFamily="JetBrains Mono Variable, monospace">
                03 · ARTIFACTS
              </text>

              {/* Vertical tier guidelines */}
              <line x1="330" y1="22" x2="330" y2="540" stroke="rgba(242,235,220,0.06)" strokeDasharray="3 5" />
              <line x1="670" y1="22" x2="670" y2="540" stroke="rgba(242,235,220,0.06)" strokeDasharray="3 5" />

              {/* Edges */}
              {atlasEdges.map((edge) => {
                const a = atlasNodes.find((n) => n.id === edge.from);
                const b = atlasNodes.find((n) => n.id === edge.to);
                if (!a || !b) return null;
                const active = edge.from === activeNode.id || edge.to === activeNode.id;
                const sameCol = Math.abs(a.x - b.x) < 20;
                const d = sameCol
                  ? `M ${a.x - 10} ${a.y} Q ${a.x - 95} ${(a.y + b.y) / 2} ${b.x - 10} ${b.y}`
                  : `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;
                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={d}
                    fill="none"
                    stroke={active ? "#E8923A" : "#569AA3"}
                    strokeOpacity={active ? 0.95 : 0.35}
                    strokeWidth={active ? 2.2 : 1.25}
                  />
                );
              })}

              {/* Nodes */}
              {atlasNodes.map((node) => {
                const isSel = node.id === activeNode.id;
                const isNeighbor =
                  incoming.some((e) => e.from === node.id) ||
                  outgoing.some((e) => e.to === node.id);

                return (
                  <g
                    key={node.id}
                    data-atlas-graph-node={node.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${node.title} (${node.kind})`}
                    onClick={() => setSelectedId(node.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(node.id);
                      }
                    }}
                    className="cursor-pointer outline-none [&:focus-visible>rect.node-box]:stroke-[#F2A65A] [&:focus-visible>rect.node-box]:stroke-[2.5]"
                  >
                    <rect
                      className="node-box"
                      x={node.x - 110}
                      y={node.y - 26}
                      width="220"
                      height="52"
                      rx="6"
                      fill={isSel ? "#211E1A" : "#181613"}
                      stroke={isSel ? "#E8923A" : isNeighbor ? "#7AC4CC" : "rgba(242,235,220,0.22)"}
                      strokeWidth={isSel ? 2.2 : 1.25}
                    />
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fontSize="12.5"
                      fontWeight="600"
                      fill={isSel ? "#F2EBDC" : "#CBC2AF"}
                      fontFamily="Inter Variable, sans-serif"
                    >
                      {node.title}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 14}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#A89F8D"
                      fontFamily="JetBrains Mono Variable, monospace"
                    >
                      {node.kind} · {node.status || "tracked"}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="mt-2 font-mono text-[11px] text-ivory-3">
            Tip: On mobile or smaller screens, scroll horizontally inside the topology or use the synchronized structured index below.
          </p>
        </div>

        {/* Synchronized Readable Node Inspector Panel */}
        <aside
          aria-live="polite"
          className="min-w-0 rounded-lg border border-ivory/15 bg-[#181613] p-5 sm:p-6 space-y-5"
        >
          <div className="flex items-start justify-between gap-3 border-b border-ivory/10 pb-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#F2A65A]">
                Selected {activeNode.kind} · {activeNode.id}
              </p>
              <h2 className="display mt-1 text-[26px] leading-tight text-ivory">
                {activeNode.title}
                <EvidenceMarker ids={activeNode.evidenceIds} />
              </h2>
            </div>
            {activeNode.status && (
              <span className="stamp border-ivory/25 text-ivory-2">{activeNode.status}</span>
            )}
          </div>

          <p className="text-[15px] leading-relaxed text-ivory-2">{activeNode.summary}</p>

          {activeNode.details.length > 0 && (
            <ul className="space-y-2 text-[14px] leading-relaxed text-ivory-2">
              {activeNode.details.map((d) => (
                <li key={d} className="relative pl-4">
                  <span aria-hidden className="absolute left-0 text-teal">◆</span>
                  {d}
                </li>
              ))}
            </ul>
          )}

          {(outgoing.length > 0 || incoming.length > 0) && (
            <div className="space-y-3 border-t border-ivory/10 pt-4">
              <p className="note">Connected nodes</p>
              <div className="flex flex-wrap gap-2">
                {outgoing.map((e) => {
                  const target = atlasNodes.find((n) => n.id === e.to);
                  if (!target) return null;
                  return (
                    <button
                      key={`out-${e.to}`}
                      type="button"
                      onClick={() => setSelectedId(target.id)}
                      className="rounded border border-teal/40 bg-teal/10 px-2.5 py-1.5 font-mono text-[11.5px] text-teal hover:bg-teal/20"
                    >
                      → {e.relation}: {target.title}
                    </button>
                  );
                })}
                {incoming.map((e) => {
                  const src = atlasNodes.find((n) => n.id === e.from);
                  if (!src) return null;
                  return (
                    <button
                      key={`in-${e.from}`}
                      type="button"
                      onClick={() => setSelectedId(src.id)}
                      className="rounded border border-ivory/20 px-2.5 py-1.5 font-mono text-[11.5px] text-ivory-2 hover:border-ivory"
                    >
                      ← {src.title} ({e.relation})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-ivory/10 pt-4 font-mono text-[12px]">
            <Link
              href={activeNode.url}
              className="inline-flex min-h-[42px] items-center rounded-full bg-[#F2EBDC] px-4 font-medium text-[#11100E] hover:bg-[#F2A65A]"
            >
              Open permalink URL →
            </Link>
            {activeNode.externalHref && (
              activeNode.externalHref.startsWith("http") ? (
                <a
                  href={activeNode.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center rounded-full border border-ivory/25 px-4 text-ivory hover:border-teal"
                >
                  {activeNode.externalLabel || "Inspect external"} ↗
                </a>
              ) : (
                <Link
                  href={activeNode.externalHref}
                  className="inline-flex min-h-[42px] items-center rounded-full border border-ivory/25 px-4 text-ivory hover:border-teal"
                >
                  {activeNode.externalLabel || "Inspect"} →
                </Link>
              )
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
