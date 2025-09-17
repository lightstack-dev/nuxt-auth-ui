export interface SocialProvider {
  name: string
  label?: string
  icon?: string
}

export interface authConfig {
  mock?: boolean
  routes?: {
    signIn?: string
    signUp?: string
    signOut?: string
    profile?: string
    reset?: string
  }
  componentPrefix?: string
  redirects?: {
    afterSignIn?: string
    afterSignOut?: string
  }
  middleware?: false | {
    protectByDefault?: boolean
    name?: string
    exceptionRoutes?: string[]
  }
  legal?: {
    termsOfService?: string
    privacyPolicy?: string
    cookiePolicy?: string
  }
  socialProviders?: string[]
}

export interface ResolvedAuthConfig {
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
}
