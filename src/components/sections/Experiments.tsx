import { Section } from "@/components/ui/Section";
import { ExperimentCard } from "@/components/ExperimentCard";
import { experiments } from "@/data/content";

export function Experiments() {
  return (
    <Section
      id="experiments"
      eyebrow="05 · Experiments"
      title="What's active right now"
      description="Not everything here ships. This is the honest state of what's actually in motion."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.title} experiment={experiment} />
        ))}
      </div>
    </Section>
  );
}
