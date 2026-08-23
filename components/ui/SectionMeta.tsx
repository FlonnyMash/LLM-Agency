export function SectionMeta({
  label,
  index,
}: {
  label: string;
  index: string;
}) {
  return (
    <div className="mb-10 flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.18em] text-muted">
      <span className="flex items-center gap-2.5 text-ink">
        <span className="size-2 shrink-0 bg-accent" aria-hidden="true" />
        {label}
      </span>
      <span className="hidden sm:block">(LA® — {index})</span>
      <span>©{new Date().getFullYear()}</span>
    </div>
  );
}
