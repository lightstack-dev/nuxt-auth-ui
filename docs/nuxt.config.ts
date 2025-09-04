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
    socialProviders: [
      {
        name: 'google',
        enabled: true,
      },
      {
        name: 'github',
        enabled: true,
      },
      {
        name: 'microsoft',
        enabled: true,
      },
      {
        name: 'facebook',
        enabled: false, // Disabled for demo
      },
    ],
  },
  icon: {
    cssLayer: 'components',
  },
})
