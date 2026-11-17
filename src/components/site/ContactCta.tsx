import { contactCta, primaryCta } from "../../content/site";
import { ButtonLink } from "./ButtonLink";

export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <div className="shell contact-cta__inner" data-reveal>
        <h2 id="contact-cta-title" className="contact-cta__title">
          {contactCta.headline}
        </h2>
        <p className="contact-cta__copy">{contactCta.copy}</p>
        <ButtonLink to={primaryCta.to}>{contactCta.button}</ButtonLink>
      </div>
    </section>
  );
}
