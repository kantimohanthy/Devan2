"use client";

import dynamic from "next/dynamic";

const DevanAtlasClient = dynamic(
  () => import("./DevanAtlasClient").then((mod) => mod.DevanAtlasClient),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-ivory/15 bg-[#181613] p-8 font-mono text-[12.5px] text-ivory-3">
        Loading interactive Atlas canvas… (complete structured index remains visible below)
      </div>
    ),
  }
);

export function AtlasLazyWrapper({ initialNodeId }: { initialNodeId?: string }) {
  return <DevanAtlasClient initialNodeId={initialNodeId} />;
}
