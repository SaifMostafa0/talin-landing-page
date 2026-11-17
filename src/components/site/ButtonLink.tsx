import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost-light" | "ghost-dark";

export function ButtonLink({
  to,
  hash,
  children,
  variant = "primary",
  className = "",
}: {
  to: NonNullable<LinkProps["to"]>;
  hash?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link to={to} {...(hash ? { hash } : {})} className={`button button--${variant} focus-ring ${className}`}>
      {children}
      <ArrowUpRight aria-hidden="true" size={17} />
    </Link>
  );
}
