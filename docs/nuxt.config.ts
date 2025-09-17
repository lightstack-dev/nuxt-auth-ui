// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '../src/module',
    '@nuxt/content',
    '@nuxt/image',
  ],

  devtools: { enabled: true }, app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#615fff' },
        { name: 'description', content: 'The complete authentication solution for Nuxt applications - UI components, route protection, and Logto integration' },
        { property: 'og:title', content: 'nuxt-final-auth - Complete Auth for Nuxt' },
        { property: 'og:description', content: 'The complete authentication solution for Nuxt applications' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      titleTemplate: '%s · nuxt-final-auth · Lightstack',
    },
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-smartypants': {
            options: {
              quotes: true,
              dashes: 'oldschool', // -- becomes en-dash, --- becomes em-dash
              ellipses: true,
            },
          },
        },
      },
    },
  },

  compatibilityDate: '2025-08-30',

  auth: {
    mock: true,
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
