import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ventures } from "@/data/content";

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
          <Card key={venture.name} className="p-7">
            <h3 className="text-xl font-semibold text-text-primary">{venture.name}</h3>
            <p className="mt-1 text-sm text-accent">{venture.tagline}</p>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Problem
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{venture.problem}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Market
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{venture.market}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                    Stage
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{venture.stage}</dd>
                </div>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Notes
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{venture.notes}</dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Vision
                </dt>
                <dd className="mt-1 text-sm italic leading-relaxed text-text-primary">
                  {venture.vision}
                </dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </Section>
  );
}
