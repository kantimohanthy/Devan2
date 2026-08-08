import { describe, it, expect } from "vitest";
import { ontologyEngine } from "./index";

describe("OntologyEngine (Cognitive Core Single Source of Truth)", () => {
  it("retrieves canonical entities by ID", () => {
    const dns = ontologyEngine.getEntity("networking.dns.iterative-resolution");
    expect(dns).toBeDefined();
    expect(dns?.title).toBe("DNS Iterative Resolution & Wire Mechanics");
    expect(dns?.domain).toBe("Networking");
  });

  it("finds related concepts correctly", () => {
    const related = ontologyEngine.findRelatedConcepts("networking.dns.iterative-resolution");
    expect(related.some((e) => e.id === "networking.tcp")).toBe(true);
  });

  it("finds prerequisites for dependent concepts", () => {
    const prereqs = ontologyEngine.findPrerequisites("networking.dns.iterative-resolution");
    expect(prereqs.some((p) => p.id === "networking.tcp")).toBe(true);
  });

  it("expands knowledge graph neighborhoods", () => {
    const neighborhoods = ontologyEngine.expandKnowledgeGraph(["networking.dns.iterative-resolution"]);
    expect(neighborhoods).toHaveLength(1);
    expect(neighborhoods[0].rootEntity.id).toBe("networking.dns.iterative-resolution");
    expect(neighborhoods[0].connectedEntities.length).toBeGreaterThan(0);
  });

  it("infers direct or indirect relationships", () => {
    const rel = ontologyEngine.inferRelationships("networking.dns.iterative-resolution", "networking.tcp");
    expect(rel).toBeDefined();
    expect(rel?.type).toBe("DEPENDS_ON");
  });

  it("computes ordered topological prerequisite traversal path", () => {
    const path = ontologyEngine.getPrerequisiteTraversalPath("cloud.kubernetes");
    expect(path.length).toBeGreaterThan(0);
    expect(path.some((e) => e.id === "os.process")).toBe(true);
  });
});
