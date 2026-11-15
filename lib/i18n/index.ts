import { de, type Dict } from "./de";
import { en } from "./en";

export type Locale = "de" | "en";
export const locales: Locale[] = ["de", "en"];

export const getDict = (locale: Locale): Dict => (locale === "en" ? en : de);

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "de" : "en");

/** Replaces {name} tokens in a dictionary string. */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));

export type PageKey = "home" | "services" | "service" | "advergaming" | "about" | "contact" | "imprint" | "privacy";
export type PageRef = { key: PageKey; id?: string };

const segments: Record<Locale, Record<string, string>> = {
  de: { services: "leistungen", advergaming: "advergaming", about: "ueber-uns", contact: "kontakt", imprint: "impressum", privacy: "datenschutz" },
  en: { services: "services", advergaming: "advergaming", about: "about", contact: "contact", imprint: "imprint", privacy: "privacy" },
};

const slugs: Record<Locale, Record<string, string>> = {
  de: { werbung: "werbung", technik: "technik", ki: "ki" },
  en: { werbung: "advertising", technik: "technology", ki: "ai" },
};
/** The URL segment of a service in a language (defaults to the id). */
export const slugOf = (locale: Locale, id: string) => slugs[locale][id] ?? id;
export const idFromSlug = (locale: Locale, slug: string) =>
  de.services.map((x) => x.id).find((id) => slugOf(locale, id) === slug);

/** The URL of a page in a language. German lives at the root, English under /en/. */
export function pathFor(locale: Locale, ref: PageRef): string {
  const base = locale === "en" ? "/en" : "";
  const s = segments[locale];
  switch (ref.key) {
    case "home":
      return `${base}/`;
    case "service":
      return `${base}/${s.services}/${slugOf(locale, ref.id as string)}/`;
    default:
      return `${base}/${s[ref.key]}/`;
  }
}

/** Where a service id links to: advergaming has its own top-level page. */
export const serviceRef = (id: string): PageRef => (id === "advergaming" ? { key: "advergaming" } : { key: "service", id });
export const serviceHref = (locale: Locale, id: string) => pathFor(locale, serviceRef(id));

export const getServices = (locale: Locale) => getDict(locale).services;
export const getService = (locale: Locale, id: string) => getServices(locale).find((s) => s.id === id);
export type Service = Dict["services"][number];
export const serviceIds = de.services.map((s) => s.id);
