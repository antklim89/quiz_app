import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    },
  },

  modules: ['@nuxt/image'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
  nitro: {
    preset: 'bun'
  },
  css: ['./app/assets/css/main.css'],
});
