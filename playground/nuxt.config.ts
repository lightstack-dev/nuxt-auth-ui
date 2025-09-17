export default defineNuxtConfig({
  modules: [
    '../src/module',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s · nuxt-final-auth Playground',
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-30',

  auth: {
    legal: {
      termsOfService: '/terms',
      privacyPolicy: '/privacy',
      cookiePolicy: '/cookies',
    },
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
