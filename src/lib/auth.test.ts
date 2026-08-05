import { describe, it, expect } from "vitest";
import {
  hashPassword,
  verifyPassword,
  signAccessToken,
  verifyAccessToken,
} from "./auth";

describe("password hashing", () => {
  it("verifies a correct password", async () => {
    const hash = await hashPassword("correct-horse-battery-staple");
    expect(await verifyPassword("correct-horse-battery-staple", hash)).toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const hash = await hashPassword("correct-horse-battery-staple");
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });
});

describe("access tokens", () => {
  it("round-trips a valid token", async () => {
    const token = await signAccessToken("user_123", "EDITOR");
    const payload = await verifyAccessToken(token);
    expect(payload.sub).toBe("user_123");
    expect(payload.role).toBe("EDITOR");
  });

  it("rejects a tampered token", async () => {
    const token = await signAccessToken("user_123", "EDITOR");
    const tampered = token.slice(0, -5) + "aaaaa";
    await expect(verifyAccessToken(tampered)).rejects.toThrow();
  });
});
