# DEVAN — The Eye of UJ

An immersive engineering experience for Ujwal Shyam Kantimohanthy — not a résumé site, a living system to explore. Publicly branded **DEVAN**; the underlying architecture and data model are still referred to as UJ.OS internally (repo, code comments, this README) but that name never appears in visitor-facing copy, metadata, or SEO.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react
- Self-hosted variable Inter font via `@fontsource-variable/inter`

## Structure

```
src/
  app/                 root layout (mounts CursorField), global styles, single-page route
  components/
    CursorField.tsx     global cursor-reactive ambient background (canvas, capped particles)
    ui/                Button, Card, Tag, Section, Metric, Accordion, Modal, SearchBar
    motion/
      DomainMotif.tsx   per-discipline motion language (networking/AI/space/finance/
                        cybersecurity/distributed-systems) used on project cards
    sections/           Landing, Identity, KnowledgeGraph, Projects, Research,
                        Experiments, Ventures, Writing, Timeline, Network, Vision
    Navbar.tsx          floating, blurred, scrollspy navigation
    Footer.tsx
    ProjectCard.tsx     project card with domain-motif header + hover-reveal architecture
    ExperimentCard.tsx
    icons.tsx           GitHub / LinkedIn marks (not present in this lucide-react version)
  data/
    content.ts          all copy and structured content — edit this to update the site
    types.ts            shared TypeScript types
    nav.ts              section list shared by the navbar and command palette
  lib/
    usePrefersReducedMotion.ts   shared hook — CursorField, Landing, and KnowledgeGraph
                                 all disable cursor-driven motion when this is true
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Notes

- Everything scrolls on one route (`/`) with a scrollspy nav — matches the "floating nav, smooth scroll, highlight active section" brief more directly than splitting into 11 separate pages would.
- The knowledge graph in `KnowledgeGraph.tsx` is a real interactive SVG — nodes float gently, hovering illuminates connections, clicking selects (and pulses) a node, and the whole graph tilts a few degrees toward the cursor. Not a static placeholder.
- `CursorField.tsx` is the one global background: a capped-particle canvas field that drifts, links nearby particles into faint constellations, and gently repels from the cursor, plus a CSS radial-gradient glow that tracks pointer position. Single `requestAnimationFrame` loop, pauses on tab blur, fully skipped under `prefers-reduced-motion`.
- `DomainMotif.tsx` gives each discipline its own motion language (animated packet flow for networking, pulsing vector-flow dots for AI, orbiting satellites for space, a moving market curve for finance, a scanning sweep over an encrypted grid for cybersecurity, pulsing clusters for distributed systems) — used as project card headers rather than icons.
- Command palette: press `⌘K` / `Ctrl+K` to jump to any section.
- All copy in `data/content.ts` is grounded in real projects (CineForge AI Pro — shipped, IBM submission completed by the July 31 deadline; Sentinel AI; CosmoHub; the Kaggle × ChanZuckerberg Biohub competition; NetLaunch; the WMN + TV White Space thesis) — update it as the actual work evolves.
- Repository/case-study links currently point to `#` — wire them up to the real GitHub repos when ready.
- shadcn/ui was not scaffolded via its CLI (no network access to its registry in this environment); the UI primitives in `components/ui/` follow the same visual language (rounded-2xl surfaces, `cva`-based variants) by hand instead.
- Brand: the public name is **DEVAN** ("The Eye of UJ") everywhere a visitor can see — navbar, hero, footer, metadata, OG tags, search placeholder, and every visible content string in `data/content.ts`. "UJ.OS" is kept only as an internal/architectural reference in code comments and this README.
