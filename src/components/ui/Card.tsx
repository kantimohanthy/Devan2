import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export function Card({ className, children, as: Component = "div", ...props }: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-border bg-surface/60 backdrop-blur-sm transition-colors duration-200 hover:border-border-strong",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
