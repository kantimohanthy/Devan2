"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DomainWorkspace } from "@/components/workspace/DomainWorkspace";
import { ContextInspector } from "@/components/workspace/ContextInspector";
import { KnowledgeBreadcrumbs } from "@/components/workspace/KnowledgeBreadcrumbs";
import { DensityToggle } from "@/components/workspace/DensityToggle";

export default function KnowledgeSlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "networking.dns";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <KnowledgeBreadcrumbs items={[{ label: "Knowledge Tree", href: "/knowledge" }, { label: slug, href: `/knowledge/${slug}` }]} />
        <DensityToggle />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <DomainWorkspace slug={slug} />
        </div>
        <div className="col-span-4">
          <ContextInspector />
        </div>
      </div>
    </div>
  );
}
