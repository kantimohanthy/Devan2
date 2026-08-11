import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kantimohanthy.dev";

  const routes = [
    "",
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
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
