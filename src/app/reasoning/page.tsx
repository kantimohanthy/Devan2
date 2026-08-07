import Link from "next/link";
import { decisions } from "@/lib/data";

export default function ReasoningIndexPage() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Reasoning</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Decisions</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Every important engineering decision, replayable when the alternatives were actually logged
          at the time.
        </p>
      </div>

      <div>
        {decisions.map((d) => (
          <Link
            key={d.slug}
            href={`/reasoning/${d.slug}`}
            className="flex items-center justify-between py-3.5 border-t border-border first:border-t-0 hover:bg-white/[0.02] px-2 -mx-2 rounded-md transition-colors"
          >
            <span className="text-[14px]">{d.question}</span>
            <span className="text-[12px] text-text-3">
              {d.hasAlternatives ? `${d.alternatives.length} alternatives logged` : "flat record"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
