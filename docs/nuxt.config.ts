// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    '../src/module',
  ],

  devtools: { enabled: true }, app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      titleTemplate: '%s · nuxt-auth-ui · Lightstack',
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-08-30',

  authUi: {
    legal: {
      termsOfService: '/terms',
      privacyPolicy: '/privacy',
      cookiePolicy: '/cookies',
    },
    middleware: false,
    socialProviders: ['google', 'microsoft'],
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  icon: {
    cssLayer: 'components',
  },
})
