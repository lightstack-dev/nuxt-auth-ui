declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    auth?: {
      routes: {
        signIn: string
        signUp: string
        signOut: string
        profile: string
        passwordReset?: string
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
    }
  }
}

export {}