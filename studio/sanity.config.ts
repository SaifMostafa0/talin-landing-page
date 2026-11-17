import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "replace-with-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "talin",
  title: "Talin website",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website content")
          .items([
            S.documentTypeListItem("article").title("Insights articles"),
            S.documentTypeListItem("openRole").title("Open roles"),
          ]),
    }),
    // Query playground for developers only.
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
  schema: { types: schemaTypes },
  document: {
    // Editors only create the two website document types.
    newDocumentOptions: (prev) => prev.filter((item) => ["article", "openRole"].includes(item.templateId)),
  },
});
