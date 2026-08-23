"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { intro } from "./intro-timing";

export function HomeIntro() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      setActive(false);
      return;
    }

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setActive(false);
      root.style.overflow = previous;
    }, intro.totalMs);

    return () => {
      window.clearTimeout(timeout);
      root.style.overflow = previous;
    };
  }, [reduced]);

  if (!active) return null;

  return (
    <div
      className="home-intro-overlay pointer-events-auto fixed inset-0 z-30 flex flex-col"
      aria-hidden="true"
    >
      {intro.splits.map((split, i) => (
        <div key={i} className="relative min-h-0 flex-1 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent will-change-transform"
            style={{ width: `calc(${split * 100}% + 2px)` }}
            initial={{ x: "0%" }}
            animate={{ x: "-105%" }}
            transition={{
              duration: intro.stripDuration,
              delay: intro.stripDelay + i * intro.stripStagger,
              ease: intro.ease,
            }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-accent will-change-transform"
            style={{ width: `calc(${(1 - split) * 100}% + 2px)` }}
            initial={{ x: "0%" }}
            animate={{ x: "105%" }}
            transition={{
              duration: intro.stripDuration,
              delay: intro.stripDelay + i * intro.stripStagger,
              ease: intro.ease,
            }}
          />
        </div>
      ))}
    </div>
  );
}
