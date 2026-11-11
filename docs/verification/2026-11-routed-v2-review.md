# Release & Verification Review — `kantimohanthy.dev` (`ROUTED v2`)

- **Date:** 2026-11-11
- **Repository:** `C:\Users\Ujwal\devan2\ujos` (`github.com/kantimohanthy/Devan2.git`)
- **Isolated Branch:** `feat/routed-v2` (branched from `feature/portfolio-improvements` at commit `5ff032f`; live `origin/main` baseline `30b11a7`)
- **Publish Status:** Held locally on `feat/routed-v2` — **not pushed, merged, or deployed**

---

## 1. Visual Direction & Interaction Identity

- **Selected Hero Direction:** Direction A (`HeroTerrainMesh` — stylized topographic contour SVG mesh with real project nodes `LOOP`, `DEVAN`, `TVWS Thesis`, `DASER-Net`, typed inter-node links, deterministic single amber packet animation, and instant pause + reduced-motion controls). Scored over exploratory prototypes B and C because `clamp(2rem,5.8vw,4.35rem)` keeps `Ujwal Shyam Kantimohanthy` unsplit across viewports and all four mesh nodes remain readable on `390px` mobile without micro-labels.
- **Core Visual Metaphor & Palette (`ROUTED`):** Warm field-notebook dark ink (`#11100E` canvas, `#181613` band, `#211E1A` card surface) paired with ivory prose (`#F2EBDC` primary `16.02:1` vs `#11100E`), signal-only amber (`#E8923A` active hop/packet), link-only teal (`#7AC4CC` interactive routes), and moss (`#7CC488` shipped/verified markers).
- **"Wow" Architectural Feature:** Scroll-coupled route indicator (`ScrollRouteIndicator`), interactive `LOOP -> DASER-Net -> DEVAN` chapters tied to the Hero Mesh, `?evidence=1` inline Evidence Ledger popovers, expandable Traceroute Case Studies (`/work/[slug]/`), and the deterministic DEVAN Atlas (`/atlas/` & `/atlas/[node]/`).

### Safe vs. Bold Decision Record (`docs/ARCHITECTURE_V2.md`)
| Area | Safe Option | Bold Option Built |
|---|---|---|
| **Terrain Hero** | Static topographic SVG next to bio | Hand-tuned contour SVG with clickable project nodes, pause toggle, reduced-motion respect, and zero layout shift on selection |
| **Scroll as Routing** | Fixed header section anchors | `IntersectionObserver` marginal indicator (`hop 1 / 6`) tracking sections with direct jump navigation |
| **Selected Work** | 3 static summary cards | Interactive 3-chapter selector (`HOP 01–03`) driving the live signal preview & case-study links |
| **Case Studies** | Flat prose blocks | Expandable **Traceroute Hops** (`/work/[slug]/`) + inline **Illustrative** schematics, recorded commands, and explicit missing-asset banners |
| **Show Your Work** | Static footer citations | URL-persisted `?evidence=1` global mode surfacing `[E..]` superscript ledger buttons with Escape-closable source popovers |
| **DEVAN Atlas** | Detached React Flow sandbox | Deterministic 12-node, 12-edge SVG topology (`projects -> decisions/concepts -> artifacts`) synchronized 1:1 with an identical HTML list (`data-atlas-list-node`) |

---

## 2. Claim Verification Table

