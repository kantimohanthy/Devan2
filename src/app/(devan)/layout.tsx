import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RailNav } from "@/components/RailNav";
import { TopBar } from "@/components/TopBar";
import { CommandPalette } from "@/components/workspace/CommandPalette";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import { BottomDock } from "@/components/workspace/BottomDock";
import { OnboardingTour } from "@/components/workspace/OnboardingTour";

export const metadata: Metadata = {
  title: {
    default: "DEVAN — engineering workspace",
    template: "%s | DEVAN",
  },
  description:
    "DEVAN is Ujwal Kantimohanthy's engineering workspace: concepts, experiments and evidence linked as a graph.",
};

/**
 * The DEVAN workspace shell. Scoped to this route group so the personal
 * homepage and case studies render without it.
 */
export default function DevanLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex text-[14px]">
      <OnboardingTour />
      <RailNav />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar />
        <WorkspaceTabs />
        <main className="flex-1 overflow-y-auto">
          <div className="w-[92vw] max-w-[1800px] mx-auto px-6 py-6 pb-20">{children}</div>
        </main>
        <BottomDock />
      </div>
      <CommandPalette />
    </div>
  );
}
