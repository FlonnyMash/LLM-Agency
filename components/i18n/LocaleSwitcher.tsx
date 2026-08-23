"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeStorageKey, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";
import { useLocale } from "./LocaleProvider";

export function LocaleSwitcher({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark" | "overlay";
}) {
  const pathname = usePathname();
  const { locale, dict } = useLocale();

  const color =
    tone === "overlay"
      ? "text-white/55 hover:text-white"
      : tone === "dark"
        ? "text-white/55 hover:text-white"
        : "text-ink-soft hover:text-ink";

  const activeColor =
    tone === "overlay" || tone === "dark" ? "text-white" : "text-ink";

  function persist(next: Locale) {
    try {
      localStorage.setItem(localeStorageKey, next);
    } catch {
      /* ignore quota / private mode */
    }
  }

  return (
    <nav aria-label={dict.nav.language} className={`flex items-center gap-2 ${className}`}>
      {locales.map((item, index) => {
        const active = item === locale;
        return (
          <span key={item} className="flex items-center gap-2">
            {index > 0 && (
              <span className={`font-label text-[0.7rem] ${tone === "overlay" || tone === "dark" ? "text-white/25" : "text-muted"}`} aria-hidden="true">
                /
              </span>
            )}
            <Link
              href={switchLocalePath(pathname, item)}
              hrefLang={item}
              onClick={() => persist(item)}
              aria-current={active ? "true" : undefined}
              className={`font-label text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                active ? activeColor : color
              }`}
            >
              {item === "en" ? dict.nav.en : dict.nav.de}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
