import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/og");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Must stay aligned with src/content/site-data.ts slugs
const pages = [
  {
    file: "home.svg",
    eyebrow: "kantimohanthy.dev · field portfolio",
    title: "Ujwal Shyam Kantimohanthy",
    subtitle: "Engineering student building reliable web systems, evidence-grounded AI tools & network experiments.",
    activeIdx: 1,
  },
  {
    file: "atlas.svg",
    eyebrow: "kantimohanthy.dev/atlas · curated graph",
    title: "DEVAN Atlas",
    subtitle: "Projects linked deterministically to architectural decisions, RFC concepts, and inspectable proof.",
    activeIdx: 1,
  },
  {
    file: "cv.svg",
    eyebrow: "kantimohanthy.dev/cv · curriculum vitae",
    title: "Curriculum Vitae — Ujwal Shyam Kantimohanthy",
    subtitle: "BSc Engineering Sciences (University of Rome Tor Vergata, exp. 2027) · Systems & Networks.",
    activeIdx: 2,
  },
  {
    file: "project-loop.svg",
    eyebrow: "traceroute case study · Zidio Development internship",
    title: "LOOP",
    subtitle: "Multi-tenant customer feedback platform with RBAC, CSV escaping & cited answers.",
    activeIdx: 0,
  },
  {
    file: "daser-net.svg",
    eyebrow: "traceroute case study · INFERENCE Lab research",
    title: "DASER-Net",
    subtitle: "Real-corpus validation and speaker-disjoint splitting for speech emotion recognition.",
    activeIdx: 3,
  },
  {
    file: "devan.svg",
    eyebrow: "traceroute case study · Arylax Labs umbrella",
    title: "DEVAN (UJ.OS)",
    subtitle: "Evidence ledger & static-first architecture with derived ENCOUNTERED -> TESTED states.",
    activeIdx: 1,
  },
  {
    file: "wireless-mesh-tvws.svg",
    eyebrow: "traceroute case study · BSc thesis (draft under review)",
    title: "Wireless Mesh + TV White Space",
    subtitle: "Sub-GHz UHF mesh propagation & spectrum coexistence across obstructed rural terrain.",
    activeIdx: 2,
  },
  {
    file: "cineforge-ai-pro.svg",
    eyebrow: "supporting work · team submission",
    title: "CineForge AI Pro",
    subtitle: "Bilingual Arabic/English script-to-breakdown pipeline (IBM SkillsBuild Challenge).",
    activeIdx: 0,
  },
];

const nodes = [
  { x: 740, y: 310, label: "LOOP" },
  { x: 920, y: 185, label: "DEVAN" },
  { x: 950, y: 410, label: "TVWS Thesis" },
  { x: 1110, y: 245, label: "DASER-Net" },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSvg(spec) {
  const links = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
  ];

  const activeNode = nodes[spec.activeIdx] || nodes[1];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#11100E"/>
  <rect x="28" y="28" width="1144" height="574" rx="14" fill="none" stroke="rgba(242,235,220,0.14)" stroke-width="1.5"/>

  <!-- Topographic contour mesh on right -->
  <g fill="none" stroke="rgba(242,235,220,0.09)" stroke-width="1.2">
    <ellipse cx="920" cy="300" rx="235" ry="175" transform="rotate(-8 920 300)"/>
    <ellipse cx="920" cy="300" rx="175" ry="125" transform="rotate(-6 920 300)"/>
    <ellipse cx="920" cy="300" rx="115" ry="78" transform="rotate(-4 920 300)"/>
  </g>

  ${links
    .map(([a, b]) => {
      const p1 = nodes[a];
      const p2 = nodes[b];
      const hi = a === spec.activeIdx || b === spec.activeIdx;
      return `<path d="M ${p1.x} ${p1.y} Q ${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2 - 26} ${p2.x} ${p2.y}" fill="none" stroke="${hi ? "#7AC4CC" : "#569AA3"}" stroke-opacity="${hi ? "0.95" : "0.4"}" stroke-width="${hi ? "2.4" : "1.5"}"/>`;
    })
    .join("\n  ")}

  ${nodes
    .map((n, i) => {
      const isAct = i === spec.activeIdx;
      return `<g>
    <circle cx="${n.x}" cy="${n.y}" r="${isAct ? 14 : 9}" fill="#11100E" stroke="${isAct ? "#E8923A" : "#7AC4CC"}" stroke-width="${isAct ? 3 : 2}"/>
    <circle cx="${n.x}" cy="${n.y}" r="4" fill="${isAct ? "#F2A65A" : "#F2EBDC"}"/>
    <text x="${n.x}" y="${n.y - 20}" text-anchor="middle" fill="${isAct ? "#F2EBDC" : "#CBC2AF"}" font-family="ui-monospace, Menlo, monospace" font-size="14">${escapeXml(n.label)}</text>
  </g>`;
    })
    .join("\n  ")}

  <circle cx="${activeNode.x}" cy="${activeNode.y}" r="24" fill="none" stroke="#E8923A" stroke-opacity="0.35" stroke-width="2"/>

  <text x="72" y="132" fill="#F2A65A" font-family="ui-monospace, Menlo, monospace" font-size="18" letter-spacing="1.5">${escapeXml(spec.eyebrow.toUpperCase())}</text>
  <text x="72" y="230" fill="#F2EBDC" font-family="Georgia, serif" font-size="50" font-weight="400">${escapeXml(spec.title)}</text>
  <foreignObject x="72" y="265" width="590" height="200">
    <div xmlns="http://www.w3.org/1999/xhtml" style="color:#CBC2AF;font-family:system-ui,-apple-system,sans-serif;font-size:24px;line-height:1.45;">
      ${escapeXml(spec.subtitle)}
    </div>
  </foreignObject>
  <text x="72" y="554" fill="#A89F8D" font-family="ui-monospace, Menlo, monospace" font-size="16">ROUTED PORTFOLIO · EVIDENCE-GROUNDED SYSTEMS · KANTIMOHANTHY.DEV</text>
</svg>
`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(OUT_DIR, page.file), buildSvg(page));
}
console.log(`Generated ${pages.length} Open Graph SVGs in ${OUT_DIR}`);
