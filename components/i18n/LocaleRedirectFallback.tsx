import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const links = [
  { href: "/en/", label: "English" },
  { href: "/de/", label: "Deutsch" },
] as const;

export function LocaleRedirectFallback({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-paper px-6 text-center text-ink">
      <p className="font-display text-2xl font-medium tracking-tight">
        {siteConfig.name}
      </p>
      <p className="max-w-sm text-sm text-muted">{dict.site.description}</p>
      <p className="flex items-center gap-4 font-label text-xs uppercase tracking-[0.16em]">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-ink hover:text-accent">
            {link.label}
          </a>
        ))}
      </p>
    </main>
  );
}
