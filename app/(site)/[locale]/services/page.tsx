import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CtaSection } from "@/components/home/CtaSection";
import { getServices } from "@/lib/services";
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
  return localeMetadata(parseLocale(locale), "services", "/services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.servicesPage.eyebrow}
        title={dict.servicesPage.title}
        description={dict.servicesPage.description}
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {getServices(dict).map((service, i) => (
            <ServiceCard key={service.index} service={service} delay={(i % 6) * 0.05} />
          ))}
        </div>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
