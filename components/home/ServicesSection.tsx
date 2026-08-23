import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { ServiceSlideshow } from "@/components/home/ServiceSlideshow";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localizedPath } from "@/lib/i18n/paths";
import { getServices } from "@/lib/services";

export function ServicesSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const services = getServices(dict);

  return (
    <section id="services" className="border-t border-line px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel label={dict.home.services.label} index="02" />
        <div className="mb-14 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="font-display max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
            {dict.home.services.heading}
          </h2>
          <ArrowCta href={localizedPath(locale, "/services")}>
            {dict.home.services.cta}
          </ArrowCta>
        </div>

        <ServiceSlideshow services={services} />
        <div className="hidden gap-5 lg:grid lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.index} service={service} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
