import type { MetadataRoute } from "next";
import { projects, atlasNodes, LAST_REVIEWED } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kantimohanthy.dev";

  const routes = [
    "/",
    "/cv/",
    "/atlas/",
    ...atlasNodes.map((n) => n.url),
    ...projects.map((p) => `/work/${p.slug}/`),
    "/map/",
    "/devan/",
    "/evidence/",
    "/knowledge/",
    "/projects/",
    "/repositories/",
    "/reasoning/",
    "/missions/",
    "/timeline/",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(LAST_REVIEWED),
    changeFrequency: "weekly",
    priority: route === "/" ? 1.0 : route.startsWith("/work") || route === "/atlas/" ? 0.9 : 0.6,
  }));
}
