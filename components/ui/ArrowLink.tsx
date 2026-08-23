"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const THUMB = 38;
const PAD = 5;

type ArrowLinkProps = {
  children: ReactNode;
  href?: string;
  tone?: "light" | "dark";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
};

export function ArrowLink({
  children,
  href,
  tone = "light",
  className = "",
  onClick,
  type = "button",
  external = false,
  disabled = false,
}: ArrowLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [gooey, setGooey] = useState(false);
  const [fillSize, setFillSize] = useState({ w: THUMB, h: THUMB });
  const [trackNode, setTrackNode] = useState<HTMLElement | null>(null);
  const didMount = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;
  const active = hovered && !disabled;

  useLayoutEffect(() => {
    if (!trackNode) return;

    const measure = () => {
      const rect = trackNode.getBoundingClientRect();
      setFillSize({ w: rect.width, h: rect.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(trackNode);
    return () => observer.disconnect();
  }, [trackNode]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (reduceMotion) {
      setGooey(false);
      return;
    }

    setGooey(true);
    const timeout = window.setTimeout(() => setGooey(false), active ? 680 : 480);
    return () => window.clearTimeout(timeout);
  }, [active, reduceMotion]);

  const track = active
    ? "bg-white shadow-[0_10px_28px_rgba(225,6,0,0.28),0_0_0_7px_rgba(11,11,11,0.045)]"
    : tone === "dark"
      ? "bg-white shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
      : "bg-[#f2f2f0] shadow-[0_8px_24px_rgba(11,11,11,0.06)] ring-1 ring-black/[0.06]";

  const offset =
    tone === "dark" ? "focus-visible:ring-offset-ink" : "focus-visible:ring-offset-paper";

  const classes = [
    "group relative inline-flex isolate cursor-pointer items-center overflow-visible rounded-full whitespace-nowrap",
    "select-none touch-manipulation [-webkit-tap-highlight-color:transparent]",
    "transition-[box-shadow,transform] duration-300",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2",
    offset,
    track,
    disabled ? "pointer-events-none opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fillTransition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 240, damping: 16, mass: 0.7 };

  const visual = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        style={gooey ? { filter: "url(#cta-goo)" } : undefined}
      >
        <motion.span
          className="absolute"
          initial={false}
          animate={
            active
              ? { left: 0, top: 0, width: fillSize.w, height: fillSize.h }
              : { left: PAD, top: PAD, width: THUMB, height: THUMB }
          }
          transition={fillTransition}
        >
          <span className="block h-full w-full rounded-full bg-accent" />
          {!reduceMotion && (
            <motion.span
              className="absolute right-1.5 top-0 size-3.5 rounded-full bg-accent"
              initial={false}
              animate={
                active
                  ? {
                      x: [0, 12, 2],
                      y: [0, -18, -1],
                      scale: [0.2, 1.2, 0],
                      opacity: [1, 1, 0],
                    }
                  : { x: 0, y: 0, scale: 0, opacity: 0 }
              }
              transition={{
                duration: active ? 0.64 : 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )}
        </motion.span>
      </span>

      <span
        className="relative z-10 flex items-center"
        style={{ padding: PAD, paddingRight: 24 }}
      >
        <span
          className="flex items-center justify-center"
          style={{ width: THUMB, height: THUMB }}
        >
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-white transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2.25}
          />
        </span>
        <span
          className={`ml-3 text-sm font-medium tracking-tight transition-colors duration-300 ${
            active ? "text-white" : "text-ink"
          }`}
          style={{ transitionDelay: active ? "90ms" : "0ms" }}
        >
          {children}
        </span>
      </span>
    </>
  );

  const interaction = {
    className: classes,
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
    onClick,
  };

  if (href) {
    if (external) {
      return (
        <a
          ref={setTrackNode}
          href={href}
          target="_blank"
          rel="noreferrer"
          {...interaction}
        >
          {visual}
        </a>
      );
    }

    return (
      <Link ref={setTrackNode} href={href} {...interaction}>
        {visual}
      </Link>
    );
  }

  return (
    <button ref={setTrackNode} type={type} disabled={disabled} {...interaction}>
      {visual}
    </button>
  );
}
