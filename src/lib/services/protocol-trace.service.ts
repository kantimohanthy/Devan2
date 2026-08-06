import { executeProtocolTrace } from "@/lib/protocol-engine/tracer";
import { ProtocolTraceResult } from "@/lib/protocol-engine/types";
import { protocolTraceRepository } from "@/lib/repositories/protocol-trace.repository";
import { getCached, setCached } from "@/lib/cache";
import { logger } from "@/lib/logger";

export class ProtocolTraceService {
  async traceTarget(targetHost: string): Promise<ProtocolTraceResult> {
    const cacheKey = `protocol-trace:${targetHost.toLowerCase().trim()}`;
    const cached = getCached<ProtocolTraceResult>(cacheKey);
    if (cached) {
      logger.info({ targetHost }, "Protocol trace cache hit");
      return cached;
    }

    const result = await executeProtocolTrace(targetHost);
    setCached(cacheKey, result, 60_000); // 1-min cache

    try {
      await protocolTraceRepository.createTrace(result);
    } catch (err) {
      logger.warn({ err }, "Failed to persist protocol trace record");
    }

    return result;
  }

  async getRecentTraces(limit = 10): Promise<ProtocolTraceResult[]> {
    try {
      return await protocolTraceRepository.findRecentTraces(limit);
    } catch (err) {
      logger.warn({ err }, "Failed to fetch recent protocol traces");
      return [];
    }
  }
}

export const protocolTraceService = new ProtocolTraceService();
