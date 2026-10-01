import { Section } from "@/components/ui/Section";

export function Now() {
  return (
    <Section id="now" eyebrow="Now" reveal="focus" title="Current Status">
      <p className="text-sm text-text-secondary">Between Rome and Paris (STATION F Landing Zone).</p>
    </Section>
  );
}
