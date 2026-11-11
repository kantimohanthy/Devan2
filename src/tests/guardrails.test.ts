import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function getAllHtmlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

const outDir = path.resolve(__dirname, "../../out");

describe("Guardrails & Static Integrity Tests", () => {
  const htmlFiles = getAllHtmlFiles(outDir);

  it("ensures build output exists in ./out", () => {
    expect(htmlFiles.length).toBeGreaterThan(0);
  });

  it("asserts 'Kanti Mohanthy' (split surname) does not appear in any exported HTML", () => {
    const violations: { file: string; match: string }[] = [];
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (/Kanti\s+Mohanthy/i.test(content)) {
        violations.push({ file: path.relative(outDir, file), match: "Kanti Mohanthy" });
      }
    }
    expect(violations).toEqual([]);
  });

  it("asserts forbidden exclusions 'Satata' or 'TalentBattle' do not appear in exported HTML", () => {
    const violations: { file: string; match: string }[] = [];
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (/Satata|TalentBattle/i.test(content)) {
        violations.push({ file: path.relative(outDir, file), match: "Satata or TalentBattle" });
      }
    }
    expect(violations).toEqual([]);
  });

  it("asserts no percentage appears within 40 characters of confidence, readiness, sealed, score, proficiency, or match", () => {
    const violations: { file: string; snippet: string }[] = [];
    const forbiddenNearPercent =
      /.{0,40}%\s*(confidence|readiness|sealed|score|proficiency|match)|(confidence|readiness|sealed|score|proficiency|match).{0,40}%/gi;

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf8");
      let match;
      while ((match = forbiddenNearPercent.exec(content)) !== null) {
        violations.push({
          file: path.relative(outDir, file),
          snippet: match[0],
        });
      }
    }
    expect(violations).toEqual([]);
  });

  it("verifies all internal anchor links in exported HTML resolve to existing HTML files or assets", () => {
    const brokenLinks: { source: string; href: string }[] = [];
    const checked = new Set<string>();

    const linkRegex = /<a\s+[^>]*href=["']([^"']+)["']/gi;

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf8");
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        const rawHref = match[1];
        if (
          !rawHref ||
          rawHref.startsWith("#") ||
          rawHref.startsWith("http://") ||
          rawHref.startsWith("https://") ||
          rawHref.startsWith("mailto:") ||
          rawHref.startsWith("tel:") ||
          rawHref.startsWith("javascript:")
        ) {
          continue;
        }

        const cleanPath = rawHref.split("#")[0].split("?")[0];
        if (!cleanPath) continue;

        const checkKey = `${file} -> ${cleanPath}`;
        if (checked.has(checkKey)) continue;
        checked.add(checkKey);

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
          brokenLinks.push({
            source: path.relative(outDir, file),
            href: rawHref,
          });
        }
      }
    }

    expect(brokenLinks).toEqual([]);
  });
});
