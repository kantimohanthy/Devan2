import { timelineService } from "@/services/timeline.service";

export default async function TimelinePage() {
  const events = await timelineService.getTimeline();

  return (
    <div>
      <div className="mb-9">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Timeline</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Engineering Evolution</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Not a dated blog — the sequence of real steps that got the system here.
        </p>
      </div>
      <div className="pl-4 border-l border-border space-y-6">
        {events.map((e, i) => (
          <div key={i} className="relative pl-4 border-l border-[#4F8CFF]">
            <div className="text-[11px] font-mono text-[#4F8CFF] font-semibold uppercase">{e.date} · {e.category}</div>
            <div className="text-[14px] font-medium text-text mt-0.5">{e.title}</div>
            <div className="text-[12px] text-text-2 mt-1 leading-relaxed">{e.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
