# DEVAN OS Changelog

All notable changes, architectural decisions, and releases for **DEVAN (UJ.OS Engine)**.

## [v2.4.0] - 2026-08-06
### Added
- **Global Search API**: Added `/api/search` with keyword filtering across knowledge nodes and case study artifacts.
- **Audit Logging Architecture**: Added `AuditLog` table in Prisma schema and `recordAuditLog` helper in `src/lib/audit.ts` for tracking admin operations.
- **File Upload Handler**: Built `/api/upload` supporting image/asset uploads with file type & size constraints (10MB limit).
- **Admin CRUD API Routes**: Built `/api/admin/projects` and `/api/admin/skills` with `requireRole("ADMIN")` authorization.
- **Graph URL Deep-Linking**: Updated `KnowledgeGraph.tsx` to handle `?node=<id>` query parameters.

### Changed
- **Database Connection Pooling**: Switched Prisma 7 driver adapter connection to `pg.Pool({ max: 1 })` targeting Supabase PgBouncer pooled connection strings.
- **Prisma 7 Configuration**: Moved datasource configuration to `prisma.config.ts` per Prisma 7 specification.

---

## [v2.3.0] - 2026-08-05
### Added
- **Engineering Evidence Artifacts**: Added `artifact-schema.ts`, `ArtifactView.tsx`, and static dynamic SSG route `/artifacts/[id]`.
- **DNS/HTTP Networking Slice**: Instantiated 5 architecture components for wire-format DNS encoder/decoder & iterative UDP resolver.
- **Prometheus Exporter**: Added `/api/metrics` serving request counts, errors, and average durations.
- **Team Cymru WHOIS-over-DNS**: Added `/api/net/asn` endpoint for autonomous system number resolution.

---

## [v2.2.0] - 2026-08-04
### Added
- **Net-Intel Suite**: Added `/api/net/dns`, `/api/net/whois`, `/api/net/tls`, `/api/net/headers`.
- **Auth System**: Built JWT access/refresh token rotation, bcryptjs hashing, and role-based permissions (`ADMIN`, `EDITOR`, `VIEWER`).
- **Interactive Terminal**: Added registered CLI shell in floating `ToolDock`.
- **Ask DEVAN Hybrid Search**: Added ONNX vector similarity + keyword scoring ranking pipeline.
