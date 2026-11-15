import { fmt, getDict, getServices, pathFor, serviceHref, type Locale, type Service } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { CloseAct } from "@/components/Footer";
import { ServiceChapter } from "@/components/ServiceScene";

export function ServiceDetailPage({ locale, s }: { locale: Locale; s: Service }) {
  const d = getDict(locale);
  const u = d.serviceUi;
  const others = getServices(locale).filter((x) => x.id !== s.id);
  const vars = { title: s.title };

  return (
    <>
      <Header locale={locale} page={{ key: "service", id: s.id }} />
      <main id="top">
        <section className="sc-section wf-pagehero" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="hero-h">
          <div className="sc-wrap">
            <p className="wf-kicker" data-sc-in>
              <a className="wf-link" href={pathFor(locale, { key: "services" })}>{d.ui.nav.services}</a> / {s.tag}
            </p>
            <h1 id="hero-h" className="wf-pagehero__h" data-sc-in>{s.title}</h1>
            <p className="wf-pagehero__lead" data-sc-in>{s.lead}</p>
            <p className="wf-body wf-pagehero__why" data-sc-in>{s.why}</p>
            <div className="wf-row" data-sc-in>
              <a className="wf-cta" href={pathFor(locale, { key: "contact" })}>{d.ui.mainAction}</a>
              <a className="wf-link" href={pathFor(locale, { key: "services" })}>{u.all}</a>
            </div>
          </div>
        </section>

        <ServiceChapter
          locale={locale}
          s={{ ...s, title: u.getsTitle, tag: s.title }}
          act="pin"
          drift="#0b0b10"
          showLink={false}
        />

        <section className="sc-section wf-process" data-sc-act="flow" data-sc-drift="#0c0c10" aria-labelledby="ablauf-h">
          <div className="sc-wrap wf-process__grid">
            <div className="wf-process__head" data-sc-in>
              <p className="wf-label">{u.processLabel}</p>
              <h2 id="ablauf-h" className="sc-display sc-display--lg">{fmt(u.processTitle, vars)}</h2>
              <p className="wf-body">{s.fit}</p>
            </div>
            <ol className="wf-timeline" data-sc-stagger="110">
              {s.steps.map((step, i) => (
                <li key={step.t} data-sc-in>
                  <span className="wf-timeline__n">{i + 1}</span>
                  <h3>{step.t}</h3>
                  <p>{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="sc-wrap">
            <div className="wf-faq" data-sc-stagger="70">
              <h2 className="wf-faq__h" data-sc-in>{fmt(u.faqTitle, vars)}</h2>
              <dl>
                {s.faq.map((f) => (
                  <div key={f.q} data-sc-in>
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <nav className="wf-index wf-index--end" aria-label={u.moreLabel} data-sc-in>
              {[...others.map((x) => ({ id: x.id, title: x.title })), { id: "advergaming", title: d.advergaming.title }].map((x) => (
                <a key={x.id} href={serviceHref(locale, x.id)}>{x.title}</a>
              ))}
            </nav>
          </div>
        </section>

        <CloseAct locale={locale} title={fmt(u.closeTitle, vars)} line={u.closeLine} />
      </main>
    </>
  );
}
