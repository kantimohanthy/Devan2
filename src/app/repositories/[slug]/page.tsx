import { notFound } from "next/navigation";
import { getRepository } from "@/lib/data";
import { IdStrip, ConnectedLabel, ChipRail, DeepRegion, Narrative, ProvFooter } from "@/components/EntityShell";

export default async function RepositoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = await getRepository(slug);
  if (!repo) return notFound();

  return (
    <div>
      <IdStrip type="Repository" title={repo.name} description={repo.description} />

      <ConnectedLabel>Concepts</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={repo.concepts} empty="No concepts linked." />
      </div>

      <ConnectedLabel>Decisions</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={repo.decisions} empty="No decisions linked." />
      </div>

      <ConnectedLabel>Experiments</ConnectedLabel>
      <ChipRail chips={repo.experiments} empty="No experiments linked." />

      {repo.architectureNote && (
        <DeepRegion>
          <Narrative>
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">Architecture Note</h3>
            <p className="font-mono text-xs text-neutral-300 leading-relaxed">{repo.architectureNote}</p>
          </Narrative>
        </DeepRegion>
      )}

      <ProvFooter items={[`last commit ${repo.lastCommit}`, `CI ${repo.ciStatus}`, `${repo.openIssues} open issues`]} />
    </div>
  );
}
