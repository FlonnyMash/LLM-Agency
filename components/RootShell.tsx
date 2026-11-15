import type { ReactNode } from "react";
import { archivo, geist } from "@/lib/fonts";
import { ScrollCraftMount } from "@/components/ScrollCraftMount";
import type { Locale } from "@/lib/i18n";

export function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <html lang={lang} className={`${archivo.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/sc/scrollcraft.css" />
        <link rel="stylesheet" href="/sc/site.css" />
      </head>
      <body suppressHydrationWarning>
        <span data-sc-progress />
        <div className="sc-grain" aria-hidden="true" />
        {children}
        <ScrollCraftMount />
      </body>
    </html>
  );
}
