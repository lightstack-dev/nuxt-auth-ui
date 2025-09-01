import { useRuntimeConfig, computed } from '#imports'

// Runtime config interface for our module
interface AuthUIRuntimeConfig {
  locale?: string
  messages?: Record<string, Record<string, string>>
  [key: string]: unknown // Allow other auth config properties
}

// Default translations
const defaultMessages = {
  en: {
    signIn: 'Sign in',
    signOut: 'Sign out',
    signUp: 'Sign up',
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
    welcomeBack: 'Welcome back',
    createAccount: 'Create account',
    forgotPassword: 'Forgot password?',
    rememberMe: 'Remember me',
    orContinueWith: 'Or continue with',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    agreeToTerms: 'I agree to the terms and conditions',
  },
  // Add more languages as needed
  de: {
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    signUp: 'Registrieren',
    profile: 'Profil',
    settings: 'Einstellungen',
    // ... etc
  },
}

export type AuthUILocale = keyof typeof defaultMessages
export type AuthUIMessageKey = keyof typeof defaultMessages.en

export function useAuthUILocale(locale: AuthUILocale = 'en') {
  const config = useRuntimeConfig().public.authUi as AuthUIRuntimeConfig

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
    return config?.locale || locale
  })

  const messages = computed(() => {
    const lang = currentLocale.value
    return {
      ...defaultMessages.en, // Fallback to English
      ...(defaultMessages[lang as keyof typeof defaultMessages] || {}),
      ...(config?.messages?.[lang] || {}), // User overrides
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
