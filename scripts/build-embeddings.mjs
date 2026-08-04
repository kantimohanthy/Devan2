import { pipeline } from "@xenova/transformers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { knowledgeNodes, projects, articles, identity } from "../src/data/content.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const items = [
    ...knowledgeNodes.map((n) => ({
      id: n.id,
      kind: "node",
      text: `${n.label}. ${n.summary}. ${n.detail}`,
    })),
    ...projects.map((p) => ({
      id: p.slug,
      kind: "project",
      text: `${p.title}. ${p.tagline}. ${p.problem} ${p.solution}`,
    })),
    ...(articles || []).map((a) => ({
      id: a.title,
      kind: "article",
      text: `${a.title}. ${a.dek}`,
    })),
    ...(identity?.principles || []).map((p) => ({
      id: p.title,
      kind: "principle",
      text: `${p.title}. ${p.description}`,
    })),
  ];

  console.log(`Generating embeddings for ${items.length} items...`);
  const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const embedded = [];
  for (const item of items) {
    const output = await extractor(item.text, { pooling: "mean", normalize: true });
    embedded.push({ ...item, vector: Array.from(output.data) });
  }

  const outPath = path.join(__dirname, "../public/embeddings.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(embedded));
  console.log(`Successfully generated static embeddings to ${outPath}`);
}

main().catch((err) => {
  console.error("Embedding generation failed:", err);
  process.exit(0);
});
