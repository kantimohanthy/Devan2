import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "../src/data/github-activity.generated.json");

// Only confirmed public repositories permitted in the portfolio bundle.
const FEATURED_REPOS = [
  { owner: "kantimohanthy", repo: "zidio-Web-dev", projectSlug: "project-loop" },
  { owner: "kantimohanthy", repo: "Devan2", projectSlug: "devan" },
  { owner: "kantimohanthy", repo: "ClineForge-Pro", projectSlug: "cineforge-ai-pro" },
];

const TOKEN = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "kantimohanthy-dev-build-sync",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function fetchRepoSummary({ owner, repo, projectSlug }) {
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!repoRes.ok) {
    throw new Error(`HTTP ${repoRes.status} for ${owner}/${repo}`);
  }
  const data = await repoRes.json();

  let latestRelease = null;
  try {
    const relRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, { headers });
    if (relRes.ok) {
      const rel = await relRes.json();
      latestRelease = {
        tagName: rel.tag_name,
        publishedAt: rel.published_at,
        url: rel.html_url,
      };
    }
  } catch {
    // No release is normal and not an error
  }

  let recentCommitSha = null;
  let recentCommitDate = null;
  try {
    const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, { headers });
    if (commitsRes.ok) {
      const commits = await commitsRes.json();
      if (Array.isArray(commits) && commits[0]) {
        recentCommitSha = String(commits[0].sha || "").slice(0, 7);
        recentCommitDate = commits[0].commit?.committer?.date || commits[0].commit?.author?.date || null;
      }
    }
  } catch {
    // Ignore commit lookup failures cleanly
  }

  return {
    projectSlug,
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    url: data.html_url,
    pushedAt: data.pushed_at,
    defaultBranch: data.default_branch,
    language: data.language,
    stars: data.stargazers_count,
    recentCommitSha,
    recentCommitDate,
    latestRelease,
  };
}

async function main() {
  const existing = readExistingCache();
  const syncedAt = new Date().toISOString();

  try {
    const settled = await Promise.allSettled(FEATURED_REPOS.map(fetchRepoSummary));
    const fetched = [];
    let anyFailed = false;

    FEATURED_REPOS.forEach((spec, idx) => {
      const res = settled[idx];
      if (res.status === "fulfilled") {
        fetched.push(res.value);
      } else {
        anyFailed = true;
        console.warn(`GitHub sync warning for ${spec.owner}/${spec.repo}: ${res.reason?.message}`);
        const cachedItem = existing.repos?.find((r) => r.name === spec.repo);
        if (cachedItem) {
          fetched.push({ ...cachedItem, staleFallback: true });
        }
      }
    });

    if (fetched.length === 0) {
      console.warn("All live GitHub requests failed; keeping last committed cache unchanged.");
      return;
    }

    const payload = {
      source: anyFailed ? "partial-cache" : "github-api",
      syncedAt,
      repos: fetched,
    };

    fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
    console.log(`Wrote ${fetched.length} verified repo entries to ${OUT_PATH} (${payload.source})`);
  } catch (err) {
    console.warn("GitHub sync exception; preserving committed cache:", err.message);
  }
}

function readExistingCache() {
  try {
    if (!fs.existsSync(OUT_PATH)) return { source: "none", syncedAt: null, repos: [] };
    const raw = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
    if (Array.isArray(raw)) {
      return { source: "legacy-array", syncedAt: null, repos: raw };
    }
    return raw;
  } catch {
    return { source: "corrupt", syncedAt: null, repos: [] };
  }
}

main().catch(() => process.exit(0));
