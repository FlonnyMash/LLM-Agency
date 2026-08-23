import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Metric } from "@/components/ui/Metric";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { CtaSection } from "@/components/home/CtaSection";
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
  return localeMetadata(parseLocale(locale), "about", "/about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const dict = getDictionary(locale);
  const page = dict.aboutPage;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.headerDescription}
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                {page.p1}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base leading-relaxed text-muted">{page.p2}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">{page.p3}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink">
                <VideoFrame src="/media/fashion.mp4" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                {page.metrics.map((metric) => (
                  <Metric key={metric.label} {...metric} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={page.valuesEyebrow}
            title={page.valuesTitle}
            className="mb-14"
          />

          <div className="grid gap-8 sm:grid-cols-3">
            {page.values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 0.05}
                className="flex flex-col gap-3 border-t border-line pt-6"
              >
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
