import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { SITE_URL } from "../../content/site";
import { mailConfig } from "./mail.server";

export type ContactFormMode = "live" | "preview" | "off";

/**
 * "live": messages are delivered.
 * "preview": email delivery is not configured, but this is not the public domain, so the form is shown
 *   for design review and submissions are not sent.
 * "off": email delivery is not configured on the public domain; the page shows an email button instead.
 */
export const fetchContactFormMode = createServerFn({ method: "GET" }).handler((): ContactFormMode => {
  if (mailConfig()) return "live";
  const host = getRequestHost({ xForwardedHost: true }).toLowerCase();
  const publicHost = new URL(SITE_URL).hostname;
  return host === publicHost || host === `www.${publicHost}` ? "off" : "preview";
});
