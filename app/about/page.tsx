import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Metric } from "@/components/ui/Metric";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { CtaSection } from "@/components/home/CtaSection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "LLM Agency is a small, independent brand and digital studio founded on the belief that ambitious companies deserve agency-grade thinking without agency-grade bureaucracy.",
};

const values = [
  {
    title: "Craft over speed",
    description:
      "We would rather ship one considered decision than ten quick ones. Every detail is a choice.",
  },
  {
    title: "Strategy first",
    description:
      "Design without a point of view is decoration. We start every engagement with the harder questions.",
  },
  {
    title: "Small by design",
    description:
      "We work with a limited number of clients at a time so senior people stay on every project, every time.",
  },
];

const metrics = [
  { value: "+120%", label: "Average growth" },
  { value: "48", label: "Brands launched" },
  { value: "4.9/5", label: "Client satisfaction" },
  { value: "8+", label: "Years of experience" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title="A small team, deliberately."
        description={`${siteConfig.name} is a focused studio of strategists, designers and engineers who work on a small number of client relationships at a time.`}
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                We founded {siteConfig.name} in {siteConfig.founded} on a
                simple bet: that ambitious companies deserve agency-grade
                thinking without agency-grade bureaucracy. No account layers,
                no juniors learning on your budget — the people who pitch the
                work do the work.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base leading-relaxed text-muted">
                Since then we&apos;ve helped brands across hospitality,
                product and technology build identities and digital
                experiences that hold up under real scrutiny — from category
                leaders defending their position to challengers trying to
                take it from them.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">
                We&apos;re based in {siteConfig.location.split("—")[0].trim()},
                and we work with clients worldwide, in person when it helps
                and remotely the rest of the time.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink">
                <VideoFrame src="/media/fashion.mp4" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                {metrics.map((metric) => (
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
            eyebrow="How we think"
            title="What we optimize for."
            className="mb-14"
          />

          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.05} className="flex flex-col gap-3 border-t border-line pt-6">
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

      <CtaSection />
    </>
  );
}