| Feature / Guarantee | Status | Concrete Evidence Observed |
|---|---|---|
| Single typed content source of truth (`src/content/`) | **Verified** | `src/content/types.ts`, `evidence-ledger.ts`, `site-data.ts`, `atlas-data.ts`, `index.ts` power homepage, `/work/[slug]/`, `/projects/[slug]/`, `/atlas/`, `/atlas/[node]/`, `/cv/`, `/sitemap.xml`, and `scripts/generate-og.mjs`. `src/data/portfolio.ts` delegates as a thin facade. |
| Full legal name & surname wrapping (`Ujwal Shyam Kantimohanthy`) | **Verified** | Chromium DOM + visual inspection (`home-360.png`, `home-390.png`, `home-1440.png`, `cv-390.png`) confirm intact surname rendering without `"Kanti Mohanthy"` anywhere in `out/`. |
| Strict privacy & unconfirmed-item exclusions | **Verified** | Automated scan in `src/tests/guardrails.test.ts` across all `.html`, `.js`, `.json`, `.svg`, `.xml`, and `.txt` files in `out/` confirms zero occurrences of `"Kanti Mohanthy"`, `Satata`, `TalentBattle`, `CosmoHub`, `ORVYRA`, `Sentinel AI`, DOBs, or student IDs. |
| Zero unearned percentages near confidence/readiness/match labels | **Verified** | `ReadinessRadar.tsx` deleted (`f2404b3`); fake % fields removed from `client-query-engine.ts` and `intelligence-snapshot.service.ts`; asserted across built `out/` bundle in `src/tests/guardrails.test.ts`. |
| Build-time GitHub snapshot without fabricated fallbacks | **Verified** | `scripts/sync-github.mjs` queries only public repos (`zidio-Web-dev`, `Devan2`, `ClineForge-Pro`); when GitHub API returned HTTP 403 rate limit during local build, script cleanly preserved existing 3-repo partial cache in `src/data/github-activity.generated.json` (`partial-cache`). |
| Private repo exclusion (`Inference-LAB/DASER-Net`) | **Verified** | Left unlinked publicly (prior HTTP 404 check indicated private/non-public visibility); public page states research contribution & constraints without fabricating URLs. |
| Direct routes, trailing slashes & static 404 recovery | **Verified** | Playwright Chromium confirmed HTTP `200` across `/projects/devan/`, `/projects/cineforge-ai-pro/`, `/repositories/ujwal-portfolio/`, `/work/*`, `/atlas/`, `/atlas/dec-static-export/`, `/cv/`, `/devan/` and HTTP `404` (`Destination unreachable.`) on `/nonexistent-test-path/` across load & reload. |
| Zero runtime console errors across tested routes & `/devan/` | **Verified** | Fixed `/knowledge/networking.dns/` dot-extension RSC prefetch 404s by normalizing DEVAN links to `/knowledge/dns/` and `/knowledge/tcp/`. Latest Playwright run logged `consoleErrors: []` and `failedRequests: []`. |
| Responsive layout (`320px`, `360px`, `390px`, `768px`, `1440px`) | **Verified** | Zero horizontal document overflow (`scrollWidth === clientWidth`) on all 15 tested viewport/route combinations. Minor note: `/devan/` at `390px` still keeps horizontal scrollable tabs inside `WorkspaceTabs` & `BottomDock` (`overflow-x-auto`), though outer page `scrollWidth === 390`. |
| Interactive controls (`?evidence=1`, signal preview, `Ctrl+K` search) | **Verified** | Automated Chromium verification confirmed `urlHasEvidence: true`, `persistedAfterReload: true`, `popoverVisible: true`, `popoverClosed: true` on Escape, `previewUpdatedToDaser: true`, `searchDialogVisible: true`, and honest empty state `noResultsVisible: true`. |
| Graceful No-JS & `prefers-reduced-motion` degradation | **Verified** | Chromium with `javaScriptEnabled: false` rendered `11070` characters of main content on `/` and all `12` structured Atlas nodes (`[data-atlas-list-node]`) on `/atlas/`; `reducedMotion: "reduce"` paused hero packet (`aria-pressed="true"`). |
| Typecheck, ESLint, Next.js build, and Vitest test suite | **Verified** | `npx tsc --noEmit` (`0`), `npm run lint` (`0`), `npm run build` (`0`, 99 static routes), `npm test` (`13 passed (13)`, `42 passed (42)`). |
| Manual print/PDF output fidelity & screen-reader walkthrough | **Needs Manual Check** | Print stylesheet (`@media print` on `/cv/`) and real screen-reader (NVDA/VoiceOver) keyboard flow were checked structurally (landmarks, skip link, 44px header targets), not manually printed or voiced in assistive technology. |
| Authenticated `GITHUB_TOKEN` live GitHub sync in CI | **Needs Manual Check** | Local build hit unauthenticated API HTTP 403 rate limit cleanly falling back to partial cache; full authenticated sync requires CI secret `GITHUB_TOKEN` (available automatically in GitHub Actions) and optional PostgreSQL secrets (`DATABASE_URL`, `DIRECT_URL`). |

