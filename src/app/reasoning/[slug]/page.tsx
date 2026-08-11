import { notFound } from "next/navigation";
import { getDecision } from "@/lib/data";
import { IdStrip, DeepRegion, ProvFooter } from "@/components/EntityShell";
import { ReasoningReplay } from "@/components/ReasoningReplay";

export async function generateStaticParams() {
  return [
    { slug: "oracle-reasoner" },
    { slug: "evidence-verifier" },
  ];
}

export default async function DecisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decision = await getDecision(slug);
  if (!decision) return notFound();

  return (
    <div>
      <IdStrip type="Decision" title={decision.question} description={decision.summary} />

      <DeepRegion>
        <ReasoningReplay decision={decision} />
      </DeepRegion>

      <ProvFooter
        items={[
          decision.decidedDuring ? `decided during ${decision.decidedDuring}` : "decision date not recorded",
          decision.verification ? `implementation verified: ${decision.verification}` : "no verification recorded",
        ]}
      />
    </div>
  );
}
