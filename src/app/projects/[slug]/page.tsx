import { notFound } from "next/navigation";
import { getProject } from "@/lib/data";
import { IdStrip, ConnectedLabel, ChipRail, DeepRegion, Narrative } from "@/components/EntityShell";

export async function generateStaticParams() {
  return [
    { slug: "cineforge-ai" },
    { slug: "sentinel-ai" },
  ];
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  return (
    <div>
      <IdStrip type="Project" title={project.name} description={project.description} />

      <ConnectedLabel>Repositories</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={project.repositories} empty="No repositories linked." />
      </div>

      <ConnectedLabel>Concepts</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={project.concepts} empty="No concepts linked." />
      </div>

      <ConnectedLabel>Experiments</ConnectedLabel>
      <div className="mb-6">
        <ChipRail chips={project.experiments} empty="No experiments linked." />
      </div>

      <ConnectedLabel>Decisions</ConnectedLabel>
      <ChipRail chips={project.decisions} empty="No decisions linked." />

      {project.openQuestions.length > 0 && (
        <DeepRegion>
          <Narrative>
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">Open Questions</h3>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-neutral-300">
              {project.openQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </Narrative>
        </DeepRegion>
      )}
    </div>
  );
}
