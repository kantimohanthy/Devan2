import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kantimohanthy.dev";

  const routes = [
    "",
    ...projects.map((c) => `/work/${c.slug}`),
    "/map",
    "/devan",
    "/knowledge",
    "/knowledge/networking.dns",
    "/knowledge/networking.tcp",
    "/knowledge/linux.kernel",
    "/knowledge/container.kubernetes",
    "/knowledge/networking.tls",
    "/visualization",
    "/evidence",
    "/laboratory",
    "/reasoning",
    "/projects",
    "/repositories",
    "/timeline",
    "/missions",
    "/identity",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-10-03"),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : route.startsWith("/work") ? 0.9 : 0.6,
  }));
}
