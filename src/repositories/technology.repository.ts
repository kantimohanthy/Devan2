import { prisma } from "@/lib/prisma";
import {
  CreateTechnologyInput,
  UpdateTechnologyInput,
} from "@/validators/technology";

export const TechnologyRepository = {
  async findAll() {
    return prisma.technology.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  async findById(id: string) {
    return prisma.technology.findUnique({
      where: { id },
    });
  },

  async findByName(name: string) {
    return prisma.technology.findUnique({
      where: { name },
    });
  },

  async create(data: CreateTechnologyInput) {
    return prisma.technology.create({
      data,
    });
  },

  async update(
    id: string,
    data: UpdateTechnologyInput
  ) {
    return prisma.technology.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.technology.delete({
      where: { id },
    });
  },
};