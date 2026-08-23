export function GooFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
    >
      <defs>
        <filter
          id="cta-goo"
          x="-50%"
          y="-90%"
          width="200%"
          height="280%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
            result="goo"
          />
        </filter>
      </defs>
    </svg>
  );
}
