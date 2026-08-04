import { EducationRepository } from "@/repositories/education.repository";
import {
  CreateEducationInput,
  UpdateEducationInput,
} from "@/validators/education";

export const EducationService = {
  async getEducations() {
    return EducationRepository.findAll();
  },

  async getEducation(id: string) {
    return EducationRepository.findById(id);
  },

  async createEducation(
    data: CreateEducationInput,
    userId: string
  ) {
    return EducationRepository.create({
      ...data,
      userId,
    });
  },

  async updateEducation(
    id: string,
    data: UpdateEducationInput
  ) {
    return EducationRepository.update(id, data);
  },

  async deleteEducation(id: string) {
    return EducationRepository.delete(id);
  },
};