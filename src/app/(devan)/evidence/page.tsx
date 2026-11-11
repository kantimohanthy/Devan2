import Link from "next/link";
import { experiments } from "@/lib/data";
import { evidenceLedger } from "@/content";

export default function EvidenceIndexPage() {
  const withEvidence = experiments.filter((e) => e.evidenceProduced.length > 0);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Evidence Ledger</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Claim → Source → Verification</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[640px]">
          Every factual claim across kantimohanthy.dev traces to a dated entry in the ledger. Verification status is distinguished explicitly between verified public artifacts and author-reported entries.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-[12px] font-mono uppercase tracking-wider text-text-3">
          Published Claims Ledger ({evidenceLedger.length} entries)
        </h2>
        <div className="divide-y divide-border rounded-lg border border-border bg-surface">
          {evidenceLedger.map((item) => (
            <div key={item.id} className="p-4 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-[#F2A65A]">{item.id}</span>
                <span
                  className={`font-mono text-[11px] uppercase px-2 py-0.5 rounded ${
                    item.verificationStatus === "verified"
                      ? "bg-[#7CC488]/15 text-[#7CC488]"
                      : "bg-[#E8923A]/15 text-[#F2A65A]"
                  }`}
                >
                  {item.verificationStatus}
                </span>
              </div>
              <p className="text-[14px] text-text">{item.publishableWording}</p>
              <p className="font-mono text-[11px] text-text-3">
                Source: {item.source} · Date: {item.date}
              </p>
              {item.artifactUrl && (
                item.artifactUrl.startsWith("http") ? (
                  <a
                    href={item.artifactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-mono text-[12px] text-[#7AC4CC] hover:underline"
                  >
                    {item.artifactLabel || item.artifactUrl} ↗
                  </a>
                ) : (
                  <Link href={item.artifactUrl} className="inline-block font-mono text-[12px] text-[#7AC4CC] hover:underline">
                    {item.artifactLabel || item.artifactUrl} →
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-[12px] font-mono uppercase tracking-wider text-text-3">
          Recorded Laboratory Traces
        </h2>
        {withEvidence.length === 0 ? (
          <div className="text-[13px] text-text-3 border border-dashed border-border rounded-lg px-4 py-4">
            No experimental captures recorded yet.
          </div>
        ) : (
          withEvidence.map((exp) => (
            <div key={exp.slug} className="py-4 border-t border-border">
              <Link href={`/laboratory/${exp.slug}`} className="text-[14px] font-medium text-text hover:text-[#7AC4CC]">
                {exp.name} →
              </Link>
              <div className="text-[12px] text-text-2 mt-1">
                {exp.evidenceProduced.map((e) => e.title).join(", ")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
