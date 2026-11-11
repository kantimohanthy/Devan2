# Architecture & Design Specification (v2 — "ROUTED")

## 1. Reference Matrix (Stage 2)

| Pattern | Source | Relevance | Cost | Decision |
|---|---|---|---|---|
| Topographic terrain & editorial monograph pacing | `https://kombai.com/gallery/web/` (editorial monochrome/earth-toned portfolios & spatial case-study galleries) | Fits "precise like an engineering drawing, warm like a field notebook"; avoids uniform SaaS card grids. | Zero runtime dependency (pure semantic HTML + hand-tuned SVG). | **Adopt** |
| Calibrated technical product clarity & `⌘K` search ergonomics | `https://linear.app/` | Clean keyboard-first hierarchy, quiet metadata rails, fast search without AI bloat. | Low JS (`cmdk` already installed). | **Adopt (Search pattern only)** |
| Interactive spatial exploration that rewards curiosity | `https://bruno-simon.com/` | Principle of turning a portfolio into an inspectable system map without obscuring the core 30-sec narrative. | Kept strictly lightweight SVG + accessible button controls (no WebGL driving engine). | **Adopt principle; reject 3D WebGL engine** |
| Animated packet trace along explicit SVG paths | Magic UI Animated Beam / `motion.dev` (`https://motion.dev/docs/react-accessibility`) | Direct visual expression of packets routing hop-by-hop across a wireless mesh network; `useReducedMotion` support built in. | Zero new dependencies (native SMIL/CSS/lightweight Motion with static SVG fallback). | **Adopt with reduced-motion + pause toggle** |
| Custom SVG primitive / component micro-interactions | React Bits (`https://reactbits.dev/`) / Uiverse (`https://uiverse.io/`) | Inspected only for contrast/timing discipline; rejected external snippets with heavy runtime JS or MIT/attribution ambiguities. | High audit overhead if copied; unnecessary when pure SVG + CSS delivers cleaner results. | **Reject copy-paste primitives** |
| Next.js 15 App Router Static Export | `https://nextjs.org/docs/app/guides/static-exports` (`output: "export"`, build-time `generateStaticParams`, no SSR APIs) | Matches `kantimohanthy.dev` GitHub Pages hosting with `CNAME`. Guarantees zero 404s on generated slugs and zero JS dependency for main prose. | Requires build-time snapshots/SSG; incompatible with live runtime `/api` routes. | **Adopt** |

---

## 2. Design Tokens & Contrast Validation (WCAG 2.2 AA)

| Token | Hex / Value | Usage | Contrast vs `#11100E` (`ink`) | Contrast vs `#181613` (`ink-2`) | Contrast vs `#211E1A` (`ink-3`) |
|---|---|---|---|---|---|
| `--bg-ink` | `#11100E` | Primary canvas base | — | — | — |
| `--bg-ink-2` | `#181613` | Secondary section bands | — | — | — |
| `--bg-ink-3` | `#211E1A` | Popovers, cards, trace rows | — | — | — |
| `--text-ivory` | `#F2EBDC` | Headlines, primary prose | **16.02:1** | **15.21:1** | **13.98:1** |
| `--text-ivory-2` | `#CBC2AF` | Secondary body, summaries | **10.75:1** | **10.21:1** | **9.39:1** |
| `--text-ivory-3` | `#A89F8D` | Mono coordinates, dates, status | **7.25:1** | **6.89:1** | **6.33:1** |
| `--accent-amber` | `#E8923A` | Signal/packet lines & pulse ONLY | **7.79:1** | **7.40:1** | **6.80:1** |
| `--accent-amber-text` | `#F2A65A` | Active hop text / signal badges | **9.40:1** | **8.92:1** | **8.20:1** |
| `--accent-teal` | `#7AC4CC` | Links & relationship accents ONLY | **9.59:1** | **9.11:1** | **8.37:1** |
| `--accent-teal-line` | `#569AA3` | Static mesh edge lines | **5.93:1** | **5.63:1** | **5.17:1** |
| `--accent-moss` | `#7CC488` | Verified / shipped state icon/tag | **9.15:1** | **8.69:1** | **7.99:1** |
| `ink` on `ivory` | `#11100E` / `#F2EBDC` | Primary CTA button | **16.02:1** | — | — |

---

## 3. Safe vs Bold Architecture Matrix

