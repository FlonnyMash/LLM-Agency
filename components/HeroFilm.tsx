"use client";

import { useEffect, useRef, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

/**
 * The brand film as the hero's background: silent loop, plays while the hero is on screen,
 * pauses when it leaves, does not start by itself under reduced motion. A pause button stays reachable.
 */
export function HeroFilm({ locale }: { locale: Locale }) {
  const f = getDict(locale).home.film;
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const manual = useRef(false);

  useEffect(() => {
    const v = video.current;
    const el = box.current;
    if (!v || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced && !manual.current) void v.play().catch(() => undefined);
        } else if (!manual.current) v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // The scale at which the 16:9 frame just covers the screen. The film starts there and zooms out to its full frame.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const set = () => {
      const cover = Math.max(1, window.innerHeight / ((window.innerWidth * 9) / 16));
      el.style.setProperty("--cover", cover.toFixed(4));
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const fullscreen = () => {
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) void v.requestFullscreen().catch(() => undefined);
    else v.webkitEnterFullscreen?.();
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    manual.current = true;
    if (v.paused) void v.play().catch(() => undefined);
    else v.pause();
  };

  return (
    <>
      <div className="wf-hero__film" ref={box} aria-hidden="true">
        <video ref={video} className="wf-hero__video" src="/media/imagefilm.mp4#t=0.1" muted loop playsInline preload="auto" tabIndex={-1} />
        <div className="wf-hero__scrim" />
      </div>
      <div className="wf-hero__ctrl">
        <button type="button" className="wf-hero__pause" onClick={toggle} aria-label={playing ? f.pause : f.play}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            {playing ? <path d="M3 2h2.6v10H3zM8.4 2H11v10H8.4z" fill="currentColor" /> : <path d="M3.5 2 12 7l-8.5 5z" fill="currentColor" />}
          </svg>
          <span>{playing ? f.pause : f.play}</span>
        </button>
        <button type="button" className="wf-hero__pause" onClick={fullscreen} aria-label={f.fullscreen}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1.5 5V1.5H5M9 1.5h3.5V5M12.5 9v3.5H9M5 12.5H1.5V9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{f.fullscreen}</span>
        </button>
      </div>
    </>
  );
}
