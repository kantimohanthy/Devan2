import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  atlasNodes,
  decisions,
  evidenceById,
  person,
  projects,
  timeline,
} from "@/content";
import { repositories } from "@/lib/data";

function getAllFiles(dir: string, exts?: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (!exts || exts.some((ext) => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const outDir = path.resolve(__dirname, "../../out");

describe("Routed Portfolio Behavioral & Static Export Guardrails", () => {
  const htmlFiles = getAllFiles(outDir, [".html"]);
  const textBundleFiles = getAllFiles(outDir, [".html", ".js", ".json", ".svg", ".xml", ".txt"]);
  const htmlCache = new Map<string, string>(
    htmlFiles.map((f) => [f, fs.readFileSync(f, "utf8")])
  );
  const bundleCache = new Map<string, string>(
    textBundleFiles.map((f) => [f, htmlCache.get(f) ?? fs.readFileSync(f, "utf8")])
  );

  it("ensures static export out/ exists with >= 60 rendered HTML pages, 404.html, and CNAME", () => {
    expect(fs.existsSync(outDir)).toBe(true);
    expect(htmlFiles.length).toBeGreaterThanOrEqual(60);
    expect(fs.existsSync(path.join(outDir, "404.html"))).toBe(true);
    const cnamePath = path.join(outDir, "CNAME");
    expect(fs.existsSync(cnamePath)).toBe(true);
    expect(fs.readFileSync(cnamePath, "utf8").trim()).toBe("kantimohanthy.dev");
  });

  it("verifies every project has a status and generates its static /work/[slug] page", () => {
    for (const p of projects) {
      expect(p.status).toBeTruthy();
      expect(p.statusLabel).toBeTruthy();
      const targetHtml = path.join(outDir, "work", p.slug, "index.html");
      expect(fs.existsSync(targetHtml)).toBe(true);
      for (const alias of p.aliases ?? []) {
        expect(fs.existsSync(path.join(outDir, "work", alias, "index.html"))).toBe(true);
      }
    }
  });

  it("verifies broken-route regressions stay repaired (/work/devan, /work/cineforge-ai-pro, /projects/devan, /repositories/ujwal-portfolio, /atlas, /cv)", () => {
    const requiredRoutes = [
      "index.html",
      "cv/index.html",
      "atlas/index.html",
      "work/project-loop/index.html",
      "work/daser-net/index.html",
      "work/devan/index.html",
      "work/wireless-mesh-tvws/index.html",
      "work/cineforge-ai-pro/index.html",
      "projects/devan/index.html",
      "projects/cineforge-ai-pro/index.html",
      "repositories/ujwal-portfolio/index.html",
      "repositories/zidio-web-dev/index.html",
    ];
    for (const rel of requiredRoutes) {
      expect(fs.existsSync(path.join(outDir, rel))).toBe(true);
    }
    for (const repo of repositories) {
      expect(fs.existsSync(path.join(outDir, "repositories", repo.slug, "index.html"))).toBe(true);
    }
  });

  it("verifies DEVAN Atlas graph/list equivalence and permalink route generation", () => {
    for (const node of atlasNodes) {
      expect(fs.existsSync(path.join(outDir, "atlas", node.id, "index.html"))).toBe(true);
    }

    const atlasHtml = fs.readFileSync(path.join(outDir, "atlas", "index.html"), "utf8");
    const listIds: string[] = [];
    const listRegex = /data-atlas-list-node="([^"]+)"/g;
    let match;
    while ((match = listRegex.exec(atlasHtml)) !== null) {
      listIds.push(match[1]);
    }
    expect(listIds).toEqual(atlasNodes.map((n) => n.id));
  });

  it("verifies every evidence marker ID across content resolves to a valid EvidenceLedgerEntry", () => {
    const referencedIds = new Set<string>();
    projects.forEach((p) => {
      p.evidenceIds.forEach((id) => referencedIds.add(id));
      p.hops.forEach((h) => h.evidenceIds?.forEach((id) => referencedIds.add(id)));
    });
    decisions.forEach((d) => d.evidenceIds.forEach((id) => referencedIds.add(id)));
    timeline.forEach((t) => referencedIds.add(t.evidenceId));
    person.now.forEach((n) => referencedIds.add(n.evidenceId));
    atlasNodes.forEach((n) => n.evidenceIds.forEach((id) => referencedIds.add(id)));

    expect(referencedIds.size).toBeGreaterThan(0);
    for (const id of referencedIds) {
      const entry = evidenceById[id];
      expect(entry, `Missing evidence ledger entry: ${id}`).toBeDefined();
      expect(entry.source.length).toBeGreaterThan(3);
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("scans every HTML, JS, JSON, and SVG file in out/ for private data, secrets, and forbidden exclusions", () => {
    const violations: { file: string; rule: string }[] = [];

    const forbiddenPatterns: { rule: string; regex: RegExp }[] = [
      { rule: "Split surname (Kanti Mohanthy)", regex: /Kanti\s+Mohanthy/i },
      { rule: "Excluded org (Satata)", regex: /\bSatata\b/i },
      { rule: "Excluded org (TalentBattle)", regex: /\bTalentBattle\b/i },
      { rule: "Unconfirmed venture (CosmoHub)", regex: /\bCosmoHub\b/i },
      { rule: "Unconfirmed venture (ORVYRA)", regex: /\bORVYRA\b/i },
      { rule: "Unconfirmed project (Sentinel AI)", regex: /\bSentinel\s+AI\b/i },
      { rule: "Private DOB format 1", regex: /03\/07\/2002/ },
      { rule: "Private DOB format 2", regex: /2002-07-03/ },
      { rule: "Private student/ID number", regex: /0301643/ },
      { rule: "Postgres connection string", regex: /postgres(ql)?:\/\//i },
      { rule: "DB env var name", regex: /\b(DATABASE_URL|DIRECT_URL)\b/ },
      { rule: "Supabase service role / domain", regex: /(service_role|[a-z0-9]+\.supabase\.co)/i },
      { rule: "JWT token prefix", regex: /eyJhbGci/ },
      { rule: "API secret sk- prefix", regex: /\bsk-[A-Za-z0-9]{16,}/ },
    ];

    for (const file of textBundleFiles) {
      const content = bundleCache.get(file)!;
      const rel = path.relative(outDir, file);
      for (const { rule, regex } of forbiddenPatterns) {
        if (regex.test(content)) {
          violations.push({ file: rel, rule });
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("asserts no unearned percentage appears near confidence, readiness, sealed, score, proficiency, or match", () => {
    const violations: { file: string; snippet: string }[] = [];
    const forbiddenNearPercent =
      /.{0,40}%\s*(confidence|readiness|sealed|score|proficiency|match)|(confidence|readiness|sealed|score|proficiency|match).{0,40}%/gi;

    for (const file of htmlFiles) {
      const content = htmlCache.get(file)!;
      let match;
      while ((match = forbiddenNearPercent.exec(content)) !== null) {
        violations.push({ file: path.relative(outDir, file), snippet: match[0] });
      }
    }
    expect(violations).toEqual([]);
  });

  it("verifies all internal <a href>, <img src>, <link href>, and <script src> references resolve in out/", () => {
    const brokenRefs: { source: string; attr: string; ref: string }[] = [];
    const checked = new Set<string>();

    const refRegex = /<(?:a|link|img|script)\s+[^>]*(?:href|src)=["']([^"']+)["']/gi;

    for (const file of htmlFiles) {
      const content = htmlCache.get(file)!;
      let match;
      while ((match = refRegex.exec(content)) !== null) {
        const rawRef = match[1];
        if (
          !rawRef ||
          rawRef.startsWith("#") ||
          rawRef.startsWith("http://") ||
          rawRef.startsWith("https://") ||
          rawRef.startsWith("mailto:") ||
          rawRef.startsWith("tel:") ||
          rawRef.startsWith("javascript:") ||
          rawRef.startsWith("data:")
        ) {
          continue;
        }

        const cleanPath = decodeURIComponent(rawRef.split("#")[0].split("?")[0]);
        if (!cleanPath) continue;

        const key = `${file} -> ${cleanPath}`;
        if (checked.has(key)) continue;
        checked.add(key);

        let candidatePaths: string[] = [];
        if (cleanPath.startsWith("/")) {
          const rel = cleanPath.slice(1);
          candidatePaths = [
            path.join(outDir, rel),
            path.join(outDir, rel, "index.html"),
            path.join(outDir, `${rel}.html`),
          ];
        } else {
          const dir = path.dirname(file);
          candidatePaths = [
            path.join(dir, cleanPath),
            path.join(dir, cleanPath, "index.html"),
            path.join(dir, `${cleanPath}.html`),
          ];
        }

        const exists = candidatePaths.some((p) => fs.existsSync(p));
        if (!exists) {
          brokenRefs.push({
            source: path.relative(outDir, file),
            attr: "ref",
            ref: rawRef,
          });
        }
      }
    }

    expect(brokenRefs).toEqual([]);
  });
});
