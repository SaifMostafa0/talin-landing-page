import { z } from "zod";

// Fields from the content document, Contact §2.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120, "Please keep this under 120 characters"),
  organization: z.string().trim().min(1, "Please enter your organization").max(160, "Please keep this under 160 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  message: z.string().trim().min(1, "Please enter a message").max(5000, "Please keep this under 5,000 characters"),
  /** Honeypot: humans never see or fill this field. */
  hp_field: z.string().max(500).optional(),
  /** Milliseconds between the form rendering and submitting; bots submit instantly. */
  elapsed: z.number().int().nonnegative(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactConfirmation = "Thank you. We have received your message and will respond soon.";
