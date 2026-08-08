/**
 * @file Global Object Event Bus
 * @purpose Event-driven communication bus publishing OBJECT_SELECTED, OBJECT_PINNED, OBJECT_OPENED, OBJECT_COMPARED across all workspace modules.
 */

export type WorkspaceEventType =
  | "OBJECT_SELECTED"
  | "OBJECT_PINNED"
  | "OBJECT_OPENED"
  | "OBJECT_COMPARED"
  | "OBJECT_EXPANDED"
  | "LAYOUT_CHANGED";

export interface WorkspaceEventPayload {
  type: WorkspaceEventType;
  objectId?: string;
  data?: unknown;
  timestamp: number;
}

type EventCallback = (payload: WorkspaceEventPayload) => void;

class WorkspaceEventBus {
  private listeners: Map<WorkspaceEventType, Set<EventCallback>> = new Map();

  subscribe(type: WorkspaceEventType, callback: EventCallback): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  publish(type: WorkspaceEventType, objectId?: string, data?: unknown): void {
    const payload: WorkspaceEventPayload = {
      type,
      objectId,
      data,
      timestamp: Date.now(),
    };

    const callbacks = this.listeners.get(type);
    if (callbacks) {
      callbacks.forEach((cb) => cb(payload));
    }
  }
}

export const workspaceEventBus = new WorkspaceEventBus();
