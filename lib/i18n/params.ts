import { locales } from "./config";

export function generateLocaleParams() {
  return locales.map((locale) => ({ locale }));
}
