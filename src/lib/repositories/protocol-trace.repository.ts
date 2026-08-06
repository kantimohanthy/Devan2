import { prisma } from "@/lib/prisma";
import { ProtocolTraceResult } from "@/lib/protocol-engine/types";

export class ProtocolTraceRepository {
  async createTrace(data: ProtocolTraceResult) {
    return await prisma.protocolTrace.create({
      data: {
        targetHost: data.targetHost,
        resolvedIp: data.resolvedIp,
        totalDuration: data.totalDurationMs,
        dnsMs: data.dnsMs,
        tcpMs: data.tcpMs,
        tlsMs: data.tlsMs,
        ttfbMs: data.ttfbMs,
        tlsIssuer: data.tlsIssuer,
        asnNumber: data.asnNumber,
        asnOrg: data.asnOrg,
        stepDetails: JSON.stringify(data.spans),
      },
    });
  }

  async findRecentTraces(limit = 10) {
    const records = await prisma.protocolTrace.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return records.map((r) => ({
      id: r.id,
      targetHost: r.targetHost,
      resolvedIp: r.resolvedIp,
      totalDurationMs: r.totalDuration,
      dnsMs: r.dnsMs,
      tcpMs: r.tcpMs,
      tlsMs: r.tlsMs,
      ttfbMs: r.ttfbMs,
      tlsIssuer: r.tlsIssuer,
      asnNumber: r.asnNumber,
      asnOrg: r.asnOrg,
      spans: JSON.parse(r.stepDetails),
      timestamp: r.createdAt.toISOString(),
    }));
  }
}

export const protocolTraceRepository = new ProtocolTraceRepository();
