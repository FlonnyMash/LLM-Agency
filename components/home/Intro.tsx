import { ArrowCta } from "@/components/ui/ArrowCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoFrame } from "@/components/ui/VideoFrame";

const STEPS = [28, 52, 36, 78, 44, 100, 58, 40, 64];
const PEAK = STEPS.indexOf(Math.max(...STEPS));

export function Intro() {
  return (
    <section className="relative z-10">
      <div className="hero-skyline" aria-hidden="true">
        {STEPS.map((height, i) => (
          <div
            key={i}
            className="hero-step relative"
            style={{ height: `${height}%` }}
          >
            {i === PEAK ? (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 font-display text-sm text-ink">
                +
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="bg-paper px-6 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <SectionLabel label="Hey, just an intro" index="01" />

          <Reveal>
            <h2 className="font-display max-w-5xl text-[clamp(1.75rem,4.2vw,3.35rem)] font-medium leading-[1.12] tracking-tight text-ink">
              A brand and digital studio based in Amsterdam, building immersive
              identities and websites for ambitious companies. From strategy to
              shipping, every detail is considered.
              <span className="text-accent">®</span>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <Reveal delay={0.05}>
              <ArrowCta href="/contact">Get in touch</ArrowCta>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Currently booking a small number of Q1 partnerships. If the work
                has to last, let&apos;s talk.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                  Bringing ideas to life
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  We specialise in brand systems, product design and digital
                  experiences that feel expensive because they are considered —
                  not because they are loud.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                  Collaborate with us
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  Small team, senior people on every project. No account layers,
                  no junior learning curve on your budget.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-16">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] bg-ink sm:rounded-[2.5rem]">
              <VideoFrame src="/media/portrait.mp4" />
              <div className="absolute inset-0 bg-black/15" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
