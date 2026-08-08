import type { Metadata } from "next";
import "./globals.css";
import { RailNav } from "@/components/RailNav";
import { TopBar } from "@/components/TopBar";
import { CommandPalette } from "@/components/workspace/CommandPalette";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";
import { BottomDock } from "@/components/workspace/BottomDock";
import { OnboardingTour } from "@/components/workspace/OnboardingTour";

export const metadata: Metadata = {
  metadataBase: new URL("https://kantimohanthy.dev"),
  title: {
    default: "DEVAN — Cognitive Operating System for Engineering Intelligence",
    template: "%s | DEVAN OS",
  },
  description: "A living, queryable cognitive workspace backing protocol engineering, systems knowledge, kernel internals, and ground proof evidence.",
  keywords: ["Engineering Intelligence", "Protocol Engineering", "Linux Kernel", "DNS", "TCP/IP", "Kubernetes", "Systems Architecture"],
  authors: [{ name: "Kanti Mohanthy", url: "https://kantimohanthy.dev" }],
  creator: "Kanti Mohanthy",
  publisher: "DEVAN Intelligence Platform",
  alternates: {
    canonical: "https://kantimohanthy.dev",
  },
  openGraph: {
    title: "DEVAN — Cognitive Operating System for Engineering Intelligence",
    description: "A living, queryable cognitive workspace backing protocol engineering, systems knowledge, and ground proof evidence.",
    url: "https://kantimohanthy.dev",
    siteName: "DEVAN OS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVAN — Cognitive Operating System for Engineering Intelligence",
    description: "A living, queryable cognitive workspace backing protocol engineering, systems knowledge, and ground proof evidence.",
    creator: "@kantimohanthy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full h-full flex bg-bg text-text font-sans text-[14px]">
        <OnboardingTour />
        <RailNav />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <TopBar />
          <WorkspaceTabs />
          <main className="flex-1 overflow-y-auto">
            <div className="w-[92vw] max-w-[1800px] mx-auto px-6 py-6 pb-20">{children}</div>
          </main>
          <BottomDock />
        </div>
        <CommandPalette />
      </body>
    </html>
  );
}
