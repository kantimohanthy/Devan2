"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import { knowledgeNodes, knowledgeEdges } from "@/data/content";
import type { NodeId } from "@/data/types";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const nodeById = Object.fromEntries(knowledgeNodes.map((n) => [n.id, n]));

export function KnowledgeGraph() {
  const [active, setActive] = React.useState<NodeId>("networking");
  const [hovered, setHovered] = React.useState<NodeId | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const focus = hovered ?? active;
  const activeNode = nodeById[active];
  const illuminated = new Set(
    knowledgeEdges
      .filter((e) => e.from === focus || e.to === focus)
      .flatMap((e) => [e.from, e.to])
  );

  // mouse-driven "bend" — the whole graph tilts slightly toward the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 50, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 50, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function resetTilt() {
    mx.set(0);
    my.set(0);
  }

  return (
    <Section
      id="knowledge-graph"
      eyebrow="02 · Knowledge Graph"
      reveal="focus"
      title="One connected map, not eight separate résumés"
      description="These disciplines don't sit in isolation — every edge here is a real project that pulled two of them together. Hover to illuminate, click to focus."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          className="rounded-2xl border border-border bg-background-secondary/40 p-2 lg:col-span-3"
          style={{ perspective: 900 }}
        >
          <motion.svg
            viewBox="0 0 800 520"
            className="h-auto w-full"
            role="img"
            aria-label="Knowledge graph connecting networking, AI, cloud, cybersecurity, systems, finance, space, and distributed systems"
            style={reducedMotion ? undefined : { rotateX, rotateY }}
          >
            <g strokeLinecap="round">
              {knowledgeEdges.map((edge, i) => {
                const a = nodeById[edge.from];
                const b = nodeById[edge.to];
                const isLit = edge.from === focus || edge.to === focus;
                return (
                  <motion.line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={isLit ? "#4F8CFF" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isLit ? 1.6 : 1}
                    animate={{ opacity: isLit ? 1 : 0.6 }}
                    transition={{ duration: 0.25 }}
                  />
                );
              })}
            </g>
            {knowledgeNodes.map((node, idx) => {
              const isActive = node.id === active;
              const isLit = illuminated.has(node.id) || node.id === focus;
              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  {isActive && (
                    <motion.circle
                      r={44}
                      fill="none"
                      stroke="#4F8CFF"
                      strokeWidth={1.5}
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: [0.5, 0], scale: [1, 1.7] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <motion.g
                    className="cursor-pointer"
                    onClick={() => setActive(node.id)}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActive(node.id);
                    }}
                    animate={
                      reducedMotion
                        ? undefined
                        : { y: [0, -4, 0] }
                    }
                    transition={{
                      duration: 4 + (idx % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.25,
                    }}
                  >
                    <circle
                      r={isActive ? 44 : 38}
                      fill={isActive ? "#4F8CFF" : "#181818"}
                      stroke={isActive ? "#4F8CFF" : isLit ? "#4F8CFF" : "rgba(255,255,255,0.14)"}
                      strokeWidth={1.5}
                      className="transition-all duration-300"
                      opacity={isActive ? 1 : isLit ? 0.95 : 0.6}
                    />
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fontSize="12"
                      fontWeight={600}
                      fill={isActive ? "#090909" : "#F5F5F5"}
                      className="pointer-events-none select-none"
                    >
                      {node.label.length > 12 ? node.label.split(" ")[0] : node.label}
                    </text>
                  </motion.g>
                </g>
              );
            })}
          </motion.svg>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-border bg-surface/60 p-6"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent">
                {activeNode.summary}
              </p>
              <h3 className="mb-3 text-xl font-semibold text-text-primary">{activeNode.label}</h3>
              <p className="mb-5 text-sm leading-relaxed text-text-secondary">{activeNode.detail}</p>
              <div className="flex flex-wrap gap-2">
                {activeNode.projects.map((p) => (
                  <Tag key={p} tone="accent">
                    {p}
                  </Tag>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-text-tertiary">
                  Connected to
                </p>
                <div className="flex flex-wrap gap-2">
                  {knowledgeEdges
                    .filter((e) => e.from === active || e.to === active)
                    .map((e) => {
                      const other = e.from === active ? e.to : e.from;
                      return (
                        <button
                          key={other}
                          onClick={() => setActive(other)}
                          onMouseEnter={() => setHovered(other)}
                          onMouseLeave={() => setHovered(null)}
                          className={cn(
                            "rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                          )}
                        >
                          {nodeById[other].label}
                          <span className="ml-1.5 text-text-tertiary">· {e.label}</span>
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
