# MASTER PROMPT — kantimohanthy.dev

Paste this whole file into your coding agent, or save it in the repo as `docs/MASTER_PLAN.md` and tell the agent: "Read docs/MASTER_PLAN.md and execute the current phase."

---

## 0. Who you are working for and what this site is

You are working on **kantimohanthy.dev**, the personal engineering portfolio of **Ujwal Shyam Kantimohanthy, presented as "UJ"**.

- **Repo:** `C:\Users\Ujwal\devan2\ujos` (remote: github.com/kantimohanthy/Devan2)
- **Stack:** Next.js (static export to `./out`), TypeScript, Tailwind, MDX, React Flow, Framer Motion, shadcn/ui, lucide-react, Prisma, Vitest, ESLint, GitHub Actions (`.github/workflows/deploy.yml`), custom domain via `CNAME`.
- **What it is:** a personal engineering portfolio with a "DEVAN" interface layered on top. It sits on an evidence graph of sources, concepts, questions, experiments, outcomes, artifacts and projects.
- **What it is not:** an "Intelligence Operating System", a "Cognitive OS", an AI oracle, or a live telemetry platform.
- **Identity:** an ICT / internet-engineering student building reliable web systems, evidence-grounded AI tools and network experiments. Systems and infrastructure engineering is the direction. He is not a generic CS student.

The site's whole value is that **every claim on it is true and checkable**. One fake number destroys that. Treat honesty as the main feature.

---

## 1. Non-negotiable rules (apply to every phase, every commit)

1. **Never fabricate.**
   - Do not create experiments, decisions, repositories, metrics, dates, tech-stack details, roles or results that are not provided in this file or already backed by an artifact in the repo.
   - If a link points to a page with no real content, **remove the link**. Do not invent the page.
   - If content is needed but missing, insert a visible `TODO(UJ): <what's needed>` in the source and list it in your report. Do not fill the gap with plausible text.
2. **No numeric scores of any kind.** No proficiency bars, skill percentages, confidence, readiness, "sealed proof", match percentages or "X% complete" on knowledge or skills.
   - Counts of real things are fine (for example "3 / 8 objectives", "323 evidence records").
3. **Evidence states are derived, never hand-set.**
   - The states are ENCOUNTERED → STUDIED → IMPLEMENTED → TESTED. APPLIED and DEFENDED are not implemented yet.
   - Only `deriveEvidenceState()` may produce a state.
4. **Nothing is "live" unless it is.**
   - Remove the words LIVE, telemetry, real-time, streaming and engine unless the value is fetched at runtime or at build time from a real source.
   - Simulations and explainers must be labelled "Protocol walkthrough" or "Illustrative".
   - Recorded data must cite its capture file in the repo.
5. **No AI/oracle features until the gate is met.**
   - ASK.UJ / Oracle / "Explain Concept" stays out until the graph has at least 40 concepts, 15 experiments and 10 technical notes.
   - ⌘K is search only.
6. **Every project uses the five-part format:**
   1. problem
   2. topology / architecture diagram
   3. config or code repo
   4. verification output
   5. what broke and how it was diagnosed
7. **Design system:**
   - Colours: bg `#0A0B0D`, panels `#101317`, borders `#20252B`, text `#F5F5F5` / `#8A9098`, accents `#4F8CFF` / `#F7B955` / `#31D07D`.
   - Use **one accent per interaction**, never two at once.
   - Swiss typography, hairline borders, restrained state-driven motion.
   - No theatrical labels such as "Mission Control", "Oracle Reasoning", "Timeline Ledger" or "Sealed".
8. **Never mention:** Satata Agro Farm, TalentBattle.
9. **Arylax Labs** (his lab) gets a separate site. Mention it only as an affiliation line if UJ approves.
10. **Never edit `node_modules`.**
    - Fix root causes in config.
    - If a dependency patch is unavoidable, use `patch-package` and commit the patch.
    - The build must pass after `rm -rf node_modules .next out && npm ci && npm run build`.
11. **Never commit secrets** (`DATABASE_URL`, `DIRECT_URL`, API keys). Check `.gitignore` and the git history.
12. **Stop at each phase gate.**
    - Report back in the format in §8.
    - Wait for UJ's approval before the next phase.
    - Never batch phases.

---

## 2. Verified facts you may use (and nothing beyond them)

