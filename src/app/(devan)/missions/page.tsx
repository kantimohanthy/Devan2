import { missions } from "@/lib/data";
import { ChipRail } from "@/components/EntityShell";
import type { ChipRef } from "@/lib/types";

export default function MissionsIndexPage() {
  const chips: ChipRef[] = missions.map((m) => ({
    type: "Mission",
    title: m.name,
    meta: `${m.objectives.filter((o) => o.done).length} / ${m.objectives.length} objectives`,
    href: `/missions/${m.slug}`,
  }));

  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Missions</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Objectives in progress</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Every activity belongs to a mission — objectives, experiments, evidence, and knowledge, in
          one thread.
        </p>
      </div>
      <ChipRail chips={chips} />
    </div>
  );
}
