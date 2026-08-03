import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "./globals.css";
import { CursorField } from "@/components/CursorField";

// Public product name: DEVAN — "The Eye of UJ".
// Internally the codebase, repo, and data model remain UJ.OS; that name
// must never surface in visible copy, metadata, or SEO.
export const metadata: Metadata = {
  title: "DEVAN — The Eye of UJ",
  description:
    "DEVAN is the eye of an internet engineer's curiosity — research, projects, experiments and systems thinking from Ujwal Shyam Kantimohanthy, working across networking, AI, and space infrastructure.",
  metadataBase: new URL("https://kantimohanthy.github.io"),
  openGraph: {
    title: "DEVAN",
    description: "The Eye of UJ.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CursorField />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
