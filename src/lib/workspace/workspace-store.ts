/**
 * @file WorkspaceStore (Client-side Synchronized Store)
 * @purpose Manages global workspace state subscriptions so navigation between Knowledge, Visualization, Evidence, and Oracle maintains state.
 */

import { INITIAL_WORKSPACE_STATE, WorkspaceState } from "./workspace-state";

type Listener = (state: WorkspaceState) => void;

class WorkspaceStore {
  private state: WorkspaceState = { ...INITIAL_WORKSPACE_STATE };
  private listeners = new Set<Listener>();

  getState(): WorkspaceState {
    return this.state;
  }

  setState(partial: Partial<WorkspaceState>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const workspaceStore = new WorkspaceStore();
