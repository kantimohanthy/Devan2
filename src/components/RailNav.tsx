"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Circle,
  Diamond,
  SquareStack,
  Compass,
  Boxes,
  Layers,
  History,
  Target,
  Waypoints,
  FileStack,
  UserRound,
  Pin,
} from "lucide-react";

const mainItems = [
  { href: "/", label: "Mission Control", icon: Circle },
  { href: "/knowledge", label: "Knowledge Tree", icon: Diamond },
  { href: "/visualization", label: "Atlas Graph", icon: Waypoints },
  { href: "/evidence", label: "Evidence Proofs", icon: FileStack },
  { href: "/laboratory", label: "Laboratory", icon: SquareStack },
  { href: "/reasoning", label: "Oracle Reasoning", icon: Compass },
  { href: "/projects", label: "Projects", icon: Boxes },
  { href: "/repositories", label: "Repositories", icon: Layers },
  { href: "/timeline", label: "Timeline Ledger", icon: History },
  { href: "/missions", label: "Active Missions", icon: Target },
  { href: "/identity", label: "Identity Profile", icon: UserRound },
];

const pinnedItems = [
  { href: "/knowledge/networking.dns", label: "DNS Iterative Trace" },
  { href: "/knowledge/networking.tcp", label: "TCP 3-Way Handshake" },
];

export function RailNav() {
  const pathname = usePathname();

  return (
    <nav className="group w-16 hover:w-[220px] shrink-0 border-r border-border flex flex-col items-stretch py-4 gap-1 transition-[width] duration-200 ease-out overflow-y-auto select-none bg-[#0A0B0D]">
      <div className="flex items-center gap-3 px-4 mb-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue/35 text-blue text-[11px] font-bold tracking-wider shrink-0 bg-blue/10">
          DE
        </div>
        <span className="font-mono font-bold text-xs text-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity">
          DEVAN OS v2.1
        </span>
      </div>

      {mainItems.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-5 py-2 text-[12px] font-mono whitespace-nowrap border-l-2 transition-colors ${
              active
                ? "text-text border-blue bg-blue/[0.08]"
                : "text-text-2 border-transparent hover:text-text hover:bg-white/[0.02]"
            }`}
          >
            <Icon size={16} className="shrink-0 text-[#4F8CFF]" strokeWidth={1.75} />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {label}
            </span>
          </Link>
        );
      })}

      <div className="border-t border-[#20252B] my-2 pt-2 px-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-wider text-[#8A9098] font-mono font-semibold flex items-center gap-1">
          <Pin className="h-3 w-3 text-amber-400" /> Pinned Intelligence
        </span>
        <div className="space-y-1 pt-1 font-mono text-[11px]">
          {pinnedItems.map((p) => (
            <Link key={p.href} href={p.href} className="block text-[#8A9098] hover:text-[#4F8CFF] truncate">
              • {p.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
