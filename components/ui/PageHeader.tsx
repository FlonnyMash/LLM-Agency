import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-40 sm:px-8 sm:pt-48">
      <Reveal>
        <p className="flex items-center gap-2.5 font-label text-xs uppercase tracking-[0.2em] text-ink">
          <span className="size-2 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="font-display mt-5 max-w-3xl text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-ink">
          {title}
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
