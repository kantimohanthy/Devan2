import { ProjectRepository } from "@/repositories/project.repository";
import { CreateProjectInput } from "@/validators/project";

export const ProjectService = {
  async getProjects() {
    return ProjectRepository.findAll();
  },

  async createProject(
    data: CreateProjectInput,
    userId: string
  ) {
    const existing = await ProjectRepository.findBySlug(
      data.slug
    );

    if (existing) {
      throw new Error("Project slug already exists.");
    }

    return ProjectRepository.create({
      ...data,
      userId,
    });
  },
};