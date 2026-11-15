// Cloudflare Pages Function: POST /api/contact
// Sends the contact form to hello@webfluence-agency.com through the Cloudflare
// Email Service binding "EMAIL" (send_email). Until the domain is onboarded for
// Email Sending and the binding exists, the function answers 503 and the form
// shows its failure line with the direct e-mail address.

const TO = "hello@webfluence-agency.com";
const FROM = { email: "hello@webfluence-agency.com", name: "Webfluence Agency Website" };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (value, max) =>
  String(value ?? "")
    .replace(/[\r\u0000]/g, "")
    .trim()
    .slice(0, max);

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot-free spam guard: reject oversized or empty submissions.
  const name = clean(form.get("name"), 120);
  const email = clean(form.get("email"), 200);
  const company = clean(form.get("company"), 160);
  const message = clean(form.get("message"), 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return json({ ok: false, error: "invalid" }, 422);
  }

  if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
    return json({ ok: false, error: "mail_not_configured" }, 503);
  }

  const subject = `Neue Anfrage von ${name}`.replace(/[\r\n]/g, " ");
  const text = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    company ? `Unternehmen: ${company}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await env.EMAIL.send({ to: TO, from: FROM, replyTo: email, subject, text });
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

export function onRequest() {
  return json({ ok: false, error: "method_not_allowed" }, 405);
}
