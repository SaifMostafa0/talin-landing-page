import "@tanstack/react-start/server-only";
import type { ContactInput } from "./schema";

// Contact form delivery through Resend's HTTP API. The form is only shown when
// RESEND_API_KEY and CONTACT_FROM are set; otherwise the page offers email instead.
//
// RESEND_API_KEY  API key from resend.com (sending domain verified for CONTACT_FROM)
// CONTACT_FROM    e.g. "Talin website <website@talindata.com>"
// CONTACT_TO      recipient, defaults to info@talindata.com

export function mailConfig() {
  const apiKey = process.env["RESEND_API_KEY"]?.trim();
  const from = process.env["CONTACT_FROM"]?.trim();
  const to = process.env["CONTACT_TO"]?.trim() || "info@talindata.com";
  return apiKey && from ? { apiKey, from, to } : null;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").slice(0, 120);

export async function sendContactMessage(input: Pick<ContactInput, "name" | "organization" | "email" | "message">) {
  const config = mailConfig();
  if (!config) throw new Error("Contact delivery is not configured");

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Organization", input.organization],
    ["Work email", input.email],
  ];
  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${input.message}`;
  const html = `<table cellpadding="4">${rows
    .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
    .join("")}</table><p><strong>Message</strong></p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: input.email,
      subject: `Website enquiry from ${oneLine(input.name)} (${oneLine(input.organization)})`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend responded with HTTP ${response.status}`);
}
