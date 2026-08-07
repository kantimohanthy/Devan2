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
} from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Circle },
  { href: "/identity", label: "Identity", icon: UserRound },
  { href: "/knowledge", label: "Knowledge", icon: Diamond },
  { href: "/laboratory", label: "Laboratory", icon: SquareStack },
  { href: "/evidence", label: "Evidence", icon: FileStack },
  { href: "/reasoning", label: "Reasoning", icon: Compass },
  { href: "/projects", label: "Projects", icon: Boxes },
  { href: "/repositories", label: "Repositories", icon: Layers },
  { href: "/timeline", label: "Timeline", icon: History },
  { href: "/missions", label: "Missions", icon: Target },
  { href: "/visualization", label: "Visualization", icon: Waypoints },
];

export function RailNav() {
  const pathname = usePathname();

  return (
    <nav className="group w-16 hover:w-[190px] shrink-0 border-r border-border flex flex-col items-stretch py-5 gap-1 transition-[width] duration-200 ease-out overflow-hidden">
      <div className="w-8 h-8 mx-4 mb-6 flex items-center justify-center rounded-lg border border-blue/35 text-blue text-[13px] font-bold tracking-wide shrink-0">
        EY
      </div>
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-5 py-2.5 text-[13px] whitespace-nowrap border-l-2 transition-colors ${
              active
                ? "text-text border-blue bg-blue/[0.06]"
                : "text-text-2 border-transparent hover:text-text hover:bg-white/[0.02]"
            }`}
          >
            <Icon size={16} className="shrink-0" strokeWidth={1.75} />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
