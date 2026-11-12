"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCommandPalette } from "./CommandPalette";

const sectionLabels: Record<string, string> = {
  "": "Home",
  identity: "About",
  knowledge: "Knowledge",
  laboratory: "Lab",
  evidence: "Evidence",
  reasoning: "Decisions",
  projects: "Projects",
  repositories: "Repos",
  timeline: "Timeline",
  missions: "Research",
  visualization: "Map",
  work: "Work",
  cv: "CV",
};

const leafLabels: Record<string, string> = {
  "networking.dns": "DNS (RFC 1035)",
  "networking.tcp": "TCP (RFC 9293)",
  "networking.tls": "TLS 1.3",
  dns: "DNS (RFC 1035)",
  tcp: "TCP (RFC 9293)",
  tls: "TLS 1.3",
  "rf-propagation-occluded-terrain": "RF Propagation (Terrain)",
  http: "HTTP Lifecycle",
  "dns-iterative-resolution": "DNS Iterative Resolution",
  "why-postgresql": "Why PostgreSQL",
  "wireless-mesh-tvws": "Wireless Mesh + TVWS",
  "project-loop": "Project LOOP",
  "daser-net": "DASER-Net",
  cineforge: "CineForge AI Pro",
  "cineforge-ai-pro": "CineForge AI Pro",
  atlas: "DEVAN Atlas",
  devan: "DEVAN",
  "ujwal-portfolio": "Portfolio",
  "zidio-web-dev": "LOOP",
  "clineforge-pro": "CineForge AI Pro",
};

function formatSegment(segment: string): string {
  if (leafLabels[segment]) return leafLabels[segment];
  if (sectionLabels[segment]) return sectionLabels[segment];
  if (segment.startsWith("networking.")) {
    return segment.replace("networking.", "").toUpperCase();
  }
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getBreadcrumbs(pathname: string): { path: string; label: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return [{ path: "/", label: "Home" }];
  }

  const isDevanArea = [
    "knowledge",
    "laboratory",
    "evidence",
    "reasoning",
    "projects",
    "repositories",
    "timeline",
    "missions",
    "visualization",
    "identity",
  ].includes(segments[0]);

  const crumbs: { path: string; label: string }[] = [];
  crumbs.push({ path: isDevanArea ? "/knowledge/" : "/", label: isDevanArea ? "DEVAN" : "Home" });

  let cumulative = "";
  for (let i = 0; i < segments.length; i++) {
    cumulative += `/${segments[i]}`;
    crumbs.push({
      path: `${cumulative}/`,
      label: formatSegment(segments[i]),
    });
  }

  return crumbs;
}

export function TopBar() {
  const pathname = usePathname();
  const { open } = useCommandPalette();
  const crumbs = getBreadcrumbs(pathname || "/");

  return (
    <header className="h-14 shrink-0 border-b border-border flex items-center justify-between gap-2 relative px-3 sm:px-6 bg-[#0A0B0D]">
      <div className="flex items-center gap-1.5 text-xs text-text-3 font-mono truncate max-w-[50vw]">
        {crumbs.map((t, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={`${t.path}-${i}`} className="flex items-center gap-1.5 shrink-0">
              <Link
                href={t.path}
                className={isLast ? "text-[#F5F5F5] font-semibold" : "hover:text-text-2 transition-colors"}
              >
                {t.label}
              </Link>
              {!isLast && <span className="text-[#8A9098]">›</span>}
            </span>
          );
        })}
      </div>

      <button
        onClick={open}
        aria-label="Search concepts, projects, decisions (⌘K)"
        className="w-[360px] max-w-[45vw] h-[34px] rounded-lg border border-border bg-surface flex items-center gap-2 px-3 text-[12px] text-text-3 hover:border-[#2c323a] transition-colors"
      >
        <span className="truncate">Search concepts, projects, decisions…</span>
        <span className="ml-auto text-[10px] font-mono border border-border rounded px-1.5 py-0.5 shrink-0 text-[#8A9098]">
          ⌘K
        </span>
      </button>
    </header>
  );
}
