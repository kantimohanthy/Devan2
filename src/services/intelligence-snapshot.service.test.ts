import { describe, it, expect, vi } from "vitest";
import { intelligenceSnapshotService } from "./intelligence-snapshot.service";
import { experienceEngine } from "@/lib/experience";

describe("IntelligenceSnapshotService (Achievement Key & Deduplication Regression Test)", () => {
  it("attaches immutable event IDs and deduplicates identical event IDs while preserving distinct events with identical titles", async () => {
    // Mock getRecentTimeline returning events with duplicate IDs and events with identical titles but distinct IDs
    vi.spyOn(experienceEngine, "getRecentTimeline").mockResolvedValueOnce([
      {
        id: "evt-dup-1",
        entityId: "ask-devan-console",
        action: "QUESTION_ASKED",
        metadata: JSON.stringify({ question: "What am I weakest at?" }),
        reason: "User query",
        source: "USER",
        confidence: 100,
        timestamp: new Date("2026-08-08T12:00:00Z"),
      },
      {
        id: "evt-dup-1", // Duplicate ID should be deduplicated
        entityId: "ask-devan-console",
        action: "QUESTION_ASKED",
        metadata: JSON.stringify({ question: "What am I weakest at?" }),
        reason: "User query duplicate",
        source: "USER",
        confidence: 100,
        timestamp: new Date("2026-08-08T12:00:00Z"),
      },
      {
        id: "evt-distinct-2", // Distinct ID with IDENTICAL title "QUESTION ASKED: ask-devan-console"
        entityId: "ask-devan-console",
        action: "QUESTION_ASKED",
        metadata: JSON.stringify({ question: "Compare me with a Systems Engineer" }),
        reason: "User query 2",
        source: "USER",
        confidence: 100,
        timestamp: new Date("2026-08-08T12:05:00Z"),
      },
    ]);

    const snapshot = await intelligenceSnapshotService.getSnapshot();

    expect(snapshot.recentAchievements).toHaveLength(2);
    expect(snapshot.recentAchievements[0].id).toBe("ach-evt-dup-1");
    expect(snapshot.recentAchievements[0].eventId).toBe("evt-dup-1");
    expect(snapshot.recentAchievements[1].id).toBe("ach-evt-distinct-2");
    expect(snapshot.recentAchievements[1].eventId).toBe("evt-distinct-2");

    // Both achievements share the exact same title string
    expect(snapshot.recentAchievements[0].title).toBe("QUESTION ASKED: ask-devan-console");
    expect(snapshot.recentAchievements[1].title).toBe("QUESTION ASKED: ask-devan-console");

    // All achievement IDs are unique, ensuring React key stability
    const keys = snapshot.recentAchievements.map((a) => a.id);
    expect(new Set(keys).size).toBe(2);
  });

  it("handles high-scale stream of 1000 events with 500 identical titles and 1000 unique IDs maintaining 1000 unique React keys", async () => {
    const scaleEvents = Array.from({ length: 1000 }, (_, i) => ({
      id: `evt-scale-${i + 1}`,
      entityId: i % 2 === 0 ? "ask-devan-console" : "networking.tcp",
      action: i % 2 === 0 ? "QUESTION_ASKED" : "PROTOCOL_TRACE",
      metadata: JSON.stringify({ index: i }),
      reason: `Stress event ${i + 1}`,
      source: "USER",
      confidence: 100,
      timestamp: new Date(1700000000000 + i * 1000),
    }));

    vi.spyOn(experienceEngine, "getRecentTimeline").mockResolvedValueOnce(scaleEvents);

    const snapshot = await intelligenceSnapshotService.getSnapshot();

    expect(snapshot.recentAchievements).toHaveLength(1000);

    const keys = snapshot.recentAchievements.map((a) => a.id);
    expect(new Set(keys).size).toBe(1000);

    const titleACount = snapshot.recentAchievements.filter((a) => a.title === "QUESTION ASKED: ask-devan-console").length;
    const titleBCount = snapshot.recentAchievements.filter((a) => a.title === "PROTOCOL TRACE: networking.tcp").length;

    expect(titleACount).toBe(500);
    expect(titleBCount).toBe(500);
  });
});
