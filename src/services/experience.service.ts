import { prisma } from "@/lib/prisma";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/validators/experience";

export const ExperienceService = {
  async getExperiences() {
    try {
      return await prisma.experience.findMany();
    } catch {
      return [];
    }
  },

  async getExperience(id: string) {
    try {
      return await prisma.experience.findUnique({ where: { id } });
    } catch {
      return null;
    }
  },

  async createExperience(
    data: CreateExperienceInput,
    userId: string
  ) {
    return prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description || "",
        userId,
      },
    });
  },

  async updateExperience(
    id: string,
    data: UpdateExperienceInput
  ) {
    return prisma.experience.update({
      where: { id },
      data: {
        ...(data.company && { company: data.company }),
        ...(data.role && { role: data.role }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate) : null }),
        ...(data.description && { description: data.description }),
      },
    });
  },

  async deleteExperience(id: string) {
    return prisma.experience.delete({ where: { id } });
  },
};