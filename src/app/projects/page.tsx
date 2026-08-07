import { projects } from "@/lib/data";
import { ChipRail } from "@/components/EntityShell";
import type { ChipRef } from "@/lib/types";

export default function ProjectsIndexPage() {
  const chips: ChipRef[] = projects.map((p) => ({
    type: "Project",
    title: p.name,
    meta: p.description.length > 42 ? p.description.slice(0, 42) + "…" : p.description,
    href: `/projects/${p.slug}`,
  }));

  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Projects</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Living Systems</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Each project is a system, not a card — architecture, knowledge, and evidence are reachable,
          not just described.
        </p>
      </div>
      <ChipRail chips={chips} />
    </div>
  );
}
