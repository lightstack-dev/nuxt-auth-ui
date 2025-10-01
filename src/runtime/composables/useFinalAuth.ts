import { useRuntimeConfig } from '#imports'
import type { authConfig, SocialProvider } from '../types/config'

/**
 * Minimal composable providing helper utilities for auth UI module.
 * For authentication operations, use Supabase composables directly:
 * - useSupabaseClient() - for auth.signInWithPassword(), auth.signUp(), etc.
 * - useSupabaseUser() - for reactive user state
 */
export function useFinalAuth() {
  const runtimeConfig = useRuntimeConfig()
  const config = (runtimeConfig.public.auth || {}) as authConfig

  const getAuthUrl = (type: 'sign-in' | 'sign-up' | 'profile' | 'reset') => {
    const routes = config.routes || {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      signOut: '/auth/sign-out',
      profile: '/auth/profile',
      reset: '/auth/reset',
    }

    switch (type) {
      case 'sign-in':
        return routes.signIn || '/auth/sign-in'
      case 'sign-up':
        return routes.signUp || '/auth/sign-up'
      case 'profile':
        return routes.profile || '/auth/profile'
      case 'reset':
        return routes.reset || '/auth/reset'
    }
  }

  // Get social providers from configuration
  const getSocialProviders = (): SocialProvider[] => {
    if (!config.socialProviders || config.socialProviders.length === 0) {
      return []
    }

    return config.socialProviders.map(name => ({
      name,
      // Labels and icons will be resolved by the consuming component
      // from i18n and app.config respectively
    }))
  }

  return {
    // Helper utilities
    getAuthUrl,
    getSocialProviders,
  }
}
