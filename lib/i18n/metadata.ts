import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { Locale } from "./config";
import { getDictionary } from "./getDictionary";
import { localizedPath } from "./paths";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

export function localeMetadata(
  locale: Locale,
  page: PageKey,
  path: string,
): Metadata {
  const dict = getDictionary(locale);
  const entry = dict.meta.pages[page];
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;
  const title =
    page === "home"
      ? `${siteConfig.name} — ${entry.title}`
      : entry.title;

  return {
    title: page === "home" ? { absolute: title } : title,
    description: entry.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}${localizedPath("en", path)}`,
        de: `${siteConfig.url}${localizedPath("de", path)}`,
        "x-default": `${siteConfig.url}${localizedPath("en", path)}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      title,
      description: entry.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: entry.description,
    },
  };
}
