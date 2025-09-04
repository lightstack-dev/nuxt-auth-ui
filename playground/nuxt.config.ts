export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@logto/nuxt',
    '../src/module',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-30',

  authUi: {
    appName: 'nuxt-auth-ui',
    prefix: '/auth',
    socialProviders: [
      {
        name: 'google',
        label: 'Continue with Google',
        icon: 'i-simple-icons-google',
        enabled: true,
      },
      {
        name: 'github',
        label: 'Continue with GitHub',
        icon: 'i-simple-icons-github',
        enabled: true,
      },
      {
        name: 'microsoft',
        label: 'Continue with Microsoft',
        icon: 'i-simple-icons-microsoft',
        enabled: false, // Disabled for demo
      },
    ],
  },
})
