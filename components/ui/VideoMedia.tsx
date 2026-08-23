"use client";

import { useEffect, useRef } from "react";

export function VideoMedia({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      if (motionQuery.matches || !visible) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(
          entry?.isIntersecting && entry.intersectionRatio >= 0.25,
        );
        sync();
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );

    observer.observe(video);
    motionQuery.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", sync);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      className={`size-full object-cover ${className}`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
