import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails, copyright, navigation } from "../../content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo size="footer" />
          </div>
          <nav aria-label="Footer" className="site-footer__links">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} className="focus-ring">
                {item.label}
              </Link>
            ))}
          </nav>
          <ul className="site-footer__contact">
            <li>
              <Mail aria-hidden="true" size={16} />
              <a className="focus-ring" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </li>
            <li>
              <Phone aria-hidden="true" size={16} />
              <a className="focus-ring" href={contactDetails.phoneHref}>
                {contactDetails.phoneDisplay}
              </a>
            </li>
            <li>
              <MapPin aria-hidden="true" size={16} />
              <a className="focus-ring" href={contactDetails.mapUrl} target="_blank" rel="noreferrer">
                {contactDetails.address}
              </a>
            </li>
            <li>
              <Linkedin aria-hidden="true" size={16} />
              <a className="focus-ring" href={contactDetails.linkedin.company.url} target="_blank" rel="noreferrer">
                {contactDetails.linkedin.company.label}
              </a>
            </li>
          </ul>
        </div>
        <p className="site-footer__legal">{copyright}</p>
      </div>
    </footer>
  );
}
