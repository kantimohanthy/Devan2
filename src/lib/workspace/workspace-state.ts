/**
 * @file WorkspaceState (Synchronized State Interface)
 * @purpose Defines the global workspace state synchronized across all pages in DEVAN.
 */

export interface WorkspaceTab {
  id: string;
  title: string;
  type: "CONCEPT" | "EXPERIMENT" | "EVIDENCE" | "MISSION" | "GRAPH" | "EXECUTION_STACK";
  href: string;
}

export interface WorkspaceState {
  currentDomain: string;
  selectedConceptId: string;
  selectedExperimentId?: string;
  selectedEvidenceId?: string;
  selectedExecutionStackId?: string;
  openTabs: WorkspaceTab[];
  activeTabId: string;
  densityMode: "COMFORTABLE" | "DENSE" | "ULTRA_DENSE";
  commandPaletteOpen: boolean;
  dockOpen: boolean;
  dockActiveTab: "Oracle" | "Terminal" | "Evidence" | "Timeline" | "Logs" | "Diagnostics" | "Activity" | "Experiments";
}

export const INITIAL_WORKSPACE_STATE: WorkspaceState = {
  currentDomain: "Networking",
  selectedConceptId: "networking.dns",
  selectedExperimentId: "networking-protocol-pipeline",
  selectedEvidenceId: "ev-pcap-dns-trace",
  selectedExecutionStackId: "stack-http-lifecycle",
  openTabs: [
    { id: "networking.dns", title: "DNS (Domain Name System)", type: "CONCEPT", href: "/knowledge/networking.dns" },
    { id: "networking.tcp", title: "TCP (Transmission Control)", type: "CONCEPT", href: "/knowledge/networking.tcp" },
    { id: "stack-http-lifecycle", title: "HTTP Request Lifecycle", type: "EXECUTION_STACK", href: "/reasoning" },
  ],
  activeTabId: "networking.dns",
  densityMode: "DENSE",
  commandPaletteOpen: false,
  dockOpen: true,
  dockActiveTab: "Oracle",
};
