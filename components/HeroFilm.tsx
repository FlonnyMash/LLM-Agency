"use client";

import { useEffect, useRef } from "react";

/**
 * The brand film as the hero's background: a silent loop that stays put while the hero text leaves.
 * It plays while the hero is on screen, pauses when it leaves, and does not start by itself
 * under reduced motion.
 */
/** Playback speed: the film file is already rendered at 1.5x, so play it as is. */
const SPEED = 1;

export function HeroFilm() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    const el = box.current;
    if (!v || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Held upright on a phone the hero gets the portrait cut of the film.
    const portrait = window.matchMedia("(max-width: 860px) and (orientation: portrait)");
    const pick = () => {
      const src = portrait.matches ? "/media/imagefilm-mobile.mp4" : "/media/imagefilm.mp4";
      if (!v.src.includes(`${src}?`)) {
        const wasPlaying = !v.paused;
        v.src = `${src}?v=${process.env.NEXT_PUBLIC_ASSET_V}#t=0.1`;
        v.load();
        v.defaultPlaybackRate = SPEED;
        v.playbackRate = SPEED;
        if (wasPlaying && !reduced) void v.play().catch(() => undefined);
      }
    };
    v.defaultPlaybackRate = SPEED;
    v.playbackRate = SPEED;
    pick();
    portrait.addEventListener("change", pick);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced) void v.play().catch(() => undefined);
        } else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      portrait.removeEventListener("change", pick);
    };
  }, []);

  return (
    <div className="wf-hero__film" ref={box} aria-hidden="true">
      <video ref={video} className="wf-hero__video" muted loop playsInline preload="auto" tabIndex={-1} />
      <div className="wf-hero__scrim" />
    </div>
  );
}
