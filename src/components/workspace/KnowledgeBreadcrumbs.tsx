"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface KnowledgeBreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
}

export function KnowledgeBreadcrumbs({ items }: KnowledgeBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 font-mono text-xs text-[#8A9098] pb-2 border-b border-[#20252B]/50 mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#20252B]" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-[#4F8CFF] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-[#F5F5F5] font-semibold" : ""}>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
