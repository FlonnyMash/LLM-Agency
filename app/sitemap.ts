import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales, pathFor, serviceIds, type Locale, type PageRef } from "@/lib/i18n";

export const dynamic = "force-static";

const refs: PageRef[] = [
  { key: "home" },
  { key: "services" },
  ...serviceIds.map((id) => ({ key: "service" as const, id })),
  { key: "advergaming" },
  { key: "about" },
  { key: "contact" },
  { key: "privacy" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((locale: Locale) =>
    refs.map((ref) => ({
      url: `${siteConfig.url}${pathFor(locale, ref)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: ref.key === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${pathFor(l, ref)}`])),
      },
    })),
  );
}
