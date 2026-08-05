import { Section } from "@/components/ui/Section";
import { ventures } from "@/data/content";
import { VentureCard } from "./VentureCard";

export function Ventures() {
  return (
    <Section
      id="ventures"
      eyebrow="06 · Ventures"
      title="Ideas built to stand on their own"
      description="Where the engineering points toward a product or a market, not just a portfolio entry."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {ventures.map((venture) => (
          <VentureCard key={venture.name} v={venture} />
        ))}
      </div>
    </Section>
  );
}
