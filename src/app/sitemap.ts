import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain ?? "http://localhost:3000";
  return [
    { url: base },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
  ];
}
