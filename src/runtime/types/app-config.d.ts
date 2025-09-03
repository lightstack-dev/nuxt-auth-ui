declare module '@nuxt/schema' {
  interface AppConfig {
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

  interface RuntimeConfig {
    public: {
      authUi?: {
        routes?: {
          signIn?: string
          signUp?: string
          signOut?: string
          profile?: string
        }
        componentPrefix?: string
        redirects?: {
          afterSignIn?: string
          afterSignOut?: string
        }
        middleware?: {
          global?: boolean
          name?: string
        }
        appName?: string
        logo?: string
        messages?: Record<string, string>
        [key: string]: unknown
      }
      [key: string]: unknown
    }
  }
}

export {}
