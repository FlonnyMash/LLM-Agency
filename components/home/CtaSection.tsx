import { Reveal } from "@/components/ui/Reveal";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localizedPath } from "@/lib/i18n/paths";

export function CtaSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).home.cta;

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 text-paper sm:px-8 sm:py-36">
      <div className="absolute inset-0 opacity-40">
        <VideoFrame src="/media/studio.mp4" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/55" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(225,6,0,0.35),transparent_55%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <Reveal>
          <span className="font-label text-xs uppercase tracking-[0.2em] text-white/50">
            {dict.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-white">
            {dict.headingLine1}
            <br className="hidden sm:block" />
            {dict.headingLine2}
            <span className="text-accent">*</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-md text-base leading-relaxed text-white/60">
            {dict.body}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ArrowCta href={localizedPath(locale, "/contact")} tone="dark">
              {dict.cta}
            </ArrowCta>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-label text-xs uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
