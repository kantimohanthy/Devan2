"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCommandPalette } from "./CommandPalette";

const sectionLabels: Record<string, string> = {
  "": "Home",
  identity: "Identity",
  knowledge: "Knowledge",
  laboratory: "Laboratory",
  evidence: "Evidence",
  reasoning: "Reasoning",
  projects: "Projects",
  repositories: "Repositories",
  timeline: "Timeline",
  missions: "Missions",
  visualization: "Visualization",
};

function labelForPath(path: string) {
  const [, section] = path.split("/");
  return sectionLabels[section || ""] ?? section;
}

export function TopBar() {
  const pathname = usePathname();
  const { open } = useCommandPalette();
  const [state, setState] = useState<{
    pathname: string;
    thread: { path: string; label: string }[];
  }>({ pathname: "/", thread: [{ path: "/", label: "Home" }] });

  if (state.pathname !== pathname) {
    const next = [...state.thread, { path: pathname, label: labelForPath(pathname) }].slice(-5);
    setState({ pathname, thread: next });
  }
  const thread = state.thread;

  return (
    <header className="h-14 shrink-0 border-b border-border flex items-center justify-center relative px-6">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-text-3">
        {thread.map((t, i) => {
          const isLast = i === thread.length - 1;
          return (
            <span key={`${t.path}-${i}`} className="flex items-center gap-1.5">
              <Link
                href={t.path}
                className={isLast ? "text-text-2" : "hover:text-text-2 transition-colors"}
              >
                {t.label}
              </Link>
              {!isLast && <span>›</span>}
            </span>
          );
        })}
      </div>

      <button
        onClick={open}
        className="w-[420px] max-w-[50vw] h-[34px] rounded-lg border border-border bg-surface flex items-center gap-2 px-3 text-[13px] text-text-3 hover:border-[#2c323a] transition-colors"
      >
        <span className="truncate">Ask DEVAN — try &ldquo;why postgresql?&rdquo;</span>
        <span className="ml-auto text-[10px] border border-border rounded px-1.5 py-0.5 shrink-0">
          ⌘K
        </span>
      </button>
    </header>
  );
}
