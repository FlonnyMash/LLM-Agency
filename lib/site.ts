export const siteConfig = {
  name: "LLM Agency",
  shortName: "LLM",
  url: "https://llmagency.example.com",
  email: "hello@llmagency.example.com",
  founded: "2018",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
  nav: [
    { key: "work" as const, href: "/work" },
    { key: "services" as const, href: "/services" },
    { key: "about" as const, href: "/about" },
    { key: "contact" as const, href: "/contact" },
  ],
  legal: [
    { key: "privacy" as const, href: "/privacy" },
    { key: "terms" as const, href: "/terms" },
  ],
};

export type NavItem = (typeof siteConfig.nav)[number];
export type LegalItem = (typeof siteConfig.legal)[number];
