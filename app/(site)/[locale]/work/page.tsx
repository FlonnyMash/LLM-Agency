import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectStack } from "@/components/work/ProjectStack";
import { CtaSection } from "@/components/home/CtaSection";
import { getProjects } from "@/lib/projects";
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
  return localeMetadata(parseLocale(locale), "work", "/work");
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.workPage.eyebrow}
        title={dict.workPage.title}
        description={dict.workPage.description}
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <ProjectStack projects={getProjects(dict)} />
        </div>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
