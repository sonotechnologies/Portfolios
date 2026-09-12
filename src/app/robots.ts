import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function robots(): MetadataRoute.Robots {
  // Domain not registered yet (brief: "ask me") — sitemap link is omitted
  // until siteConfig.domain is set so we don't publish a bogus canonical host.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteConfig.domain ? `${siteConfig.domain}/sitemap.xml` : undefined,
  };
}
