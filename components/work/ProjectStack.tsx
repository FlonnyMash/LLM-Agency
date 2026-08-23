"use client";

import { useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectStack({ projects }: { projects: Project[] }) {
  const desktop = useDesktop();

  if (!desktop) {
    return (
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <StackItem key={project.slug} index={i}>
            <ProjectCard project={project} />
          </StackItem>
        ))}
      </div>
    );
  }

  const rows = chunk(projects, 2);

  return (
    <div className="flex flex-col">
      {rows.map((row, i) => (
        <StackItem key={row.map((project) => project.slug).join("-")} index={i}>
          <div className="grid grid-cols-2 gap-x-8">
            {row.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </StackItem>
      ))}
    </div>
  );
}

function StackItem({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div
      className="project-stack-item"
      style={{ "--stack-n": index, zIndex: index + 1 } as CSSProperties}
    >
      {children}
    </div>
  );
}

function chunk<T>(items: T[], size: number) {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function subscribeDesktop(onStoreChange: () => void) {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function useDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  );
}
