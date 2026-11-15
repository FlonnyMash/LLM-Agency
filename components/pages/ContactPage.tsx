import { getDict, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export function ContactPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const c = d.contact;
  return (
    <>
      <Header locale={locale} page={{ key: "contact" }} />
      <main id="top">
        <section className="sc-section wf-contact" data-sc-act="flow" data-sc-drift="#09090b" aria-labelledby="hero-h">
          <div className="sc-wrap wf-contact__grid">
            <div data-sc-in>
              <p className="wf-kicker">{c.kicker}</p>
              <h1 id="hero-h" className="wf-pagehero__h wf-pagehero__h--sm">{c.title}</h1>
              <p className="wf-pagehero__lead">{c.lead}</p>
              <dl className="wf-dl wf-dl--tight">
                <div><dt>{c.emailLabel}</dt><dd><a href={`mailto:${d.ui.email}`}>{d.ui.email}</a></dd></div>
                <div><dt>{c.seatLabel}</dt><dd>{d.ui.locality}</dd></div>
                <div><dt>{c.priceLabel}</dt><dd>{d.ui.pricesOnRequest}</dd></div>
              </dl>
            </div>
            <div data-sc-in>
              <ContactForm locale={locale} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
