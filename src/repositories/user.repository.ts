import { prisma } from "@/lib/prisma";
import { CreateUserInput } from "@/validators/user";

export const UserRepository = {
  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async create(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  },

  async update(id: string, data: Partial<CreateUserInput>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },
};