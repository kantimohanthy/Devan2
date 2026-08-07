import { Section } from "@/components/ui/Section";
import { ExperimentCard } from "@/components/ExperimentCard";
import { experiments } from "@/lib/data";

export function Experiments() {
  return (
    <Section
      id="experiments-engine"
      eyebrow="04 · Laboratory"
      reveal="rise"
      title="Live executable experiments"
      description="System benchmarks, protocol traces, and search engines running directly against live instances."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.slug} experiment={experiment as unknown as Parameters<typeof ExperimentCard>[0]["experiment"]} />
        ))}
      </div>
    </Section>
  );
}
