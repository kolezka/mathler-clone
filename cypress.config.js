import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "v9tq8a",
  e2e: {
    baseUrl: "http://localhost:4173",
    includeShadowDom: true,
  },
});
