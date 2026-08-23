"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.77, 0, 0.175, 1] as const;
const COVER_S = 0.74;
const REVEAL_S = 0.74;

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.dataset.noTransition != null) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const raw = anchor.getAttribute("href");
      if (
        !raw ||
        raw.startsWith("#") ||
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const current = normalizePath(pathnameRef.current);
      const next = normalizePath(url.pathname);
      if (next === current && url.search === window.location.search) return;

      event.preventDefault();
      event.stopPropagation();

      if (busy.current) return;
      busy.current = true;
      pending.current = `${url.pathname}${url.search}${url.hash}`;
      setPhase("cover");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced]);

  useEffect(() => {
    if (phase !== "cover") return;

    const root = document.documentElement;
    root.classList.add("page-transition-cover");
    root.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      const href = pending.current;
      pending.current = null;
      if (href) router.push(href);
      window.scrollTo(0, 0);
      root.classList.remove("page-transition-cover");
      root.classList.add("page-transition-hold");
      setPhase("reveal");
    }, COVER_S * 1000);

    return () => window.clearTimeout(timeout);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "reveal") return;

    const root = document.documentElement;
    const timeout = window.setTimeout(() => {
      root.classList.remove("page-transition-hold");
      root.style.overflow = "";
      setPhase("idle");
      busy.current = false;
    }, REVEAL_S * 1000 + 30);

    return () => window.clearTimeout(timeout);
  }, [phase]);

  if (reduced || phase === "idle") return null;

  return (
    <motion.div
      aria-hidden="true"
      className="page-transition-curtain pointer-events-auto fixed inset-0 z-40 bg-accent"
      initial={{ y: "100%" }}
      animate={{ y: phase === "reveal" ? "-100%" : "0%" }}
      transition={{
        duration: phase === "reveal" ? REVEAL_S : COVER_S,
        ease: EASE,
      }}
    />
  );
}
