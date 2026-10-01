import { experiments } from "@/lib/data";

export default function EvidenceIndexPage() {
  const withEvidence = experiments.filter((e) => e.evidenceProduced.length > 0);

  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Evidence</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Claim → Verification</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Every engineering claim traces to an artifact. No confidence score renders here without a
          real scoring function behind it — see a claim&rsquo;s evidence state instead.
        </p>
      </div>

      {withEvidence.length === 0 ? (
        <div className="text-[13px] text-text-3 border border-dashed border-border rounded-lg px-4 py-4">
          No evidence records yet.
        </div>
      ) : (
        withEvidence.map((exp) => (
          <div key={exp.slug} className="py-4 border-t border-border first:border-t-0">
            <div className="text-[14px] mb-1">{exp.name}</div>
            <div className="text-[12px] text-text-2">
              {exp.evidenceProduced.map((e) => e.title).join(", ")}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
