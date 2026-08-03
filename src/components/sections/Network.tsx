"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { network } from "@/data/content";

const RADIUS = 170;
const CENTER = { x: 350, y: 190 };

function positionsFor(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: CENTER.x + RADIUS * Math.cos(angle),
      y: CENTER.y + RADIUS * Math.sin(angle),
    };
  });
}

export function Network() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const positions = positionsFor(network.length);
  const focused = hovered !== null ? network[hovered] : null;

  return (
    <Section
      id="network"
      eyebrow="09 · Network"
      reveal="focus"
      title="Who this gets built with"
      description="Engineering doesn't happen alone. The people and cohorts behind the projects above."
    >
      <div className="rounded-2xl border border-border bg-background-secondary/40 p-2">
        <svg viewBox="0 0 700 380" className="h-auto w-full" role="img" aria-label="Diagram of collaborators connected to Ujwal">
          {positions.map((pos, i) => (
            <line
              key={i}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={pos.x}
              y2={pos.y}
              stroke={hovered === i ? "#4F8CFF" : "rgba(255,255,255,0.12)"}
              strokeWidth={hovered === i ? 1.6 : 1}
              className="transition-all duration-300"
            />
          ))}

          <g transform={`translate(${CENTER.x}, ${CENTER.y})`}>
            <circle r={40} fill="#4F8CFF" />
            <text textAnchor="middle" dy="0.35em" fontSize="13" fontWeight={700} fill="#090909">
              UJ
            </text>
          </g>

          {network.map((person, i) => {
            const pos = positions[i];
            const isHovered = hovered === i;
            return (
              <g
                key={person.name}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                role="button"
                tabIndex={0}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <motion.circle
                  r={isHovered ? 30 : 26}
                  fill={isHovered ? "#4F8CFF" : "#181818"}
                  stroke={isHovered ? "#4F8CFF" : "rgba(255,255,255,0.16)"}
                  strokeWidth={1.5}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
                <text
                  textAnchor="middle"
                  dy="0.35em"
                  fontSize="11"
                  fontWeight={600}
                  fill={isHovered ? "#090909" : "#F5F5F5"}
                  className="pointer-events-none select-none"
                >
                  {person.name.split(" ")[0]}
                </text>
                <text
                  textAnchor="middle"
                  y={isHovered ? 48 : 44}
                  fontSize="10"
                  fill="#6f6f6f"
                  className="pointer-events-none select-none transition-all duration-300"
                >
                  {person.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 min-h-[3.5rem] rounded-xl border border-border bg-surface/50 px-5 py-4">
        <AnimatePresence mode="wait">
          {focused ? (
            <motion.p
              key={focused.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-sm text-text-secondary"
            >
              <span className="font-semibold text-text-primary">{focused.name}</span>
              {" — "}
              {focused.role}. {focused.context}.
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-text-tertiary"
            >
              Hover a node to see how UJ works with them.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
