"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { StateDot, UnverifiedTag } from "./EntityShell";
import type { EvidenceState } from "@/lib/types";

export interface TreeNode {
  name: string;
  href?: string;
  state?: EvidenceState;
  badge?: string;
  unverified?: boolean;
  leaf?: boolean;
  children?: TreeNode[];
}

function Node({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = !!node.children?.length;

  const row = (
    <div
      className={`flex items-center gap-2 px-2.5 py-2 rounded-md cursor-pointer hover:bg-white/[0.02] ${
        node.unverified ? "opacity-60" : ""
      }`}
      onClick={() => hasChildren && setOpen((o) => !o)}
    >
      {hasChildren ? (
        <ChevronRight
          size={11}
          className={`text-text-3 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
      ) : (
        <span className="w-[11px] shrink-0" />
      )}
      <StateDot state={node.state} />
      <span className={node.leaf ? "text-text-2" : "text-text"}>{node.name}</span>
      {node.unverified && <UnverifiedTag />}
      {node.badge && <span className="ml-auto text-[11px] text-text-3">{node.badge}</span>}
    </div>
  );

  return (
    <div className="mb-0.5">
      {node.href && !hasChildren ? <Link href={node.href}>{row}</Link> : row}
      {hasChildren && (
        <div
          className={`ml-[21px] pl-3 border-l border-border overflow-hidden transition-[max-height] duration-200 ${
            open ? "max-h-[999px]" : "max-h-0"
          }`}
        >
          {node.children!.map((child) => (
            <Node key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function KnowledgeTree({ nodes }: { nodes: TreeNode[] }) {
  return (
    <div className="text-[14px]">
      {nodes.map((node) => (
        <Node key={node.name} node={node} depth={0} />
      ))}
    </div>
  );
}
