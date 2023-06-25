import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import StringPlugin from 'vite-plugin-string';
import wasmPlugin from 'vite-plugin-wasm';

export default defineNuxtConfig({
  ssr: false,
  vite: {
    plugins: [
      // @ts-ignore
      StringPlugin({
        include: /\.lit\.js$/,
      }),
      nodePolyfills({
        protocolImports: true,
      }),
      wasmPlugin(),
    ],
    resolve: {
      alias: {
        '~/': path.resolve(__dirname),
      },
    },
  },
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
