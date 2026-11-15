"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element) => unknown };
  }
}

/**
 * Loads the scroll engine once React has hydrated, then mounts it on the page.
 * The engine reads data-sc-* attributes off server-rendered markup and never
 * generates DOM, so it must start after hydration to avoid touching live React nodes.
 */
export function ScrollCraftMount() {
  useEffect(() => {
    const start = () => window.ScrollCraft?.mount(document.body);
    if (window.ScrollCraft) {
      start();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>("script[data-sc-engine]");
    if (existing) {
      existing.addEventListener("load", start, { once: true });
      return;
    }
    const el = document.createElement("script");
    el.src = "/sc/scrollcraft.js";
    el.dataset.scEngine = "";
    el.addEventListener("load", start, { once: true });
    document.body.appendChild(el);
  }, []);

  return null;
}
