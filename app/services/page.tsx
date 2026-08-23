import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CtaSection } from "@/components/home/CtaSection";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, creative direction, web design and development, social, performance marketing, content and SEO — the full LLM Agency service set.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Every discipline a modern brand actually needs."
        description="We combine these disciplines differently depending on the brief — sometimes it's a full rebrand and platform, sometimes it's a focused sprint on one problem."
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.index} service={service} delay={(i % 6) * 0.05} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
