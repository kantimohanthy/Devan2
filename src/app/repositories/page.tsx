import Link from "next/link";
import { repositories } from "@/lib/data";

export default function RepositoriesIndexPage() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Repositories</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Repository Intelligence</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Health, architecture, and connected knowledge — stated plainly, never scored.
        </p>
      </div>

      <div>
        {repositories.map((r) => (
          <Link
            key={r.slug}
            href={`/repositories/${r.slug}`}
            className="flex items-center justify-between py-3.5 border-t border-border first:border-t-0 hover:bg-white/[0.02] px-2 -mx-2 rounded-md transition-colors"
          >
            <span className="text-[14px]">{r.name}</span>
            <span className="text-[12px] text-text-3">
              {r.ciStatus === "passing" ? "CI passing" : r.ciStatus} · {r.lastCommit}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
