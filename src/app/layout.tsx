import type { Metadata } from "next";
import "./globals.css";
import { RailNav } from "@/components/RailNav";
import { TopBar } from "@/components/TopBar";
import { CommandPalette } from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "DEVAN — The Eye of UJ",
  description: "An inspectable record of how one engineer thinks, learns, builds, and decides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full h-full flex bg-bg text-text font-sans text-[14px]">
        <RailNav />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[900px] mx-auto px-8 py-12 pb-24">{children}</div>
          </main>
        </div>
        <CommandPalette />
      </body>
    </html>
  );
}
