import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fontClassName } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { isLocale, parseLocale, type Locale } from "@/lib/i18n/config";
import { generateLocaleParams } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { preferenceRedirectScript } from "@/lib/i18n/redirect-script";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { GooFilter } from "@/components/layout/GooFilter";
import "../../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return generateLocaleParams();
}

export const viewport: Viewport = {
  themeColor: "#f6f6f4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = parseLocale(raw);
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${dict.site.tagline}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: dict.site.description,
    keywords: dict.meta.keywords,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${dict.site.tagline}`,
      description: dict.site.description,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${dict.site.tagline}`,
      description: dict.site.description,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${fontClassName} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceRedirectScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <LocaleProvider locale={locale} dict={dict}>
          <GooFilter />
          <Navbar />
          <PageTransition />
          <div className="page-shell flex flex-1 flex-col">
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
