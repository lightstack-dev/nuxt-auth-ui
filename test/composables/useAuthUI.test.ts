import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthUI } from '../../src/runtime/composables/useAuthUI'

// Mock the imports
vi.mock('#imports', () => ({
  useRuntimeConfig: vi.fn(() => ({
    public: {
      authUi: {
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

describe('useAuthUI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return authentication state and methods', () => {
    const auth = useAuthUI()

    expect(auth).toHaveProperty('isAuthenticated')
    expect(auth).toHaveProperty('user')
    expect(auth).toHaveProperty('signIn')
    expect(auth).toHaveProperty('signOut')
    expect(auth).toHaveProperty('getAuthUrl')
  })

  it('should return correct auth URLs', () => {
    const auth = useAuthUI()

    expect(auth.getAuthUrl('sign-in')).toBe('/auth/sign-in')
    expect(auth.getAuthUrl('sign-up')).toBe('/auth/sign-up')
    expect(auth.getAuthUrl('profile')).toBe('/auth/profile')
    expect(auth.getAuthUrl('password-reset')).toBe('/auth/password-reset')
  })

  it('should handle unknown route types', () => {
    const auth = useAuthUI()

    // @ts-expect-error Testing invalid route type
    expect(auth.getAuthUrl('invalid')).toBeUndefined()
  })

  it('should provide sign in/out methods', () => {
    const auth = useAuthUI()

    expect(typeof auth.signIn).toBe('function')
    expect(typeof auth.signUp).toBe('function')
    expect(typeof auth.signOut).toBe('function')
  })

  it('should provide social providers functionality', () => {
    const auth = useAuthUI()

    expect(typeof auth.getSocialProviders).toBe('function')
    expect(auth.getSocialProviders()).toEqual([])
  })
})
