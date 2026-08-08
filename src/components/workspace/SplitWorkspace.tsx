"use client";

import React, { useState, useEffect } from "react";
import { workspaceEventBus } from "@/lib/workspace/workspace-event-bus";
import { Columns, LayoutGrid, Maximize2, Split } from "lucide-react";

export function SplitWorkspace({
  children,
}: {
  children: React.ReactNode;
}) {
  const [layoutMode, setLayoutMode] = useState<"SINGLE" | "SPLIT" | "QUAD">("SINGLE");

  useEffect(() => {
    const unsub = workspaceEventBus.subscribe("LAYOUT_CHANGED", (payload) => {
      const modeData = (payload.data as { mode?: "SINGLE" | "SPLIT" | "QUAD" })?.mode;
      if (modeData) {
        setLayoutMode(modeData);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="space-y-4 font-mono text-xs select-none">
      {/* Layout Control Bar */}
      <div className="flex items-center justify-between rounded-xl border border-[#20252B] bg-[#0A0B0D] px-4 py-2">
        <div className="flex items-center gap-2">
          <Split className="h-4 w-4 text-[#4F8CFF]" />
          <span className="font-bold text-[#F5F5F5] uppercase tracking-wider text-xs">Workspace Composer Engine</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-[#20252B] bg-[#121418] p-1">
          <button
            onClick={() => {
              setLayoutMode("SINGLE");
              workspaceEventBus.publish("LAYOUT_CHANGED", undefined, { mode: "SINGLE" });
            }}
            className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold transition-all ${
              layoutMode === "SINGLE" ? "bg-[#20252B] text-[#4F8CFF] border border-[#4F8CFF]/40" : "text-[#8A9098] hover:text-[#F5F5F5]"
            }`}
          >
            <Maximize2 className="h-3 w-3" />
            <span>Single</span>
          </button>
          <button
            onClick={() => {
              setLayoutMode("SPLIT");
              workspaceEventBus.publish("LAYOUT_CHANGED", undefined, { mode: "SPLIT" });
            }}
            className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold transition-all ${
              layoutMode === "SPLIT" ? "bg-[#20252B] text-[#4F8CFF] border border-[#4F8CFF]/40" : "text-[#8A9098] hover:text-[#F5F5F5]"
            }`}
          >
            <Columns className="h-3 w-3" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => {
              setLayoutMode("QUAD");
              workspaceEventBus.publish("LAYOUT_CHANGED", undefined, { mode: "QUAD" });
            }}
            className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold transition-all ${
              layoutMode === "QUAD" ? "bg-[#20252B] text-[#4F8CFF] border border-[#4F8CFF]/40" : "text-[#8A9098] hover:text-[#F5F5F5]"
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            <span>Quad Panel</span>
          </button>
        </div>
      </div>

      {/* Dynamic Grid Layout Renderer */}
      <div
        className={`grid gap-4 transition-all duration-300 ${
          layoutMode === "SINGLE"
            ? "grid-cols-1"
            : layoutMode === "SPLIT"
            ? "grid-cols-2"
            : "grid-cols-2 grid-rows-2"
        }`}
      >
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-4">{children}</div>

        {layoutMode !== "SINGLE" && (
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-4 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#20252B] pb-2">
              <span className="font-bold text-[#4F8CFF]">Secondary Split Panel</span>
              <span className="text-[10px] text-[#8A9098]">SYNCHRONIZED VIEW</span>
            </div>
            <p className="text-xs text-[#8A9098] leading-relaxed">
              Subscribed to Global Object Event Bus. Selecting any entity in the primary pane automatically projects telemetry here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
