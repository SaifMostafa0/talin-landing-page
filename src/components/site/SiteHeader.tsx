import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation, primaryCta } from "../../content/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSolid(window.scrollY > 8));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add("menu-open");
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Keep keyboard focus inside the open menu (and its toggle).
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${solid || menuOpen ? "is-solid" : ""}`}>
      <div className="shell site-header__bar">
        <Logo />
        <nav aria-label="Primary" className="site-nav">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} className="site-nav__link focus-ring" activeProps={{ "aria-current": "page" }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to={primaryCta.to} className="button button--header focus-ring site-header__cta">
          {primaryCta.label}
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle focus-ring"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${menuOpen ? "is-open" : ""}`} hidden={!menuOpen}>
        <nav aria-label="Mobile" className="shell mobile-menu__inner">
          <div className="mobile-menu__links">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} className="mobile-menu__link focus-ring" activeProps={{ "aria-current": "page" }}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link to={primaryCta.to} className="button button--primary focus-ring mobile-menu__cta">
            {primaryCta.label}
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
