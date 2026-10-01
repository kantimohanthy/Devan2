import { notFound } from "next/navigation";
import { getMission } from "@/lib/data";
import { IdStrip, ConnectedLabel, ChipRail, DeepRegion, Narrative } from "@/components/EntityShell";

export async function generateStaticParams() {
  return [
    { slug: "wireless-mesh-tvws" },
    { slug: "kernel-bpf-tracer" },
  ];
}

export default async function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = await getMission(slug);
  if (!mission) return notFound();

  return (
    <div>
      <IdStrip type="Mission" title={mission.name} description={mission.objective} />

      <ConnectedLabel>Current focus</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={mission.focus} empty="No entities linked to focus yet." />
      </div>

      <DeepRegion>
        <Narrative>
          <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">Objectives & Progress</h3>
          <ul className="space-y-2 font-mono text-xs">
            {mission.objectives.map((obj, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className={obj.done ? "text-[#31D07D]" : "text-neutral-500"}>{obj.done ? "✓" : "□"}</span>
                <span className={obj.done ? "text-neutral-300" : "text-neutral-500"}>{obj.label}</span>
              </li>
            ))}
          </ul>
        </Narrative>
      </DeepRegion>
    </div>
  );
}
