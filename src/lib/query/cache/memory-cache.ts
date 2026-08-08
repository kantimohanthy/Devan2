/**
 * @file MemoryCache (In-Memory Query & Projection Cache)
 * @purpose Read-only in-memory TTL caching for Projections, Search, Atlas, and Oracle query results.
 */

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private defaultTtlMs: number;

  constructor(defaultTtlMs = 60000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number): void {
    const expiresAt = Date.now() + (ttlMs || this.defaultTtlMs);
    this.cache.set(key, { value, expiresAt });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const projectionCache = new MemoryCache<unknown>(60000);
export const atlasCache = new MemoryCache<unknown>(60000);
export const searchCache = new MemoryCache<unknown>(30000);
export const oracleCache = new MemoryCache<unknown>(30000);
