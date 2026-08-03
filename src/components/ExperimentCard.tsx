import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Experiment } from "@/data/types";

const statusTone: Record<Experiment["status"], "success" | "warning" | "danger" | "neutral"> = {
  "In progress": "warning",
  Complete: "success",
  Blocked: "danger",
  Paused: "neutral",
};

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Card className="p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-text-primary">{experiment.title}</h3>
        <Tag tone={statusTone[experiment.status]}>{experiment.status}</Tag>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{experiment.description}</p>
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-text-tertiary">
          <span>Progress</span>
          <span>{experiment.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${experiment.progress}%` }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {experiment.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
}
