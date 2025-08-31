export default defineNuxtConfig({
  compatibilityDate: '2025-08-30',

  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxt/ui',
    '@logto/nuxt',
    '../src/module',
  ],

  devtools: { enabled: true },

  authUi: {
    appName: 'nuxt-auth-ui',
    prefix: '/auth',
  },
})
