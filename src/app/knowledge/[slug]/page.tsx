import { notFound } from "next/navigation";
import { getConcept } from "@/lib/data";
import { IdStrip, Narrative, ConnectedLabel, ChipRail, DeepRegion, ProvFooter } from "@/components/EntityShell";

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = await getConcept(slug);
  if (!concept) return notFound();

  return (
    <div>
      <IdStrip
        type={`Concept · ${concept.domain} → ${concept.topic}`}
        title={concept.name}
        description={concept.description}
        state={concept.state}
      />

      <ConnectedLabel>Studied via</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={concept.experiments} empty="No experiments have studied this concept yet." />
      </div>

      <ConnectedLabel>Sources</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={concept.sources} empty="No source recorded yet." />
      </div>

      <ConnectedLabel>Evidence</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={concept.evidence} empty="No evidence produced yet." />
      </div>

      <ConnectedLabel>Related knowledge</ConnectedLabel>
      <ChipRail chips={concept.related} empty="No related concepts linked yet." />

      <DeepRegion>
        <Narrative>
          <p>
            Position in hierarchy: {concept.domain} → {concept.topic} → {concept.name}
          </p>
        </Narrative>
      </DeepRegion>

      <ProvFooter
        items={[
          `created ${concept.createdAt}`,
          concept.stateChangedAt ? `evidence state changed ${concept.stateChangedAt}` : "no evidence-state change recorded",
        ]}
      />
    </div>
  );
}
