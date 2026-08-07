import { Section } from "@/components/ui/Section";

export function Now() {
  return (
    <Section id="now" eyebrow="Now" reveal="focus" title="Current Status">
      <p className="text-sm text-text-secondary">Currently in Rome, preparing for STATION F Landing Zone in Paris.</p>
    </Section>
  );
}
