/**
 * @file Workspace Composer & Panel Registry
 * @purpose Decoupled module registry hosting KnowledgeModule, AtlasModule, OracleModule, TimelineModule, EvidenceModule, ExecutionModule.
 */

import React from "react";

export type ModuleId =
  | "KNOWLEDGE"
  | "ATLAS"
  | "ORACLE"
  | "TIMELINE"
  | "EVIDENCE"
  | "EXECUTION"
  | "MISSION"
  | "PROJECTS"
  | "REPOSITORIES"
  | "LABORATORY";

export interface WorkspaceModuleDefinition {
  id: ModuleId;
  name: string;
  category: "CORE" | "OBSERVABILITY" | "REASONING" | "PROJECTS";
  component: React.ComponentType<{ objectId?: string }>;
}

class PanelRegistry {
  private modules: Map<ModuleId, WorkspaceModuleDefinition> = new Map();

  register(module: WorkspaceModuleDefinition): void {
    this.modules.set(module.id, module);
  }

  get(id: ModuleId): WorkspaceModuleDefinition | undefined {
    return this.modules.get(id);
  }

  getAll(): WorkspaceModuleDefinition[] {
    return Array.from(this.modules.values());
  }
}

export const panelRegistry = new PanelRegistry();
