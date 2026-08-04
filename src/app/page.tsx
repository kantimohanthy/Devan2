import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SystemControlHeader } from "@/components/ui/SystemControlHeader";
import { IdentityReveal } from "@/components/sections/IdentityReveal";
import { KnowledgeGraph } from "@/components/sections/KnowledgeGraph";
import { LiveDiagnostics } from "@/components/sections/LiveDiagnostics";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";
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
      <main className="min-h-screen text-white">
        {/* Viewport 1: Live Systems Control Center — Zero Paragraphs */}
        <section className="min-h-screen flex flex-col justify-center gap-6 px-4 sm:px-6 pt-24 pb-16 max-w-7xl mx-auto">
          <SystemControlHeader />
          <IdentityReveal />
          <KnowledgeGraph />
          <LiveDiagnostics />
          <InteractiveTerminal />
        </section>

        {/* Deep Engineering Evidence & Narrative (Below the Fold) */}
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
