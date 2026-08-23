import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { VideoFrame } from "@/components/ui/VideoFrame";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative">
      <div className="project-visual relative">
        <div className="relative isolate aspect-4/3 overflow-hidden rounded-[2rem] bg-ink">
          <div className="absolute inset-0 origin-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <VideoFrame src={project.media} />
          </div>
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
        </div>
        <span className="absolute -bottom-5 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-accent text-white opacity-100 shadow-[0_10px_24px_rgba(225,6,0,0.35)] transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative z-1 flex flex-col items-start gap-3 bg-paper px-1 pt-6 sm:flex-row sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-2 flex gap-1" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="size-1.5 rounded-full bg-black/15" />
            <span className="size-1.5 rounded-full bg-black/15" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display truncate text-xl font-medium tracking-tight text-ink sm:text-[1.35rem]">
              {project.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted">{project.year}</p>
          </div>
        </div>
        <ul className="flex flex-wrap justify-start gap-1.5 sm:justify-end">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-paper-raised px-3 py-1 text-[0.7rem] tracking-wide text-ink-soft"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
