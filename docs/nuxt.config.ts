export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
    '../src/module', // Our auth UI module for showcasing
  ],

  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-dark',
    },
  },

  ui: {
    global: true,
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  // Mock auth for documentation examples
  authUi: {
    appName: 'Lightstack Auth',
    prefix: '/demo/auth',
    componentPrefix: 'A',
  },
})
