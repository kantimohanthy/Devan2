"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      className="rounded-full bg-ivory px-4 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-ochre-2"
    >
      Print / Save PDF
    </button>
  );
}
