import { defineNuxtModule, addPlugin, addImports, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface AuthUIConfig {
  // Routes
  prefix?: string

  // Component naming
  componentPrefix?: string

  // Redirects
  redirects?: {
    afterSignIn?: string
    afterSignOut?: string
  }

  // Branding
  appName?: string
  logo?: string

  // Middleware
  middleware?: {
    global?: boolean
    name?: string
  }

  // Theme (auto-inherits from app.config.ts if using Nuxt UI)
  theme?: {
    primary?: string
    gray?: string
  }
}

export default defineNuxtModule<AuthUIConfig>({
  meta: {
    name: '@lightstack/nuxt-auth-ui',
    configKey: 'authUi',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: '/auth',
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
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add runtime config
    nuxt.options.runtimeConfig.public.authUi = {
      ...nuxt.options.runtimeConfig.public.authUi,
      ...options,
    }

    // Auto-import composable
    addImports({
      name: 'useAuthUI',
      from: resolver.resolve('./runtime/composables/useAuthUI'),
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
