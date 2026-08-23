export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  year: string;
  ratio: "square" | "portrait" | "landscape" | "wide";
  tags: string[];
  media: string;
};

export const projects: Project[] = [
  {
    slug: "north-orbit",
    name: "North Orbit",
    category: "Brand & Web",
    description:
      "A full rebrand and commerce platform for a climate-tech hardware company entering three new markets.",
    year: "2026",
    ratio: "wide",
    tags: ["Brand", "E-Commerce"],
    media: "/media/city.mp4",
  },
  {
    slug: "hearth-collective",
    name: "Hearth Collective",
    category: "Identity & Social",
    description:
      "Identity, packaging language and social system for a hospitality group opening its first flagship space.",
    year: "2025",
    ratio: "portrait",
    tags: ["Identity", "Social"],
    media: "/media/fashion.mp4",
  },
  {
    slug: "fielder",
    name: "Fielder",
    category: "Product & Performance",
    description:
      "Product marketing site and performance program for a workforce-scheduling platform's Series B launch.",
    year: "2025",
    ratio: "landscape",
    tags: ["Product", "Performance"],
    media: "/media/studio.mp4",
  },
  {
    slug: "aeon-supply",
    name: "Aeon Supply",
    category: "Strategy & Content",
    description:
      "Brand strategy and an editorial content system for a direct-to-consumer materials company.",
    year: "2024",
    ratio: "landscape",
    tags: ["Strategy", "Content"],
    media: "/media/product.mp4",
  },
  {
    slug: "verdant-mile",
    name: "Verdant Mile",
    category: "Web Development",
    description:
      "A bespoke booking and content platform for a network of independent, design-led hotels.",
    year: "2024",
    ratio: "portrait",
    tags: ["Web", "Hospitality"],
    media: "/media/portrait.mp4",
  },
];
