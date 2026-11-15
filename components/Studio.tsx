"use client";

import { useState, type FormEvent } from "react";
import { Game, type Shape } from "@/components/Game";
import { fmt, getDict, pathFor, type Locale } from "@/lib/i18n";
import { isEmail, sendInquiry } from "@/lib/send";

const colorIds = ["#ff6b5e", "#3b9dff", "#3be3a0", "#ffb03b", "#f3f1ee"];
const shapeIds: Shape[] = ["quadrat", "kreis", "raute"];

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Advergaming configurator: look (live in the game), scope, then a real inquiry with the selection. */
export function Studio({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const st = d.studio;
  const f = d.form;
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState(st.defaultBrand);
  const [color, setColor] = useState(colorIds[0]);
  const [shape, setShape] = useState<Shape>("quadrat");
  const [type, setType] = useState(st.types[0]);
  const [uses, setUses] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const colorName = st.colors[colorIds.indexOf(color)] ?? color;
  const shapeName = st.shapes[shapeIds.indexOf(shape)] ?? shape;
  const summary = [
    `${st.summaryName}: ${brand || st.defaultBrand}`,
    fmt(st.summaryLook, { color: colorName, shape: shapeName }),
    `${st.summaryType}: ${type}`,
    `${st.summaryUse}: ${uses.length ? uses.join(", ") : st.open}`,
    `${st.summaryExtras}: ${picked.length ? picked.join(", ") : st.none}`,
  ];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const note = String(data.get("note") || "").trim();
    const next: Record<string, string> = {};
    if (!name) next.name = f.errName;
    if (!isEmail(email)) next.email = f.errEmail;
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${next.name ? "name" : "email"}"]`)?.focus();
      return;
    }
    setState("sending");
    const message = `${st.messageHead}\n\n${summary.join("\n")}${note ? `\n\n${st.messageNote}: ${note}` : ""}`;
    const result = await sendInquiry({ name, email, company, message });
    setState(result === "ok" ? "sent" : "failed");
  }

  return (
    <div className="wf-studio">
      <ol className="wf-steps" aria-label={st.stepsLabel}>
        {st.steps.map((s, i) => (
          <li key={s}>
            <button type="button" aria-current={step === i ? "step" : undefined} onClick={() => setStep(i)}>
              <span>{i + 1}</span> {s}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="wf-studio__grid">
          <div className="wf-studio__controls">
            <div className="wf-field">
              <label htmlFor="s-brand">{st.brandLabel}</label>
              <input id="s-brand" value={brand} maxLength={14} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <fieldset className="wf-fieldset">
              <legend>{st.colorLegend}</legend>
              <div className="wf-swatches">
                {colorIds.map((c, i) => (
                  <label key={c} className="wf-swatch" style={{ ["--c" as string]: c }}>
                    <input type="radio" name="color" checked={color === c} onChange={() => setColor(c)} />
                    <span>{st.colors[i]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="wf-fieldset">
              <legend>{st.shapeLegend}</legend>
              <div className="wf-chips">
                {shapeIds.map((s, i) => (
                  <label key={s}>
                    <input type="radio" name="shape" checked={shape === s} onChange={() => setShape(s)} />
                    <span>{st.shapes[i]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="wf-studio__hint">{st.hint}</p>
            <button type="button" className="wf-cta" onClick={() => setStep(1)}>
              {st.next1}
            </button>
          </div>
          <Game locale={locale} brand={brand} color={color} shape={shape} compact />
        </div>
      )}

      {step === 1 && (
        <div className="wf-studio__cols">
          <fieldset className="wf-fieldset">
            <legend>{st.typeLegend}</legend>
            <div className="wf-chips">
              {st.types.map((t) => (
                <label key={t}>
                  <input type="radio" name="type" checked={type === t} onChange={() => setType(t)} />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="wf-fieldset">
            <legend>{st.useLegend}</legend>
            <div className="wf-chips">
              {d.advergaming.useCases.map((u) => (
                <label key={u.id}>
                  <input type="checkbox" checked={uses.includes(u.title)} onChange={() => setUses(toggle(uses, u.title))} />
                  <span>{u.title}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="wf-fieldset">
            <legend>{st.extrasLegend}</legend>
            <div className="wf-chips">
              {st.extras.map((x) => (
                <label key={x}>
                  <input type="checkbox" checked={picked.includes(x)} onChange={() => setPicked(toggle(picked, x))} />
                  <span>{x}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="wf-studio__nav">
            <button type="button" className="wf-cta wf-cta--ghost" onClick={() => setStep(0)}>
              {st.back}
            </button>
            <button type="button" className="wf-cta" onClick={() => setStep(2)}>
              {st.next2}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wf-studio__cols wf-studio__cols--2">
          <div>
            <h3 className="wf-studio__h">{st.yourSelection}</h3>
            <ul className="wf-summary">
              {summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="wf-studio__hint">{st.selectionHint}</p>
            <button type="button" className="wf-cta wf-cta--ghost" onClick={() => setStep(1)}>
              {st.change}
            </button>
          </div>
          <form className="wf-form" onSubmit={onSubmit} noValidate>
            <div className="wf-field">
              <label htmlFor="s-name">{f.name}</label>
              <input id="s-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "s-name-e" : undefined} />
              {errors.name && <p id="s-name-e" className="wf-field__err">{errors.name}</p>}
            </div>
            <div className="wf-field">
              <label htmlFor="s-email">{f.email}</label>
              <input id="s-email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "s-email-e" : undefined} />
              {errors.email && <p id="s-email-e" className="wf-field__err">{errors.email}</p>}
            </div>
            <div className="wf-field">
              <label htmlFor="s-company">{f.company}</label>
              <input id="s-company" name="company" autoComplete="organization" />
            </div>
            <div className="wf-field">
              <label htmlFor="s-note">{f.note}</label>
              <textarea id="s-note" name="note" rows={4} />
            </div>
            <div className="wf-form__act">
              <button className="wf-cta" type="submit" disabled={state === "sending"}>
                {d.ui.mainAction}
              </button>
              <p className="wf-form__status" role="status">
                {state === "sending" && f.sending}
                {state === "sent" && f.sent}
                {state === "failed" && (
                  <>
                    {f.failedBefore} <a href={`mailto:${d.ui.email}`}>{d.ui.email}</a>.
                  </>
                )}
              </p>
            </div>
            <p className="wf-form__small">
              {f.privacyBefore} <a href={pathFor(locale, { key: "privacy" })}>{f.privacyLink}</a>.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
