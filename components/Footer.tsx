import { getDict, getServices, pathFor, serviceHref, type Locale } from "@/lib/i18n";

export function FooterBody({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const year = new Date().getFullYear();
  const p = (key: Parameters<typeof pathFor>[1]["key"]) => pathFor(locale, { key });
  return (
    <div className="wf-foot">
      <div className="wf-foot__grid">
        <div>
          <a className="wf-mark" href={p("home")}>
            Webfluence<span>Agency</span>
          </a>
          <p className="wf-foot__lede">{d.ui.footer.lede}</p>
        </div>
        <div>
          <h3>{d.ui.footer.pages}</h3>
          <ul>
            <li><a href={p("services")}>{d.ui.nav.services}</a></li>
            <li><a href={p("about")}>{d.ui.nav.about}</a></li>
            <li><a href={p("contact")}>{d.ui.nav.contact}</a></li>
          </ul>
        </div>
        <div>
          <h3>{d.ui.footer.services}</h3>
          <ul>
            {[...getServices(locale), { id: "advergaming", title: d.advergaming.title }].map((x) => (
              <li key={x.id}>
                <a href={serviceHref(locale, x.id)}>{x.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{d.ui.footer.contact}</h3>
          <ul>
            <li>
              <a href={`mailto:${d.ui.email}`}>{d.ui.email}</a>
            </li>
            <li>{d.ui.locality}</li>
          </ul>
        </div>
        <div>
          <h3>{d.ui.footer.legal}</h3>
          <ul>
            <li><a href={p("imprint")}>{d.ui.legal.imprint}</a></li>
            <li><a href={p("privacy")}>{d.ui.legal.privacy}</a></li>
          </ul>
        </div>
      </div>
      <p className="wf-foot__small">&copy; {year} {d.ui.name}</p>
    </div>
  );
}

/** Plain footer for pages without a closing act. */
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="wf-footer">
      <FooterBody locale={locale} />
    </footer>
  );
}

/** The closing act: one statement, one action, the footer inside the pinned stage. */
export function CloseAct({ locale, title, line }: { locale: Locale; title?: string; line?: string }) {
  const d = getDict(locale);
  return (
    <section data-sc-act="pin" data-sc-span="1.2" data-sc-drift="#09090b" id="kontakt-start" aria-labelledby="close-h">
      <div data-sc-stage className="wf-close" data-sc-spotlight>
        <div className="wf-close__in">
          <h2 id="close-h" className="sc-display sc-display--xl wf-close__h" data-sc-cue="0 1 0 0" data-sc-kinetic="lines">
            {title ?? d.ui.closeDefault.title}
          </h2>
          <p className="wf-close__line" data-sc-cue="0 1 0 0">
            {line ?? d.ui.closeDefault.line}
          </p>
          <a className="wf-cta wf-cta--xl" href={pathFor(locale, { key: "contact" })} data-sc-magnet="0.26" data-sc-cue="0 1 0 0" data-sc-rise="0">
            {d.ui.mainAction}
            <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true" width="14" height="14">
              <path d="M1 6h8M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <footer className="wf-footer wf-footer--in">
          <FooterBody locale={locale} />
        </footer>
      </div>
    </section>
  );
}
