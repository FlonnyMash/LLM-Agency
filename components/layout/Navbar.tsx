"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { intro } from "@/components/home/intro-timing";
import { localizedPath, isLocaleHome } from "@/lib/i18n/paths";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const { locale, dict } = useLocale();
  const isHome = isLocaleHome(pathname);
  const overlay = isHome && !scrolled && !open;
  const reduced = useReducedMotion() ?? false;
  const playIntro = isHome && !reduced;

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = overlay
    ? "text-white/80 hover:text-white"
    : "text-ink-soft hover:text-ink";

  const enter = (index: number) => ({
    initial: playIntro ? { opacity: 0, y: -16 } : false,
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay: playIntro ? intro.headerDelay + intro.headerStagger * index : 0,
      ease: intro.ease,
    },
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
      <div
        className={`relative z-50 mx-auto mt-3 flex w-full max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 ${
          overlay
            ? "border-transparent bg-transparent py-3"
            : "border-line bg-paper/90 py-2.5 shadow-[0_1px_0_0_rgba(11,11,11,0.04)] backdrop-blur-md"
        }`}
      >
        <motion.div {...enter(0)}>
          <Link
            href={localizedPath(locale, "/")}
            className={`font-display text-lg font-medium tracking-tight ${overlay ? "text-white" : "text-ink"}`}
            aria-label={dict.nav.homeAria}
          >
            {siteConfig.shortName}
            <span className="text-accent">*</span>
          </Link>
        </motion.div>

        <nav aria-label={dict.nav.primary} className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((item, i) => (
            <motion.div key={item.href} {...enter(i + 1)}>
              <Link
                href={localizedPath(locale, item.href)}
                className={`font-label text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${linkClass}`}
              >
                {dict.nav[item.key]}
                <sup className="ml-0.5 text-[0.65em] text-accent">
                  0{i + 1}
                </sup>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="hidden items-center gap-5 md:flex"
          {...enter(siteConfig.nav.length + 1)}
        >
          <LocaleSwitcher tone={overlay ? "overlay" : "light"} />
          <ArrowCta href={localizedPath(locale, "/contact")} tone={overlay ? "dark" : "light"}>
            {dict.nav.getInTouch}
          </ArrowCta>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          aria-expanded={open}
          className={`relative z-50 flex size-11 items-center justify-center rounded-full border touch-manipulation md:hidden ${
            overlay ? "border-white/30 text-white" : "border-line-strong text-ink"
          }`}
          {...enter(1)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </motion.button>
      </div>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}