**Person**
- Name: Ujwal Shyam Kantimohanthy, shown as **UJ**
- LinkedIn: https://www.linkedin.com/in/ujwalshyam-kantimohanthy/
- GitHub: https://github.com/kantimohanthy
- Based in Rome, with a STATION F Landing Zone stint in Paris (Aug–Sep 2026)

**Education**
- BSc Engineering Sciences, University of Rome Tor Vergata (uniroma2), **expected graduation 2027**
- **Not** "Internet Engineering 2021–2026". Fix it everywhere.

**Thesis / research topic**
- Wireless Mesh Networks combined with TV White Space (TVWS) for connectivity in challenging terrain and rural areas.

**Roles**

| Role | Organisation | Dates / details |
| --- | --- | --- |
| Web Development Intern | Zidio Development (Bengaluru, hybrid) | Aug 2026 – present. Built Project LOOP, an AI customer-feedback platform: github.com/kantimohanthy/zidio-Web-dev |
| Research collaborator | INFERENCE Lab | DASER-Net, cross-corpus speech emotion recognition. His part: real-data validation and reproducible evaluation |
| Research collaborator | — | LLM training on text, speech and emotion recognition |
| Events Lead | EuroTech Federation | — |
| Founder & Builder | STATION F Landing Zone, Paris | 2026 |
| Student Fellow | UNIVERSEH Student Fellowship (8-university consortium) | Sep 2025. Built AgriSat and the first CosmoHub prototype |
| OGV Team Lead | AIESEC Roma Tre | Jan – Mar 2025 |

**Projects**

- **ORVYRA** (formerly CosmoHub). Intelligence layer for the space economy. Tagline: "INTELLIGENCE FOR THE SPACE ECONOMY."
  - Repo: github.com/kantimohanthy/Orvyra. Lineage repo: github.com/kantimohanthy/Cosmohub, live prototype kantimohanthy.github.io/Cosmohub.
  - Real results: 20 seed organisations resolved through ROR (99 relationships, coordinates for all 20). With OpenAlex: 72 topics, 144 relationships, 323 evidence records.
  - Data honesty model: LIVE / SOURCE_FIXTURE / SYNTHETIC.
  - Known failure: some ROR names resolve ambiguously and are not auto-accepted (Polish Space Agency, Luxembourg Space Agency, BELSPO, Austrian Space Applications Programme, DTU). This is a ready-made "what broke" section.
- **Klesos intelligence layer.** ORVYRA backend for a collaborator's cold-call analysis tool.
  - Repo: github.com/kantimohanthy/kelsos-inteliigence-with-orvyra, deployed on Railway.
- **Project LOOP.** AI customer-feedback platform (Zidio). Repo above.
- **G-Core.** Behavioural banking engine, hackathon prototype. github.com/kantimohanthy/gcore-behavioral-banking
- **ARGUS.** AI risk/event intelligence concept, Adria Hack Sarajevo 2026.
- **CineForge AI Pro.** Bilingual (Arabic/English) AI pre-production assistant for filmmakers, IBM SkillsBuild AI Builders Challenge, Jul 2026.
  - `TODO(UJ)`: confirm the tech stack before stating FastAPI / watsonx / Hugging Face.
- **Sentinel AI.** Integration Lead, IBM watsonx Challenge, explainable incident-intelligence platform.
- **Kaggle × ChanZuckerberg Biohub.** 3D microscopy cell tracking (zebrafish). Submitted Sep 2026.
  - `TODO(UJ)`: result or rank, if he wants it shown.
- **DEVAN / this site.** github.com/kantimohanthy/Devan2. Becomes the /infra case study.

**Talks**
- Sustainable Space Conference, Tor Vergata, 28–29 Sep 2026, students' talk block.

**Evidence that genuinely exists**
- DNS iterative resolution experiment (dig +trace + tshark against example.com, run 2026-08-07), derived state TESTED.
- `TODO(UJ)`: confirm the raw capture file (pcap / trace text) is in the repo. If it isn't, ask UJ for it.
- "Why PostgreSQL?" decision with 2 alternatives logged.
- Wireless Mesh + TVWS mission, 3 / 8 objectives.

Anything else currently in the data files must be justified by an artifact or removed (see P0.2).

---

## 3. PHASE 0 — Make it honest and deployable

**Gate:** a stranger clicking every page finds nothing fake, stale or broken, and CI deploys from a clean install.

