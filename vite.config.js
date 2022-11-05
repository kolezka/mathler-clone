/** @type {import('vite').UserConfig} */
const config = {
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
    // rollupOptions: {
    //
    // }
  },
};

export default config;
