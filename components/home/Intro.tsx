import { ArrowCta } from "@/components/ui/ArrowCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoFrame } from "@/components/ui/VideoFrame";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localizedPath } from "@/lib/i18n/paths";

const STEPS = [55, 100, 55];

export function Intro({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).home.intro;

  return (
    <section className="relative z-10">
      <div className="hero-skyline" aria-hidden="true">
        {STEPS.map((height, i) => (
          <div
            key={i}
            className="hero-step"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="bg-paper px-6 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <SectionLabel label={dict.label} index="01" />

          <Reveal>
            <h2 className="font-display max-w-5xl text-[clamp(1.75rem,4.2vw,3.35rem)] font-medium leading-[1.12] tracking-tight text-ink">
              {dict.heading}
              <span className="text-accent">®</span>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <Reveal delay={0.05}>
              <ArrowCta href={localizedPath(locale, "/contact")}>{dict.cta}</ArrowCta>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {dict.booking}
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                  {dict.ideaTitle}
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {dict.ideaBody}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                  {dict.collabTitle}
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {dict.collabBody}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-16">
            <div className="relative aspect-video overflow-hidden rounded-4xl bg-ink sm:aspect-16/8 sm:rounded-[2.5rem]">
              <VideoFrame src="/media/portrait.mp4" />
              <div className="absolute inset-0 bg-black/15" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
