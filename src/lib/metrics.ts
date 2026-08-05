type Counter = { count: number; totalDurationMs: number; errors: number };
const metrics = new Map<string, Counter>();

export function recordRequest(path: string, durationMs: number, isError: boolean) {
  const key = path;
  const existing = metrics.get(key) ?? { count: 0, totalDurationMs: 0, errors: 0 };
  existing.count += 1;
  existing.totalDurationMs += durationMs;
  if (isError) existing.errors += 1;
  metrics.set(key, existing);
}

export function renderPrometheus(): string {
  const lines: string[] = [];
  for (const [path, m] of metrics.entries()) {
    const safePath = path.replace(/[^a-zA-Z0-9_]/g, "_");
    lines.push(`http_requests_total{path="${path}"} ${m.count}`);
    lines.push(`http_request_errors_total{path="${path}"} ${m.errors}`);
    lines.push(
      `http_request_duration_avg_ms{path="${path}"} ${(
        m.totalDurationMs / m.count
      ).toFixed(2)}`
    );
  }
  return lines.join("\n");
}
