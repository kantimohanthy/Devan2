"use client";

import React, { useEffect, useState } from "react";
import { workspaceStore } from "@/lib/workspace/workspace-store";
import { Sliders } from "lucide-react";

export function DensityToggle() {
  const [density, setDensity] = useState<"COMFORTABLE" | "DENSE" | "ULTRA_DENSE">("DENSE");

  useEffect(() => {
    return workspaceStore.subscribe((state) => {
      setDensity(state.densityMode);
    });
  }, []);

  const handleSelect = (mode: "COMFORTABLE" | "DENSE" | "ULTRA_DENSE") => {
    setDensity(mode);
    workspaceStore.setState({ densityMode: mode });
  };

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-[#20252B] bg-[#0A0B0D] p-1 font-mono text-[10px]">
      <Sliders className="h-3 w-3 text-[#8A9098] ml-1" />
      {(["COMFORTABLE", "DENSE", "ULTRA_DENSE"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => handleSelect(mode)}
          className={`rounded px-2 py-0.5 transition-colors ${
            density === mode ? "bg-[#20252B] text-[#4F8CFF] font-semibold" : "text-[#8A9098] hover:text-[#F5F5F5]"
          }`}
        >
          {mode.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}
