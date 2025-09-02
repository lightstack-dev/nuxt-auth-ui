import { useRuntimeConfig, computed } from '#imports'
import type { AuthUIConfig } from '../types/config'

// Type for i18n instance (when available)
interface I18nInstance {
  locale: { value: string }
  t: (key: string) => string
}

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

// Memoize i18n detection to avoid repeated try-catch
let i18nInstance: I18nInstance | undefined = undefined
let i18nChecked = false

function getI18n(): I18nInstance | undefined {
  if (!i18nChecked) {
    i18nChecked = true
    try {
      // @ts-expect-error - useI18n may or may not be available
      if (typeof useI18n !== 'undefined') {
        // @ts-expect-error - useI18n may or may not be available
        i18nInstance = useI18n()
      }
    }
    catch {
      // useI18n not available or error occurred
      console.debug('[nuxt-auth-ui] i18n module not detected, using built-in translations')
    }
  }
  return i18nInstance
}

export function useAuthUILocale() {
  const runtimeConfig = useRuntimeConfig()
  const config = (runtimeConfig.public.authUi || {}) as AuthUIConfig

  // Get memoized i18n instance
  const i18n = getI18n()

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
