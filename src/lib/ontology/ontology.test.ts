import { describe, it, expect } from "vitest";
import { ontologyEngine } from "./index";

describe("OntologyEngine (Cognitive Core Single Source of Truth)", () => {
  it("retrieves canonical entities by ID", () => {
    const dns = ontologyEngine.getEntity("dns-iterative-resolution");
    expect(dns).toBeDefined();
    expect(dns?.title).toBe("DNS Iterative Resolution & Wire Mechanics");
    expect(dns?.domain).toBe("Networking");
  });

  it("finds related concepts correctly", () => {
    const related = ontologyEngine.findRelatedConcepts("dns-iterative-resolution");
    expect(related.some((e) => e.id === "tcp-protocol")).toBe(true);
  });

  it("finds prerequisites for dependent concepts", () => {
    const prereqs = ontologyEngine.findPrerequisites("dns-iterative-resolution");
    expect(prereqs.some((p) => p.id === "tcp-protocol")).toBe(true);
  });

  it("expands knowledge graph neighborhoods", () => {
    const neighborhoods = ontologyEngine.expandKnowledgeGraph(["dns-iterative-resolution"]);
    expect(neighborhoods).toHaveLength(1);
    expect(neighborhoods[0].rootEntity.id).toBe("dns-iterative-resolution");
    expect(neighborhoods[0].connectedEntities.length).toBeGreaterThan(0);
  });

  it("infers direct or indirect relationships", () => {
    const rel = ontologyEngine.inferRelationships("dns-iterative-resolution", "tcp-protocol");
    expect(rel).toBeDefined();
    expect(rel?.type).toBe("DEPENDS_ON");
  });
});
