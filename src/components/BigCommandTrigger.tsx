"use client";

import { useCommandPalette } from "./CommandPalette";

export function BigCommandTrigger() {
  const { open } = useCommandPalette();
  return (
    <button
      onClick={open}
      className="max-w-[560px] w-full mx-auto h-[46px] border border-border bg-surface rounded-[10px] flex items-center gap-2.5 px-4 text-[14px] text-text-3 hover:border-blue transition-colors"
    >
      Ask DEVAN anything — &ldquo;show networking experiments,&rdquo; &ldquo;why postgresql?&rdquo;
    </button>
  );
}
