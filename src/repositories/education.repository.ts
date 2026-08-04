import { prisma } from "@/lib/prisma";
import {
  CreateEducationInput,
  UpdateEducationInput,
} from "@/validators/education";

export const EducationRepository = {
  async findAll() {
    return prisma.education.findMany({
      orderBy: {
        startYear: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.education.findUnique({
      where: { id },
    });
  },

  async create(
    data: CreateEducationInput & { userId: string }
  ) {
    return prisma.education.create({
      data,
    });
  },

  async update(
    id: string,
    data: UpdateEducationInput
  ) {
    return prisma.education.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.education.delete({
      where: { id },
    });
  },
};