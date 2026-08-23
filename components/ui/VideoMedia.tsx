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

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mediaQuery.matches) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      className={`size-full object-cover ${className}`}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden="true"
    />
  );
}
