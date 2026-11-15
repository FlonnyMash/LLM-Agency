import type { CSSProperties, ReactNode } from "react";
import { getDict, serviceHref, fmt, type Locale, type Service } from "@/lib/i18n";

/** Window of scroll progress in which a part of a schematic builds itself. */
export const seq = (a: number, b: number, extra: Record<string, string | number> = {}): CSSProperties =>
  ({ "--a": a, "--b": b, ...extra }) as CSSProperties;

/** The schematic that explains a service and builds itself while the visitor scrolls. */
export function ServiceVisual({ locale, id }: { locale: Locale; id: string }) {
  const v = getDict(locale).visual;
  switch (id) {
    case "social-media":
      return (
        <div className="wf-v wf-v--social">
          <div className="wf-cal">
            {v.weekdays.map((d, i) => (
              <span key={d} style={seq(0.14 + i * 0.05, 0.22 + i * 0.05)}>{d}</span>
            ))}
          </div>
          <div className="wf-feed">
            {v.tiles.map((t, i) => (
              <div key={i} className="wf-tile" style={seq(0.24 + i * 0.05, 0.33 + i * 0.05)}>
                <b>{t}</b>
              </div>
            ))}
          </div>
        </div>
      );
    case "content":
      return (
        <div className="wf-v wf-v--story">
          {v.frames.map((t, i) => (
            <div key={t} className="wf-frame" style={seq(0.28 + i * 0.1, 0.4 + i * 0.1)}>
              <i className={`wf-frame__g wf-frame__g--${i}`} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      );
    case "werbung":
      return (
        <div className="wf-v wf-v--funnel">
          {v.funnel.map((l, i) => (
            <div key={l} className="wf-funnel__row" style={seq(0.16 + i * 0.16, 0.34 + i * 0.16, { "--w": [1, 0.62, 0.3][i] })}>
              <span>{l}</span>
              <i />
            </div>
          ))}
        </div>
      );
    case "websites":
      return (
        <div className="wf-v wf-browser">
          <div className="wf-browser__bar">
            <i /><i /><i />
            <span>{v.url}</span>
          </div>
          <div className="wf-browser__body">
            <div className="wf-bl wf-bl--nav" style={seq(0.26, 0.34)}><i /><i /><i /><b /></div>
            <div className="wf-bl wf-bl--hero" style={seq(0.34, 0.46)}><i /><i /><b /></div>
            <div className="wf-bl wf-bl--grid" style={seq(0.46, 0.58)}><i /><i /><i /></div>
            <div className="wf-bl wf-bl--cta" style={seq(0.58, 0.68)}><i /><b /></div>
          </div>
        </div>
      );
    case "technik":
      return (
        <div className="wf-v wf-v--chain">
          <div className="wf-chain">
            <div className="wf-chain__track" style={seq(0.14, 0.6)}>
              <i />
              <em />
            </div>
            {v.chain.map((n, i) => (
              <div key={n} className="wf-node" style={seq(0.12 + i * 0.14, 0.22 + i * 0.14)}>
                <b>{n}</b>
              </div>
            ))}
          </div>
          <div className="wf-chips2">
            <span style={seq(0.62, 0.72)}>{v.chips[0]}</span>
            <span style={seq(0.68, 0.78)}>{v.chips[1]}</span>
          </div>
        </div>
      );
    case "ki":
      return (
        <div className="wf-v wf-v--lanes">
          <div className="wf-lanes__in" style={seq(0.26, 0.34)}>{v.laneIn}</div>
          <div className="wf-lanes__ai" style={seq(0.34, 0.44)}>{v.laneAi}</div>
          <ul className="wf-lanes__out">
            {v.laneOut.map((t, i) => (
              <li key={t} style={seq(0.44 + i * 0.07, 0.54 + i * 0.07)}>{t}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

/** One service as a scene: text on the left, the self-building schematic on the right. */
export function ServiceChapter({
  locale,
  s,
  act,
  drift,
  titleTag = "h2",
  showLink = true,
}: {
  locale: Locale;
  s: Service;
  act: "pin" | "flow";
  drift: string;
  titleTag?: "h1" | "h2";
  showLink?: boolean;
}) {
  const d = getDict(locale);
  const Tag = titleTag;
  const inner: ReactNode = (
    <div className="wf-ch__grid">
      <div className="wf-ch__text">
        <p className="wf-label">{s.tag}</p>
        <Tag id={`${s.id}-h`} className="sc-display sc-display--lg">
          {s.title}
        </Tag>
        <p className="wf-ch__lead">{s.lead}</p>
        <p className="wf-body">{s.what}</p>
        <ul className="wf-gets">
          {s.gets.map((g, i) => (
            <li key={g} style={seq(0.2 + i * 0.07, 0.3 + i * 0.07)}>
              {g}
            </li>
          ))}
        </ul>
        <p className="wf-fit">{s.fit}</p>
        {showLink && (
          <a className="wf-link" href={serviceHref(locale, s.id)}>
            {fmt(d.serviceUi.link, { title: s.title })}
          </a>
        )}
      </div>
      <figure className="wf-ch__vis" role="img" aria-label={d.visualLabels[s.id]}>
        <ServiceVisual locale={locale} id={s.id} />
      </figure>
    </div>
  );
  return act === "pin" ? (
    <section id={s.id} data-sc-act="pin" data-sc-span="2.6" data-sc-drift={drift} aria-labelledby={`${s.id}-h`} className="wf-chapter">
      <div data-sc-stage className="wf-ch">
        {inner}
      </div>
    </section>
  ) : (
    <section id={s.id} data-sc-act="flow" data-sc-drift={drift} aria-labelledby={`${s.id}-h`} className="sc-section wf-chapter wf-ch wf-ch--flow">
      {inner}
    </section>
  );
}