**P0.1 Build integrity**
- Revert the manual patch to `node_modules/next/dist/compiled/webpack/bundle5.js` and remove any patch-webpack script.
- Diagnose why `outputFileTracingRoot` was needed. The likely cause is a stray `package-lock.json` / `package.json` in the parent `C:\Users\Ujwal\devan2`. Fix the root cause.
- Prove it: `rm -rf node_modules .next out && npm ci && npm test && npm run build` passes.
- Confirm `deploy.yml` uses `npm ci` and the same Node version as local. Pin Node in `.nvmrc` and in the workflow.
- Confirm how Prisma is used in a static export (build-time only?). Make sure the CI build does not need a database secret it doesn't have. Document this in README.

**P0.2 Remove fabricated records**
- List every experiment, decision, repository, mission and project record in `src/lib/data.ts`, `src/data/portfolio.ts`, `src/lib/content.ts` and any seed files.
- For each record, mark it REAL (backed by an artifact or §2) or UNBACKED.
- Delete UNBACKED records. Known suspects added recently:
  - experiments `lab-tcp-congestion`, `lab-dns-resolver`
  - decisions `aodv-over-olsr`, `provider-abstraction-watsonx`
  - repos `devan-os`, `cosmos-hub`
- Remove every link that pointed to a deleted record.
- Keep the slug aliases only if they redirect to real pages.

**P0.3 The DNS page**
- Remove every percentage and every "Readiness", "Sealed", "Confidence" and "LIVE TELEMETRY" / "Jaeger" label.
- Display the derived evidence state instead.
- If the real capture file exists, rebuild the trace from its actual timestamps, servers and answer IP, and label it "Recorded trace · 2026-08-07 · source: <file>".
- If it does not exist, label the trace "Illustrative trace (not a recording)" and add `TODO(UJ): commit the capture`.
  - The current values (09.000 ms start, ~1.6 ms total, 93.184.216.34) are not credible as a recording.
- Perspective tabs (Packet, Application, Kernel, Infrastructure, Cloud, Interview) and Simulator: remove any tab without real content, or mark it "Not built yet".

**P0.4 The TCP page**
- Rename "Transport Telemetry" to **"Protocol walkthrough"**.
- Cite **RFC 9293**, which replaced RFC 793.
- It must not raise TCP's evidence state. It stays ENCOUNTERED or STUDIED until a real experiment exists.

**P0.5 Oracle / AI**
- Remove the oracle query delegation in `src/app/api/query/route.ts`.
- Remove the "Explain Concept / Failure Modes / Interview Questions" suggestions and the "Oracle standby" text.
- Remove the Oracle / Terminal / Logs dock entirely, or keep only tabs that show real content.
- ⌘K placeholder becomes "Search concepts, projects, decisions…".

**P0.6 Fake live signals**
- "CI passing · 3 days ago" must come from the GitHub API at build time (see `sync-github.mjs` / `github-activity.generated.json`), or be removed.
- Delete countdowns, "current sprint" and other time-relative fields rather than zeroing them.

**P0.7 Metadata and identity**
- Root `layout.tsx` metadata:

  | Field | Value |
  | --- | --- |
  | author / creator | Ujwal Shyam Kantimohanthy |
  | title | "UJ — Internet & systems engineer" |
  | description | One plain sentence about who he is |
  | site_name | "UJ" (or "UJ · DEVAN" if UJ prefers) |
  | publisher | Remove "DEVAN Intelligence Platform" |
  | twitter:creator | Remove unless `TODO(UJ)` confirms the handle exists |

- Keywords: only topics with evidence on the site. Remove Linux Kernel and Kubernetes.
- Per-page titles and descriptions, and canonical URLs per page (not all pointing at `/`).
- Replace the "DE" logo mark with "UJ".

**P0.8 Content corrections**
- Education → §2 everywhere: timeline, CV page, identity.
- Identity "Current Focus" → rewrite from current facts:
  - ORVYRA intelligence layer
  - Zidio internship
  - DASER-Net evaluation
  - thesis
  - `TODO(UJ)` to confirm
- Timeline: add Zidio (Aug 2026), Sustainable Space Conference (Sep 2026), ORVYRA. Sort newest first.
- Projects: show ORVYRA. Present CosmoHub only as its origin ("formerly CosmoHub").

**P0.9 Plain navigation**

