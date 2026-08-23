import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "paper";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  tone = "ink",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const mutedColor = tone === "paper" ? "text-paper/60" : "text-muted";

  return (
    <div
      className={`flex flex-col gap-5 ${isCenter ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      {(eyebrow || index) && (
        <Reveal>
          <div
            className={`font-label flex items-center gap-3 text-xs uppercase tracking-[0.2em] ${mutedColor}`}
          >
            {index && <span className="text-accent">{index}</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] font-medium tracking-tight ${tone === "paper" ? "text-paper" : "text-ink"}`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-xl text-base leading-relaxed sm:text-lg ${mutedColor}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
