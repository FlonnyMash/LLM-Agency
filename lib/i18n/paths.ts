import { isLocale, type Locale } from "./config";

export function getLocaleFromPathname(pathname: string): Locale | null {
  const match = pathname.match(/^\/(en|de)(?=\/|$)/);
  return match && isLocale(match[1]) ? match[1] : null;
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|de)(?=\/|$)/, "");
  return stripped || "/";
}

export function isLocaleHome(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized === "/en" || normalized === "/de";
}

export function localizedPath(locale: Locale, path: string): string {
  const withoutLocale = stripLocalePrefix(path).replace(/\/$/, "") || "/";
  if (withoutLocale === "/") return `/${locale}/`;
  return `/${locale}${withoutLocale}/`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  return localizedPath(nextLocale, stripLocalePrefix(pathname));
}
