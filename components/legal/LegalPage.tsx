import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={`Last updated ${updated}.`} />
      <section className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
      </section>
    </>
  );
}
