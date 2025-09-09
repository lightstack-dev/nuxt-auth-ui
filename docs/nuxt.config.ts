// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '../src/module',
  ],

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-30',

  authUi: {
    appName: 'Auth UI Docs',
    socialProviders: ['google', 'microsoft'],
    legal: {
      termsOfService: '/terms',
      privacyPolicy: '/privacy',
      cookiePolicy: '/cookies',
    },
  },
  icon: {
    cssLayer: 'components',
  },
})
