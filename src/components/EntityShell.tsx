import Link from "next/link";
import type { ReactNode } from "react";
import type { ChipRef, EvidenceState } from "@/lib/types";

const stateColor: Record<EvidenceState, string> = {
  ENCOUNTERED: "bg-text-3",
  STUDIED: "bg-amber",
  IMPLEMENTED: "bg-blue",
  TESTED: "bg-green",
  APPLIED: "bg-green",
  DEFENDED: "bg-green",
};

export function StateDot({ state }: { state?: EvidenceState }) {
  if (!state) return null;
  return <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${stateColor[state]}`} />;
}

export function IdStrip({
  type,
  title,
  description,
  state,
}: {
  type: string;
  title: string;
  description: string;
  state?: EvidenceState;
}) {
  return (
    <div className="mb-7">
      <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">{type}</div>
      <h1 className="text-[30px] font-semibold tracking-tight mb-2">{title}</h1>
      <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">{description}</p>
      {state && (
        <div className="inline-flex items-center gap-1.5 text-[11px] text-text-2 mt-2.5 border border-border rounded-full px-2.5 py-1">
          <StateDot state={state} /> {state}
        </div>
      )}
    </div>
  );
}

export function Narrative({ children }: { children: ReactNode }) {
  return <div className="text-[14px] leading-[1.75] max-w-[640px] mb-8 [&_p]:mb-3">{children}</div>;
}

export function ConnectedLabel({ children }: { children: ReactNode }) {
  return <div className="text-[11px] uppercase tracking-wide text-text-3 mb-3">{children}</div>;
}

export function Chip({ chip }: { chip: ChipRef }) {
  return (
    <Link
      href={chip.href}
      className={`shrink-0 min-w-[190px] max-w-[230px] bg-surface border border-border rounded-[9px] px-3.5 py-3 hover:border-[#2c323a] hover:-translate-y-px transition-all ${
        chip.unverified ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <StateDot state={chip.state} />
        <span className="text-[10px] uppercase tracking-wide text-text-3">{chip.type}</span>
      </div>
      <div className="text-[13px] font-medium text-text mb-1">{chip.title}</div>
      {chip.meta && <div className="text-[11px] text-text-2">{chip.meta}</div>}
    </Link>
  );
}

export function ChipRail({ chips, empty }: { chips: ChipRef[]; empty?: string }) {
  if (!chips.length) {
    return <div className="text-[13px] text-text-3 border border-dashed border-border rounded-lg px-3.5 py-3 inline-block">{empty ?? "None recorded yet."}</div>;
  }
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1">
      {chips.map((chip) => (
        <Chip key={chip.href + chip.title} chip={chip} />
      ))}
    </div>
  );
}

export function DeepRegion({ children }: { children: ReactNode }) {
  return <div className="mt-9 pt-7 border-t border-border">{children}</div>;
}

export function ProvFooter({ items }: { items: string[] }) {
  return (
    <div className="mt-12 pt-4 border-t border-border text-[11px] text-text-3 flex flex-wrap gap-4">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function UnverifiedTag() {
  return (
    <span className="text-[9px] text-amber border border-amber/30 px-1.5 py-0.5 rounded-full ml-1.5">
      unverified
    </span>
  );
}
