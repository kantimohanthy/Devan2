import { Section } from "@/components/ui/Section";
import { research } from "@/data/content";
import { ResearchCard } from "./ResearchCard";

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="04 · Research"
      reveal="slideLeft"
      title="Thesis work and field notes"
      description="Longer-form thinking — the thesis, strategy documents, and the notes that come out of building rather than reading."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {research.map((item, i) => (
          <ResearchCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
