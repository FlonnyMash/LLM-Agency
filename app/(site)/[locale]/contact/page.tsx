import { Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
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
  return localeMetadata(parseLocale(locale), "contact", "/contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const dict = getDictionary(locale);
  const page = dict.contactPage;

  const details = [
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: dict.site.location },
    { icon: Clock, label: page.replyTime },
  ];

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-5">
              {details.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-ink-soft">
                  <Icon className="size-4 text-accent" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="inline-flex min-h-11 items-center hover:text-ink">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                {page.preferEmail}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
