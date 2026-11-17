import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

// Keep topics in sync with src/lib/content/schema.ts in the website.
export const TOPICS = [
  { title: "Technology strategy and prioritization", value: "technology-strategy" },
  { title: "Data strategy and architecture", value: "data-strategy" },
  { title: "Applied AI", value: "applied-ai" },
  { title: "Change enablement and capabilities", value: "change-enablement" },
];

export const article = defineType({
  name: "article",
  title: "Insights article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: "The end of the article's link, e.g. talindata.com/insights/the-cost-centre-trap. Click Generate after writing the title.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((slug) =>
          !slug?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
            ? true
            : "Use lowercase letters, numbers and single hyphens only",
        ),
    }),
    defineField({
      name: "summary",
      title: "One-line summary",
      description: "Shown on the article card and under the title.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: { list: TOPICS, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      description: "Articles are listed newest first.",
      type: "date",
      options: { dateFormat: "D MMMM YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article text",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Section heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbers", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Address",
                    type: "url",
                    validation: (rule) => rule.required().uri({ scheme: ["https", "http", "mailto"] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Description for screen readers",
              type: "string",
              validation: (rule) => rule.required().error("Describe the image for people who cannot see it"),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publishedAt", topic: "topic" },
    prepare: ({ title, date, topic }) => ({
      title,
      subtitle: [date, TOPICS.find((item) => item.value === topic)?.title].filter(Boolean).join(" · "),
    }),
  },
});
