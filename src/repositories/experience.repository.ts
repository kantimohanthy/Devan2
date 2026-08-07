/**
 * @file ExperienceRepository
 * @purpose Handles database persistence for append-only immutable ExperienceEvents in PostgreSQL via Prisma.
 * @dependencies PrismaClient (@/lib/prisma)
 * @failureBehavior Catches query errors gracefully and logs fallback warnings.
 */

import { prisma } from "@/lib/prisma";

export interface ExperienceEventRecord {
  id: string;
  timestamp: Date;
  entityId: string;
  action: string;
  metadata: string;
  reason?: string | null;
  source: string;
  confidence: number;
}

export class ExperienceRepository {
  /**
   * Appends a new immutable experience event to the historical record.
   */
  async recordEvent(data: {
    entityId: string;
    action: string;
    metadata: string;
    reason?: string;
    source?: string;
    confidence?: number;
  }): Promise<ExperienceEventRecord | null> {
    try {
      const record = await prisma.experienceEvent.create({
        data: {
          entityId: data.entityId,
          action: data.action,
          metadata: data.metadata,
          reason: data.reason || null,
          source: data.source || "SYSTEM",
          confidence: data.confidence !== undefined ? data.confidence : 100,
        },
      });
      return record;
    } catch (err) {
      console.warn("ExperienceRepository recordEvent failure:", err);
      return null;
    }
  }

  /**
   * Retrieves all experience events for a specific entity ID.
   */
  async getEventsByEntityId(entityId: string): Promise<ExperienceEventRecord[]> {
    try {
      return await prisma.experienceEvent.findMany({
        where: { entityId },
        orderBy: { timestamp: "desc" },
      });
    } catch (err) {
      console.warn("ExperienceRepository getEventsByEntityId fallback:", err);
      return [];
    }
  }

  /**
   * Retrieves recent experience events across the entire system.
   */
  async getRecentEvents(limit = 20): Promise<ExperienceEventRecord[]> {
    try {
      return await prisma.experienceEvent.findMany({
        take: limit,
        orderBy: { timestamp: "desc" },
      });
    } catch (err) {
      console.warn("ExperienceRepository getRecentEvents fallback:", err);
      return [];
    }
  }
}

export const experienceRepository = new ExperienceRepository();