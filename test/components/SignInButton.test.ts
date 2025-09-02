import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SignInButton from '../../src/runtime/components/SignInButton.vue'

// Mock UButton component
vi.mock('#imports', () => ({
  useAuthUI: vi.fn(() => ({
    isAuthenticated: { value: false },
    getAuthUrl: vi.fn((type: string) => `/auth/${type}`),
  })),
  useAuthUILocale: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        signIn: 'Sign In',
      }
      return translations[key] || key
    }),
  })),
  useAppConfig: vi.fn(() => ({
    ui: {
      icons: {
        authSignIn: 'i-heroicons-arrow-right-on-rectangle',
      },
    },
  })),
  computed: vi.fn(fn => ({ value: fn() })),
}))

// Mock UButton component
const UButton = {
  name: 'UButton',
  props: ['label', 'leadingIcon', 'to'],
  template: '<button><slot /></button>',
}

describe('SignInButton', () => {
  it('should render when user is not authenticated', () => {
    const wrapper = mount(SignInButton, {
      global: {
        components: { UButton },
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should not render when user is authenticated', () => {
    vi.mocked(vi.fn()).mockImplementation(() => ({
      isAuthenticated: { value: true },
      getAuthUrl: vi.fn(),
    }))

    const wrapper = mount(SignInButton, {
      global: {
        components: { UButton },
        mocks: {
          useAuthUI: () => ({
            isAuthenticated: { value: true },
            getAuthUrl: vi.fn(),
          }),
        },
      },
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('should render when persistent prop is true even if authenticated', () => {
    const wrapper = mount(SignInButton, {
      props: {
        persistent: true,
      },
      global: {
        components: { UButton },
        mocks: {
          useAuthUI: () => ({
            isAuthenticated: { value: true },
            getAuthUrl: vi.fn(),
          }),
        },
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should use slot content when provided', () => {
    const wrapper = mount(SignInButton, {
      slots: {
        default: 'Custom Text',
      },
      global: {
        components: { UButton },
      },
    })

    expect(wrapper.text()).toContain('Custom Text')
  })

  it('should pass correct props to UButton', () => {
    const wrapper = mount(SignInButton, {
      global: {
        components: { UButton },
      },
    })

    const button = wrapper.findComponent(UButton)
    expect(button.props('to')).toBe('/auth/sign-in')
    expect(button.props('leadingIcon')).toBe('i-heroicons-arrow-right-on-rectangle')
    expect(button.props('label')).toBe('Sign In')
  })
})
