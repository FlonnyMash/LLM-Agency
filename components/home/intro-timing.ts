/** Shared timing for the home-page load sequence. */
export const intro = {
  ease: [0.16, 1, 0.3, 1] as const,
  headerDelay: 0,
  headerStagger: 0.05,
  /** When overlay strips start peeling back. */
  stripDelay: 0.28,
  stripStagger: 0.05,
  stripDuration: 0.92,
  /** Split origins (0–1) for each horizontal band, top → bottom. */
  splits: [0.08, 0.22, 0.4, 0.15, 0.54, 0.3, 0.68],
  imageDelay: 0,
  imageDuration: 1.65,
  textDelay: 0.42,
  textStagger: 0.08,
  /** Scroll lock + overlay lifetime. */
  totalMs: 1750,
} as const;
