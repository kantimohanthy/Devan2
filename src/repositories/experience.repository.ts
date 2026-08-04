import { prisma } from "@/lib/prisma";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/validators/experience";

export const ExperienceRepository = {
  async findAll() {
    return prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.experience.findUnique({
      where: { id },
    });
  },

  async create(
    data: CreateExperienceInput & { userId: string }
  ) {
    return prisma.experience.create({
      data,
    });
  },

  async update(
    id: string,
    data: UpdateExperienceInput
  ) {
    return prisma.experience.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.experience.delete({
      where: { id },
    });
  },
};