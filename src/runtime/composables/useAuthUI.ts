export interface AuthUIUser {
  id: string
  username?: string
  primaryEmail?: string
  name?: string
  avatar?: string
}

export function useAuthUI() {
  const logto = useLogto()
  const config = useRuntimeConfig().public.authUi || {}

  const isAuthenticated = computed(() => logto.isAuthenticated.value)
  const isLoading = computed(() => logto.isLoading.value)
  
  const user = computed<AuthUIUser | null>(() => {
    if (!logto.user.value) return null
    
    return {
      id: logto.user.value.sub,
      username: logto.user.value.username,
      primaryEmail: logto.user.value.primary_email,
      name: logto.user.value.name,
      avatar: logto.user.value.picture,
    }
  })

  const signIn = (redirectTo?: string) => {
    const redirect = redirectTo || config.redirects?.afterSignIn || '/'
    return logto.signIn(redirect)
  }

  const signUp = (redirectTo?: string) => {
    const redirect = redirectTo || config.redirects?.afterSignIn || '/'
    return logto.signUp(redirect)
  }

  const signOut = (redirectTo?: string) => {
    const redirect = redirectTo || config.redirects?.afterSignOut || '/'
    return logto.signOut(redirect)
  }

  const getAuthUrl = (type: 'sign-in' | 'sign-up' | 'profile') => {
    const prefix = config.prefix || '/auth'
    switch (type) {
      case 'sign-in':
        return `${prefix}/sign-in`
      case 'sign-up':
        return `${prefix}/sign-up`
      case 'profile':
        return `${prefix}/profile`
    }
  }

  return {
    // State
    isAuthenticated,
    isLoading,
    user,
    
    // Actions
    signIn,
    signUp,
    signOut,
    
    // Utilities
    getAuthUrl,
  }
}