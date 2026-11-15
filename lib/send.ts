export type InquiryResult = "ok" | "failed";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (value: string) => emailPattern.test(value.trim());

/** Posts an inquiry to the Cloudflare Pages Function. Success only after the function answers 2xx. */
export async function sendInquiry(fields: Record<string, string>): Promise<InquiryResult> {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.append(key, value);
  try {
    const res = await fetch("/api/contact", { method: "POST", body, headers: { Accept: "application/json" } });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
