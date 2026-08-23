import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LLM Agency to discuss a brand, web or campaign project.",
};

const details = [
  { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: siteConfig.location },
  { icon: Clock, label: "Replies within one business day" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Tell us about the project."
        description="Whether you know exactly what you need or you're still figuring it out, we're happy to talk it through."
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
                Prefer email? Reach out directly and we&apos;ll set up a call
                to talk through scope, timeline and budget.
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
