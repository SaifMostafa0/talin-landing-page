import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "itvdkt2i",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // Hosted at https://<studioHost>.sanity.studio after `npm run deploy`.
  studioHost: "talin",
  deployment: { appId: "pc3zihhches2lkhph461lgzc", autoUpdates: true },
});
