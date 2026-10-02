/**
 * Journal figures. Static SVG drawn in the site palette. Every figure here is
 * illustrative: it explains a structure, it does not plot measured data.
 * Captions in the content model say so where the figure is used.
 */
import { missions, projects } from "@/data/portfolio";

const INK = "#12110f";
const IVORY = "#efe8d8";
const IV2 = "#c4bba9";
const IV3 = "#9a917f";
const RULE = "rgba(239,232,216,0.16)";
const OCHRE = "#e8873d";
const MOSS = "#7cc488";
const MONO = "JetBrains Mono Variable, ui-monospace, monospace";
/** Figures render at ~60% of their viewBox; scale labels so they stay readable. */
const SCALE = 1.3;

function Label({ x, y, children, anchor = "start", color = IV2, size = 10.5 }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; color?: string; size?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size * SCALE} fill={color} fontFamily={MONO} letterSpacing="0.04em">
      {children}
    </text>
  );
}

/** Contour lines for a terrain feel, deterministic. */
function Contours({ w, h, cx, cy, rings = 6, seed = 1 }: { w: number; h: number; cx: number; cy: number; rings?: number; seed?: number }) {
  const paths: string[] = [];
  for (let r = 1; r <= rings; r++) {
    const pts: string[] = [];
    const base = r * Math.min(w, h) * 0.085;
    for (let a = 0; a <= 64; a++) {
      const t = (a / 64) * Math.PI * 2;
      const wob = 1 + 0.16 * Math.sin(t * 3 + seed + r * 0.7) + 0.08 * Math.sin(t * 5 + seed * 2);
      const x = cx + Math.cos(t) * base * wob * 1.35;
      const y = cy + Math.sin(t) * base * wob;
      pts.push(`${a === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    paths.push(pts.join(" ") + "Z");
  }
  return (
    <g fill="none" stroke={RULE} strokeWidth="1">
      {paths.map((d, i) => (
        <path key={i} d={d} opacity={1 - i * 0.1} />
      ))}
    </g>
  );
}

/** Edges between missions that share a project. Derived from the content model. */
export function missionEdges() {
  const edges: { a: string; b: string; via: string[] }[] = [];
  for (let i = 0; i < missions.length; i++) {
    for (let j = i + 1; j < missions.length; j++) {
      const shared = missions[i].projects.filter((p) => missions[j].projects.includes(p));
      if (shared.length) edges.push({ a: missions[i].slug, b: missions[j].slug, via: shared });
    }
  }
  return edges;
}

/** The hero motif: a small field map of missions. */
export function FieldMapMini() {
  const W = 520;
  const H = 400;
  const pos = (m: { x: number; y: number }) => ({ x: 40 + (m.x / 100) * (W - 80), y: 40 + (m.y / 100) * (H - 90) });
  const edges = missionEdges();
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="fm-title fm-desc">
      <title id="fm-title">Field map of current missions</title>
      <desc id="fm-desc">
        Five missions placed on an illustrative map. Lines connect missions that share a project.
      </desc>
      <Contours w={W} h={H} cx={W * 0.45} cy={H * 0.48} rings={7} seed={1.7} />
      <Contours w={W} h={H} cx={W * 0.86} cy={H * 0.15} rings={3} seed={4.2} />
      {/* grid ticks */}
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <line x1={(W / 8) * i} y1={H - 14} x2={(W / 8) * i} y2={H - 8} stroke={RULE} />
          <line x1={6} y1={(H / 8) * i} x2={12} y2={(H / 8) * i} stroke={RULE} />
        </g>
      ))}
      {edges.map((e) => {
        const A = pos(missions.find((m) => m.slug === e.a)!);
        const B = pos(missions.find((m) => m.slug === e.b)!);
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 26;
        const len = Math.hypot(B.x - A.x, B.y - A.y) * 1.15;
        return (
          <path
            key={e.a + e.b}
            d={`M${A.x} ${A.y} Q${mx} ${my} ${B.x} ${B.y}`}
            fill="none"
            stroke={OCHRE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
            className="route-draw"
            style={{ ["--len" as string]: len.toFixed(0) }}
          />
        );
      })}
      {missions.map((m, i) => {
        const p = pos(m);
        const count = m.projects.length;
        return (
          <g key={m.slug}>
            <circle cx={p.x} cy={p.y} r="11" fill={INK} stroke={count ? OCHRE : IV3} strokeWidth="1.4" />
            <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="10" fill={count ? OCHRE : IV3} fontFamily={MONO}>
              {i + 1}
            </text>
            {m.x > 55 ? (
              <Label x={p.x - 18} y={p.y + 4} anchor="end" color={IVORY} size={11.5}>
                {m.title}
              </Label>
            ) : (
              <Label x={p.x + 18} y={p.y + 4} color={IVORY} size={11.5}>
                {m.title}
              </Label>
            )}
          </g>
        );
      })}
      <Label x={W - 12} y={H - 22} anchor="end" color={IV3}>
        illustrative layout · {projects.length} projects · {edges.length} shared links
      </Label>
    </svg>
  );
}

function Pipeline() {
  const steps = ["CSV / API / form", "Validate", "Analyze", "Store (per org)", "Trends", "Ask LOOP"];
  return (
    <svg viewBox="0 0 560 300" className="h-auto w-full" aria-hidden>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={IV3} />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i < 3 ? i : i - 3;
        const x = col === 0 ? 40 : 330;
        const y = 40 + row * 82;
        return (
          <g key={s}>
            <rect x={x} y={y} width="190" height="46" rx="4" fill={INK} stroke={i === 2 ? OCHRE : RULE} />
            <Label x={x + 14} y={y + 19} color={IV3} size={9.5}>
              {String(i + 1).padStart(2, "0")}
            </Label>
            <Label x={x + 14} y={y + 35} color={IVORY} size={12}>
              {s}
            </Label>
            {i !== 2 && i !== 5 && (
              <line x1={x + 95} y1={y + 46} x2={x + 95} y2={y + 80} stroke={IV3} markerEnd="url(#arr)" />
            )}
          </g>
        );
      })}
      <path d="M230 204 C 280 204 280 63 328 63" fill="none" stroke={IV3} markerEnd="url(#arr)" />
      {/* analyzer fork */}
      <Label x={40} y={268} color={IV3} size={9.5}>analyzer: OpenAI if a key is set,</Label>
      <Label x={40} y={286} color={IV3} size={9.5}>else local rules</Label>
      <Label x={330} y={268} color={OCHRE} size={9.5}>views scoped by role:</Label>
      <Label x={330} y={286} color={IV2} size={9.5}>owner · admin · analyst · viewer</Label>
    </svg>
  );
}

function Topology() {
  const ridge = "M0 230 C 70 170 110 200 170 150 S 290 80 350 130 S 470 190 560 120";
  const nodes: [number, number, boolean][] = [
    [30, 212, true], [110, 190, true], [170, 150, true], [262, 104, true], [350, 130, true], [430, 168, true], [530, 132, true],
    [140, 80, false], [300, 48, false], [440, 78, false],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 7], [7, 2], [7, 8], [8, 3], [8, 4], [8, 9], [9, 5], [9, 6]];
  return (
    <svg viewBox="0 0 560 280" className="h-auto w-full" aria-hidden>
      <path d={`${ridge} L560 280 L0 280 Z`} fill="rgba(239,232,216,0.04)" />
      <path d={ridge} fill="none" stroke={IV3} strokeWidth="1.2" />
      {[0.82, 0.68].map((k, i) => (
        <path key={i} d={ridge} fill="none" stroke={RULE} transform={`translate(0 ${30 + i * 28}) scale(1 ${k})`} />
      ))}
      {links.map(([a, b]) => (
        <line key={`${a}${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={RULE} strokeWidth="1.2" />
      ))}
      {[0, 1, 7, 8, 9, 6].map((n, i, arr) =>
        i < arr.length - 1 ? (
          <line key={n} x1={nodes[n][0]} y1={nodes[n][1]} x2={nodes[arr[i + 1]][0]} y2={nodes[arr[i + 1]][1]} stroke={OCHRE} strokeWidth="1.6" strokeDasharray="4 4" />
        ) : null
      )}
      {nodes.map(([x, y, t], i) => (
        <g key={i}>
          {t && <line x1={x} y1={y} x2={x} y2={y + 12} stroke={IV2} />}
          <rect x={x - 4} y={y - 4} width="8" height="8" fill={INK} stroke={t ? IVORY : OCHRE} transform={`rotate(45 ${x} ${y})`} />
        </g>
      ))}
      <circle cx="300" cy="48" r="34" fill="none" stroke={RULE} strokeDasharray="2 4" />
      <circle cx="300" cy="48" r="60" fill="none" stroke={RULE} strokeDasharray="2 4" />
      <Label x={14} y={24} color={IV3} size={9.5}>◇ ridge relay  ◆ hilltop relay  ··· route found on demand</Label>
      <Label x={546} y={270} anchor="end" color={IV3} size={9.5}>UHF TV band, unused channels</Label>
    </svg>
  );
}

