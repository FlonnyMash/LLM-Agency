import { HomeIntro } from "@/components/home/HomeIntro";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { SocialProof } from "@/components/home/SocialProof";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Process } from "@/components/home/Process";
import { ServicesSection } from "@/components/home/ServicesSection";
import { About } from "@/components/home/About";
import { Metrics } from "@/components/home/Metrics";
import { CtaSection } from "@/components/home/CtaSection";
import { parseLocale } from "@/lib/i18n/config";
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
  return localeMetadata(parseLocale(locale), "home", "/");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);

  return (
    <>
      <HomeIntro />
      <div className="relative isolate">
        <Hero />
        <Intro locale={locale} />
      </div>
      <SocialProof locale={locale} />
      <SelectedWork locale={locale} />
      <Process locale={locale} />
      <ServicesSection locale={locale} />
      <About locale={locale} />
      <Metrics locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
