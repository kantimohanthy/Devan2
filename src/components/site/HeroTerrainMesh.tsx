"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { projects, evidenceById } from "@/content";

interface MeshNodeSpec {
  slug: string;
  label: string;
  tag: string;
  x: number;
  y: number;
  elevation: string;
}

const MESH_NODES: MeshNodeSpec[] = [
  { slug: "project-loop", label: "LOOP", tag: "submitted · internship", x: 145, y: 245, elevation: "410m" },
  { slug: "devan", label: "DEVAN", tag: "in progress · evidence", x: 350, y: 120, elevation: "680m" },
  { slug: "wireless-mesh-tvws", label: "TVWS Thesis", tag: "ongoing · draft review", x: 390, y: 345, elevation: "520m" },
  { slug: "daser-net", label: "DASER-Net", tag: "ongoing · research", x: 550, y: 185, elevation: "740m" },
  { slug: "cosmohub", label: "CosmoHub", tag: "in progress · early prototype", x: 590, y: 335, elevation: "300m" },
];

const MESH_LINKS: { from: string; to: string; via: string }[] = [
  { from: "project-loop", to: "devan", via: "evidence ledger" },
  { from: "devan", to: "wireless-mesh-tvws", via: "network proof" },
  { from: "devan", to: "daser-net", via: "validation rules" },
  { from: "wireless-mesh-tvws", to: "daser-net", via: "signal robustness" },
  { from: "devan", to: "cosmohub", via: "evidence ledger" },
];

const HUB = "devan";
const SIGNAL_ORDER = ["project-loop", "devan", "wireless-mesh-tvws", "daser-net", "cosmohub"];

// Deterministic route sequence across all 4 nodes: LOOP -> DEVAN -> TVWS -> DASER-Net
const ROUTE_ORDER = ["project-loop", "devan", "wireless-mesh-tvws", "daser-net"];

