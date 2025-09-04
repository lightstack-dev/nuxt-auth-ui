import { useRuntimeConfig, computed, navigateTo } from '#imports'
import type { AuthUIConfig } from '../types/config'

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
  const runtimeConfig = useRuntimeConfig()
  const config = (runtimeConfig.public.authUi || {}) as AuthUIConfig

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

  const signIn = async (email?: string, password?: string, rememberMe?: boolean) => {
    if (!email || !password) {
      // Navigate to our auth sign-in page
      await navigateTo(getAuthUrl('sign-in'))
      return
    }

    // TODO: Integrate with Logto authentication
    // This is a placeholder implementation
    console.log('Sign in with:', { email, password, rememberMe })
    throw new Error('Authentication not yet implemented')
  }

  const signInWithSocial = async (provider: string) => {
    // TODO: Integrate with Logto social authentication
    // This is a placeholder implementation
    console.log('Sign in with social provider:', provider)
    throw new Error('Social authentication not yet implemented')
  }

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password) {
      // Navigate to our auth sign-up page
      await navigateTo(getAuthUrl('sign-up'))
      return
    }

    // TODO: Integrate with Logto registration
    // This is a placeholder implementation
    console.log('Sign up with:', { email, password, name })
    throw new Error('Registration not yet implemented')
  }

  const signOut = async () => {
    // Navigate to Logto's sign-out route
    // This is Logto's route, not ours
    await navigateTo('/sign-out')
  }

  const getAuthUrl = (type: 'sign-in' | 'sign-up' | 'profile') => {
    const routes = config.routes || {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      signOut: '/auth/sign-out',
      profile: '/auth/profile',
    }

    switch (type) {
      case 'sign-in':
        return routes.signIn || '/auth/sign-in'
      case 'sign-up':
        return routes.signUp || '/auth/sign-up'
      case 'profile':
        return routes.profile || '/auth/profile'
    }
  }

  return {
    // State
    isAuthenticated,
    user,

    // Actions
    signIn,
    signInWithSocial,
    signUp,
    signOut,

    // Utilities
    getAuthUrl,
  }
}
