export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
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

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirect: false, // We handle redirects in our auth components
  },
})
