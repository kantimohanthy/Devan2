import { prisma } from "@/lib/prisma";
import { CreateProjectInput } from "@/validators/project";

export const ProjectRepository = {
  async findAll() {
    return prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
    });
  },

  async create(data: CreateProjectInput & { userId: string }) {
    return prisma.project.create({
      data,
    });
  },

  async update(
    id: string,
    data: Partial<CreateProjectInput>
  ) {
    return prisma.project.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  },
};