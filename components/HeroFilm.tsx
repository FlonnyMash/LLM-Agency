"use client";

import { useEffect, useRef } from "react";

/**
 * The brand film as the hero's background: a silent loop that stays put while the hero text leaves.
 * It plays while the hero is on screen, pauses when it leaves, and does not start by itself
 * under reduced motion.
 */
/** Playback speed of the film: 1 is the original, 1.25 is a quarter faster. */
const SPEED = 1.25;

export function HeroFilm() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    const el = box.current;
    if (!v || !el) return;
    v.defaultPlaybackRate = SPEED;
    v.playbackRate = SPEED;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced) void v.play().catch(() => undefined);
        } else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="wf-hero__film" ref={box} aria-hidden="true">
      <video ref={video} className="wf-hero__video" src="/media/imagefilm.mp4#t=0.1" muted loop playsInline preload="auto" tabIndex={-1} />
      <div className="wf-hero__scrim" />
    </div>
  );
}
