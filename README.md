# Webfluence Agency: Website

Marketing-, Web- und Advergaming-Agentur (Putzbrunn bei München). Next.js 16, statischer Export, zweisprachig (Deutsch unter `/`, Englisch unter `/en/`).

## Befehle

```bash
npm run dev     # Entwicklung
npm run build   # statischer Export nach out/
npm run lint
```

## Aufbau

- `app/(de)` und `app/(en)/en`: die Routen je Sprache (kleine Dateien). Die Seiten selbst liegen in `components/pages/` und bekommen `locale`.
- `lib/i18n/`: alle Texte (`de.ts`, `en.ts`), Pfade je Sprache und Hilfsfunktionen. Neue Texte immer in beiden Dateien ergänzen.
- `lib/site.ts`: Domain, Mail, Metadaten mit hreflang.
- `components/`: Kopf, Fuß mit Abschluss-Szene, Spiel (`Game`), Scroll-Spiel (`ScrollGame`), Konfigurator (`Studio`), Formulare.
- `public/sc/`: Scroll-Engine (`scrollcraft.js/.css`, nicht ändern) und eigene Gestaltung `site.css`.
- `functions/api/contact.js`: Cloudflare Pages Function für Formular und Konfigurator (braucht das Mail-Binding `EMAIL`).
- `scrollcraft/builds/webfluence/BRIEF.md`: Briefing, Gefühlskurve, Höhepunkt.

Interne Links sind bewusst normale `<a>`-Links: die Scroll-Engine arbeitet auf vollständig geladenen Seiten.
