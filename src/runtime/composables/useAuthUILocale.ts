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
    // Auth actions
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signUp: 'Sign Up',

    // Page titles and descriptions
    signInTitle: 'Welcome Back',
    signInDescription: 'Sign in to your account to continue',
    signUpTitle: 'Create Account',
    signUpDescription: 'Create your account to get started',

    // Form fields
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    username: 'Username',

    // Form actions
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    acceptTerms: 'I agree to the terms and conditions',

    // Social providers (key = provider name from Logto)
    google: 'With Google',
    github: 'With GitHub',
    microsoft: 'With Microsoft',
    facebook: 'With Facebook',
    apple: 'With Apple',
    twitter: 'With Twitter',
    linkedin: 'With LinkedIn',
    discord: 'With Discord',
    gitlab: 'With GitLab',
    slack: 'With Slack',
    azure: 'With Azure AD',
    okta: 'With Okta',
    auth0: 'With Auth0',

    // Authentication options
    withEmail: 'With Email',
    or: 'OR',

    // Navigation messages
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',

    // Success messages
    signInSuccess: 'Signed in successfully!',
    signUpSuccess: 'Account created successfully!',

    // Error messages
    signInFailed: 'Sign in failed',
    signUpFailed: 'Sign up failed',
    invalidCredentials: 'Invalid email or password',
    accountNotFound: 'Account not found',
    accountExists: 'An account with this email already exists',

    // General UI
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    continue: 'Continue',
    welcome: 'Welcome',
    profile: 'Profile',
    settings: 'Settings',
    security: 'Security',
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

  const t = (key: AuthUIMessageKey | string): string => {
    // If @nuxtjs/i18n is available, try to use it first
    if (i18n && typeof i18n.t === 'function') {
      const translated = i18n.t(`authUi.${key}`)
      if (translated && translated !== `authUi.${key}`) {
        return translated
      }
    }

    // Fall back to our messages
    return messages.value[key as AuthUIMessageKey] || key
  }

  // Helper function to get social provider label
  const getProviderLabel = (providerName: string): string => {
    // Direct lookup using provider name as key
    const label = t(providerName)

    // If we have a translation, use it; otherwise fall back to generic format
    if (label !== providerName) {
      return label
    }

    // Fall back to generic "With [Provider]" format
    const providerDisplayName = providerName.charAt(0).toUpperCase() + providerName.slice(1)
    return `With ${providerDisplayName}`
  }

  return {
    t,
    getProviderLabel,
    locale: currentLocale,
    messages,
  }
}
