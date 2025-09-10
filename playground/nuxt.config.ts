export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@logto/nuxt',
    '@nuxtjs/i18n',
    '../src/module',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s · nuxt-auth-ui Playground',
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-30',

  authUi: {
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
  },

  logto: {
    cookieSecure: false, // Set to true in production with HTTPS
    // cookieEncryptionKey is set via NUXT_LOGTO_COOKIE_ENCRYPTION_KEY in .env
    resources: [], // Add your API resources here if needed
    scopes: ['profile', 'email', 'phone'], // Request these scopes
  },
})
