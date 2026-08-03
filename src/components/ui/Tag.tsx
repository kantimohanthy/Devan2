import { cn } from "@/lib/utils";

const toneStyles: Record<string, string> = {
  neutral: "bg-white/5 text-text-secondary border-border",
  accent: "bg-accent-dim text-accent border-transparent",
  success: "bg-success/10 text-success border-transparent",
  warning: "bg-warning/10 text-warning border-transparent",
  danger: "bg-danger/10 text-danger border-transparent",
};

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneStyles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none tracking-wide",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
