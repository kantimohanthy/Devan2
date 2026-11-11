import React from "react";
import type { TracerouteHop } from "@/content";

export function InlineSchematic({
  kind,
  caption,
}: {
  kind: NonNullable<TracerouteHop["diagramKind"]>;
  caption?: string;
}) {
  return (
    <figure className="mt-4 rounded-md border border-ivory/15 bg-[#11100E] p-3.5 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10.5px] uppercase tracking-wider text-ivory-3">
        <span>Structural schematic · Illustrative (not measured telemetry)</span>
      </div>
      <div className="overflow-hidden">
        {kind === "loop-pipeline" && <LoopSchematic />}
        {kind === "daser-split" && <DaserSchematic />}
        {kind === "devan-evidence" && <DevanSchematic />}
        {kind === "tvws-topology" && <TvwsSchematic />}
        {kind === "cineforge-pipeline" && <CineforgeSchematic />}
      </div>
      {caption && (
        <figcaption className="mt-2.5 border-t border-ivory/10 pt-2 font-mono text-[11px] leading-relaxed text-ivory-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Box({ x, y, w = 132, h = 44, title, sub, active = false }: { x: number; y: number; w?: number; h?: number; title: string; sub?: string; active?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="#181613"
        stroke={active ? "#E8923A" : "#569AA3"}
        strokeWidth={active ? 1.8 : 1.3}
      />
      <text
        x={x + w / 2}
        y={sub ? y + 19 : y + 26}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="#F2EBDC"
        fontFamily="Inter Variable, sans-serif"
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + 34}
          textAnchor="middle"
          fontSize="10"
          fill="#A89F8D"
          fontFamily="JetBrains Mono Variable, monospace"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function LoopSchematic() {
  return (
    <svg viewBox="0 0 640 160" className="h-auto w-full" role="img" aria-label="LOOP feedback pipeline diagram">
      <line x1="152" y1="44" x2="210" y2="44" stroke="#7AC4CC" strokeWidth="1.5" />
      <line x1="342" y1="44" x2="400" y2="44" stroke="#E8923A" strokeWidth="1.8" />
      <line x1="466" y1="66" x2="466" y2="96" stroke="#7AC4CC" strokeWidth="1.5" />
      <line x1="400" y1="118" x2="342" y2="118" stroke="#7AC4CC" strokeWidth="1.5" />
      <Box x={20} y={22} title="CSV / API / Form" sub="Formula escape" />
      <Box x={210} y={22} title="Zod + RBAC" sub="4 roles" active />
      <Box x={400} y={22} title="Org Storage" sub="RLS in SQL" />
      <Box x={400} y={96} title="Trend Engine" sub="Window diff" />
      <Box x={210} y={96} title="Ask LOOP Q&A" sub="Source cited" active />
      <Box x={20} y={96} w={152} title="Demo Switcher" sub="Seeded sample only" />
    </svg>
  );
}

function DaserSchematic() {
  return (
    <svg viewBox="0 0 640 160" className="h-auto w-full" role="img" aria-label="DASER-Net speaker-disjoint split diagram">
      <line x1="164" y1="80" x2="225" y2="45" stroke="#7AC4CC" strokeWidth="1.5" />
      <line x1="164" y1="80" x2="225" y2="115" stroke="#569AA3" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="375" y1="45" x2="435" y2="80" stroke="#E8923A" strokeWidth="1.8" />
      <line x1="375" y1="115" x2="435" y2="80" stroke="#569AA3" strokeWidth="1.5" strokeDasharray="4 4" />
      <Box x={18} y={58} w={146} title="CREMA-D Audio" sub="Real WAV check" active />
      <Box x={225} y={23} w={150} title="Global Speaker ID" sub="Disjoint train/val" active />
      <Box x={225} y={93} w={150} title="Held-Out Corpus" sub="Zero speaker leak" />
      <Box x={435} y={58} w={180} title="Reproducible Baseline" sub="Real metrics pending" />
    </svg>
  );
}

function DevanSchematic() {
  return (
    <svg viewBox="0 0 640 130" className="h-auto w-full" role="img" aria-label="DEVAN evidence derivation flow diagram">
      <line x1="138" y1="62" x2="176" y2="62" stroke="#7AC4CC" strokeWidth="1.5" />
      <line x1="296" y1="62" x2="334" y2="62" stroke="#7AC4CC" strokeWidth="1.5" />
      <line x1="454" y1="62" x2="492" y2="62" stroke="#E8923A" strokeWidth="1.8" />
      <Box x={18} y={40} w={120} title="Source" sub="RFC / Repo" />
      <Box x={176} y={40} w={120} title="Question" sub="Testable claim" />
      <Box x={334} y={40} w={120} title="Experiment" sub="Observed output" active />
      <Box x={492} y={40} w={128} title="Derived State" sub="TESTED / STUDIED" active />
    </svg>
  );
}

function TvwsSchematic() {
  return (
    <svg viewBox="0 0 640 165" className="h-auto w-full" role="img" aria-label="TVWS ridgeline mesh illustrative topology">
      {/* Mountain ridgeline contour */}
      <path
        d="M 20,145 L 130,85 L 260,120 L 385,55 L 510,115 L 620,135"
        fill="none"
        stroke="rgba(242,235,220,0.28)"
        strokeWidth="1.6"
      />
      {/* NLOS sub-GHz UHF diffraction arc */}
      <path d="M 130,85 Q 258,28 385,55" fill="none" stroke="#E8923A" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M 385,55 Q 498,42 560,122" fill="none" stroke="#7AC4CC" strokeWidth="1.8" />
      <circle cx="130" cy="85" r="6" fill="#11100E" stroke="#7AC4CC" strokeWidth="2" />
      <circle cx="385" cy="55" r="7" fill="#11100E" stroke="#E8923A" strokeWidth="2.2" />
      <circle cx="560" cy="122" r="6" fill="#11100E" stroke="#7AC4CC" strokeWidth="2" />
      <text x="130" y="70" textAnchor="middle" fontSize="11.5" fill="#F2EBDC" fontFamily="JetBrains Mono Variable, monospace">Valley Base (UHF)</text>
      <text x="385" y="38" textAnchor="middle" fontSize="11.5" fill="#F2A65A" fontFamily="JetBrains Mono Variable, monospace">Ridgeline Relay</text>
      <text x="545" y="106" textAnchor="middle" fontSize="11.5" fill="#F2EBDC" fontFamily="JetBrains Mono Variable, monospace">Remote Node</text>
    </svg>
  );
}

function CineforgeSchematic() {
  return (
    <svg viewBox="0 0 640 130" className="h-auto w-full" role="img" aria-label="CineForge AI Pro bilingual extraction diagram">
      <line x1="158" y1="62" x2="225" y2="62" stroke="#7AC4CC" strokeWidth="1.5" />
      <line x1="385" y1="62" x2="452" y2="62" stroke="#7AC4CC" strokeWidth="1.5" />
      <Box x={18} y={40} w={140} title="Script Input" sub="Arabic / English" />
      <Box x={225} y={40} w={160} title="Scene Segmenter" sub="Prompt orchestration" active />
      <Box x={452} y={40} w={165} title="JSON Breakdown" sub="Team submission" />
    </svg>
  );
}
