import { Link } from "@tanstack/react-router";
import talinWordmark from "../../assets/brand/talin-wordmark.png";

/** Talin lockup with the "BY CID CONSULTING" endorsement. Supplied artwork, never recreated. */
export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  return (
    <Link to="/" aria-label="Talin, by CID Consulting — home" className={`logo logo--${size} focus-ring`}>
      <span className="logo__wordmark">
        <img src={talinWordmark} alt="" width={1182} height={319} />
      </span>
      <span className="logo__endorsement" aria-hidden="true">
        BY CID CONSULTING
      </span>
    </Link>
  );
}
