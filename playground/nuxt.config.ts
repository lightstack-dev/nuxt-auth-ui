export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@logto/nuxt',
    '../src/module',
  ],

  devtools: { enabled: true },

  ui: {
    global: true,
  },
  authUi: {
    appName: 'Auth UI Playground',
    prefix: '/auth',
  },
  logto: {
    // Logto config will go here
    endpoint: process.env.LOGTO_ENDPOINT || 'https://[your-tenant].logto.app/',
    appId: process.env.LOGTO_APP_ID || 'your-app-id',
    appSecret: process.env.LOGTO_APP_SECRET || 'your-app-secret',
    cookieSecret: process.env.LOGTO_COOKIE_SECRET || 'complex_password_at_least_32_characters_long',
  },
})
