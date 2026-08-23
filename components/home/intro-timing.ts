/** Shared timing for the home-page load sequence. */
export const intro = {
  ease: [0.77, 0, 0.175, 1] as const,
  headerDelay: 0.14,
  headerStagger: 0.07,
  /** When overlay strips start peeling back. */
  stripDelay: 0.72,
  stripStagger: 0.08,
  stripDuration: 1.12,
  /** Split origins (0–1) for each horizontal band, top → bottom. */
  splits: [0.08, 0.22, 0.4, 0.15, 0.54, 0.3, 0.68],
  imageDelay: 0.7,
  imageDuration: 2.1,
  textDelay: 1.28,
  textStagger: 0.1,
  /** Scroll lock + overlay lifetime. */
  totalMs: 2600,
} as const;
