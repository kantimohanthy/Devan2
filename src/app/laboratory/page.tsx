import Link from "next/link";
import { experiments } from "@/lib/data";
import { StateDot, UnverifiedTag } from "@/components/EntityShell";

export default function LaboratoryIndexPage() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Laboratory</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Experiments</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Executable engineering experiments. Anything not yet wired to a real run backend is marked
          rather than hidden.
        </p>
      </div>

      <div>
        {experiments.map((exp) => (
          <Link
            key={exp.slug}
            href={`/laboratory/${exp.slug}`}
            className={`flex items-center justify-between py-3.5 border-t border-border first:border-t-0 hover:bg-white/[0.02] px-2 -mx-2 rounded-md transition-colors ${
              !exp.executable ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <StateDot state={exp.state} />
              <span className="text-[14px]">{exp.name}</span>
              {!exp.executable && <UnverifiedTag />}
            </div>
            <span className="text-[12px] text-text-3">
              {exp.executable ? `last run ${exp.lastRun}` : "not yet executable"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
