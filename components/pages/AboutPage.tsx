import { getDict, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { CloseAct } from "@/components/Footer";

export function AboutPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const a = d.about;
  return (
    <>
      <Header locale={locale} page={{ key: "about" }} />
      <main id="top">
        <section className="sc-section wf-pagehero" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="hero-h">
          <div className="sc-wrap">
            <p className="wf-kicker" data-sc-in>{a.kicker}</p>
            <h1 id="hero-h" className="wf-pagehero__h" data-sc-in>{a.title}</h1>
            <p className="wf-pagehero__lead" data-sc-in>{a.lead}</p>
          </div>
        </section>

        <section data-sc-act="pin" data-sc-span="1.9" data-sc-drift="#0b0b10" aria-labelledby="menschen-h">
          <div data-sc-stage className="wf-people">
            <h2 id="menschen-h" className="sr-only">{a.foundersSr}</h2>
            <div className="wf-people__grid">
              {a.people.map((p, i) => (
                <article key={p.name} className="wf-person" style={{ ["--a" as string]: 0.1 + i * 0.12, ["--b" as string]: 0.3 + i * 0.12 }}>
                  <div className="wf-person__mono" aria-hidden="true">{p.mono}</div>
                  <h3 className="sc-display sc-display--md">{p.name}</h3>
                  <p className="wf-label">{p.role}</p>
                  <p className="wf-body">{p.text}</p>
                  <ul className="wf-gets wf-gets--static">
                    {p.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sc-section wf-facts" data-sc-act="flow" data-sc-drift="#0c0c10" aria-labelledby="fakten-h">
          <div className="sc-wrap wf-facts__grid">
            <div data-sc-in>
              <p className="wf-label">{a.factsLabel}</p>
              <h2 id="fakten-h" className="sc-display sc-display--lg">{a.factsTitle}</h2>
              <p className="wf-body">{a.factsBody}</p>
            </div>
            <dl className="wf-dl" data-sc-stagger="70">
              {a.facts.map(([k, v]) => (
                <div key={k} data-sc-in><dt>{k}</dt><dd>{v}</dd></div>
              ))}
              <div data-sc-in><dt>{a.emailLabel}</dt><dd><a href={`mailto:${d.ui.email}`}>{d.ui.email}</a></dd></div>
            </dl>
          </div>
        </section>

        <CloseAct locale={locale} title={a.closeTitle} line={a.closeLine} />
      </main>
    </>
  );
}
