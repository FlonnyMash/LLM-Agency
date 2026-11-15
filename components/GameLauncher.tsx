"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "@/components/Game";
import { getDict, type Locale } from "@/lib/i18n";

/** Button that opens the demo game in a full-screen layer, closes on Escape. */
export function GameLauncher({ locale, label, className = "wf-cta wf-cta--xl" }: { locale: Locale; label?: string; className?: string }) {
  const g = getDict(locale).game;
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const opener = btn.current;
    html.classList.add("wf-locked");
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.classList.remove("wf-locked");
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className={className} onClick={() => setOpen(true)}>
        {label ?? getDict(locale).home.playDemo}
      </button>
      {open && (
        <div className="wf-layer" role="dialog" aria-modal="true" aria-label={g.layerTitle}>
          <div className="wf-layer__in">
            <div className="wf-layer__head">
              <p>{g.layerHead}</p>
              <button ref={closeBtn} type="button" className="wf-cta wf-cta--ghost" onClick={() => setOpen(false)}>
                {g.close}
              </button>
            </div>
            <Game locale={locale} brand={g.defaultBrand} color="#ff6b5e" shape="quadrat" />
          </div>
        </div>
      )}
    </>
  );
}
