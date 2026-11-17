import type { Role } from "../lib/content/schema";

// Open roles maintained in the repository. These are listed alongside roles
// published in Sanity; an entry here with the same id replaces the Sanity one.
// Each role needs a public HTTPS link to its full details.
//
// Example:
// { id: "local-data-engineer", title: "Data Engineer", url: "https://…" },
export const localRoles: Role[] = [];

// While no roles are listed, the Careers page points here (content document,
// Careers §3 "Until the website is live").
export const fallbackCareersUrl = "https://www.cidconsulting.com/careers";
