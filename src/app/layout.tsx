import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const title = "Ujwal Shyam Kantimohanthy · ICT engineering student";
const description =
  "ICT engineering student building reliable web systems, evidence grounded AI tools and network experiments.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kantimohanthy.dev"),
  title: {
    default: title,
    template: "%s · Ujwal Shyam Kantimohanthy",
  },
  description,
  keywords: [
    "Ujwal Kantimohanthy",
    "Network engineering",
    "Wireless mesh networks",
    "TV White Space",
    "Full stack development",
    "University of Rome Tor Vergata",
  ],
  authors: [{ name: "Ujwal Shyam Kantimohanthy", url: "https://kantimohanthy.dev" }],
  creator: "Ujwal Shyam Kantimohanthy",
  alternates: { canonical: "https://kantimohanthy.dev" },
  openGraph: {
    title,
    description,
    url: "https://kantimohanthy.dev",
    siteName: "Ujwal Shyam Kantimohanthy",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#12110f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-bg text-text font-sans">{children}</body>
    </html>
  );
}
