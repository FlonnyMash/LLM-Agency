import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

export const dynamic = "force-static";

const routes = ["/", "/work", "/services", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}${localizedPath(locale, route)}`,
      lastModified,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, `${siteConfig.url}${localizedPath(item, route)}`]),
        ),
      },
    })),
  );
}
