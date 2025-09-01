import { defineNuxtModule, addPlugin, addImports, addComponent, addTemplate, createResolver } from '@nuxt/kit'

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

  // i18n
  locale?: string
  messages?: Record<string, Record<string, string>>
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
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Extend app.config with our defaults
    // This merges with user's app.config automatically
    nuxt.hook('app:resolve', (app) => {
      app.configs.push(resolver.resolve('./runtime/app.config'))
    })

    // Merge options with defaults to ensure all values are defined
    const resolvedOptions = {
      prefix: options.prefix || '/auth',
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
      theme: options.theme,
      locale: options.locale,
      messages: options.messages,
    }

    // Add runtime config
    nuxt.options.runtimeConfig.public.authUi = resolvedOptions

    // Auto-import composables
    addImports([
      {
        name: 'useAuthUI',
        from: resolver.resolve('./runtime/composables/useAuthUI'),
      },
      {
        name: 'useAuthUILocale',
        from: resolver.resolve('./runtime/composables/useAuthUILocale'),
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

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
