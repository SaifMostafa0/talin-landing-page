// Developer overrides for content managed in Sanity.
//
// Sanity (edited by the Talin team) is the primary source for articles and open
// roles. Anything here wins, so a broken or unwanted entry can be fixed from the
// repository without touching the CMS:
//
// - Hide an article or role: add its slug / id below.
// - Replace an article: add src/content/insights/<same-slug>.md (see README there).
// - Add a role: add it to src/content/roles.ts.
// - Ignore Sanity completely: set CONTENT_SOURCE=local in the hosting environment.

export const hiddenArticleSlugs: string[] = [];

/** Sanity document ids (e.g. "4f1c…") or local role ids. */
export const hiddenRoleIds: string[] = [];
