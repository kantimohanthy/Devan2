/**
 * @file UJ.OS Design System & Product Identity Tokens
 * @purpose Centralized single source of truth for visual tokens, typography scales, domain colors, animation curves, and status indicators.
 */

export const UJOS_TOKENS = {
  colors: {
    bgDark: "#0A0B0D",
    bgPanel: "#121418",
    borderSubtle: "#20252B",
    borderAccent: "#4F8CFF",
    textPrimary: "#F5F5F5",
    textMuted: "#8A9098",
    domainNetworking: "#4F8CFF", // Electric Blue
    domainLinux: "#10B981 font-mono", // Terminal Green
    domainTelemetry: "#06B6D4", // Telemetry Cyan
    domainEvidence: "#A855F7", // Evidence Purple
    domainMission: "#F59E0B", // Mission Amber
  },
  typography: {
    fontFamily: "monospace",
    scale: {
      xs: "text-[10px]",
      sm: "text-[11px]",
      base: "text-xs",
      lg: "text-sm font-semibold",
      xl: "text-base font-bold",
      hero: "text-2xl font-extrabold tracking-tight",
    },
  },
  spacing: {
    panelPadding: "p-4",
    cardPadding: "p-3",
    gap: "gap-4",
  },
  radii: {
    panel: "rounded-2xl",
    card: "rounded-xl",
    badge: "rounded-md",
  },
  motion: {
    timing: "duration-300 ease-out",
    hoverScale: "hover:scale-[1.02]",
  },
};
