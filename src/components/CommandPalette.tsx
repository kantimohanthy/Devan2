"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Circle, Diamond, SquareStack, Compass, Layers, Boxes } from "lucide-react";
import { commandPaletteStore } from "@/lib/commandPaletteStore";
import { searchIndex } from "@/lib/data";
import type { EntityType } from "@/lib/types";

export function useCommandPalette() {
  const isOpen = useSyncExternalStore(
    commandPaletteStore.subscribe,
    commandPaletteStore.getSnapshot,
    () => false
  );
  return { isOpen, open: commandPaletteStore.open, close: commandPaletteStore.close, toggle: commandPaletteStore.toggle };
}

const typeIcon: Record<EntityType, React.ComponentType<{ size?: number; className?: string }>> = {
  Decision: Compass,
  Concept: Diamond,
  Experiment: SquareStack,
  Repository: Layers,
  Project: Boxes,
  Mission: Circle,
  Evidence: SquareStack,
  Source: SquareStack,
};

export function CommandPalette() {
  const { isOpen, close, toggle } = useCommandPalette();
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);

  const grouped = searchIndex.reduce<Record<string, typeof searchIndex>>((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const go = (href: string) => {
    router.push(href);
    close();
  };

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={(v) => (v ? commandPaletteStore.open() : close())}
      label="Ask DEVAN"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-[rgba(6,7,8,0.55)] backdrop-blur-[3px]"
      shouldFilter
    >
      <div className="w-[560px] max-w-[88vw] bg-surface border border-border rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="flex items-center gap-2.5 px-[18px] py-4 border-b border-border">
          <Search size={16} className="text-text-3 shrink-0" />
          <Command.Input
            placeholder='Ask DEVAN — "why postgresql?", "show dns", "cineforge"'
            className="flex-1 bg-transparent outline-none text-[15px] text-text placeholder:text-text-3"
          />
        </div>
        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="px-2.5 py-4 text-[13px] text-text-3">
            Nothing directly matches — here&rsquo;s what&rsquo;s adjacent. Try a broader term.
          </Command.Empty>
          {Object.entries(grouped).map(([type, items]) => (
            <Command.Group
              key={type}
              heading={type}
              className="[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-text-3 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5"
            >
              {items.map((item) => {
                const Icon = typeIcon[item.type];
                return (
                  <Command.Item
                    key={item.href + item.title}
                    value={`${item.title} ${item.type} ${item.meta ?? ""}`}
                    onSelect={() => go(item.href)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] cursor-pointer data-[selected=true]:bg-blue/[0.08]"
                  >
                    <span className="w-[22px] h-[22px] rounded-[5px] bg-surface-2 border border-border flex items-center justify-center text-text-2 shrink-0">
                      <Icon size={12} />
                    </span>
                    <span className="text-text flex-1">{item.title}</span>
                    <span className="text-text-3 text-[11px]">{item.meta}</span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