| Current label | New label |
| --- | --- |
| Mission Control | Home |
| Knowledge Tree | Knowledge |
| Atlas Graph | Map |
| Evidence Proofs | Evidence |
| Laboratory | Lab |
| Oracle Reasoning | Decisions |
| Projects | Projects |
| Repositories | Repos |
| Timeline Ledger | Timeline |
| Active Missions | Research |
| Identity Profile | About |

Add **CV** and **Contact**.

**P0.10 Guardrail test (must be added)**
- Add a Vitest test that runs after build. It scans every HTML file in `./out` and fails if:
  - a percentage appears within 40 characters of `confidence|readiness|sealed|score|proficiency|match`
  - the words `LIVE`, `telemetry` or `Oracle` appear outside an allow-list
  - "Kanti Mohanthy" (split surname) appears
  - "Satata" or "TalentBattle" appears
- Add a link checker: every internal `href` in `./out` resolves to a file.
- Both run in `deploy.yml` before deploy.

**P0.11 Report and stop** (format in §8).

---

## 4. PHASE 1 — Foundations

**Gate:** a recruiter understands who UJ is in 30 seconds without touching the graph, and there is one source of truth for the code.

1. **Repo consolidation.**
   - Inventory these folders: `C:\Users\Ujwal\ujwal-portfolio` (Ajv validator, commit 7598c7a, 22 tests), `ujwal-portfolio-site`, `U:\Downloads\devan-app`, `kantimohanthy.github.io`.
   - Report what each contains and what is not yet in ujos.
   - Do not delete anything. Propose an archive plan to UJ.
2. **Evidence integrity layer.**
   - Confirm the Ajv JSON-Schema validator and `deriveEvidenceState()` run in ujos CI.
   - If they were lost in the merge, port them from `ujwal-portfolio`.
   - JSON Schema is the single structural authority. The TS validator only checks ID uniqueness, reference resolution, provenance and derived states.
   - CI fails on any invalid record.
3. **Recruiter-first homepage.**
   - Two-sentence intro.
   - Three strongest projects: ORVYRA, DASER-Net, and the network/infra case study, each linking to its five-part write-up.
   - Current role, CV button, contact.
   - The DEVAN graph sits below as "Explore the knowledge map".
4. **CV page (`/cv`).**
   - Built only from §2.
   - Print stylesheet.
   - Downloadable PDF generated at build time.
   - `TODO(UJ)` for anything unconfirmed.
5. **Contact.**
   - Email (`TODO(UJ)`: which address), LinkedIn, GitHub.
   - No form yet; that comes in Phase 4.
6. **Basics.**
   - Open Graph image (UJ mark + one line)
   - favicon
   - `sitemap.xml`, `robots.txt`
   - branded 404 (keep the one already built)
   - JSON-LD `Person` schema
7. **Quality.**
   - Mobile at 360 px width with no horizontal scroll.
   - Keyboard navigation and visible focus states, `aria-label`s on icon buttons, `prefers-reduced-motion` respected.
   - Lighthouse at 90 or above for Performance, Accessibility, Best Practices and SEO on Home, a project page and `/cv`. Publish the actual scores in the report.
8. **Report and stop.**

---

## 5. PHASE 2 — Real content

**Gate:**
- 6 project write-ups in the five-part format
- 3 evidence records from real experiments
- thesis section live
- Schema Review #001 written

1. **Project write-ups** (MDX, five-part format), in this order:
   1. ORVYRA (use the real ROR/OpenAlex numbers and the ambiguous-resolution failure)
   2. DASER-Net
   3. LOOP
   4. G-Core
   5. ARGUS
   6. CineForge

   For each one, draft only from §2 and the repo's README. Put `TODO(UJ)` wherever a diagram, verification output or "what broke" story is needed and not available. **UJ writes the "what broke" sections in his own words.** Provide a prompt template he can fill in.
2. **Thesis / research section (`/research/mesh-tvws`).**
   - Sections: problem, why TVWS, mesh routing choice, planned topology, method, objectives (the existing 3 / 8), status, references.
   - Structure and headings only, plus `TODO(UJ)` placeholders. Do not write research claims.
3. **Evidence slices.**
   - Scaffold two new experiment records, TCP 3-way handshake capture and TLS 1.3 handshake capture, each with the exact commands UJ should run (tcpdump/tshark/openssl).
   - The records stay empty until UJ runs them and commits the outputs.
   - Their state must derive from the artifacts.
