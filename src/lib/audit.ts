import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

interface LogAuditOptions {
  action: string;
  target?: string;
  details?: string;
  ipAddress?: string;
  userId?: string;
}

export async function recordAuditLog(options: LogAuditOptions) {
  try {
    logger.info({ audit: options }, `Audit Event: ${options.action}`);
    return await prisma.auditLog.create({
      data: {
        action: options.action,
        target: options.target,
        details: options.details,
        ipAddress: options.ipAddress,
        userId: options.userId,
      },
    });
  } catch (err) {
    logger.error({ err, options }, "Failed to write audit log entry");
    return null;
  }
}
