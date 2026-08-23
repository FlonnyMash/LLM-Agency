import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { siteConfig } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel label="About the studio" index="05" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
              A small team, deliberately.
            </h2>
            <Reveal delay={0.05}>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                {siteConfig.name} is a focused studio of strategists, designers
                and engineers who work on a small number of client
                relationships at a time. No account layers, no juniors learning
                on your budget — the people who pitch the work do the work.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">
                We founded the studio in {siteConfig.founded} on a simple bet:
                that ambitious companies deserve agency-grade thinking without
                agency-grade bureaucracy.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="pt-2">
                <ArrowCta href="/about">More about us</ArrowCta>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink sm:aspect-[3/4]">
              <VideoFrame src="/media/fashion.mp4" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