4. **Timeline** complete to the current month, newest first.
5. **Talks page** with the Sustainable Space Conference. `TODO(UJ)`: title, slides link.
6. **Schema Review #001.** After roughly 10–15 genuine records, write `docs/schema-review-001.md`: what fields were unused, missing or awkward, and proposed changes. Do not apply changes without approval.
7. **Report and stop.**

---

## 6. PHASE 3 — The site as infrastructure evidence

**Gate:** the site itself proves the network-engineering claim, with public, re-runnable checks.

1. **/infra page**
   - Architecture diagram: DNS → CDN/host → static export → build pipeline.
   - Decisions log, each with the alternatives considered and why.
   - Published results of internet.nl (website + email tests) and testipv6.com: screenshots plus date, re-run monthly.
2. **Transport and DNS hardening.**
   - HTTPS: note that `.dev` is HSTS-preloaded at the TLD level, and explain that on /infra.
   - IPv6: AAAA records for GitHub Pages.
   - DNSSEC: at the registrar / DNS provider. `TODO(UJ)`: who is the registrar?
   - CAA records.
   - Security headers: GitHub Pages cannot set custom headers (CSP, Permissions-Policy). Present UJ with the trade-off — Cloudflare in front vs moving to Cloudflare Pages / Netlify / Vercel — as a decision record, and wait for his choice.
3. **Network lab.**
   - One Containerlab (or GNS3) topology in a `labs/` folder or separate repo.
   - Include configs, a verification script, its output and a "what broke" note.
   - Start with a small OSPF or BGP lab, or a mesh routing lab tied to the thesis (OLSR/BATMAN). Only claim AODV/OLSR decisions once UJ makes them.
4. **Automation.**
   - Ansible or Netmiko playbooks for the lab, with `ansible-lint` / `yamllint` in CI.
5. **Wireshark write-ups.**
   - One page per capture: DNS (existing), TCP, TLS, linked to their evidence records.
6. **Monitoring.**
   - Optional Prometheus + Grafana for the lab or an uptime check.
   - Show it on the site only if it is genuinely live. Otherwise show a dated screenshot labelled as such.
7. **Certifications.**
   - Show only certs UJ holds (`TODO(UJ)` list), each linked to the project where it was applied.
8. **Report and stop.**

---

## 7. PHASE 4 — Signature features

**Gate per feature:** works with real data only, has tests, and degrades gracefully when data is thin.

1. **Engineering Map.**
   - Interactive React Flow map across layers: math → physics → electronics → telecom → networks → internet → infrastructure → cloud/security → distributed systems → AI.
   - Nodes come only from real concepts in the graph, coloured by derived evidence state.
   - Empty layers show as empty, never padded.
   - List-view fallback for accessibility.
2. **Recruiter mode vs explorer mode.**
   - A toggle: a concise CV-style view vs the full graph.
3. **Job-description drop.**
   - A recruiter pastes a JD and it is emailed to UJ via a form service compatible with static hosting (`TODO(UJ)`: Formspree / Cloudflare Worker / other).
   - Add spam protection without CAPTCHAs that break accessibility.
4. **/fit (optional, later).**
   - Show which JD requirements map to evidence on the site and which are gaps.
   - **No percentage or score.**
5. **ASK.UJ.**
   - **Locked** until 40 concepts, 15 experiments and 10 technical notes.
   - When unlocked: RAG over his own nodes, notes, failure logs and decisions only, with a visible citation trail per answer.
   - It refuses outside the graph's scope.
   - Its answers never invent opinions; decisions come from the `/decisions` log.
6. **Report and stop.**

---

## 8. How to report at the end of every phase

Reply with exactly these sections:

1. **Done** — each checklist item with the file(s) changed.
2. **Removed** — every record, link, label or feature you deleted, and why.
3. **TODO(UJ)** — every placeholder you left, with what UJ needs to provide.
4. **Verification** — the exact commands run and their real output summary:
   - `npm ci`
   - `npm test` (count)
   - `npm run build` (routes)
   - guardrail test
   - link checker
   - Lighthouse (if in scope)
5. **`git diff --stat`** — then **wait**. Do not commit or push until UJ approves. Then use one commit per logical change with conventional-commit messages.
6. **Decisions needed** — anything you would otherwise have guessed.

If you are ever unsure whether something is true, it is not. Leave a `TODO(UJ)`.
