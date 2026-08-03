export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-l border-border pl-4">
      <span className="text-2xl font-semibold tracking-tight text-text-primary">{value}</span>
      <span className="text-xs uppercase tracking-wide text-text-tertiary">{label}</span>
    </div>
  );
}
