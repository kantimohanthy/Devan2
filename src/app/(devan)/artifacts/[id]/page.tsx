import { artifacts } from "@/data/artifacts";
import { ArtifactView } from "@/components/sections/ArtifactView";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  return artifacts.map((a) => ({ id: a.id }));
}

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artifact = artifacts.find((a) => a.id === id);

  if (!artifact) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-12">
        <ArtifactView artifact={artifact} />
      </main>
      <Footer />
    </>
  );
}
