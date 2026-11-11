import type { ReactNode } from "react";
import { EvidenceModeProvider } from "@/components/routed/EvidenceModeProvider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <EvidenceModeProvider>{children}</EvidenceModeProvider>;
}
