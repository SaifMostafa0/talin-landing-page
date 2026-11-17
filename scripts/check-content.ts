// Build-time check for repository articles and roles. Runs before `vite build`
// so a malformed file fails the deploy instead of breaking a live page.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseMarkdownArticle, slugFromPath } from "../src/lib/content/markdown.ts";
import { roleSchema } from "../src/lib/content/schema.ts";
import { localRoles } from "../src/content/roles.ts";

const dir = join(import.meta.dirname, "../src/content/insights");
const files = readdirSync(dir).filter((file) => file.endsWith(".md") && file !== "README.md");
const errors: string[] = [];

for (const file of files) {
  try {
    parseMarkdownArticle(slugFromPath(file), readFileSync(join(dir, file), "utf8"));
  } catch (error) {
    errors.push((error as Error).message);
  }
}

const roleIds = new Set<string>();
for (const role of localRoles) {
  const parsed = roleSchema.safeParse(role);
  if (!parsed.success) errors.push(`roles.ts "${role.title}": ${parsed.error.issues.map((i) => i.message).join("; ")}`);
  if (roleIds.has(role.id)) errors.push(`roles.ts: duplicate id "${role.id}"`);
  roleIds.add(role.id);
}

if (errors.length) {
  console.error(`Content check failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Content check passed: ${files.length} repository article(s), ${localRoles.length} repository role(s).`);
