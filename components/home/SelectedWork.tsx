import { projects } from "@/lib/projects";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectStack } from "@/components/work/ProjectStack";

export function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel label="Featured works" index="03" />

        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="font-display max-w-xl text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink">
            Selected work, not a stock-photo grid.
          </h2>
          <ArrowCta href="/work">View portfolio</ArrowCta>
        </div>

        <ProjectStack projects={featured} />
      </div>
    </section>
  );
}
