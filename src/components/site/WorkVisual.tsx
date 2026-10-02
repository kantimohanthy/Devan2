/**
 * Small animated diagrams for each case study. Pure SVG + SMIL, so they
 * render in the static export without JavaScript. Hidden from assistive
 * tech; the card text carries the meaning.
 */

const C = "#67e8f9";
const B = "#4f8cff";
const A = "#f7b955";
const G = "#31d07d";
const MUTED = "rgba(255,255,255,0.14)";

function LoopVisual() {
  const stages = ["Ingest", "Model", "Roles", "Analytics", "Ask"];
  const xs = stages.map((_, i) => 46 + i * 86);
  const path = `M ${xs[0]} 120 ${xs.map((x) => `L ${x} 120`).join(" ")}`;
  return (
    <svg viewBox="0 0 440 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="lp" x1="0" x2="1">
          <stop offset="0" stopColor={C} />
          <stop offset="1" stopColor={B} />
        </linearGradient>
      </defs>
      {/* sources */}
      {[50, 90, 150, 190].map((y, i) => (
        <g key={y}>
          <path d={`M 0 ${y} C 20 ${y} 20 120 40 120`} stroke={MUTED} fill="none" />
          <circle r="2.5" fill={C}>
            <animateMotion dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" path={`M 0 ${y} C 20 ${y} 20 120 40 120`} />
          </circle>
        </g>
      ))}
      <path d={path} stroke="url(#lp)" strokeWidth="1.5" fill="none" opacity="0.6" />
      {stages.map((s, i) => (
        <g key={s}>
          <rect x={xs[i] - 34} y={102} width={68} height={36} rx={10} fill="#0d1117" stroke={i === 2 ? A : "rgba(103,232,249,0.4)"} />
          <text x={xs[i]} y={124} textAnchor="middle" fontSize="11" fill="#e5e7eb" fontFamily="JetBrains Mono Variable, monospace">
            {s}
          </text>
        </g>
      ))}
      {[0, 1.1, 2.2].map((d) => (
        <circle key={d} r="3.5" fill="#fff">
          <animateMotion dur="3.3s" begin={`${d}s`} repeatCount="indefinite" path={path} />
          <animate attributeName="opacity" values="0;1;1;0" dur="3.3s" begin={`${d}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* role fan out */}
      {[60, 180].map((y, i) => (
        <g key={y}>
          <path d={`M ${xs[2]} 138 C ${xs[2]} ${y} ${xs[2] + 40} ${y} ${xs[2] + 60} ${y}`} stroke="rgba(247,185,85,0.35)" fill="none" />
          <text x={xs[2] + 66} y={y + 4} fontSize="10" fill={A} fontFamily="JetBrains Mono Variable, monospace">
            {i === 0 ? "admin view" : "member view"}
          </text>
        </g>
      ))}
    </svg>
  );
}

function MeshVisual() {
  const ridge = "M0 200 C 60 150 100 175 150 140 S 250 90 300 130 S 380 170 440 120 L 440 240 L 0 240 Z";
  const nodes = [
    [30, 180], [95, 160], [150, 140], [215, 112], [265, 108], [320, 135], [380, 150], [425, 124],
    [120, 70], [250, 50], [360, 70],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [1, 8], [8, 2], [8, 9], [9, 3], [9, 4], [9, 10], [10, 5], [10, 6], [10, 7]];
  const route = [0, 1, 8, 9, 10, 7].map((i) => nodes[i]);
  const routePath = "M " + route.map(([x, y]) => `${x} ${y}`).join(" L ");
  return (
    <svg viewBox="0 0 440 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={B} stopOpacity="0.25" />
          <stop offset="1" stopColor={B} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={ridge} fill="url(#rg)" stroke="rgba(103,232,249,0.35)" />
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(79,140,255,0.3)" />
      ))}
      <path d={routePath} stroke={C} strokeWidth="1.6" fill="none" strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" from="0" to="-60" dur="1.6s" repeatCount="indefinite" />
      </path>
      {[2, 9, 6].map((i, k) => (
        <circle key={i} cx={nodes[i][0]} cy={nodes[i][1]} r="6" fill="none" stroke={C}>
          <animate attributeName="r" values="4;40" dur="3s" begin={`${k}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="3s" begin={`${k}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i < 8 ? 3 : 2.5} fill={i < 8 ? C : "#e5e7eb"} />
      ))}
      <circle r="4" fill="#fff">
        <animateMotion dur="3.6s" repeatCount="indefinite" path={routePath} />
      </circle>
      <text x="14" y="26" fontSize="10" fill={A} fontFamily="JetBrains Mono Variable, monospace">
        470 to 790 MHz · TV White Space
      </text>
    </svg>
  );
}

function DevanVisual() {
  const chain = ["Source", "Concept", "Question", "Experiment", "Outcome", "Artifact"];
  const pts = chain.map((_, i) => {
    const ang = -Math.PI / 2 + (i / chain.length) * Math.PI * 2;
    return [220 + Math.cos(ang) * 150, 120 + Math.sin(ang) * 84];
  });
  const loop = "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L ") + " Z";
  const total = 6;
  return (
    <svg viewBox="0 0 440 240" className="h-full w-full" aria-hidden>
      <path d={loop} stroke="rgba(79,140,255,0.35)" fill="none" />
      {pts.map(([x, y], i) => (
        <g key={chain[i]}>
          <rect x={x - 42} y={y - 13} width="84" height="26" rx="13" fill="#0d1117" stroke="rgba(103,232,249,0.35)">
            <animate
              attributeName="stroke"
              values={`rgba(103,232,249,0.35);${C};rgba(103,232,249,0.35)`}
              keyTimes="0;0.5;1"
              dur={`${total}s`}
              begin={`${i}s`}
              repeatCount="indefinite"
            />
          </rect>
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10.5" fill="#e5e7eb" fontFamily="JetBrains Mono Variable, monospace">
            {chain[i]}
          </text>
        </g>
      ))}
      <circle r="4" fill="#fff">
        <animateMotion dur={`${total}s`} repeatCount="indefinite" path={loop} />
      </circle>
      <g>
        <rect x="178" y="106" width="84" height="28" rx="14" fill="rgba(49,208,125,0.12)" stroke={G} />
        <text x="220" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill={G} fontFamily="JetBrains Mono Variable, monospace">
          TESTED
        </text>
        <animate attributeName="opacity" values="0.35;1;0.35" dur="3s" repeatCount="indefinite" />
      </g>
    </svg>
  );
}

export function WorkVisual({ slug }: { slug: string }) {
  if (slug === "project-loop") return <LoopVisual />;
  if (slug === "wireless-mesh-tvws") return <MeshVisual />;
  return <DevanVisual />;
}
