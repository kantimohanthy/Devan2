import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Landing } from "@/components/sections/Landing";
import { Identity } from "@/components/sections/Identity";
import { KnowledgeGraph } from "@/components/sections/KnowledgeGraph";
import { LiveDiagnostics } from "@/components/sections/LiveDiagnostics";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <Identity />
        <KnowledgeGraph />
        <LiveDiagnostics />
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
