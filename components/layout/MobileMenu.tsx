"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { localizedPath } from "@/lib/i18n/paths";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { locale, dict } = useLocale();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-40 flex flex-col bg-ink text-paper md:hidden"
    >
      <div className="pointer-events-none h-[calc(5.25rem+env(safe-area-inset-top))] shrink-0" />
      <motion.nav
        aria-label={dict.nav.mobile}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col justify-between px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
      >
        <ul className="flex flex-col gap-1">
          {siteConfig.nav.map((item, i) => (
            <motion.li
              key={item.href}
              variants={itemVariants}
              className="border-b border-white/10 py-4"
            >
              <Link
                href={localizedPath(locale, item.href)}
                onClick={onClose}
                className="font-display flex items-baseline justify-between text-4xl font-medium tracking-tight text-paper"
              >
                {dict.nav[item.key]}
                <span className="font-label text-sm text-accent">0{i + 1}</span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <LocaleSwitcher tone="dark" />
          <ArrowCta href={localizedPath(locale, "/contact")} tone="dark" onClick={onClose}>
            {dict.nav.getInTouch}
          </ArrowCta>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-label inline-flex min-h-11 items-center text-xs uppercase tracking-[0.16em] text-white/50"
          >
            {siteConfig.email}
          </a>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