| Section | Safe Version | Bold Version | Built Choice & Rationale |
|---|---|---|---|
| **Terrain Hero** | Asymmetric typographic intro beside static contour SVG of projects. | Hand-tuned topographic mesh SVG where real projects sit as nodes connected by typed relationship links (`DEVAN -> evidence -> LOOP`), carrying a calm single amber signal packet across shortest routes, complete at first paint with zero JS + explicit pause control & instant node preview. | **Bold** — zero layout shift, SVG+CSS lightweight (`<15KB`), graceful no-JS & reduced-motion states. |
| **Scroll as Routing** | Sticky top nav links (`Work`, `Research`, `About`, `Contact`). | Authored route graph (`hero -> work -> research -> thinking -> experience -> contact`) tracking section progression via IntersectionObserver in a quiet marginal indicator (`hop 2 / 6 · selected work`) that acts as accessible skip/jump navigation. | **Bold** — pure IntersectionObserver, natural scroll, standard cursor, zero scroll-jacking. |
| **Selected Work (3 Chapters)** | 3 stacked project cards linking to `/work/[slug]/`. | Numbered chapters (`HOP 01`..`03`) interactive with the Terrain Mesh: selecting or focusing a chapter routes the preview panel into place with no layout shift ("project signal preview"), exposing problem, contribution, real status, and visible artifact links without hover. | **Bold** — works with click, Enter/Space, and touch; degrades cleanly without JS via `<Link>`. |
| **Case Studies (`/work/[slug]/`)** | Static vertical sections (`Problem`, `Architecture`, etc.). | **Traceroute case study**: variable numbered hops (`problem -> constraints -> decision -> artifact -> result -> limitation -> next hop`) implemented as native expandable rows with an inline **Evidence Viewer** showing inspectable diagrams, commands, repo links, dated commits, and clear missing-asset states. | **Bold** — omits empty hops cleanly per project; full readable SSR/SSG HTML before hydration. |
| **"Show Your Work" Mode** | Footnote citations at bottom of page. | Global toggle (`Show evidence`, persisted in URL `?evidence=1`) that annotates factual claims with interactive superscript ledger markers `[E01]`; clicking opens an accessible popover showing source, verification date, status (`verified`/`reported`), and artifact link. | **Bold** — off by default for 30-sec recruiters; instant shareable depth (`?evidence=1`) for engineers. |
| **DEVAN Atlas (`/atlas/` & `/atlas/[node]/`)** | Separate dashboard route (`/devan`) with force-graph canvas. | Unified curated atlas where the hero mesh "zooms out" into `projects -> decisions/concepts -> artifacts` at deterministic coordinates (lazy-loaded SVG/graph) paired with an **identical synchronized structured list** rendered from the exact same typed ledger arrays and selectable via stable URLs (`/atlas/[node]/`). | **Bold** — tested graph/list equivalence, deterministic, accessible on keyboard/screen-readers/mobile. |

---

## 4. Content Schema & How to Add Entries

All public portfolio content lives in a single typed root under `src/content/`:
- `src/content/types.ts`: Strict TypeScript interfaces for `ProjectRecord`, `ResearchProgram`, `DecisionRecord`, `EvidenceLedgerEntry`, `TimelineItem`, `AtlasNode`, `AtlasEdge`.
- `src/content/evidence-ledger.ts`: Master registry of checkable factual claims (`claim`, `source`, `date`, `verificationStatus`, `publishableWording`, `artifactUrl`, `artifactLabel`).
- `src/content/site-data.ts`: Single source of truth for identity, selected work (LOOP, DASER-Net, DEVAN + supporting CineForge AI Pro), research (DASER-Net, Wireless Mesh + TVWS), decisions, timeline, `/cv`, `sitemap.xml`, `generateStaticParams`, and OG metadata.
- `src/content/atlas-data.ts`: Deterministic coordinates and relational graph edges linking `projects -> concepts/decisions -> artifacts` shared identically by the visual Atlas canvas/SVG and its accessible list representation.

**How to add a project or evidence entry:**
1. First add factual claims to `src/content/evidence-ledger.ts` with a real `source`, `date`, and honest `verificationStatus` (`verified` only if backed by a public repo/file/commit).
2. Add the project to `projects` in `src/content/site-data.ts` (attaching `evidenceIds`, explicit `status`, and omitting empty hops).
3. Add deterministic node coordinates and edges in `src/content/atlas-data.ts` if it belongs in the Atlas.
4. Run `npm run build && npm test` — build-time generation updates `/work/[slug]/`, `/projects/[slug]/`, `/atlas/[node]/`, `/cv/`, `/sitemap.xml`, and OG SVG images automatically, while `guardrails.test.ts` checks route coverage, asset links, privacy exclusions, and ledger integrity.
