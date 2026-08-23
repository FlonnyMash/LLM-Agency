import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-line pb-12 md:flex-row">
          <div className="flex max-w-sm flex-col gap-4">
            <span className="font-display text-2xl font-medium tracking-tight text-ink">
              {siteConfig.shortName}
              <span className="text-accent">*</span>
            </span>
            <p className="text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-accent"
              >
                {item.label}
                <sup className="ml-1 text-accent">0{i + 1}</sup>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
            <span className="text-sm text-muted">{siteConfig.location}</span>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            {siteConfig.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-label text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
            {siteConfig.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