---

## 3. Hardening Log: Earlier Build & Test Failures (Step 0 Record)

Actual error outputs captured prior to `feat/routed-v2` and how each was resolved:

| Earlier Error Message (Observed) | Root Cause | Fix Applied | Bug vs Cosmetic Assessment |
|---|---|---|---|
| `./src/components/ui/ReadinessRadar.tsx:4:15` — `Type error: Module '"@/services/intelligence-snapshot.service"' has no exported member 'ReadinessDimensionScore'.` | `ReadinessDimensionScore` was removed when removing numeric proficiency scores, leaving dead `ReadinessRadar.tsx` broken. | Deleted orphaned `src/components/ui/ReadinessRadar.tsx` (`f2404b3`). | **Real fix** — removed unused synthetic radar UI and dangling import. |
| `./src/data/content.ts:278:3` — `Type error: Property 'progress' is missing in type '{ ... }' but required in type 'Experiment'.` | Percentage `progress` numbers were stripped from `experiments` in `content.ts`, violating `Experiment` interface. | Changed `progress?: number` in `src/data/types.ts` (`5ff032f`). | **Partial compatibility fix** — allowed omission cleanly without deleting the optional field from legacy type definitions. |
| `./src/services/intelligence-snapshot.service.ts:135:11` — `Type error: Object literal may only specify known properties, and 'progressPercent' does not exist...` | Return object in `intelligence-snapshot.service.ts` and fallbacks in `client-query-engine.ts` still constructed removed percentage fields. | Removed `progressPercent`, `currentSprint`, and `readinessDimensions` returns and fallbacks in both modules (`5ff032f`). | **Real fix** — eliminated stale synthetic metrics across API and static fallbacks. |
| `FAIL src/tests/guardrails.test.ts` — `brokenLinks` contained `{ href: "/knowledge/networking", source: "artifacts\\dns-http-vertical-slice\\index.html" }` and `"/knowledge/systems"`. | `src/data/artifacts.ts` linked to non-exported stub concept paths. | Repaired `src/data/artifacts.ts` hrefs to exported routes and expanded `src/tests/guardrails.test.ts` (`8` tests covering routes, assets, secrets, exclusions, percentages, Atlas parity, Evidence ledger). | **Real fix** — repaired real broken internal hrefs caught by the guardrail crawler. |

---

## 4. CI Pipeline & Required GitHub Secrets

`.github/workflows/deploy.yml` runs strictly in order:
`npm ci` -> `npx prisma generate` -> clean `out` & `.next` -> `npm run build` -> `npm test` -> `actions/upload-pages-artifact` -> `actions/deploy-pages`. Deployment is gated on `npm test` passing.

- **`GITHUB_TOKEN`:** Provided automatically by GitHub Actions (`env.GITHUB_TOKEN`); enables `scripts/sync-github.mjs` to query public GitHub metadata without unauthenticated 403 rate limits.
- **`DATABASE_URL` & `DIRECT_URL` (Optional / Recommended for DB-backed routes):** Configured in `deploy.yml` `env` via `${{ secrets.DATABASE_URL }}` and `${{ secrets.DIRECT_URL }}`. When unreachable/unset, static export falls back gracefully (`NEXT_PUBLIC_RUNTIME_API` unset -> static seeded ledger/snapshots).

---

## 5. Verification Commands, Performance Metrics & Check Scope

