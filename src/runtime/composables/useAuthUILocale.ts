import { useRuntimeConfig, computed } from '#imports'
import type { AuthUIConfig } from '../types/config'

// Default translations
const defaultMessages = {
  en: {
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signUp: 'Sign Up',
    signInTitle: 'Welcome Back',
    signInDescription: 'Sign in to your account to continue',
    signUpTitle: 'Create Account',
    signUpDescription: 'Create your account to get started',
    continueWithProvider: 'Continue with Provider',
    // Future messages for additional components
    profile: 'Profile',
    settings: 'Settings',
    security: 'Security',
    password: 'Password',
    email: 'Email',
    username: 'Username',
    name: 'Name',
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    continue: 'Continue',
    welcome: 'Welcome',
    forgotPassword: 'Forgot password?',
    rememberMe: 'Remember me',
    orContinueWith: 'Or continue with',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    agreeToTerms: 'I agree to the terms and conditions',
  },
}

export type AuthUILocale = keyof typeof defaultMessages
export type AuthUIMessageKey = keyof typeof defaultMessages.en

export function useAuthUILocale() {
  const runtimeConfig = useRuntimeConfig()
  const config = (runtimeConfig.public.authUi || {}) as AuthUIConfig

  // Check if app is using @nuxtjs/i18n
  let i18n = null
  try {
    // @ts-expect-error - useI18n may or may not be available
    i18n = typeof useI18n !== 'undefined' ? useI18n() : null
  }
  catch {
    // useI18n not available, ignore
  }

  const currentLocale = computed(() => {
    if (i18n?.locale?.value) return i18n.locale.value as AuthUILocale
    return 'en' // Default to English
  })

  const messages = computed(() => {
    const lang = currentLocale.value
    return {
      ...defaultMessages.en, // Fallback to English
      ...(defaultMessages[lang as keyof typeof defaultMessages] || {}),
      ...(config?.messages || {}), // User overrides (simplified - no nested locale keys)
    }
  })

  const t = (key: AuthUIMessageKey): string => {
    // If @nuxtjs/i18n is available, try to use it first
    if (i18n && typeof i18n.t === 'function') {
      const translated = i18n.t(`authUi.${key}`)
      if (translated && translated !== `authUi.${key}`) {
        return translated
      }
    }

    // Fall back to our messages
    return messages.value[key] || key
  }

  return {
    t,
    locale: currentLocale,
    messages,
  }
}
