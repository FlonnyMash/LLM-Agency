export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeStorageKey = "llm-locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function parseLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function detectDeviceLocale(
  languages: readonly string[] | undefined,
  language: string | undefined,
): Locale {
  const list = languages?.length ? languages : language ? [language] : [];
  for (const item of list) {
    if (item.toLowerCase().startsWith("de")) return "de";
  }
  return defaultLocale;
}
