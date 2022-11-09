import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "v9tq8a",
  e2e: {
    baseUrl: "http://localhost:5173",
    includeShadowDom: true,
  },
});
