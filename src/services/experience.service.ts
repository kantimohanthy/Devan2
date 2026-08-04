import { ExperienceRepository } from "@/repositories/experience.repository";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/validators/experience";

export const ExperienceService = {
  async getExperiences() {
    return ExperienceRepository.findAll();
  },

  async getExperience(id: string) {
    return ExperienceRepository.findById(id);
  },

  async createExperience(
    data: CreateExperienceInput,
    userId: string
  ) {
    return ExperienceRepository.create({
      ...data,
      userId,
    });
  },

  async updateExperience(
    id: string,
    data: UpdateExperienceInput
  ) {
    return ExperienceRepository.update(id, data);
  },

  async deleteExperience(id: string) {
    return ExperienceRepository.delete(id);
  },
};