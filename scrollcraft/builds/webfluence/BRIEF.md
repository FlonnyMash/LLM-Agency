# BRIEF: Webfluence Agency (Version 2, scroll-craft)

Interviewt am 2026-11-15, Antworten teils wörtlich. Einzelne Entscheidungen sind unten als "Autorenentscheidung" markiert (der Nutzer sagte "Frag mich gerne Fragen", beantwortete aber nicht alle Punkte einzeln).

## Die acht Themen

1. **Vibe:** "premium", "man kann vertrauen" (Nutzer), Richtung gewählt: **"Dunkel, edel, kinoartig"**. Referenzen aus anderen Medien (Autorenentscheidung): ein Kinotitel im Abspann, ein Auto-Konfigurator, ein Arcade-Automat im Dunkeln.
2. **Reihenfolge:** Nutzerwunsch: Leistungen als "Kinoszenen", jede Leistung erklärt; Advergaming bekommt eine eigene Seite mit Konfigurator. Startseite: Auftritt → Haltung → Leistungen → Spiel → Ablauf → Vertrauen → Fragen → Kontakt.
3. **Energiekurve:** ruhig-selbstbewusst am Anfang, laut im Spiel (Höhepunkt), klar und ruhig im Ablauf, warm im Abschluss.
4. **Gefühl und der eine Moment:** Höhepunkt laut Nutzer: **"Kombination aus spielbarem Minispiel und zusätzlich Leistungen als Kinoszenen"**.
5. **Etwas, das keine andere Seite tut:** (Autorenentscheidung, aus Punkt 4 abgeleitet) **Die Seite spielt sich beim Scrollen selbst:** der Schläger folgt dem Scroll, fängt Marken-Token, der Punktestand läuft mit. Am Ende übernimmt der Besucher und spielt wirklich.
6. **Abstand zu premium-minimal:** premium-minimal, aber dunkel und kinoartig, ohne Fotos. Typografie als Bild (Nutzer: "Bilder entfernen", "Typografie plus eigene Mini-Demos").
7. **Eine Welt oder Szenen:** **Einzelne Szenen** (Nutzer).
8. **Vorhandene Assets:** keine Fotos (Nutzer will sie nicht), keine Videos, kein Logo. Alles ist Typografie, Linien, Diagramme und echter Code (Spiel, Konfigurator).

## Weitere Vorgaben des Nutzers

- Mehr Marketingtexte; "die Seite fühlt sich leer an".
- **Die Namen Lisa und Luca nur auf "Über uns".**
- Advergaming ist ein neues Angebot: eigene Seite, Konfigurator, Einsatz auf **Messen mit Rangliste**, **lokalen Events per QR-Code**, **Online-Shop als Lead-Magnet**, **Verpackung und Print**. Referenz des Nutzers: mashedgames.dev (eigene Plattform; Aussagen dort nicht als eigene Zahlen übernommen).
- Vertrauen ohne Referenzen durch: klar erklärten Ablauf, spielbare Demos, offene Fragen und ehrliche Grenzen, echte Menschen und Firmendaten.
- Preise überall "auf Anfrage". Nur Deutsch. Ansprache "Sie". Domain `webfluence-agency.com`, Mail `hello@webfluence-agency.com`, Sitz Putzbrunn bei München.
- Keine erfundenen Zahlen, Kunden oder Zitate.

## Journey (Startseite)

1 Auftritt (Wer das ist) · 2 Haltung (Warum Aufmerksamkeit ohne Technik verpufft) · 3 Spektrum (Was angeboten wird) · 4 Spiel (Beweis durch Spielen) · 5 Ablauf (So geht es los) · 6 Vertrauen (Was wir offen sagen) · 7 Fragen · 8 Abschluss (eine Aktion: **Gespräch anfragen**).

Die Seite soll am Ende installieren: **"Diese Agentur macht Marketing, das man ausprobieren kann, und die Technik dazu aus einer Hand."**

## Grammatik

- **Startseite: Typografisches Plakat** (Schrift ist das Bild; keine Fotos, keine Karten). Abweichung: eine schmale feste Leiste mit Wortmarke, Navigation und der einen Aktion, weil es eine mehrseitige Firmenseite ist.
- **Leistungen: Kapitel** (jede Leistung eine eigene Szene mit eigener Erklärgrafik, harter Wechsel der Fläche).
- **Advergaming: Live-Oberfläche** im Spiel- und Konfigurator-Teil (läuft echt, rechnet echt), davor erklärende Szenen.
- Die anderen sieben Grammatiken passten nicht: Filmischer Ein-Take braucht Video/Fotos, die der Nutzer nicht will; Durchgehende Welt und Galerie brauchen Material; Geteilte Bühne und Rhythmischer Schnitt passen nicht zu einer erklärenden B2B-Seite.

## Feeling-Kurve (Startseite)

```
1  Ruhige Zuversicht   riesige Zeile auf Schwarz, langsam kleiner werdend, Tokens schweben dahinter
2  Wiedererkennung     eine Aussage, die ein Unternehmer kennt, zeilenweise aufgebaut
3  Neugier             sieben Leistungen wandern seitlich durchs Bild
4  Freude (Höhepunkt)  die Seite spielt sich beim Scrollen selbst, dann spielt man selbst
5  Klarheit            vier Schritte, eine Linie zeichnet den Weg
6  Vertrauen           vier ehrliche Zusagen, ruhig, ohne Bewegung
7  Erleichterung       offene Antworten auf die letzten Fragen
8  Entschlossenheit    ein Satz, ein Button, die Seite hört auf zu scrollen
```

## Höhepunkt

Akt 4, größte Scroll-Spanne der Seite. Der Satz, den ein Besucher einem Freund sagt: **"Die Seite hat sich beim Scrollen selbst gespielt, und dann konnte ich selbst spielen."**

## Satz zum Weitererzählen

"Es ist die Agentur-Seite, auf der man Advergaming nicht liest, sondern spielt."

## Autorisierte Stille

Akt 6 (Vertrauen) hat bewusst keine Bewegung außer dem Einblenden, damit der Höhepunkt davor nachwirkt.

## Score (Startseite)

| Akt | Gerät | Warum |
|---|---|---|
| 1 Auftritt | `pin` mit Skalierung aus `--sc-p` + `parallax` auf Dekor-Ebenen | Plakat-Hero: Schrift startet riesig |
| 2 Haltung | `flow` + `kinetic` (Zeilen) | Aussage wird gelesen, nicht gescrubbt |
| 3 Spektrum | `pan` | Seitlich = Auswahl |
| 4 Spiel | `pin` + Signatur (scrollgesteuertes Spiel) + `count` | Höhepunkt |
| 5 Ablauf | `flow` + `in` + gezeichnete Linie | Ordnung der Schritte |
| 6 Vertrauen | `flow` ruhig | Stille nach dem Höhepunkt |
| 7 Fragen | `flow` | Antworten offen, ohne Akkordeon |
| 8 Abschluss | `pin` + `magnet` | Eine Aktion |

(Auf der Seite stehen 6 und 7 als zwei flow-Abschnitte in einem Abschnitt zusammengefasst, damit nie dieselbe Geräteklasse zweimal folgt.)
