import { createServerFn } from "@tanstack/react-start";
import { mailConfig } from "./mail.server";

/** Whether the contact form can deliver messages in this environment. */
export const fetchContactFormEnabled = createServerFn({ method: "GET" }).handler(() => mailConfig() !== null);
