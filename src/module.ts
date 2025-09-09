import { defineNuxtModule, addPlugin, addImports, addComponent, addTemplate, createResolver, extendPages, addServerHandler, installModule } from '@nuxt/kit'
import type { AuthUIConfig } from './runtime/types/config'

export default defineNuxtModule<AuthUIConfig>({
  meta: {
    name: '@lightstack-dev/nuxt-auth-ui',
    configKey: 'authUi',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    routes: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      signOut: '/auth/sign-out',
      profile: '/auth/profile',
    },
    componentPrefix: 'A',
    redirects: {
      afterSignIn: '/',
      afterSignOut: '/',
    },
    middleware: {
      global: false,
      name: 'auth',
    },
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Extend app.config with our defaults
    // This merges with user's app.config automatically
    nuxt.hook('app:resolve', (app) => {
      app.configs.push(resolver.resolve('./runtime/app.config'))
    })

    // Merge options with defaults to ensure all values are defined
    const resolvedOptions = {
      routes: {
        signIn: options.routes?.signIn || '/auth/sign-in',
        signUp: options.routes?.signUp || '/auth/sign-up',
        signOut: options.routes?.signOut || '/auth/sign-out',
        profile: options.routes?.profile || '/auth/profile',
      },
      componentPrefix: options.componentPrefix || 'A',
      redirects: {
        afterSignIn: options.redirects?.afterSignIn || '/',
        afterSignOut: options.redirects?.afterSignOut || '/',
      },
      middleware: {
        global: options.middleware?.global ?? false,
        name: options.middleware?.name || 'auth',
      },
      appName: options.appName,
      logo: options.logo,
      legal: options.legal,
      socialProviders: options.socialProviders,
    }

    // Add runtime config
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} }
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.authUi = resolvedOptions

    // Install @nuxtjs/i18n module dependency
    await installModule('@nuxtjs/i18n', {
      locales: [
        {
          code: 'en',
          file: resolver.resolve('./runtime/locales/en.json'),
        },
      ],
      defaultLocale: 'en',
      langDir: resolver.resolve('./runtime/locales'),
    })

    // Auto-import composables
    addImports([
      {
        name: 'useAuthUI',
        from: resolver.resolve('./runtime/composables/useAuthUI'),
      },
    ])

    // Add type declarations
    addTemplate({
      filename: 'types/auth-ui.d.ts',
      src: resolver.resolve('./runtime/types/app-config.d.ts'),
    })

    // Register components with configurable prefix
    addComponent({
      name: `${resolvedOptions.componentPrefix}SignInButton`,
      filePath: resolver.resolve('./runtime/components/SignInButton.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignUpButton`,
      filePath: resolver.resolve('./runtime/components/SignUpButton.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignInForm`,
      filePath: resolver.resolve('./runtime/components/SignInForm.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignUpForm`,
      filePath: resolver.resolve('./runtime/components/SignUpForm.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SocialProviderButtons`,
      filePath: resolver.resolve('./runtime/components/SocialProviderButtons.vue'),
    })

    // Add server API routes
    addServerHandler({
      route: '/api/auth-ui/connectors',
      handler: resolver.resolve('./runtime/server/api/auth-ui/connectors.get'),
    })

    addServerHandler({
      route: '/api/auth-ui/register',
      handler: resolver.resolve('./runtime/server/api/auth-ui/register.post'),
    })

    // Add auth pages
    extendPages((pages) => {
      pages.push({
        name: 'auth-sign-in',
        path: resolvedOptions.routes.signIn,
        file: resolver.resolve('./runtime/pages/sign-in.vue'),
      })

      pages.push({
        name: 'auth-sign-up',
        path: resolvedOptions.routes.signUp,
        file: resolver.resolve('./runtime/pages/sign-up.vue'),
      })
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
