export const siteConfig = {
  name: "LLM Agency",
  shortName: "LLM",
  tagline: "Brand & digital studio",
  description:
    "LLM Agency is an independent brand and digital studio that helps ambitious companies build brands people remember, and digital experiences people return to.",
  url: "https://llmagency.example.com",
  email: "hello@llmagency.example.com",
  location: "Amsterdam, NL — working worldwide",
  founded: "2018",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
