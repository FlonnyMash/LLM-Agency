"use client";

import { useState, type FormEvent } from "react";
import { getDict, pathFor, type Locale } from "@/lib/i18n";
import { isEmail, sendInquiry } from "@/lib/send";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const f = d.form;
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const topic = String(data.get("topic") || "");
    const message = String(data.get("message") || "").trim();
    const next: Errors = {};
    if (!name) next.name = f.errName;
    if (!isEmail(email)) next.email = f.errEmail;
    if (message.length < 10) next.message = f.errMessage;
    setErrors(next);
    if (Object.keys(next).length) {
      const first = (["name", "email", "message"] as const).find((k) => next[k]);
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    const result = await sendInquiry({ name, email, company, message: `${f.topicPrefix}: ${topic}\n\n${message}` });
    if (result === "ok") {
      form.reset();
      setState("sent");
    } else setState("failed");
  }

  return (
    <form className="wf-form" onSubmit={onSubmit} noValidate>
      <div className="wf-form__row">
        <div className="wf-field">
          <label htmlFor="c-name">{f.name}</label>
          <input id="c-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "c-name-e" : undefined} />
          {errors.name && <p id="c-name-e" className="wf-field__err">{errors.name}</p>}
        </div>
        <div className="wf-field">
          <label htmlFor="c-email">{f.email}</label>
          <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "c-email-e" : undefined} />
          {errors.email && <p id="c-email-e" className="wf-field__err">{errors.email}</p>}
        </div>
      </div>
      <div className="wf-form__row">
        <div className="wf-field">
          <label htmlFor="c-company">{f.company}</label>
          <input id="c-company" name="company" autoComplete="organization" />
        </div>
        <div className="wf-field">
          <label htmlFor="c-topic">{f.topic}</label>
          <select id="c-topic" name="topic" defaultValue={f.topics[0]}>
            {f.topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="wf-field">
        <label htmlFor="c-message">{f.message}</label>
        <textarea id="c-message" name="message" rows={6} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "c-message-e" : undefined} />
        {errors.message && <p id="c-message-e" className="wf-field__err">{errors.message}</p>}
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
  );
}
