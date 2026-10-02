"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { missions, projects, decisions } from "@/data/portfolio";

const W = 1000;
const H = 560;
const pos = (x: number, y: number) => ({ x: 70 + (x / 100) * (W - 160), y: 70 + (y / 100) * (H - 130) });

/**
 * Interactive field map. Missions are waypoints; projects sit between the
 * missions they serve; every line comes from the content model
 * (mission.projects). Fully operable with keyboard: each waypoint is a button.
 */
export default function FieldMap() {
  const [active, setActive] = useState<string>(missions[0].slug);

  // Sync with the URL hash so selections are shareable and survive reloads.
  useEffect(() => {
    const read = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (missions.some((m) => m.slug === h)) setActive(h);
    };
    read();
    if (missions.some((x) => x.slug === decodeURIComponent(window.location.hash.slice(1)))) {
      document.getElementById("field-map")?.scrollIntoView({ block: "start" });
    }
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const select = (slug: string) => {
    setActive(slug);
    history.replaceState(null, "", `#${slug}`);
  };

  // Layout positions for projects (illustrative). Links still come from mission.projects.
  const projectPos = useMemo(() => {
    const layout: Record<string, [number, number]> = {
      devan: [32, 18],
      "project-loop": [50, 44],
      "wireless-mesh-tvws": [70, 4],
      "daser-net": [88, 62],
      cosmohub: [84, 96],
    };
    const out: Record<string, { x: number; y: number }> = {};
    for (const [k, [x, y]] of Object.entries(layout)) out[k] = pos(x, y);
    return out;
  }, []);

  const m = missions.find((x) => x.slug === active)!;
  const mProjects = projects.filter((p) => m.projects.includes(p.slug));
  const mDecisions = decisions.filter((d) => m.decisions.includes(d.id));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      <div className="relative flex flex-col justify-center overflow-hidden rounded-md border border-ivory/10 bg-ink-2/60 pb-8">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Field map of missions and projects">
          {/* terrain */}
          <g fill="none" stroke="rgba(239,232,216,0.08)">
            {Array.from({ length: 9 }).map((_, r) => (
              <ellipse key={r} cx={W * 0.48} cy={H * 0.5} rx={60 + r * 58} ry={36 + r * 34} transform={`rotate(${-8 + r} ${W * 0.48} ${H * 0.5})`} />
            ))}
          </g>
          {/* project ↔ mission links */}
          {missions.map((mi) =>
            mi.projects.map((ps) => {
              const a = pos(mi.x, mi.y);
              const b = projectPos[ps];
              if (!b) return null;
              const on = mi.slug === active;
              return (
                <line
                  key={mi.slug + ps}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={on ? "#e8873d" : "rgba(239,232,216,0.18)"}
                  strokeWidth={on ? 2 : 1.2}
                  strokeDasharray={on ? "0" : "4 5"}
                  style={{ transition: "stroke 200ms ease" }}
                />
              );
            })
          )}
          {/* projects */}
          {projects.map((p) => {
            const q = projectPos[p.slug];
            if (!q) return null;
            const on = m.projects.includes(p.slug);
            return (
              <g key={p.slug}>
                <rect x={q.x - 6} y={q.y - 6} width="12" height="12" transform={`rotate(45 ${q.x} ${q.y})`} fill="#12110f" stroke={on ? "#f4a866" : "#9a917f"} strokeWidth="1.4" />
                <text x={q.x + 16} y={q.y + 6} fontSize="19" fill={on ? "#efe8d8" : "#9a917f"} fontFamily="Inter Variable, sans-serif">
                  {p.title}
                </text>
              </g>
            );
          })}
          {/* missions as buttons */}
          {missions.map((mi, i) => {
            const q = pos(mi.x, mi.y);
            const on = mi.slug === active;
            return (
              <g
                key={mi.slug}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`Mission ${i + 1}: ${mi.title}`}
                onClick={() => select(mi.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(mi.slug);
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-[#f4a866] [&:focus-visible>circle:first-child]:stroke-[3]"
              >
                <circle cx={q.x} cy={q.y} r="30" fill="transparent" stroke="transparent" />
                <circle cx={q.x} cy={q.y} r={on ? 20 : 16} fill={on ? "#e8873d" : "#12110f"} stroke={on ? "#e8873d" : "#c4bba9"} strokeWidth="1.5" style={{ transition: "all 200ms ease" }} />
                <text x={q.x} y={q.y + 5} textAnchor="middle" fontSize="16" fontWeight="600" fill={on ? "#12110f" : "#efe8d8"} fontFamily="JetBrains Mono Variable, monospace">
                  {i + 1}
                </text>
                <text x={q.x} y={q.y - 32} textAnchor="middle" fontSize="23" fill={on ? "#efe8d8" : "#c4bba9"} fontFamily="Fraunces Variable, serif">
                  {mi.title}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="absolute bottom-3 left-4 font-mono text-[11px] text-ivory-3">Illustrative layout. Lines come from the content model.</p>
      </div>

      <aside aria-live="polite" className="rounded-md border border-ivory/10 p-6">
        <p className="note">Mission {missions.findIndex((x) => x.slug === m.slug) + 1}</p>
        <h2 className="display mt-2 text-[32px] leading-tight">{m.title}</h2>
        <p className="pretty mt-4 text-[17px] leading-relaxed text-ivory">{m.question}</p>
        <p className="pretty mt-3 text-[15px] leading-relaxed text-ivory-2">{m.why}</p>

        <p className="note mt-7">Projects</p>
        {mProjects.length ? (
          <ul className="mt-2 divide-y divide-ivory/10 border-y border-ivory/10">
            {mProjects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}/`} className="group flex items-baseline justify-between gap-3 py-3">
                  <span className="text-[15.5px] text-ivory group-hover:text-ochre-2">{p.title}</span>
                  <span className="font-mono text-[11.5px] uppercase tracking-wide text-ivory-3">{p.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[15px] text-ivory-3">No public project yet. This mission is organising work, listed in the timeline.</p>
        )}

        {mDecisions.length > 0 && (
          <>
            <p className="note mt-7">Decisions</p>
            <ul className="mt-2 space-y-2 text-[15px] text-ivory-2">
              {mDecisions.map((d) => (
                <li key={d.id}>
                  <Link href={`/work/${d.project}/`} className="ink-link">{d.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="note mt-7">Next move</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ivory-2">{m.next.replace(/^Planned:\s*/, "Planned: ")}</p>
      </aside>
    </div>
  );
}
