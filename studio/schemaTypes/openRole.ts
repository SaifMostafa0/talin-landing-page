import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const openRole = defineType({
  name: "openRole",
  title: "Open role",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "title",
      title: "Role title",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "url",
      title: "Link to the role's full details",
      description: "Public https:// link where candidates read the role and apply.",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "position",
      title: "Position in the list",
      description: "Optional. Lower numbers appear first.",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  description: "Delete a role (or unpublish it) when the vacancy closes; it disappears from the website within a minute.",
  preview: { select: { title: "title", subtitle: "url" } },
});
