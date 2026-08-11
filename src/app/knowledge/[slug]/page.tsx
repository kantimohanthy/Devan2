import React from "react";
import { DomainWorkspace } from "@/components/workspace/DomainWorkspace";
import { ContextInspector } from "@/components/workspace/ContextInspector";
import { KnowledgeBreadcrumbs } from "@/components/workspace/KnowledgeBreadcrumbs";
import { DensityToggle } from "@/components/workspace/DensityToggle";

export async function generateStaticParams() {
  return [
    { slug: "networking.dns" },
    { slug: "networking.tcp" },
    { slug: "linux.kernel" },
    { slug: "container.kubernetes" },
    { slug: "networking.tls" },
  ];
}

export default async function KnowledgeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

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
