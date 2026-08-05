import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { getPagination } from "./pagination";

function makeReq(query: string) {
  return new NextRequest(`http://localhost/api/test?${query}`);
}

describe("getPagination", () => {
  it("defaults to page 1, limit 20", () => {
    const { skip, take, page, limit } = getPagination(makeReq(""));
    expect({ skip, take, page, limit }).toEqual({
      skip: 0,
      take: 20,
      page: 1,
      limit: 20,
    });
  });

  it("caps limit at maxLimit", () => {
    const { limit } = getPagination(makeReq("limit=500"));
    expect(limit).toBe(100);
  });

  it("rejects page/limit below 1", () => {
    const { page, limit } = getPagination(makeReq("page=-5&limit=0"));
    expect(page).toBe(1);
    expect(limit).toBe(1);
  });
});
