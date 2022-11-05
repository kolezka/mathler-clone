import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
};

export default config;
