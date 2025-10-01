import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFinalAuth } from '../../src/runtime/composables/useFinalAuth'

// Mock the imports
vi.mock('#imports', () => ({
  useRuntimeConfig: vi.fn(() => ({
    public: {
      auth: {
        routes: {
          signIn: '/auth/sign-in',
          signUp: '/auth/sign-up',
          signOut: '/auth/sign-out',
          profile: '/auth/profile',
        },
        redirects: {
          afterSignIn: '/dashboard',
          afterSignOut: '/',
        },
      },
    },
  })),
  useFetch: vi.fn(() => ({
    data: { value: { connectors: [] } },
  })),
  useNuxtData: vi.fn(() => ({
    value: null,
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  navigateTo: vi.fn(),
  ref: vi.fn(val => ({ value: val })),
  computed: vi.fn(fn => ({ value: fn() })),
}))

describe('useFinalAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return helper utilities', () => {
    const auth = useFinalAuth()

    expect(auth).toHaveProperty('getAuthUrl')
    expect(auth).toHaveProperty('getSocialProviders')
    // Minimal composable - no auth operations (use Supabase directly)
    expect(auth).not.toHaveProperty('signIn')
    expect(auth).not.toHaveProperty('signOut')
    expect(auth).not.toHaveProperty('user')
  })

  it('should return correct auth URLs', () => {
    const auth = useFinalAuth()

    expect(auth.getAuthUrl('sign-in')).toBe('/auth/sign-in')
    expect(auth.getAuthUrl('sign-up')).toBe('/auth/sign-up')
    expect(auth.getAuthUrl('profile')).toBe('/auth/profile')
    expect(auth.getAuthUrl('reset')).toBe('/auth/reset')
  })

  it('should handle unknown route types', () => {
    const auth = useFinalAuth()

    // @ts-expect-error Testing invalid route type
    expect(auth.getAuthUrl('invalid')).toBeUndefined()
  })

  it('should not provide auth operation methods', () => {
    const auth = useFinalAuth()

    // Auth operations should be done via Supabase composables directly
    expect(auth.signIn).toBeUndefined()
    expect(auth.signUp).toBeUndefined()
    expect(auth.signOut).toBeUndefined()
  })

  it('should provide social providers functionality', () => {
    const auth = useFinalAuth()

    expect(typeof auth.getSocialProviders).toBe('function')
    expect(auth.getSocialProviders()).toEqual([])
  })
})
