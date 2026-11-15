import { getDict, getServices, pathFor, serviceHref, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { CloseAct } from "@/components/Footer";
import { ScrollGame } from "@/components/ScrollGame";
import { GameLauncher } from "@/components/GameLauncher";
import { HeroFilm } from "@/components/HeroFilm";

export function HomePage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const h = d.home;
  const spectrum = [
    ...getServices(locale).map((s) => ({ id: s.id, tag: s.tag, title: s.title, lead: s.lead })),
    { id: "advergaming", tag: d.advergaming.tag, title: d.advergaming.title, lead: d.advergaming.lead },
  ];
  const contact = pathFor(locale, { key: "contact" });

  return (
    <>
      <Header locale={locale} page={{ key: "home" }} />
      <main id="top">
        {/* 1 · Hero: pin. The text leaves upward and the film stands alone, then the film leaves too. */}
        <section data-sc-act="pin" data-sc-span="1.5" data-sc-drift="#09090b" aria-labelledby="hero-h">
          <div data-sc-stage className="wf-hero">
            <HeroFilm locale={locale} />
            <div className="wf-hero__bg" aria-hidden="true">
              <i className="wf-hero__line" data-sc-parallax="0.4" />
            </div>
            <div className="wf-hero__in">
              <p className="wf-kicker">{d.ui.name}, {d.ui.locality}</p>
              <h1 id="hero-h" className="wf-hero__h">
                <span className="wf-hero__big">{locale === "en" ? "Brand. Web. Play." : "Marke. Web. Spiel."}</span>
                <span className="sr-only">{h.heroSr}</span>
              </h1>
              <div className="wf-hero__cues">
                <p className="wf-hero__lead">{h.heroLead}</p>
                <div className="wf-row">
                  <a className="wf-cta" href={contact}>{d.ui.mainAction}</a>
                  <a className="wf-link" href={pathFor(locale, { key: "services" })}>{h.heroLink}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 · Stance: flow */}
        <section className="sc-section wf-statement" data-sc-act="flow" data-sc-drift="#0c0c10" aria-labelledby="haltung-h">
          <div className="sc-wrap">
            <p className="wf-label" data-sc-in>{h.stance}</p>
            <h2 id="haltung-h" className="sr-only">{h.stance}</h2>
            <div className="wf-statement__lines" data-sc-in data-sc-stagger="120">
              {h.stanceLines.map((l) => (
                <p key={l.em} className="sc-display sc-display--lg">{l.text}<em>{l.em}</em></p>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · Spectrum: pan */}
        <section data-sc-act="pan" data-sc-span="3.4" data-sc-drift="#0a0a0d" aria-labelledby="spektrum-h">
          <div data-sc-stage className="wf-spectrum">
            <div className="wf-rail" data-sc-pan="0.06">
              <div className="wf-rail__lead">
                <p className="wf-label">{h.spectrumLabel}</p>
                <h2 id="spektrum-h" className="sc-display sc-display--md">{h.spectrumTitle}</h2>
                <p className="wf-rail__hint">{h.spectrumHint}</p>
              </div>
              {spectrum.map((s) => (
                <a key={s.id} className="wf-rail__item" href={serviceHref(locale, s.id)}>
                  <span className="wf-rail__tag">{s.tag}</span>
                  <span className="wf-rail__name">{s.title}</span>
                  <span className="wf-rail__text">{s.lead}</span>
                  <span className="wf-link">{h.more}</span>
                </a>
              ))}
              <div className="wf-rail__end">
                <p>{h.spectrumEnd}</p>
                <a className="wf-cta" href={pathFor(locale, { key: "services" })}>{h.heroLink}</a>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · Peak: pin, the page plays itself */}
        <section data-sc-act="pin" data-sc-span="3.6" data-sc-drift="#0b0b10" aria-labelledby="spiel-h">
          <div data-sc-stage className="wf-peak">
            <div className="wf-peak__text">
              <div className="wf-peak__cues">
                <div data-sc-cue="0 0.34 0">
                  <p className="wf-label">{h.peakLabel}</p>
                  <h2 id="spiel-h" className="sc-display sc-display--lg">{h.peakTitle}</h2>
                </div>
                <p className="wf-peak__p" data-sc-cue="0.28 0.64">{h.peakP1}</p>
                <p className="wf-peak__p" data-sc-cue="0.58 0.88">{h.peakP2}</p>
                <div className="wf-play" data-sc-peak-end>
                  <p className="wf-peak__big">{h.peakBig}</p>
                  <div className="wf-row">
                    <GameLauncher locale={locale} />
                    <a className="wf-link" href={pathFor(locale, { key: "advergaming" })}>{h.seeAdvergaming}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="wf-peak__lane">
              <ScrollGame locale={locale} />
            </div>
          </div>
        </section>

        {/* 5 · Process: flow, a line draws the way */}
        <section className="sc-section wf-process" data-sc-act="flow" data-sc-drift="#0c0c10" aria-labelledby="ablauf-h">
          <div className="sc-wrap wf-process__grid">
            <div className="wf-process__head" data-sc-in>
              <p className="wf-label">{h.processLabel}</p>
              <h2 id="ablauf-h" className="sc-display sc-display--lg">{h.processTitle}</h2>
              <p className="wf-body">{h.processBody}</p>
            </div>
            <ol className="wf-timeline" data-sc-stagger="110">
              {h.steps.map((s, i) => (
                <li key={s.t} data-sc-in>
                  <span className="wf-timeline__n">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6 · Trust and questions: flow, calm */}
        <section className="sc-section wf-trust" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="trust-h">
          <div className="sc-wrap">
            <div className="wf-trust__head" data-sc-in>
              <p className="wf-label">{h.trustLabel}</p>
              <h2 id="trust-h" className="sc-display sc-display--lg">{h.trustTitle}</h2>
            </div>
            <div className="wf-promises" data-sc-stagger="80">
              {h.promises.map((p) => (
                <div key={p.t} data-sc-in>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
            <div className="wf-faq">
              <h2 className="wf-faq__h" data-sc-in>{h.faqTitle}</h2>
              <dl>
                {h.faq.map((f) => (
                  <div key={f.q} data-sc-in>
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <CloseAct locale={locale} />
      </main>
    </>
  );
}
