import { ArrowCta } from "@/components/ui/ArrowCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectStack } from "@/components/work/ProjectStack";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localizedPath } from "@/lib/i18n/paths";
import { getProjects } from "@/lib/projects";

export function SelectedWork({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const featured = getProjects(dict).slice(0, 4);

  return (
    <section id="work" className="px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel label={dict.home.selected.label} index="03" />

        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="font-display max-w-xl text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink">
            {dict.home.selected.heading}
          </h2>
          <ArrowCta href={localizedPath(locale, "/work")}>
            {dict.home.selected.cta}
          </ArrowCta>
        </div>

        <ProjectStack projects={featured} />
      </div>
    </section>
  );
}
