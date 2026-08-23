"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { intro } from "@/components/home/intro-timing";
import { localizedPath } from "@/lib/i18n/paths";
import { useLocale } from "@/components/i18n/LocaleProvider";
import heroPhoto from "@/public/media/hero.jpg";

const ease = intro.ease;

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: intro.textDelay },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const clip: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.95, ease },
  },
};

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const { locale, dict } = useLocale();

  return (
    <section className="hero-pin group/hero sticky top-0 z-0 isolate h-[100svh] min-h-[100svh] overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 transform-gpu"
          initial={reduced ? false : { scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{
            duration: reduced ? 0 : intro.imageDuration,
            delay: reduced ? 0 : intro.imageDelay,
            ease,
          }}
        >
          <Image
            src={heroPhoto}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35 transition-opacity duration-700 group-hover/hero:opacity-80" />
      </div>

      <motion.div
        variants={container}
        initial={reduced ? false : "hidden"}
        animate="visible"
        className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-12 pt-24 sm:px-8 sm:pb-20 sm:pt-32 [@media(max-height:700px)]:pb-8 [@media(max-height:700px)]:pt-20"
      >
        <motion.p
          variants={item}
          className="font-label mb-4 text-xs uppercase tracking-[0.22em] text-white/60"
        >
          ©{new Date().getFullYear()}
        </motion.p>

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <h1 className="font-display overflow-hidden text-[clamp(3.5rem,18vw,11rem)] font-medium leading-[0.82] tracking-tight text-white">
            <motion.span variants={clip} className="block">
              LLM<span className="text-accent">*</span>
            </motion.span>
          </h1>

          <motion.div variants={item} className="max-w-sm pb-2">
            <p className="mb-6 text-sm leading-relaxed text-white/75 sm:text-base">
              {dict.home.hero.body}
            </p>
            <ArrowCta href={localizedPath(locale, "/contact")} tone="dark">
              {dict.home.hero.cta}
            </ArrowCta>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