Commands executed sequentially against the final edited code (`2026-11-11`):
1. `npx.cmd tsc --noEmit` -> exit `0`
2. `npm.cmd run lint` -> exit `0` (zero errors/warnings)
3. `npm.cmd run build` -> exit `0` (`✓ Compiled successfully in 89s`, `99` static routes written to `out/`, `8` OG SVGs written to `public/og/`)
4. `npm.cmd test` -> exit `0` (`Test Files 13 passed (13)`, `Tests 42 passed (42)` in `89.16s`)
5. `node .../verify-static-out.mjs .../v2-shots-verified` -> exit `0` (Chromium headless server against `out/`)

### Bundle & DOM Measurements (Mobile `390x844` on `/`)
- **Raw JS transferred:** `446,020` bytes (`135,281` bytes / `132.1 KiB` gzipped — within `< 250 KB` gzip budget)
- **Raw CSS transferred:** `81,425` bytes (`14,775` bytes / `14.4 KiB` gzipped)
- **Requests:** `15`, `failedRequests: []`
- **Local static navigation timing (`127.0.0.1`):** `domContentLoadedMs: 3516`, `loadEventMs: 4188`
- **DOM Accessibility:** `hasMain: true`, `hasNav: true`, `hasSkip: true` (`#main`), `h1Count: 1`, `imgsWithoutAlt: 0`, `smallTargets (<40px in header): []`

### Link Checker Scope & Limitations (`src/tests/guardrails.test.ts` + Chromium Audit)
- Crawls every rendered `.html` file in `out/` for internal `<a href>`, `<img src>`, `<link href>`, and `<script src>` paths (stripped of query/hash), verifying resolution against files/directories inside `out/`.
- **Does not** make live outbound HTTP requests to external domains (`github.com`, `linkedin.com`, `kantimohanthy.dev`) inside Vitest to avoid flaky offline failures; external public repo availability (`Devan2`, `ClineForge-Pro`, `zidio-Web-dev` HTTP 200; `Inference-LAB/DASER-Net` HTTP 404) was checked separately before building `src/content/`.
- Dynamic client-only router navigation (`useRouter().push`) was tested in Playwright for `/devan/` -> zero 404 prefetch errors (`consoleErrors: []`).

---

## 6. Content Gaps & Out-of-Scope Proposals

### Remaining `[FILL: ...]` Content Gaps (`docs/CONTENT_GAPS.md`)
- `GAP-01`: Confirm final Hero work ethos phrasing.
- `GAP-02`: Confirm official public venture name (`CosmoHub` vs `ORVYRA`), status, STATION F phrasing, and public URLs (both currently omitted from HTML, sitemap, and bundles).
- `GAP-03`: Confirm whether `Sentinel AI` or October exploratory work has public evidence before featuring.
- `GAP-04`: Optional replacement/addition of a handwritten 5–8 sentence note on DASER-Net validation or LOOP architecture alongside `dec-static-export`.
- `GAP-05`: Review factual bio wording & confirm 2-line `"Now"` focus.
- `GAP-06`: Provide public URLs/confirmation for self-reported items (`Events Lead, EuroTech Federation`, `OGV Team Lead, AIESEC Roma Tre`, `ZiShop`, `Inference-LAB/DASER-Net` visibility).
- `GAP-07`: Supply real raster media (`public/assets/...`) for portrait photo, LOOP UI screenshots, DEVAN workspace screenshots, and approved thesis plots (`Illustrative` SVG schematics and `"Screenshot not yet provided"` banners are displayed honestly until supplied).
- `GAP-08`: Publish thesis simulation plots/numbers only after faculty review completes.

### Out-of-Scope Proposal (`infra` / Sandbox Idea)
- Building an interactive `/infra/` live container/network telemetry sandbox or runtime backend API runner is **out of scope** for a static GitHub Pages portfolio (`output: "export"`). Keeping `/api/*` non-runtime on GitHub Pages avoids cold-start infrastructure, secret exposure, and simulated live telemetry; if desired later, it should live cleanly in a separate deployed service linked externally from an evidence record.
