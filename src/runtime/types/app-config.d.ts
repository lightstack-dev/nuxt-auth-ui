declare module '@nuxt/schema' {
  interface AppConfig {
    ui?: {
      icons?: {
        // Auth-specific icons
        authSignIn?: string
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
        [key: string]: string | undefined
      }
      [key: string]: unknown
    }
  }
}

export {}