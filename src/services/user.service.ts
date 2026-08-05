import { UserRepository } from "@/repositories/user.repository";
import { CreateUserInput } from "@/validators/user";

export const UserService = {
  async getUsers() {
    return UserRepository.findAll();
  },

  async getUser(id: string) {
    return UserRepository.findById(id);
  },

  async createUser(data: CreateUserInput & { passwordHash: string }) {
    const existingUser = await UserRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists.");
    }

    return UserRepository.create(data);
  },

  async updateUser(id: string, data: Partial<CreateUserInput>) {
    return UserRepository.update(id, data);
  },

  async deleteUser(id: string) {
    return UserRepository.delete(id);
  },
};