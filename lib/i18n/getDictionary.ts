import { defaultLocale, type Locale } from "./config";
import { de } from "./messages/de";
import { en, type Dictionary } from "./messages/en";

const dictionaries: Record<Locale, Dictionary> = { en, de };

export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
