import { services } from "@/lib/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ArrowCta } from "@/components/ui/ArrowCta";

export function ServicesSection() {
  return (
    <section id="services" className="border-t border-line px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel label="What we do" index="02" />
        <div className="mb-14 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="font-display max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
            Full-service, from strategy to shipping.
          </h2>
          <ArrowCta href="/services">All services</ArrowCta>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.index} service={service} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
