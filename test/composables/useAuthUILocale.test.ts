import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthUILocale } from '../../src/runtime/composables/useAuthUILocale'

// Reset module-level variables before each test
beforeEach(() => {
  vi.resetModules()
})

// Mock the imports
vi.mock('#imports', () => ({
  useRuntimeConfig: vi.fn(() => ({
    public: {
      authUi: {
        messages: {
          signIn: 'Custom Sign In',
        },
      },
    },
  })),
  computed: vi.fn(fn => ({ value: fn() })),
}))

describe('useAuthUILocale', () => {
  it('should return translation function and locale info', () => {
    const locale = useAuthUILocale()

    expect(locale).toHaveProperty('t')
    expect(locale).toHaveProperty('locale')
    expect(locale).toHaveProperty('messages')
    expect(typeof locale.t).toBe('function')
  })

  it('should return default English translations', () => {
    const locale = useAuthUILocale()

    expect(locale.t('signIn')).toBe('Custom Sign In') // Overridden
    expect(locale.t('signOut')).toBe('Sign Out') // Default
    expect(locale.t('signUp')).toBe('Sign Up') // Default
    expect(locale.t('profile')).toBe('Profile') // Default
  })

  it('should return custom messages when configured', () => {
    const locale = useAuthUILocale()

    // Custom message from config
    expect(locale.t('signIn')).toBe('Custom Sign In')
  })

  it('should fallback to key when translation not found', () => {
    const locale = useAuthUILocale()

    // @ts-expect-error Testing invalid key
    expect(locale.t('nonExistentKey')).toBe('nonExistentKey')
  })

  it('should have correct default locale', () => {
    const locale = useAuthUILocale()

    expect(locale.locale.value).toBe('en')
  })

  it('should provide all default message keys', () => {
    const locale = useAuthUILocale()
    const messages = locale.messages.value

    // Check important keys exist
    expect(messages).toHaveProperty('signIn')
    expect(messages).toHaveProperty('signOut')
    expect(messages).toHaveProperty('signUp')
    expect(messages).toHaveProperty('signInTitle')
    expect(messages).toHaveProperty('signInDescription')
    expect(messages).toHaveProperty('forgotPassword')
    expect(messages).toHaveProperty('rememberMe')
    expect(messages).toHaveProperty('alreadyHaveAccount')
    expect(messages).toHaveProperty('dontHaveAccount')
  })
})

describe('useAuthUILocale with i18n', () => {
  beforeEach(() => {
    vi.resetModules()
    // Mock global useI18n function
    global.useI18n = vi.fn(() => ({
      locale: { value: 'en' },
      t: vi.fn((key: string) => {
        if (key === 'authUi.signIn') return 'i18n Sign In'
        return key
      }),
    }))
  })

  it('should use i18n translations when available', async () => {
    // Re-import to get fresh module with mocked useI18n
    const { useAuthUILocale: freshUseAuthUILocale } = await import('../../src/runtime/composables/useAuthUILocale')
    const locale = freshUseAuthUILocale()

    expect(locale.t('signIn')).toBe('i18n Sign In')
  })

  it('should fallback to default when i18n key not found', async () => {
    const { useAuthUILocale: freshUseAuthUILocale } = await import('../../src/runtime/composables/useAuthUILocale')
    const locale = freshUseAuthUILocale()

    // i18n returns the key when not found, so we fallback to our messages
    expect(locale.t('signOut')).toBe('Sign Out')
  })
})
