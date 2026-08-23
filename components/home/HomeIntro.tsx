"use client";

import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { intro } from "./intro-timing";

const STRIP_COUNT = intro.splits.length;

export function HomeIntro() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(!reduced);

  useLayoutEffect(() => {
    if (reduced) {
      setActive(false);
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setActive(false);
      root.style.overflow = previousOverflow;
    }, intro.totalMs);

    return () => {
      window.clearTimeout(timeout);
      root.style.overflow = previousOverflow;
    };
  }, [reduced]);

  if (!active) return null;

  return (
    <div
      className="home-intro-overlay"
      aria-hidden="true"
      style={
        {
          "--intro-delay": `${intro.stripDelay}s`,
          "--intro-stagger": `${intro.stripStagger}s`,
          "--intro-duration": `${intro.stripDuration}s`,
        } as React.CSSProperties
      }
    >
      {intro.splits.map((split, i) => (
        <div
          key={i}
          className="home-intro-row"
          style={{
            top: `calc(${(i / STRIP_COUNT) * 100}% - 2px)`,
            height: `calc(${100 / STRIP_COUNT}% + 4px)`,
            ["--intro-i" as string]: i,
          }}
        >
          <div
            className="home-intro-pane home-intro-pane-left"
            style={{ width: `calc(${split * 100}% + 3px)` }}
          />
          <div
            className="home-intro-pane home-intro-pane-right"
            style={{ width: `calc(${(1 - split) * 100}% + 3px)` }}
          />
        </div>
      ))}
    </div>
  );
}
