import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";
import { parseLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeMetadata } from "@/lib/i18n/metadata";
import { generateLocaleParams } from "@/lib/i18n/params";

export function generateStaticParams() {
  return generateLocaleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localeMetadata(parseLocale(locale), "terms", "/terms");
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const dict = getDictionary(locale);
  const [before, after] = dict.legal.termsP3.split("{email}");

  return (
    <LegalPage
      eyebrow={dict.legal.eyebrow}
      title={dict.legal.termsTitle}
      updated={dict.legal.updatedPlaceholder}
      lastUpdatedTemplate={dict.legal.lastUpdated}
    >
      <p>{dict.legal.termsP1}</p>
      <p>{dict.legal.termsP2}</p>
      <p>
        {before}
        <a href={`mailto:${siteConfig.email}`} className="text-accent underline">
          {siteConfig.email}
        </a>
        {after}
      </p>
    </LegalPage>
  );
}
