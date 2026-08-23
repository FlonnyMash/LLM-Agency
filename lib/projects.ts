import type { Dictionary } from "@/lib/i18n/getDictionary";

export type ProjectBase = {
  slug: keyof Dictionary["projects"];
  name: string;
  year: string;
  ratio: "square" | "portrait" | "landscape" | "wide";
  media: string;
};

export const projects: ProjectBase[] = [
  {
    slug: "north-orbit",
    name: "North Orbit",
    year: "2026",
    ratio: "wide",
    media: "/media/city.mp4",
  },
  {
    slug: "hearth-collective",
    name: "Hearth Collective",
    year: "2025",
    ratio: "portrait",
    media: "/media/fashion.mp4",
  },
  {
    slug: "fielder",
    name: "Fielder",
    year: "2025",
    ratio: "landscape",
    media: "/media/studio.mp4",
  },
  {
    slug: "aeon-supply",
    name: "Aeon Supply",
    year: "2024",
    ratio: "landscape",
    media: "/media/product.mp4",
  },
  {
    slug: "verdant-mile",
    name: "Verdant Mile",
    year: "2024",
    ratio: "portrait",
    media: "/media/portrait.mp4",
  },
];

export type Project = ProjectBase & Dictionary["projects"][ProjectBase["slug"]];

export function getProjects(dict: Dictionary): Project[] {
  return projects.map((project) => ({
    ...project,
    ...dict.projects[project.slug],
  }));
}
