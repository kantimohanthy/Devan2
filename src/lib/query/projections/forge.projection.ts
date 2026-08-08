/**
 * @file ForgeProjection (Executable Workspace Project ViewModel)
 */

export interface ForgeViewModel {
  activeProjects: Array<{ id: string; name: string; repoUrl: string; status: string }>;
  totalProjects: number;
}

export class ForgeProjection {
  static createProjection(projects: Array<{ id: string; name: string; repoUrl: string; status: string }>): ForgeViewModel {
    return {
      activeProjects: projects,
      totalProjects: projects.length,
    };
  }
}
