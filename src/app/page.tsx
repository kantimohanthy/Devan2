import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { KnowledgeGraph } from "@/components/sections/KnowledgeGraph";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Experiments } from "@/components/sections/Experiments";
import { Ventures } from "@/components/sections/Ventures";
import { Writing } from "@/components/sections/Writing";
import { Timeline } from "@/components/sections/Timeline";
import { Network } from "@/components/sections/Network";
import { Now } from "@/components/sections/Now";
import { Vision } from "@/components/sections/Vision";
import { Notebook } from "@/components/sections/Notebook";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen text-[var(--text)] bg-[var(--bg)]">
        {/* Viewport 1: Elevated Hero with Domain Navigation & Bare Graph */}
        <Hero />

        {/* Narrative & Deep System Evidence (Below the Fold) */}
        <KnowledgeGraph />
        <Projects />
        <Research />
        <Experiments />
        <Ventures />
        <Writing />
        <Timeline />
        <Network />
        <Now />
        <Vision />
        <Notebook />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
