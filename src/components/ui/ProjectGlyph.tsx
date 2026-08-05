"use client";

import { useMemo } from "react";

function seedFromSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

export function ProjectGlyph({
  slug,
  domainCount = 2,
}: {
  slug: string;
  domainCount?: number;
}) {
  const nodes = useMemo(() => {
    const seed = seedFromSlug(slug);
    const rand = (i: number) => ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    const count = Math.max(3, Math.min(6, domainCount + 2));
    return Array.from({ length: count }, (_, i) => ({
      x: 20 + rand(i) * 60,
      y: 15 + rand(i + 10) * 30,
    }));
  }, [slug, domainCount]);

  return (
    <svg viewBox="0 0 100 60" className="w-full h-14 select-none pointer-events-none">
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => (
          <line
            key={`${i}-${j}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke="var(--signal-blue)"
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))
      )}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="2.8"
          fill="var(--signal-blue)"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );
}
