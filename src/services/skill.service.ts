import { SkillRepository } from "@/repositories/skill.repository";
import {
  CreateSkillInput,
  UpdateSkillInput,
} from "@/validators/skill";

export const SkillService = {
  async getSkills() {
    return SkillRepository.findAll();
  },

  async getSkill(id: string) {
    return SkillRepository.findById(id);
  },

  async createSkill(
    data: CreateSkillInput,
    userId: string
  ) {
    return SkillRepository.create({
      ...data,
      userId,
    });
  },

  async updateSkill(
    id: string,
    data: UpdateSkillInput
  ) {
    return SkillRepository.update(id, data);
  },

  async deleteSkill(id: string) {
    return SkillRepository.delete(id);
  },
};