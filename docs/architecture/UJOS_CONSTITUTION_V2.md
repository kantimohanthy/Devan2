# UJ.OS CONSTITUTION v2 — Platform Governance & Engineering Principles

## 1. Core Principles
1. **The Ontology Engine is the Single Source of Truth**: All engineering concepts, relationships, and metadata exist centrally in the Ontology Engine. No subsystem maintains parallel representations.
2. **Experience is Immutable**: Experience events (`ExperienceEvent`) and evidence entries are strictly append-only. Historical engineering events are never overwritten.
3. **Competencies & Missions are Derived**: Competency readiness scores and mission completion percentages are computed dynamically from weighted evidence. Manual score overrides are strictly forbidden.
4. **Architecture is Stable & Frozen**: The core platform kernel (`src/lib/ontology`, `src/lib/experience`, `src/lib/mission`, `src/lib/intelligence`, `src/lib/knowledge-pipeline`, `src/lib/canon`, `src/lib/interaction`) is stable. Future sprints focus exclusively on knowledge acquisition, evidence collection, reasoning quality, and user experience.
5. **Explainable Reasoning**: Every Ask DEVAN reasoning step generates a transparent, step-by-step execution trace linking insights to concrete evidence anchors.

## 2. Architectural Principles
- **Strict Layered Boundary**: React (Presentation Only) → API Client Singletons → API Route Controllers → Service Orchestration & Engines → Repositories → Prisma ORM → Supabase PostgreSQL.
- **Repository Isolation**: Repositories handle database persistence and never call other repositories. Services handle orchestration and never perform direct database queries.

## 3. Knowledge & Compiler Principles
- **Compiler Paradigm Pipeline**: Ingestion follows: `Source -> Extraction -> Normalization -> Entity Detection -> Relationship Detection -> Evidence Detection -> Conflict Detection -> Merge Proposal -> Human Approval -> Ontology Commit`.
- **Immutable Ontology Commits**: Every approved knowledge merge generates a versioned, immutable `OntologyCommit` record supporting auditability and rollback.

## 4. Evidence & Verification Principles
- **Traceability**: Every engineering claim must be traceable to empirical evidence (passing CI tests, PCAP datagrams, benchmark metrics, published papers, or Git commits).
- **Zero Fabricated Mastery**: Mastery is earned solely through verified evidence.

## 5. Interaction Model Triad
1. **THE EYE**: Observe live engineering status, mission progress, readiness radar, and evidence summary.
2. **THE ATLAS**: Interactively explore and understand the topology of engineering concepts, capabilities, and dependencies.
3. **THE FORGE**: Execute live builds, run protocol traces, execute experiments, and generate new evidence.

## 6. Definition of Done
A sprint is complete ONLY when:
1. `npx tsc --noEmit` passes with 0 errors.
2. `npm run lint` passes with 0 errors and 0 warnings.
3. `vitest run` passes 100% of unit tests.
4. `next build` compiles successfully with Code 0 across all static & dynamic routes.
