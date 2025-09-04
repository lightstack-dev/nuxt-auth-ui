import { useRuntimeConfig, computed, navigateTo, useState, useFetch } from '#imports'
import type { AuthUIConfig, SocialProvider } from '../types/config'

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

  // Auto-detect social providers from Logto
  const { data: connectorsData } = useFetch('/api/auth-ui/connectors', {
    lazy: true,
    default: () => ({ connectors: [] }),
  })

  const autoDetectedProviders = computed<SocialProvider[]>(() => {
    if (!connectorsData.value?.connectors) return []

    return connectorsData.value.connectors.map((connector: any) => ({
      name: connector.name,
      label: connector.label,
      icon: connector.icon,
      enabled: true,
    }))
  })

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
    // Logto uses the direct sign-in parameter format: social:<provider>
    // This will redirect to the social provider's login page directly
    const directSignIn = `social:${provider}`

    // Navigate to Logto's sign-in route with the direct sign-in parameter
    // The Logto module handles the OAuth flow automatically
    await navigateTo(`/sign-in?direct_sign_in=${encodeURIComponent(directSignIn)}`)
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

  const getAuthUrl = (type: 'sign-in' | 'sign-up' | 'profile' | 'password-reset') => {
    const routes = config.routes || {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      signOut: '/auth/sign-out',
      profile: '/auth/profile',
      passwordReset: '/auth/password-reset',
    }

    switch (type) {
      case 'sign-in':
        return routes.signIn || '/auth/sign-in'
      case 'sign-up':
        return routes.signUp || '/auth/sign-up'
      case 'profile':
        return routes.profile || '/auth/profile'
      case 'password-reset':
        return routes.passwordReset || '/auth/password-reset'
    }
  }

  // Get social providers - prefer configured, fallback to auto-detected
  const getSocialProviders = () => {
    // If providers are explicitly configured, use those
    if (config.socialProviders && config.socialProviders.length > 0) {
      return config.socialProviders.filter(p => p.enabled !== false)
    }

    // Otherwise use auto-detected providers
    return autoDetectedProviders.value || []
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
    getSocialProviders,

    // Raw data (for debugging/advanced use)
    autoDetectedProviders,
  }
}
