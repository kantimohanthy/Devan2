import { notFound } from "next/navigation";
import { getExperiment } from "@/lib/data";
import { IdStrip, ConnectedLabel, ChipRail, DeepRegion, ProvFooter } from "@/components/EntityShell";
import { LabTerminal } from "@/components/LabTerminal";

export default async function ExperimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = await getExperiment(slug);
  if (!experiment) return notFound();

  return (
    <div>
      <IdStrip
        type="Experiment"
        title={experiment.name}
        description={experiment.description}
        state={experiment.state}
      />

      <ConnectedLabel>Connected</ConnectedLabel>
      <ChipRail
        chips={[...experiment.concepts, ...experiment.evidenceProduced, ...experiment.repositories]}
        empty="Nothing linked yet."
      />

      <DeepRegion>
        <LabTerminal experiment={experiment} />
      </DeepRegion>

      <ProvFooter items={[`created ${experiment.createdAt}`, experiment.lastRun ? `last run ${experiment.lastRun}` : "never run"]} />
    </div>
  );
}
