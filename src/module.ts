import { defineNuxtModule, addPlugin, addImports, addComponent, addTypeTemplate, createResolver, extendPages, addServerHandler, addRouteMiddleware, hasNuxtModule, installModule, useLogger } from '@nuxt/kit'
import type { authConfig, ResolvedAuthConfig } from './runtime/types/config'

export default defineNuxtModule<authConfig>({
  meta: {
    name: '@lightstack-dev/nuxt-final-auth',
    configKey: 'auth',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    mock: false,
    routes: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      signOut: '/auth/sign-out',
      profile: '/auth/profile',
      reset: '/auth/reset',
    },
    componentPrefix: 'A',
    redirects: {
      afterSignIn: '/',
      afterSignOut: '/',
    },
    middleware: {
      protectByDefault: true,
      name: 'auth',
      exceptionRoutes: [],
    },
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const logger = useLogger('@lightstack-dev/nuxt-final-auth')

    // Validate configuration
    if (typeof options.mock !== 'boolean') {
      throw new TypeError('auth.mock must be a boolean value')
    }

    // Warn about mock mode in production
    if (options.mock && process.env.NODE_ENV === 'production') {
      logger.warn('Mock mode is enabled in production environment')
    }

    // Auto-install required modules
    if (!hasNuxtModule('@nuxtjs/i18n')) {
      await installModule('@nuxtjs/i18n', {
        locales: ['en'],
        defaultLocale: 'en',
      })
    }

    if (!hasNuxtModule('@nuxt/ui')) {
      await installModule('@nuxt/ui')
    }

    // Check for required Supabase module (peer dependency)
    // Only warn during prepare/build, but allow it to continue
    if (!options.mock && !hasNuxtModule('@nuxtjs/supabase')) {
      logger.warn('Missing required peer dependency: @nuxtjs/supabase')
      logger.info('Install with: npm install @nuxtjs/supabase')
      logger.info('The module will not function without @nuxtjs/supabase')
    }

    // Extend app.config with our defaults
    // This merges with user's app.config automatically
    nuxt.hook('app:resolve', (app) => {
      app.configs.push(resolver.resolve('./runtime/app.config'))
    })

    // Merge options with defaults to ensure all values are defined
    const resolvedOptions: ResolvedAuthConfig = {
      mock: options.mock || false,
      routes: {
        signIn: options.routes?.signIn || '/auth/sign-in',
        signUp: options.routes?.signUp || '/auth/sign-up',
        signOut: options.routes?.signOut || '/auth/sign-out',
        profile: options.routes?.profile || '/auth/profile',
        reset: options.routes?.reset || '/auth/reset',
      },
      componentPrefix: options.componentPrefix || 'A',
      redirects: {
        afterSignIn: options.redirects?.afterSignIn || '/',
        afterSignOut: options.redirects?.afterSignOut || '/',
      },
      middleware: options.middleware === false
        ? false
        : {
            protectByDefault: options.middleware?.protectByDefault ?? true,
            name: options.middleware?.name || 'auth',
            exceptionRoutes: options.middleware?.exceptionRoutes || [],
          },
      legal: options.legal,
      socialProviders: options.socialProviders,
    }

    // Add runtime config
    // NOTE: Runtime config is properly typed via addTypeTemplate for consuming applications
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} }
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    // Runtime config assignment with type assertion
    // This is needed because Nuxt's runtime config type inference expects concrete types,
    // but our ResolvedAuthConfig contains union types (e.g., middleware: false | object).
    // The runtime values are safe, and consumers get proper types via our addTypeTemplate.
    nuxt.options.runtimeConfig.public.auth = resolvedOptions as typeof nuxt.options.runtimeConfig.public.auth

    // Use i18n:registerModule hook to provide our translations
    // This is the official way for modules to provide translations in i18n v8+
    nuxt.hook('i18n:registerModule', (register) => {
      register({
        // langDir path needs to be resolved
        langDir: resolver.resolve('./runtime/locales'),
        locales: [
          {
            code: 'en',
            file: 'en.json',
          },
        ],
      })
    })

    // Auto-import composables
    addImports([
      {
        name: 'useFinalAuth',
        from: resolver.resolve('./runtime/composables/useFinalAuth'),
      },
    ])

    // Add type declarations using best practice for module authors
    // This generates types at runtime for consuming apps
    addTypeTemplate({
      filename: 'types/auth-ui.d.ts',
      getContents: () => `
declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: {
      icons?: {
        // Auth-specific icons
        authSignIn?: string
        authSignUp?: string
        authSignOut?: string
        authUser?: string
        authProfile?: string
        authSettings?: string
        authSecurity?: string
        authPassword?: string
        authEmail?: string
        authSocial?: string
        authGoogle?: string
        authGitHub?: string
        authMicrosoft?: string
        authProvider?: string
        [key: string]: string | undefined
      }
      [key: string]: unknown
    }
  }
}

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    public: {
      auth?: {
        mock: boolean
        routes: {
          signIn: string
          signUp: string
          signOut: string
          profile: string
          reset: string
        }
        componentPrefix: string
        redirects: {
          afterSignIn: string
          afterSignOut: string
        }
        middleware: false | {
          protectByDefault: boolean
          name: string
          exceptionRoutes: string[]
        }
        legal?: {
          termsOfService?: string
          privacyPolicy?: string
          cookiePolicy?: string
        }
        socialProviders?: string[]
        [key: string]: unknown
      }
      [key: string]: unknown
    }
  }
}

export {}
      `,
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}FormSection`,
      filePath: resolver.resolve('./runtime/components/FormSection.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}LegalConsent`,
      filePath: resolver.resolve('./runtime/components/LegalConsent.vue'),
    })

    // Register components with configurable prefix
    addComponent({
      name: `${resolvedOptions.componentPrefix}SignInButton`,
      filePath: resolver.resolve('./runtime/components/SignInButton.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignInForm`,
      filePath: resolver.resolve('./runtime/components/SignInForm.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignUpButton`,
      filePath: resolver.resolve('./runtime/components/SignUpButton.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SignUpForm`,
      filePath: resolver.resolve('./runtime/components/SignUpForm.vue'),
    })

    addComponent({
      name: `${resolvedOptions.componentPrefix}SocialProviderButtons`,
      filePath: resolver.resolve('./runtime/components/SocialProviderButtons.vue'),
    })

    // Server API routes removed - all auth operations handled by Supabase client
    // Social providers and password policies are configured in nuxt.config.ts

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

    // Add route middleware (always global, behavior controlled by config)
    addRouteMiddleware({
      name: 'auth',
      path: resolver.resolve('./runtime/middleware/auth.global.ts'),
      global: true,
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
