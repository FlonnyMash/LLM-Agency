import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { VideoFrame } from "@/components/ui/VideoFrame";

const steps = [
  {
    index: "01",
    title: "Discover",
    description:
      "We dig into the business, the market and the audience before touching a single pixel.",
  },
  {
    index: "02",
    title: "Strategize",
    description:
      "Positioning, narrative and a plan everyone on both sides can actually get behind.",
  },
  {
    index: "03",
    title: "Create",
    description:
      "Identity, product and content take shape — reviewed in the open, refined in the room.",
  },
  {
    index: "04",
    title: "Launch",
    description:
      "A coordinated, well-tested release across every channel that matters for the brand.",
  },
  {
    index: "05",
    title: "Grow",
    description:
      "We stay close post-launch, measuring, iterating and compounding what's working.",
  },
];

const phases = [
  { label: "Strategy", value: "25%" },
  { label: "Design", value: "60%" },
  { label: "Launch", value: "100%" },
];

export function Process() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel label="Approach" index="04" />
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
            A process built for momentum, not meetings.
          </h2>
          <div className="flex gap-8 sm:gap-12">
            {phases.map((phase) => (
              <div key={phase.label} className="flex flex-col gap-1">
                <span className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {phase.value}
                </span>
                <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  {phase.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="relative mb-12 aspect-video overflow-hidden rounded-4xl bg-ink sm:aspect-16/7">
            <VideoFrame src="/media/car.mp4" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </Reveal>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.04}>
              <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-6 border-t border-line py-8 transition-colors duration-300 hover:bg-paper-raised sm:grid-cols-[4rem_12rem_1fr] sm:px-4">
                <span className="font-label text-sm text-accent">{step.index}</span>
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {step.title}
                </h3>
                <p className="col-span-2 mt-3 max-w-md text-sm leading-relaxed text-muted sm:col-span-1 sm:mt-0">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
