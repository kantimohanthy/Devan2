import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { research } from "@/data/content";

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="04 · Research"
      reveal="slideLeft"
      title="Thesis work and field notes"
      description="Longer-form thinking — the thesis, strategy documents, and the notes that come out of building rather than reading."
    >
      <div
        className="rounded-2xl border border-border bg-background-secondary/30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 64px)",
        }}
      >
        {research.map((item, i) => (
          <div
            key={item.title}
            className="grid gap-4 border-b border-border p-6 last:border-b-0 sm:grid-cols-[80px_1fr] sm:p-8"
          >
            <div className="font-mono text-xs text-text-tertiary">
              <p>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-accent">{item.type}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-snug text-text-primary">
                {item.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-text-tertiary">{item.context}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
