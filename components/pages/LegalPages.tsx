import { Fragment } from "react";
import { fmt, getDict, pathFor, type Locale, type PageRef } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function ImprintPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const i = d.imprint;
  return (
    <>
      <Header locale={locale} page={{ key: "imprint" }} />
      <main id="top">
        <section className="sc-section wf-legal" aria-labelledby="hero-h">
          <div className="sc-wrap wf-legal__in">
            <p className="wf-kicker">{i.kicker}</p>
            <h1 id="hero-h" className="wf-pagehero__h wf-pagehero__h--sm">{i.title}</h1>
            <h2>{i.provider}</h2>
            <p>
              {d.ui.name} GbR
              <br />
              {i.street}
              <br />
              {i.zip}
            </p>
            <p>{i.partners}</p>
            <h2>{i.contact}</h2>
            <p>
              {i.emailLabel}: <a href={`mailto:${d.ui.email}`}>{d.ui.email}</a>
            </p>
            <p>{i.vat}</p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

/** Replaces {email} and {imprint} in a privacy paragraph with real links. */
function Paragraph({ text, locale }: { text: string; locale: Locale }) {
  const d = getDict(locale);
  const parts = text.split(/(\{email\}|\{imprint\})/);
  return (
    <p>
      {parts.map((part, idx) => {
        if (part === "{email}") return <a key={idx} href={`mailto:${d.ui.email}`}>{d.ui.email}</a>;
        if (part === "{imprint}") return <a key={idx} href={pathFor(locale, { key: "imprint" })}>{d.ui.legal.imprint}</a>;
        return <Fragment key={idx}>{part}</Fragment>;
      })}
    </p>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.privacy;
  return (
    <>
      <Header locale={locale} page={{ key: "privacy" }} />
      <main id="top">
        <section className="sc-section wf-legal" aria-labelledby="hero-h">
          <div className="sc-wrap wf-legal__in">
            <p className="wf-kicker">{p.kicker}</p>
            <h1 id="hero-h" className="wf-pagehero__h wf-pagehero__h--sm">{p.title}</h1>
            {p.sections.map((s) => (
              <Fragment key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((t) => (
                  <Paragraph key={t} text={t} locale={locale} />
                ))}
              </Fragment>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

export function NotFoundContent({ locale, page = { key: "home" } as PageRef }: { locale: Locale; page?: PageRef }) {
  const d = getDict(locale);
  return (
    <>
      <Header locale={locale} page={page} />
      <main id="top">
        <section className="sc-section wf-legal" aria-labelledby="hero-h">
          <div className="sc-wrap wf-legal__in">
            <h1 id="hero-h" className="wf-pagehero__h wf-pagehero__h--sm">{d.notFound.title}</h1>
            <p>{d.notFound.text}</p>
            <p>
              <a className="wf-cta" href={pathFor(locale, { key: "home" })}>{d.notFound.home}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

export { fmt };
