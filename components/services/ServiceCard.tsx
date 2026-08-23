"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/services";

export function ServiceCard({
  service,
  delay = 0,
  className = "",
}: {
  service: Service;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col justify-between gap-6 rounded-2xl border border-line bg-paper p-7 transition-colors duration-300 hover:border-line-strong hover:bg-paper-raised sm:p-8 ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="font-label text-sm text-accent">{service.index}</span>
        <span className="size-2 rounded-full bg-line transition-colors duration-300 group-hover:bg-accent" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{service.description}</p>
      </div>

      <ul className="flex flex-wrap gap-2 pt-2">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="font-label rounded-full border border-line px-3 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-ink-soft"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
