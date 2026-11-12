import type { ReactNode } from "react";
import { EvidenceModeProvider } from "@/components/routed/EvidenceModeProvider";
import { ViewDock, VIEW_INIT_SCRIPT } from "@/components/site/ViewDock";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <EvidenceModeProvider>
      <script dangerouslySetInnerHTML={{ __html: VIEW_INIT_SCRIPT }} />
      {children}
      <ViewDock />
    </EvidenceModeProvider>
  );
}
