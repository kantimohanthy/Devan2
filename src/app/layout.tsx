import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Ujwal Kantimohanthy — Network & Systems Engineer";
const description =
  "ICT engineer building dependable systems and making their behaviour verifiable — across networking, web products and AI research.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kantimohanthy.dev"),
  title: {
    default: title,
    template: "%s | Ujwal Kantimohanthy",
  },
  description,
  keywords: [
    "Ujwal Kantimohanthy",
    "Network engineering",
    "Wireless mesh networks",
    "TV White Space",
    "Full-stack development",
    "University of Rome Tor Vergata",
  ],
  authors: [{ name: "Ujwal Shyam Kantimohanthy", url: "https://kantimohanthy.dev" }],
  creator: "Ujwal Shyam Kantimohanthy",
  alternates: { canonical: "https://kantimohanthy.dev" },
  openGraph: {
    title,
    description,
    url: "https://kantimohanthy.dev",
    siteName: "Ujwal Kantimohanthy",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-bg text-text font-sans">{children}</body>
    </html>
  );
}
