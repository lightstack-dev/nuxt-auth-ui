export interface AuthUIConfig {
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
}
