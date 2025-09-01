import { useRuntimeConfig, computed, navigateTo } from '#imports'

// Declare the Logto types that will be available at runtime
declare global {
  const useLogtoUser: () => {
    sub: string
    username?: string
    email?: string
    name?: string
    picture?: string
  } | null
}

export interface AuthUIUser {
  id: string
  username?: string
  primaryEmail?: string
  name?: string
  avatar?: string
}

export function useAuthUI() {
  // useLogtoUser is auto-imported by Logto module in the consuming app
  const logtoUser = typeof useLogtoUser !== 'undefined' ? useLogtoUser() : null
  const config = useRuntimeConfig().public.authUi || {}

  const isAuthenticated = computed(() => !!logtoUser)

  const user = computed<AuthUIUser | null>(() => {
    if (!logtoUser) return null

    return {
      id: logtoUser.sub,
      username: logtoUser.username,
      primaryEmail: logtoUser.email,
      name: logtoUser.name,
      avatar: logtoUser.picture,
    }
  })

  const signIn = async () => {
    // Navigate to our auth sign-in page
    await navigateTo(getAuthUrl('sign-in'))
  }

  const signUp = async () => {
    // Navigate to our auth sign-up page
    await navigateTo(getAuthUrl('sign-up'))
  }

  const signOut = async () => {
    // Navigate to Logto's sign-out route
    // This is Logto's route, not ours
    await navigateTo('/sign-out')
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
    user,

    // Actions
    signIn,
    signUp,
    signOut,

    // Utilities
    getAuthUrl,
  }
}
