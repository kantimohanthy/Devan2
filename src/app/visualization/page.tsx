const lenses = ["Tree", "Timeline", "Architecture", "Dependency", "Evidence", "Reasoning", "Map", "Graph"];

export default function VisualizationPage() {
  return (
    <div>
      <div className="mb-9">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Visualization</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">One lens among several</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          The graph lives here now — one way of viewing the system, not the front door. Per the
          progressive-activation rule, the force-directed Graph lens only lights up once a domain
          crosses roughly 10 concepts with at least one experiment each.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {lenses.map((lens) => {
          const disabled = lens === "Graph";
          return (
            <div
              key={lens}
              className={`text-[13px] border border-border rounded-full px-3.5 py-1.5 ${
                disabled ? "text-text-3 opacity-60" : "text-text-2"
              }`}
            >
              {lens}
              {disabled && <span className="text-[10px] ml-1.5">· below density threshold</span>}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-[13px] text-text-3 border border-dashed border-border rounded-lg px-4 py-4 max-w-[600px]">
        Networking currently has 2 tested concepts. The Graph lens needs real density before it adds
        anything a Tree view doesn&rsquo;t already say more clearly — so it stays off rather than
        rendering a sparse, misleading force layout.
      </div>
    </div>
  );
}
