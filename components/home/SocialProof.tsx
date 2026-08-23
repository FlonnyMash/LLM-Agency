import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

const clients = [
  "Northline",
  "Aeon Supply",
  "Fielder",
  "Hearth Collective",
  "Verdant Mile",
  "Marrow Studio",
  "Maison Law",
  "Oslo Atelier",
];

export function SocialProof({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const loop = [...clients, ...clients];

  return (
    <section className="border-y border-line py-10">
      <p className="font-label mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted">
        {dict.home.social.label}
      </p>
      <div className="overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-12 px-8">
          {loop.map((client, i) => (
            <li
              key={`${client}-${i}`}
              className="font-display shrink-0 text-2xl text-ink/35 sm:text-3xl"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
