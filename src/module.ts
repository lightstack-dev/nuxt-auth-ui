import { defineNuxtModule, addPlugin, addImports, addComponent, addTemplate, createResolver, extendPages } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface AuthUIConfig {
  // Routes - individually configurable for maximum control
  routes?: {
    signIn?: string
    signUp?: string
    signOut?: string
    profile?: string
  }

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

  // Messages - simple text overrides
  messages?: Record<string, string>
}

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
    messages: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      signInTitle: 'Welcome Back',
      signInDescription: 'Sign in to your account to continue',
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
      messages: {
        signIn: 'Sign In',
        signOut: 'Sign Out',
        signInTitle: 'Welcome Back',
        signInDescription: 'Sign in to your account to continue',
        ...options.messages,
      },
    }

    // Add runtime config
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} }
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
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

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignUpButton`,
      filePath: resolver.resolve('./runtime/components/SignUpButton.vue'),
    })

    // Add the sign-in route
    extendPages((pages) => {
      pages.push({
        name: 'auth-sign-in',
        path: resolvedOptions.routes.signIn,
        file: resolver.resolve('./runtime/pages/sign-in.vue'),
      })
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
