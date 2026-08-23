import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { VideoFrame } from "@/components/ui/VideoFrame";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative">
      <div className="project-visual relative">
        <div className="relative isolate aspect-4/3 overflow-hidden rounded-4xl bg-ink [clip-path:inset(0_round_2rem)] transform-[translateZ(0)]">
          <div className="absolute inset-0 origin-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <VideoFrame src={project.media} />
          </div>
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
        </div>
        <span className="absolute -bottom-5 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-accent text-white opacity-0 shadow-[0_10px_24px_rgba(225,6,0,0.35)] transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative z-1 flex items-start justify-between gap-4 bg-paper px-1 pt-6">
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
        <ul className="flex flex-wrap justify-end gap-1.5">
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
