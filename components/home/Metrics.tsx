import { Metric } from "@/components/ui/Metric";

const metrics = [
  { value: "+120%", label: "Average growth" },
  { value: "48", label: "Brands launched" },
  { value: "4.9/5", label: "Client satisfaction" },
  { value: "8+", label: "Years of experience" },
];

export function Metrics() {
  return (
    <section className="border-t border-line bg-paper-raised px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 sm:grid-cols-4">
        {metrics.map((metric, i) => (
          <Metric key={metric.label} {...metric} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}
