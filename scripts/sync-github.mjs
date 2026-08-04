import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERNAME = "kantimohanthy";
const TOKEN = process.env.GITHUB_TOKEN;

const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

async function main() {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=10`,
      { headers }
    );
    if (!reposRes.ok) {
      console.warn(`GitHub API returned status ${reposRes.status}, fallback to mock array.`);
      writeFallback();
      return;
    }

    const repos = await reposRes.json();
    if (!Array.isArray(repos)) {
      writeFallback();
      return;
    }

    const entries = repos
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        pushedAt: r.pushed_at,
        language: r.language,
        stars: r.stargazers_count,
      }));

    const outPath = path.join(__dirname, "../src/data/github-activity.generated.json");
    fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));
    console.log(`Wrote ${entries.length} repo entries to ${outPath}`);
  } catch (err) {
    console.error("GitHub sync failed, writing fallback:", err.message);
    writeFallback();
  }
}

function writeFallback() {
  const outPath = path.join(__dirname, "../src/data/github-activity.generated.json");
  const fallback = [
    {
      name: "cineforge-ai",
      description: "Autonomous production engine & pipeline",
      url: "https://github.com/kantimohanthy",
      pushedAt: new Date().toISOString(),
      language: "TypeScript",
      stars: 12,
    },
    {
      name: "sentinel-ai",
      description: "Distributed security telemetry platform",
      url: "https://github.com/kantimohanthy",
      pushedAt: new Date().toISOString(),
      language: "Python",
      stars: 8,
    }
  ];
  fs.writeFileSync(outPath, JSON.stringify(fallback, null, 2));
  console.log(`Wrote fallback data to ${outPath}`);
}

main().catch(() => process.exit(0));
