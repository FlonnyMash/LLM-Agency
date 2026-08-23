import { Metric } from "@/components/ui/Metric";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

export function Metrics({ locale }: { locale: Locale }) {
  const metrics = getDictionary(locale).home.metrics;

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
