/* eslint-disable @typescript-eslint/no-explicit-any */
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({ max: 500, ttl: 1000 * 60 * 5 });

export function getCached<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}

export function setCached(key: string, value: any, ttlMs?: number) {
  cache.set(key, value, ttlMs ? { ttl: ttlMs } : undefined);
}
