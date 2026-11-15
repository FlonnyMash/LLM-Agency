import type { CSSProperties } from "react";
import { fmt, getDict, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { CloseAct } from "@/components/Footer";
import { GameLauncher } from "@/components/GameLauncher";
import { Studio } from "@/components/Studio";

function UseVisual({ locale, id }: { locale: Locale; id: string }) {
  const v = getDict(locale).advergaming.useVisual;
  if (id === "messe")
    return (
      <div className="wf-uv wf-uv--board" aria-hidden="true">
        <p>{v.board}</p>
        {[1, 0.82, 0.64, 0.42].map((w, i) => (
          <div key={i} className="wf-uv__row">
            <span>{fmt(v.place, { n: i + 1 })}</span>
            <i style={{ ["--w" as string]: w } as CSSProperties} />
          </div>
        ))}
      </div>
    );
  if (id === "event")
    return (
      <div className="wf-uv wf-uv--qr" aria-hidden="true">
        <div className="wf-qr">
          <i /><i /><i /><b>QR</b>
        </div>
        <p>{v.qr}</p>
      </div>
    );
  if (id === "shop")
    return (
      <div className="wf-uv wf-uv--shop" aria-hidden="true">
        <div className="wf-uv__win"><i /><i /><i /></div>
        <p className="wf-uv__code">{v.code}</p>
      </div>
    );
  return (
    <div className="wf-uv wf-uv--print" aria-hidden="true">
      <div className="wf-box">
        <b>QR</b>
      </div>
      <p>{v.print}</p>
    </div>
  );
}

export function AdvergamingPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const a = d.advergaming;
  return (
    <>
      <Header locale={locale} page={{ key: "advergaming" }} />
      <main id="top">
        <section className="sc-section wf-pagehero" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="hero-h">
          <div className="sc-wrap">
            <p className="wf-kicker" data-sc-in>{a.heroKicker}</p>
            <h1 id="hero-h" className="wf-pagehero__h" data-sc-in>{a.heroTitle}</h1>
            <p className="wf-pagehero__lead" data-sc-in>{a.heroLead}</p>
            <div className="wf-row" data-sc-in>
              <GameLauncher locale={locale} className="wf-cta" />
              <a className="wf-link" href="#konfigurator">{a.openStudio}</a>
            </div>
          </div>
        </section>

        <section data-sc-act="pin" data-sc-span="2.6" data-sc-drift="#0b0b10" aria-labelledby="was-h">
          <div data-sc-stage className="wf-beats">
            <h2 id="was-h" className="sr-only">{a.beatsSr}</h2>
            <div className="wf-beats__in">
              <p className="sc-display sc-display--lg" data-sc-cue="0 0.34 0" data-sc-kinetic="lines">{a.beats[0]}</p>
              <p className="sc-display sc-display--lg" data-sc-cue="0.28 0.66" data-sc-kinetic="lines">{a.beats[1]}</p>
              <p className="sc-display sc-display--lg" data-sc-cue="0.6 1" data-sc-kinetic="lines">{a.beats[2]}</p>
            </div>
          </div>
        </section>

        <section data-sc-act="pan" data-sc-span="3.4" data-sc-drift="#0a0a0d" aria-labelledby="einsatz-h">
          <div data-sc-stage className="wf-spectrum">
            <div className="wf-rail" data-sc-pan="0.06">
              <div className="wf-rail__lead">
                <p className="wf-label">{a.useLabel}</p>
                <h2 id="einsatz-h" className="sc-display sc-display--md">{a.useTitle}</h2>
              </div>
              {a.useCases.map((u, i) => (
                <div key={u.id} className="wf-rail__item wf-rail__item--use">
                  <UseVisual locale={locale} id={u.id} />
                  <span className="wf-rail__name">{u.title}</span>
                  <span className="wf-rail__text">{u.text}</span>
                  <span className="wf-rail__tag">{fmt(a.useOf, { n: i + 1, total: a.useCases.length })}</span>
                </div>
              ))}
              <div className="wf-rail__end">
                <p>{a.useEnd}</p>
                <a className="wf-cta" href="#konfigurator">{a.useEndCta}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="konfigurator" className="sc-section wf-studio-sec" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="studio-h">
          <div className="sc-wrap">
            <div className="wf-studio-sec__head" data-sc-in>
              <p className="wf-label">{a.studioLabel}</p>
              <h2 id="studio-h" className="sc-display sc-display--lg">{a.studioTitle}</h2>
              <p className="wf-body">{a.studioBody}</p>
            </div>
            <div data-sc-in>
              <Studio locale={locale} />
            </div>
            <div className="wf-faq wf-faq--tight">
              <h2 className="wf-faq__h" data-sc-in>{a.faqTitle}</h2>
              <dl>
                {a.faq.map((f) => (
                  <div key={f.q} data-sc-in>
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <CloseAct locale={locale} title={a.closeTitle} line={a.closeLine} />
      </main>
    </>
  );
}
