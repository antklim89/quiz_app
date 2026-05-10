// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    },
  },

  routeRules: {
    '/questions/**': { ssr: false },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  }
});
