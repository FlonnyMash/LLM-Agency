import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectStack } from "@/components/work/ProjectStack";
import { CtaSection } from "@/components/home/CtaSection";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected brand, web and campaign work from LLM Agency — case studies across hospitality, product and technology.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Case studies from real client partnerships."
        description="A small selection of the brand, product and campaign work we've shipped for ambitious companies over the last few years."
      />

      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <ProjectStack projects={projects} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
