export interface ProtocolSpan {
  name: string;
  category: "dns" | "tcp" | "tls" | "http" | "asn";
  durationMs: number;
  status: "ok" | "warning" | "error";
  metadata?: Record<string, string | number | boolean | null>;
}

export interface ProtocolTraceResult {
  id?: string;
  targetHost: string;
  resolvedIp: string | null;
  totalDurationMs: number;
  dnsMs: number;
  tcpMs: number;
  tlsMs: number;
  ttfbMs: number;
  tlsIssuer: string | null;
  asnNumber: string | null;
  asnOrg: string | null;
  spans: ProtocolSpan[];
  timestamp: string;
}
