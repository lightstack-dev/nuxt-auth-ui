export interface SocialProvider {
  name: string
  label?: string
  icon?: string
}

export interface AuthUIConfig {
  routes?: {
    signIn?: string
    signUp?: string
    signOut?: string
    profile?: string
    passwordReset?: string
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
  legal?: {
    termsOfService?: string
    privacyPolicy?: string
    cookiePolicy?: string
  }
  socialProviders?: string[]
}
