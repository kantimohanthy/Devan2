/**
 * @file CompetencyRepository
 * @purpose Manages persistence and retrieval of Ujwal's 4-dimension readiness competencies (Knowledge, Experience, Evidence, Confidence) for concepts.
 * @dependencies PrismaClient (@/lib/prisma)
 * @failureBehavior Catches database connection/query failures and returns graceful in-memory defaults.
 */

import { prisma } from "@/lib/prisma";
import type { LearningStatus } from "@/generated/prisma/client";

export interface UserCompetencyRecord {
  conceptSlug: string;
  learningStatus: LearningStatus;
  knowledgeScore: number;
  experienceScore: number;
  evidenceScore: number;
  confidenceScore: number;
  lastAssessedAt: Date;
}

export class CompetencyRepository {
  /**
   * Retrieves all competencies for a given user.
   * @param userId The unique user ID.
   * @returns Promise<UserCompetencyRecord[]> List of user concept competencies.
   */
  async getCompetenciesByUserId(userId: string): Promise<UserCompetencyRecord[]> {
    try {
      const records = await prisma.userConceptCompetency.findMany({
        where: { userId },
      });
      return records.map((r) => ({
        conceptSlug: r.conceptSlug,
        learningStatus: r.learningStatus,
        knowledgeScore: r.knowledgeScore,
        experienceScore: r.experienceScore,
        evidenceScore: r.evidenceScore,
        confidenceScore: r.confidenceScore,
        lastAssessedAt: r.lastAssessedAt,
      }));
    } catch (err) {
      console.warn("CompetencyRepository getCompetenciesByUserId fallback:", err);
      return [];
    }
  }

  /**
   * Upserts a user's competency for a specific concept.
   * @param userId The user ID.
   * @param conceptSlug The concept slug identifier.
   * @param data Competency metrics (scores 0-10 & status).
   */
  async upsertCompetency(
    userId: string,
    conceptSlug: string,
    data: {
      learningStatus?: LearningStatus;
      knowledgeScore?: number;
      experienceScore?: number;
      evidenceScore?: number;
      confidenceScore?: number;
    }
  ): Promise<UserCompetencyRecord | null> {
    try {
      const updated = await prisma.userConceptCompetency.upsert({
        where: {
          userId_conceptSlug: {
            userId,
            conceptSlug,
          },
        },
        create: {
          userId,
          conceptSlug,
          learningStatus: data.learningStatus || "INTERESTED",
          knowledgeScore: data.knowledgeScore || 0,
          experienceScore: data.experienceScore || 0,
          evidenceScore: data.evidenceScore || 0,
          confidenceScore: data.confidenceScore || 0,
        },
        update: {
          ...(data.learningStatus && { learningStatus: data.learningStatus }),
          ...(data.knowledgeScore !== undefined && { knowledgeScore: data.knowledgeScore }),
          ...(data.experienceScore !== undefined && { experienceScore: data.experienceScore }),
          ...(data.evidenceScore !== undefined && { evidenceScore: data.evidenceScore }),
          ...(data.confidenceScore !== undefined && { confidenceScore: data.confidenceScore }),
          lastAssessedAt: new Date(),
        },
      });
      return {
        conceptSlug: updated.conceptSlug,
        learningStatus: updated.learningStatus,
        knowledgeScore: updated.knowledgeScore,
        experienceScore: updated.experienceScore,
        evidenceScore: updated.evidenceScore,
        confidenceScore: updated.confidenceScore,
        lastAssessedAt: updated.lastAssessedAt,
      };
    } catch (err) {
      console.warn("CompetencyRepository upsertCompetency failure:", err);
      return null;
    }
  }
}

export const competencyRepository = new CompetencyRepository();
