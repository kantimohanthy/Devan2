import { prisma } from "@/lib/prisma";
import {
  CreateSkillInput,
  UpdateSkillInput,
} from "@/validators/skill";

export const SkillRepository = {
  async findAll() {
    return prisma.skill.findMany({
      orderBy: {
        level: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.skill.findUnique({
      where: { id },
    });
  },

  async create(
    data: CreateSkillInput & { userId: string }
  ) {
    return prisma.skill.create({
      data,
    });
  },

  async update(
    id: string,
    data: UpdateSkillInput
  ) {
    return prisma.skill.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.skill.delete({
      where: { id },
    });
  },
};