function Graph() {
  const chain = ["Source", "Concept", "Question", "Experiment", "Outcome", "Artifacts"];
  return (
    <svg viewBox="0 0 560 260" className="h-auto w-full" aria-hidden>
      {chain.map((c, i) => {
        const x = 30 + (i % 3) * 180;
        const y = i < 3 ? 50 : 160;
        const xx = i < 3 ? x : 30 + (5 - i) * 180;
        return (
          <g key={c}>
            <rect x={xx} y={y} width="140" height="44" rx="22" fill={INK} stroke={i === 4 ? OCHRE : RULE} />
            <Label x={xx + 70} y={y + 27} anchor="middle" color={IVORY} size={12}>
              {c}
            </Label>
          </g>
        );
      })}
      <path d="M170 72 H210 M350 72 H390 M460 94 V160 M390 182 H350 M210 182 H170" stroke={IV3} fill="none" />
      <g>
        <rect x="196" y="116" width="168" height="26" rx="3" fill="none" stroke={MOSS} />
        <Label x={280} y={133} anchor="middle" color={MOSS} size={11}>
          derived: TESTED
        </Label>
      </g>
      <Label x={30} y={246} color={IV3} size={9.5}>state is computed from the record, never typed in</Label>
    </svg>
  );
}

function Waveform() {
  const wave = (y0: number, f: number, a: number, seed: number) =>
    Array.from({ length: 120 })
      .map((_, i) => {
        const x = 20 + i * 2.2;
        const env = Math.sin((i / 119) * Math.PI);
        const y = y0 + env * a * (Math.sin(i * f + seed) * 0.7 + Math.sin(i * f * 2.3 + seed) * 0.3);
        return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  const corpora = ["CREMA-D", "Corpus B", "Corpus C"];
  return (
    <svg viewBox="0 0 560 280" className="h-auto w-full" aria-hidden>
      <path d={wave(70, 0.42, 26, 1)} fill="none" stroke={IVORY} strokeWidth="1.2" />
      <path d={wave(150, 0.31, 22, 2.4)} fill="none" stroke={IV3} strokeWidth="1.2" />
      <Label x={20} y={30} color={IV3} size={9.5}>speech in, emotion out · speakers never shared across splits</Label>
      {/* planned matrix */}
      <Label x={330} y={50} color={IV3} size={9.5}>train ↓ / test →  (planned)</Label>
      {corpora.map((c, i) => (
        <g key={c}>
          <Label x={316} y={92 + i * 52} anchor="end" color={IV2} size={9.5}>{c}</Label>
          {corpora.map((_, j) => (
            <rect key={j} x={330 + j * 72} y={72 + i * 52} width="62" height="38" rx="2" fill={INK} stroke={i === j ? IV3 : OCHRE} strokeDasharray={i === j ? "0" : "3 3"} />
          ))}
        </g>
      ))}
      {corpora.map((c, j) => (
        <Label key={c} x={361 + j * 72} y={244} anchor="middle" color={IV2} size={9}>{c}</Label>
      ))}
      <Label x={20} y={262} color={IV3} size={9.5}>dashed cells: cross corpus runs still to do</Label>
    </svg>
  );
}

function Orbit() {
  return (
    <svg viewBox="0 0 560 260" className="h-auto w-full" aria-hidden>
      <circle cx="140" cy="130" r="38" fill="none" stroke={IV2} />
      {[70, 108, 150].map((r, i) => (
        <ellipse key={r} cx="140" cy="130" rx={r * 1.5} ry={r * 0.62} fill="none" stroke={RULE} strokeDasharray={i === 2 ? "3 5" : "0"} />
      ))}
      {["Orbits", "Comms", "Payloads", "Policy"].map((s, i) => (
        <g key={s}>
          <rect x={330} y={36 + i * 50} width="190" height="34" rx="3" fill={INK} stroke={i === 0 ? OCHRE : RULE} />
          <Label x={344} y={57 + i * 50} color={i === 0 ? IVORY : IV3} size={11}>
            {String(i + 1).padStart(2, "0")} {s}
          </Label>
        </g>
      ))}
      <Label x={330} y={250} color={IV3} size={9.5}>a path through fundamentals (concept)</Label>
    </svg>
  );
}

export function ProjectFigure({ kind }: { kind: "pipeline" | "topology" | "graph" | "waveform" | "orbit" }) {
  if (kind === "pipeline") return <Pipeline />;
  if (kind === "topology") return <Topology />;
  if (kind === "graph") return <Graph />;
  if (kind === "waveform") return <Waveform />;
  return <Orbit />;
}
