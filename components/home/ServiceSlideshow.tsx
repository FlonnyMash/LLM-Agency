"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Service } from "@/lib/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServiceSlideshow({ services }: { services: Service[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const marker = el.getBoundingClientRect().left + el.clientWidth * 0.35;
    let next = 0;
    cards.forEach((card, i) => {
      if (card.getBoundingClientRect().left <= marker) next = i;
    });
    setActive(next);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => el.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  function goTo(index: number) {
    const el = scrollerRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="lg:hidden">
      <div
        ref={scrollerRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 scrollbar-none"
      >
        {services.map((service) => (
          <div
            key={service.index}
            className="w-[min(82vw,22rem)] shrink-0 snap-start"
          >
            <ServiceCard service={service} className="h-full min-h-[22rem]" />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex justify-center gap-2"
        role="tablist"
        aria-label="Services"
      >
        {services.map((service, i) => (
          <button
            key={service.index}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show ${service.title}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-accent" : "w-1.5 bg-line-strong"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
