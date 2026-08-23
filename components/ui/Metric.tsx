import { Reveal } from "./Reveal";

type MetricProps = {
  value: string;
  label: string;
  delay?: number;
  tone?: "ink" | "paper";
};

export function Metric({ value, label, delay = 0, tone = "ink" }: MetricProps) {
  return (
    <Reveal delay={delay} className="flex flex-col gap-2">
      <span
        className={`font-display text-[clamp(2.25rem,5vw,4rem)] leading-none font-medium tracking-tight ${tone === "paper" ? "text-paper" : "text-ink"}`}
      >
        {value}
      </span>
      <span
        className={`font-label text-xs uppercase tracking-[0.18em] ${tone === "paper" ? "text-paper/60" : "text-muted"}`}
      >
        {label}
      </span>
    </Reveal>
  );
}
