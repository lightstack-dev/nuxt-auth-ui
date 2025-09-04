export interface SocialProvider {
  name: string
  label?: string
  icon?: string
  enabled?: boolean
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
  messages?: Record<string, string>
  socialProviders?: SocialProvider[]
}
