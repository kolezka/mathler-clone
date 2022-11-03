import PostCSSNesting from "postcss-nesting";

/** @type {import('vite').UserConfig} */
const config = {
  css: {
    postcss: {
      plugins: [
        PostCSSNesting
      ],
    },
  },
};

export default config;


