import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm, type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";

import { PageHero } from "../components/site/PageHero";
import { Section } from "../components/site/Section";
import { contactDetails } from "../content/site";
import { fetchContactFormMode } from "../lib/contact/functions";
import { contactConfirmation, contactSchema } from "../lib/contact/schema";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/contact")({
  loader: async () => ({ formMode: await fetchContactFormMode() }),
  head: () =>
    seo({
      title: "Contact Talin | Get in touch",
      description: "Contact Talin. Email info@talindata.com, call + (202) 2736 4479, or visit our office in Zamalek, Cairo.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const { formMode } = Route.useLoaderData();

  return (
    <>
      <PageHero headline="Let's talk" subheading="Tell us what you are working on, and we will tell you how we can help." />

      <Section tone="pastel" className="contact-section">
        <div className="contact-layout">
          <div className="glass-card contact-form-card" data-reveal>
            {formMode !== "off" ? (
              <ContactForm preview={formMode === "preview"} />
            ) : (
              <div className="contact-fallback">
                <h2 className="card-title">Get in touch</h2>
                <a className="button button--primary focus-ring" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email} <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </div>
            )}
          </div>

          <aside className="contact-details" aria-labelledby="details-title" data-reveal>
            <h2 id="details-title" className="sr-only">
              Contact details
            </h2>
            <Detail icon={<Mail />} label="Email">
              <a className="focus-ring" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </Detail>
            <Detail icon={<MapPin />} label="Office">
              <a className="focus-ring" href={contactDetails.mapUrl} target="_blank" rel="noreferrer">
                {contactDetails.address}
              </a>
            </Detail>
            <Detail icon={<Phone />} label="Telephone">
              <a className="focus-ring" href={contactDetails.phoneHref}>
                {contactDetails.phoneDisplay}
              </a>
            </Detail>
            <Detail icon={<Linkedin />} label="LinkedIn">
              <ul className="contact-details__links">
                {Object.values(contactDetails.linkedin).map((link) => (
                  <li key={link.url}>
                    <a className="focus-ring" href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Detail>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Detail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="contact-detail">
      <span className="contact-detail__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3 className="contact-detail__label">{label}</h3>
        <div className="contact-detail__value">{children}</div>
      </div>
    </div>
  );
}

const formSchema = contactSchema.pick({ name: true, organization: true, email: true, message: true, hp_field: true });
type FormValues = z.infer<typeof formSchema>;

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm({ preview }: { preview: boolean }) {
  const startedAt = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { hp_field: "" } });

  useEffect(() => {
    if (status === "sent" || status === "error") statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    if (preview) {
      // Design preview without email delivery: show the confirmation, send nothing.
      reset();
      setStatus("sent");
      return;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, elapsed: Date.now() - startedAt.current }),
      });
      if (response.ok) {
        reset();
        setStatus("sent");
        return;
      }
      setErrorMessage(
        response.status === 429
          ? "You have sent several messages in a short time. Please try again later, or email us directly."
          : "Your message could not be sent. Please try again, or email us directly.",
      );
      setStatus("error");
    } catch {
      setErrorMessage("Your message could not be sent. Please check your connection and try again, or email us directly.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={statusRef}>
        <CheckCircle2 aria-hidden="true" size={40} strokeWidth={1.5} />
        <p>{contactConfirmation}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="sr-only">Contact form</h2>
      <div className="contact-form__row">
        <Field label="Name" autoComplete="name" registration={register("name")} error={errors.name} />
        <Field label="Organization" autoComplete="organization" registration={register("organization")} error={errors.organization} />
      </div>
      <Field label="Work email" type="email" autoComplete="email" registration={register("email")} error={errors.email} />
      <Field label="Message" multiline registration={register("message")} error={errors.message} />
      <div className="contact-form__trap" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register("hp_field")} />
        </label>
      </div>
      {status === "error" && (
        <div className="form-error" role="alert" tabIndex={-1} ref={statusRef}>
          {errorMessage}{" "}
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
        </div>
      )}
      <button type="submit" className="button button--primary focus-ring contact-form__submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <ArrowUpRight aria-hidden="true" size={17} />
      </button>
    </form>
  );
}

function Field({
  label,
  registration,
  error,
  type = "text",
  autoComplete,
  multiline = false,
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error: FieldError | undefined;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    required: true,
    ...registration,
  };
  return (
    <div className={`field ${error ? "field--invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p className="field__error" id={errorId}>
          {error.message}
        </p>
      )}
    </div>
  );
}
