import { getDict, getServices, pathFor, serviceHref, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { CloseAct } from "@/components/Footer";
import { ServiceChapter } from "@/components/ServiceScene";

const grounds = ["#0b0b10", "#0d0d12", "#0a0a0e", "#0c0c11", "#0a0a0e", "#0c0c11"];

export function ServicesPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.servicesPage;
  const services = getServices(locale);
  const adv = d.advergaming;
  return (
    <>
      <Header locale={locale} page={{ key: "services" }} />
      <main id="top">
        <section className="sc-section wf-pagehero" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="hero-h">
          <div className="sc-wrap">
            <p className="wf-kicker" data-sc-in>{p.kicker}</p>
            <h1 id="hero-h" className="wf-pagehero__h" data-sc-in>{p.title}</h1>
            <p className="wf-pagehero__lead" data-sc-in>{p.lead}</p>
            <nav className="wf-index" aria-label={p.indexLabel} data-sc-in>
              {[...services.map((s) => ({ id: s.id, title: s.title })), { id: "advergaming", title: adv.title }].map((s) => (
                <a key={s.id} href={`#${s.id}`}>{s.title}</a>
              ))}
            </nav>
          </div>
        </section>

        {services.map((s, i) => (
          <ServiceChapter key={s.id} locale={locale} s={s} act={i % 2 === 0 ? "pin" : "flow"} drift={grounds[i]} />
        ))}

        {/* Advergaming: pan, the use cases travel sideways */}
        <section id="advergaming" data-sc-act="pan" data-sc-span="4.4" data-sc-drift="#09090b" aria-labelledby="advergaming-h">
          <div data-sc-stage className="wf-spectrum">
            <div className="wf-rail" data-sc-pan="0.06">
              <div className="wf-rail__lead">
                <p className="wf-label">{adv.tag}</p>
                <h2 id="advergaming-h" className="sc-display sc-display--md">{adv.title}: {adv.lead}</h2>
                <p className="wf-rail__hint">{p.advRailHint}</p>
              </div>
              {adv.useCases.map((u) => (
                <div key={u.id} className="wf-rail__item wf-rail__item--static">
                  <span className="wf-rail__name">{u.title}</span>
                  <span className="wf-rail__text">{u.text}</span>
                </div>
              ))}
              <div className="wf-rail__end">
                <p>{p.advRailEnd}</p>
                <a className="wf-cta" href={serviceHref(locale, "advergaming")}>{d.home.seeAdvergaming}</a>
              </div>
            </div>
          </div>
        </section>

        <CloseAct locale={locale} title={p.closeTitle} line={p.closeLine} />
      </main>
    </>
  );
}

export { pathFor };
