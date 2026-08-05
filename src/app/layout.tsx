import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "./globals.css";
import { CursorField } from "@/components/CursorField";
import CommandPalette from "@/components/ui/CommandPalette";
import { ToolDock } from "@/components/ui/ToolDock";

export const metadata: Metadata = {
  title: "DEVAN — The Eye of UJ",
  description:
    "DEVAN is the eye of an internet engineer's curiosity — research, projects, experiments and systems thinking from Ujwal Shyam Kantimohanthy, working across networking, AI, and space infrastructure.",
  metadataBase: new URL("https://kantimohanthy.dev"),
  openGraph: {
    title: "DEVAN",
    description: "The Eye of UJ.",
    type: "website",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ujwal Shyam Kantimohanthy",
  alternateName: "UJ",
  url: "https://kantimohanthy.dev",
  sameAs: [
    "https://github.com/kantimohanthy",
    "https://linkedin.com/in/ujwalshyam-kantimohanthy",
  ],
  jobTitle: "Internet Engineer",
  description:
    "Internet engineer working across networking, AI systems, and space infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className="antialiased">
        <CursorField />
        <div className="relative z-10">{children}</div>
        <ToolDock />
        <CommandPalette />
      </body>
    </html>
  );
}
