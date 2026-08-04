"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Terminal, Cpu } from "lucide-react";

export function SystemControlHeader() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(" ")[0] + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/60 p-3.5 backdrop-blur-md font-mono text-xs text-white/70 flex flex-wrap items-center justify-between gap-4 mb-2 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-bold text-white tracking-wider">
          <Cpu size={15} className="text-blue-400" />
          DEVAN OS <span className="text-[10px] text-blue-400 font-normal">v2.4.0</span>
        </span>
        <span className="h-3 w-px bg-white/20 hidden sm:inline-block" />
        <span className="hidden sm:flex items-center gap-1.5 text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEMS NOMINAL
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px] text-white/50">
        <span className="flex items-center gap-1">
          <Activity size={13} className="text-blue-400" />
          <span>RTT: 1.2ms</span>
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>PROBE: SECURE</span>
        </span>
        {timeStr && (
          <span className="hidden md:inline-block font-mono text-white/80">
            {timeStr}
          </span>
        )}
      </div>
    </div>
  );
}
