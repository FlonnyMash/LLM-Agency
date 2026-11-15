"use client";

import { useEffect, useState } from "react";
import { getDict, otherLocale, pathFor, type Locale, type PageRef } from "@/lib/i18n";

export function Header({ locale, page }: { locale: Locale; page: PageRef }) {
  const [open, setOpen] = useState(false);
  const [away, setAway] = useState(false);
  const d = getDict(locale);
  const other = otherLocale(locale);

  useEffect(() => {
    document.documentElement.classList.toggle("wf-menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // On the home page the bar slides up while the hero film stands alone, and returns when the film leaves.
  useEffect(() => {
    if (page.key !== "home") return;
    const act = document.querySelector<HTMLElement>("[data-sc-act]");
    if (!act) return;
    let raf = 0;
    let alive = true;
    let state = false;
    // Read the engine's progress every frame: it writes --sc-p on its own frame, so a scroll listener would lag by one.
    const loop = () => {
      if (!alive) return;
      const p = parseFloat(getComputedStyle(act).getPropertyValue("--sc-p"));
      const hide = Number.isFinite(p) && p >= 0.43 && p < 0.66;
      if (hide !== state) {
        state = hide;
        setAway(hide);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [page.key]);

  const items = [
    { label: d.ui.nav.services, href: pathFor(locale, { key: "services" }), active: page.key === "services" || page.key === "service" },
    { label: d.ui.nav.about, href: pathFor(locale, { key: "about" }), active: page.key === "about" },
    { label: d.ui.nav.contact, href: pathFor(locale, { key: "contact" }), active: page.key === "contact" },
  ];
  const contactHref = pathFor(locale, { key: "contact" });

  return (
    <header className="wf-bar" data-open={open} data-away={away && !open}>
      <div className="wf-bar__in">
        <a className="wf-mark" href={pathFor(locale, { key: "home" })} aria-label={d.ui.homeLabel}>
          Webfluence<span>Agency</span>
        </a>
        <nav className="wf-nav" aria-label={d.ui.navLabel} id="wf-nav">
          {items.map((item) => (
            <a key={item.href} href={item.href} aria-current={item.active ? "page" : undefined} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="wf-cta wf-cta--menu" href={contactHref}>
            {d.ui.mainAction}
          </a>
        </nav>
        <div className="wf-bar__end">
          <a className="wf-lang" href={pathFor(other, page)} hrefLang={other} lang={other} aria-label={d.ui.langLabel}>
            {other.toUpperCase()}
          </a>
          <a className="wf-cta wf-cta--bar" href={contactHref}>
            {d.ui.mainAction}
          </a>
          <button
            className="wf-burger"
            type="button"
            aria-expanded={open}
            aria-controls="wf-nav"
            aria-label={open ? d.ui.menuClose : d.ui.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
