export type Service = {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "Brand Strategy",
    description:
      "Positioning, narrative and identity systems built on real market insight, not guesswork.",
    deliverables: ["Positioning", "Naming", "Voice & tone", "Brand architecture"],
  },
  {
    index: "02",
    title: "Creative Direction",
    description:
      "A consistent, considered visual language that scales across every touchpoint your brand shows up on.",
    deliverables: ["Visual identity", "Art direction", "Design systems", "Guidelines"],
  },
  {
    index: "03",
    title: "Web Design",
    description:
      "Interfaces engineered for clarity and emotion in equal measure, made to convert and to be remembered.",
    deliverables: ["UX design", "UI design", "Prototyping", "Design QA"],
  },
  {
    index: "04",
    title: "Web Development",
    description:
      "Fast, accessible, production-grade builds — from marketing sites to bespoke web applications.",
    deliverables: ["Front-end engineering", "CMS integration", "Performance", "Accessibility"],
  },
  {
    index: "05",
    title: "Social Media",
    description:
      "Editorial-grade content systems and channel strategy that keep a brand's presence sharp and consistent.",
    deliverables: ["Content strategy", "Design templates", "Community", "Reporting"],
  },
  {
    index: "06",
    title: "Performance Marketing",
    description:
      "Full-funnel campaigns tied to real business outcomes, tested, measured and optimized continuously.",
    deliverables: ["Paid social", "Paid search", "Analytics", "Conversion optimization"],
  },
  {
    index: "07",
    title: "Content Creation",
    description:
      "Photography, motion and copy produced with the same rigor as our brand and product work.",
    deliverables: ["Photography", "Motion & video", "Copywriting", "Art direction"],
  },
  {
    index: "08",
    title: "SEO",
    description:
      "Technical foundations and content strategy that compound visibility over time, not just for a quarter.",
    deliverables: ["Technical audits", "Content strategy", "Site architecture", "Reporting"],
  },
];