export function HeroTerrainMesh({ activeSlug, onSelectSlug }: { activeSlug?: string; onSelectSlug?: (slug: string) => void }) {
  const prefersReduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string>(activeSlug || "devan");
  const [hopIndex, setHopIndex] = useState(0);
  const [t, setT] = useState(0);
  const [signal, setSignal] = useState<{ pts: { x: number; y: number }[]; head: { x: number; y: number } } | null>(null);
  const signalRaf = useRef(0);

  const effectiveSelected = activeSlug ?? selected;

  // Deterministic hop-by-hop packet travel along authored links; pauses when hidden or user pauses
  useEffect(() => {
    if (prefersReduced || paused) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (document.visibilityState === "visible") {
        const dt = Math.min(64, now - last);
        setT((prev) => {
          const next = prev + dt / 2600; // calm 2.6s per hop
          if (next >= 1) {
            setHopIndex((h) => (h + 1) % (ROUTE_ORDER.length - 1));
            return 0;
          }
          return next;
        });
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced, paused]);

  const fromNode = MESH_NODES.find((n) => n.slug === ROUTE_ORDER[hopIndex]) ?? MESH_NODES[0];
  const toNode = MESH_NODES.find((n) => n.slug === ROUTE_ORDER[hopIndex + 1]) ?? MESH_NODES[1];

  // Smooth eased position for the packet along quadratic curve
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const cx = (fromNode.x + toNode.x) / 2;
  const cy = (fromNode.y + toNode.y) / 2 - 28;
  const px = (1 - ease) * (1 - ease) * fromNode.x + 2 * (1 - ease) * ease * cx + ease * ease * toNode.x;
  const py = (1 - ease) * (1 - ease) * fromNode.y + 2 * (1 - ease) * ease * cy + ease * ease * toNode.y;

  const currentProject = projects.find((p) => p.slug === effectiveSelected) ?? projects[0];

  const fireSignal = (fromSlug: string, toSlug: string) => {
    cancelAnimationFrame(signalRaf.current);
    if (prefersReduced || fromSlug === toSlug) {
      setSignal(null);
      return;
    }
    const a = MESH_NODES.find((n) => n.slug === fromSlug);
    const b = MESH_NODES.find((n) => n.slug === toSlug);
    const hub = MESH_NODES.find((n) => n.slug === HUB);
    if (!a || !b || !hub) return;
    const direct = MESH_LINKS.some(
      (l) => (l.from === fromSlug && l.to === toSlug) || (l.from === toSlug && l.to === fromSlug)
    );
    const pts = direct || fromSlug === HUB || toSlug === HUB ? [a, b] : [a, hub, b];
    const seg = pts.slice(1).map((pt, i) => Math.hypot(pt.x - pts[i].x, pt.y - pts[i].y));
    const total = seg.reduce((x, y) => x + y, 0);
    const start = performance.now();
    const dur = 1000;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      let dist = e * total;
      let i = 0;
      while (i < seg.length - 1 && dist > seg[i]) {
        dist -= seg[i];
        i++;
      }
      const f = seg[i] === 0 ? 1 : Math.min(1, dist / seg[i]);
      const head = { x: pts[i].x + (pts[i + 1].x - pts[i].x) * f, y: pts[i].y + (pts[i + 1].y - pts[i].y) * f };
      setSignal({ pts: pts.slice(0, i + 1).map((q) => ({ x: q.x, y: q.y })), head });
      if (k < 1) signalRaf.current = requestAnimationFrame(step);
      else setTimeout(() => setSignal(null), 500);
    };
    signalRaf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(signalRaf.current), []);

  const handleSelect = (slug: string) => {
    fireSignal(effectiveSelected, slug);
    setSelected(slug);
    onSelectSlug?.(slug);
  };

  const traceNext = () => {
    const i = SIGNAL_ORDER.indexOf(effectiveSelected);
    handleSelect(SIGNAL_ORDER[(i + 1) % SIGNAL_ORDER.length]);
  };

  const evidence = evidenceById[currentProject.evidenceIds[0]];

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden rounded-lg border border-ivory/15 bg-ink-2/90 p-3 sm:p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-ivory/10">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ivory-3 min-w-0">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#E8923A]" aria-hidden />
          <span className="truncate">route mesh · 5 nodes</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={traceNext}
            className="inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap shrink-0 rounded border border-[#E8923A]/60 px-2.5 font-mono text-[11px] text-[#F2A65A] hover:bg-[#E8923A]/10 transition-colors"
          >
            Trace a signal
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused || prefersReduced}
            aria-label={paused || prefersReduced ? "Play packet route animation" : "Pause packet route animation"}
            className="inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap shrink-0 rounded border border-ivory/15 px-2.5 font-mono text-[11px] text-ivory-2 hover:border-teal hover:text-ivory transition-colors"
          >
            {paused || prefersReduced ? <Play className="h-3 w-3 shrink-0" /> : <Pause className="h-3 w-3 shrink-0" />}
            <span>{paused || prefersReduced ? "Static" : "Pause"}</span>
          </button>
          <Link
            href="/atlas/"
            className="inline-flex min-h-9 items-center whitespace-nowrap shrink-0 rounded border border-teal/40 px-2.5 font-mono text-[11px] text-teal hover:bg-teal/10 transition-colors"
          >
            Atlas ↗
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-hidden rounded border border-ivory/10 bg-[#11100E]">
        <svg
          viewBox="0 0 680 420"
          className="h-auto w-full block"
          role="group"
          aria-label="Topographic mesh diagram linking portfolio projects"
        >
          <title>Routed topographic portfolio mesh</title>
          <desc>
            Five project and research nodes placed across hand-tuned contour lines. Teal edges show authored relationships; an amber signal packet traces deterministic hops across them.
          </desc>

          {/* Hand-tuned topographic elevation contours */}
          <g fill="none" stroke="rgba(242,235,220,0.09)" strokeWidth="1">
            <path d="M 40,260 C 90,140 220,85 360,95 C 500,105 615,150 645,250 C 660,315 585,380 430,385 C 275,390 120,375 40,260 Z" />
            <path d="M 85,250 C 125,160 235,112 355,118 C 475,125 580,165 605,245 C 618,300 545,352 415,358 C 285,364 150,350 85,250 Z" />
            <path d="M 140,235 C 175,172 260,136 355,142 C 450,148 530,175 552,235 C 565,278 500,322 405,326 C 300,330 185,315 140,235 Z" />
            <path d="M 215,140 C 260,90 365,80 440,105 C 520,132 585,180 572,225 C 555,270 460,265 370,250 C 275,235 180,185 215,140 Z" />
            <path d="M 280,115 C 325,92 385,92 425,115 C 460,136 452,175 395,180 C 335,185 250,150 280,115 Z" />
            {/* Secondary ridge bottom-right */}
            <path d="M 320,335 C 365,295 450,295 485,335 C 510,362 465,395 405,392 C 345,389 290,365 320,335 Z" />
          </g>

          {/* Subtle elevation survey crosshairs */}
          <g stroke="rgba(242,235,220,0.14)" strokeWidth="1">
            <line x1="28" y1="24" x2="36" y2="24" />
            <line x1="32" y1="20" x2="32" y2="28" />
            <line x1="644" y1="392" x2="652" y2="392" />
            <line x1="648" y1="388" x2="648" y2="396" />
          </g>

          {/* Relationship edges in cool desaturated teal */}
          {MESH_LINKS.map((link) => {
            const a = MESH_NODES.find((n) => n.slug === link.from)!;
            const b = MESH_NODES.find((n) => n.slug === link.to)!;
            const active = link.from === effectiveSelected || link.to === effectiveSelected;
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 28;
            return (
              <path
                key={`${link.from}-${link.to}`}
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke={active ? "#7AC4CC" : "#569AA3"}
                strokeOpacity={active ? 0.95 : 0.45}
                strokeWidth={active ? 2 : 1.3}
                strokeDasharray={active ? undefined : "4 4"}
              />
            );
          })}

          {/* Static complete route baseline when reduced-motion or paused */}
          {(prefersReduced || paused) && (
            <path
              d={`M ${MESH_NODES[0].x} ${MESH_NODES[0].y} Q ${(MESH_NODES[0].x + MESH_NODES[1].x) / 2} ${(MESH_NODES[0].y + MESH_NODES[1].y) / 2 - 28} ${MESH_NODES[1].x} ${MESH_NODES[1].y} Q ${(MESH_NODES[1].x + MESH_NODES[2].x) / 2} ${(MESH_NODES[1].y + MESH_NODES[2].y) / 2 - 28} ${MESH_NODES[2].x} ${MESH_NODES[2].y} Q ${(MESH_NODES[2].x + MESH_NODES[3].x) / 2} ${(MESH_NODES[2].y + MESH_NODES[3].y) / 2 - 28} ${MESH_NODES[3].x} ${MESH_NODES[3].y}`}
              fill="none"
              stroke="#E8923A"
              strokeOpacity="0.65"
              strokeWidth="1.5"
              strokeDasharray="2 5"
            />
          )}

          {/* Single calm signal packet in reserved amber */}
          {!prefersReduced && !paused && (
            <g aria-hidden>
              <circle cx={px} cy={py} r="10" fill="#E8923A" fillOpacity="0.18" />
              <circle cx={px} cy={py} r="4.5" fill="#E8923A" />
            </g>
          )}

          {/* Visitor-triggered signal: amber trace and pulse to the selected node */}
          {signal && (
            <g aria-hidden>
              <polyline
                points={[...signal.pts, signal.head].map((q) => `${q.x},${q.y}`).join(" ")}
                fill="none"
                stroke="#F2A65A"
                strokeOpacity="0.22"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points={[...signal.pts, signal.head].map((q) => `${q.x},${q.y}`).join(" ")}
                fill="none"
                stroke="#E8923A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={signal.head.x} cy={signal.head.y} r="12" fill="#E8923A" fillOpacity="0.22" />
              <circle cx={signal.head.x} cy={signal.head.y} r="10" fill="none" stroke="#F2A65A" strokeWidth="1.5">
                <animate attributeName="r" values="10;30" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.7;0" dur="0.8s" repeatCount="indefinite" />
              </circle>
              <circle cx={signal.head.x} cy={signal.head.y} r="5" fill="#F2A65A" />
            </g>
          )}

          {/* Project mesh nodes as focusable accessible buttons */}
          {MESH_NODES.map((node) => {
            const isSel = node.slug === effectiveSelected;
            return (
              <g
                key={node.slug}
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                aria-label={`Select mesh node ${node.label} (${node.tag})`}
                onClick={() => handleSelect(node.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(node.slug);
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>circle.focus-ring]:stroke-[#F2A65A] [&:focus-visible>circle.focus-ring]:stroke-[2.5]"
              >
                <circle className="focus-ring" cx={node.x} cy={node.y} r="28" fill="transparent" stroke="transparent" />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSel ? 15 : 11}
                  fill="#11100E"
                  stroke={isSel ? "#E8923A" : "#7AC4CC"}
                  strokeWidth={isSel ? 2.4 : 1.75}
                />
                <circle cx={node.x} cy={node.y} r="3.5" fill={isSel ? "#F2A65A" : "#F2EBDC"} />
                <text
                  x={node.x}
                  y={node.y - 21}
                  textAnchor="middle"
                  fontSize="14.5"
                  fontWeight="600"
                  fill={isSel ? "#F2EBDC" : "#CBC2AF"}
                  fontFamily="Inter Variable, sans-serif"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 27}
                  dx={node.slug === "devan" ? -26 : 0}
                  dy={node.slug === "devan" ? -18 : 0}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="#A89F8D"
                  fontFamily="JetBrains Mono Variable, monospace"
                >
                  {node.elevation}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Preview synced to the selected node: question, my contribution, evidence link */}
      <div className="mt-3 rounded border border-ivory/10 bg-[#11100E] px-3.5 py-3 sm:min-h-[168px]" aria-live="polite">
        <p className="font-mono text-[10.5px] uppercase tracking-wider text-ivory-3">
          selected node · {currentProject.statusLabel}
        </p>
        <p className="mt-1 text-[14px] font-medium text-ivory">
          {currentProject.title}: {currentProject.role}
        </p>
        <p className="mt-2 text-[13px] leading-snug text-ivory-2">
          <span className="text-ivory-3">Question. </span>
          {currentProject.problem}
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-ivory-2">
          <span className="text-ivory-3">My part. </span>
          {currentProject.contributionOneLiner}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href={`/work/${currentProject.slug}/`}
            className="inline-flex min-h-9 items-center font-mono text-[12px] text-teal hover:underline"
          >
            Trace hops →
          </Link>
          {evidence && (
            <Link
              href={evidence.artifactUrl ?? `/work/${currentProject.slug}/`}
              className="inline-flex min-h-9 items-center font-mono text-[12px] text-teal hover:underline"
            >
              Evidence {evidence.id} ({evidence.verificationStatus}) →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
