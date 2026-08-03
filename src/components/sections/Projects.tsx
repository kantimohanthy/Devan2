import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/content";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 · Projects"
      reveal="wipe"
      title="Shipped and in-progress builds"
      description="Each one documented as problem → solution → architecture → what broke. Repository links point to the real build."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
