export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@logto/nuxt',
    '../src/module',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-30',

  authUi: {
    appName: 'nuxt-auth-ui',
    prefix: '/auth',
  },
})
