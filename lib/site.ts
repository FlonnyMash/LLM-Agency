import { getDict, locales, pathFor, type Locale, type PageRef } from "@/lib/i18n";

export const siteConfig = {
  name: "Webfluence Agency",
  url: "https://webfluence-agency.com",
  email: "hello@webfluence-agency.com",
} as const;

const metaKey = (ref: PageRef) => (ref.key === "service" ? "services" : ref.key);

/** Title, description, canonical and hreflang alternates for a page in a language. */
export function pageMetadata(locale: Locale, ref: PageRef, override?: { title: string; description: string }) {
  const dict = getDict(locale);
  const base = dict.meta[metaKey(ref) as keyof typeof dict.meta];
  const title = override?.title ?? base.title;
  const description = override?.description ?? base.description;
  const url = `${siteConfig.url}${pathFor(locale, ref)}`;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteConfig.url}${pathFor(l, ref)}`;
  languages["x-default"] = `${siteConfig.url}${pathFor("de", ref)}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website" as const,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: locale === "en" ? "en_US" : "de_DE",
      alternateLocale: locale === "en" ? "de_DE" : "en_US",
    },
    twitter: { card: "summary" as const, title, description },
  };
}
