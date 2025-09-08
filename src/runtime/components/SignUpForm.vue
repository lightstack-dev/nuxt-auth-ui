<template>
  <UForm
    class="max-w-md space-y-6 w-full"
    :schema="signUpSchema"
    :state="state"
    :validate-on="mock ? [] : undefined"
    @submit="onSubmit"
  >
    <!-- Registration Step -->
    <template v-if="!verificationStep">
      <!-- Social providers -->
      <SocialProviderButtons
        v-if="social"
        :mock="mock"
        :loading="loading"
        @click="handleSocialSignUp"
      />

      <USeparator
        v-if="social && socialProviders.length > 0"
        :label="locale.t('or')"
      />

      <!-- Email field -->
      <UFormField
        name="email"
        :label="locale.t('email')"
      >
        <UInput
          v-model="state.email"
          class="w-full"
          type="email"
          placeholder="email@example.com"
          autocomplete="email"
          :autofocus="!mock"
          :disabled="loading"
          size="lg"
        />
      </UFormField>

      <!-- Password field -->
      <UFormField
        name="password"
        :label="locale.t('password')"
      >
        <UInput
          v-model="state.password"
          class="w-full"
          type="password"
          autocomplete="new-password"
          :disabled="loading"
          size="lg"
        />
      </UFormField>

      <!-- Confirm password field -->
      <UFormField
        name="confirmPassword"
        :label="locale.t('confirmPassword')"
      >
        <UInput
          v-model="state.confirmPassword"
          class="w-full"
          type="password"
          autocomplete="new-password"
          :disabled="loading"
          size="lg"
        />
      </UFormField>

      <!-- Error alert for registration -->
      <UAlert
        v-if="error"
        color="error"
        variant="solid"
        :title="locale.t('signUpFailed')"
        :description="error"
        :close-button="{ variant: 'link', color: 'white', size: 'xs' }"
        @close="error = null"
      />

      <!-- Action buttons -->
      <div :class="$slots.default || secondary ? 'flex gap-x-4' : undefined">
        <SignInButton
          v-if="secondary"
          block
          :mock="mock"
          variant="ghost"
        />
        <UButton
          block
          icon="i-lucide-mail"
          type="submit"
          :loading="loading"
          :disabled="loadingProvider !== null"
          :label="locale.t('withEmail')"
        />
      </div>

      <!-- Legal consent -->
      <div
        v-if="showConsent && consentItems.length > 0"
        class="mt-12 text-center text-xs text-muted"
      >
        <p>{{ locale.t('signUpConsent') }}</p>
        <div class="flex flex-wrap justify-center gap-x-2">
          <template
            v-for="(item, index) in consentItems"
            :key="item.key"
          >
            <ULink
              :to="mock ? undefined : item.url"
              target="_blank"
            >
              {{ locale.t(`legal.${item.key}`) }}
            </ULink>
            <span
              v-if="index < consentItems.length - 1"
            >·</span>
          </template>
        </div>
      </div>
    </template>

    <!-- Verification Step -->
    <template v-if="verificationStep">
      <!-- Verification alert -->
      <UAlert
        color="primary"
        variant="soft"
        :title="locale.t('verificationEmailSent')"
        :description="`${locale.t('checkEmailForCode')} ${state.email || 'email@example.com'}`"
      />

      <!-- Verification code input -->
      <UFormField
        name="verificationCode"
        :label="locale.t('verificationCode')"
      >
        <UPinInput
          v-model="verificationCode"
          :length="6"
          type="number"
          :disabled="loading"
          size="xl"
          :autofocus="!mock"
          @complete="verifyCode"
        />
      </UFormField>

      <!-- Verification action buttons -->
      <div class="flex gap-x-4">
        <UButton
          block
          variant="ghost"
          :disabled="loading"
          @click="resendVerification"
        >
          {{ locale.t('resendCode') }}
        </UButton>
        <UButton
          block
          type="button"
          :loading="loading"
          @click="verifyCode"
        >
          {{ locale.t('verify') }}
        </UButton>
      </div>
    </template>
  </UForm>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthUILocale, useAuthUI, useRuntimeConfig } from '#imports'
import { signUpSchema, type SignUpFormData } from '../utils/validation'
import SocialProviderButtons from './SocialProviderButtons.vue'
import SignInButton from './SignInButton.vue'
import type { SocialProvider } from '../types/config'

// Define props
const props = withDefaults(defineProps<{
  mock?: boolean
  social?: boolean
  secondary?: boolean
  legal?: boolean | string[]
  verification?: boolean
}>(), {
  mock: false,
  social: true,
  secondary: true,
  legal: true,
  verification: false,
})

// Define emits - simplified to just what's needed
const emit = defineEmits<{
  submit: [data: SignUpFormData & { provider?: string }]
  success: []
}>()

// Composables
const locale = useAuthUILocale()
const auth = useAuthUI()

// Computed properties
const showConsent = computed(() => {
  return props.legal !== false
})

const consentItems = computed(() => {
  if (!props.legal) return []

  // Get legal config from runtime config (nuxt.config.ts authUi.legal)
  const runtimeConfig = useRuntimeConfig()
  const moduleConfig = (runtimeConfig.public.authUi || {}) as any
  const legal = moduleConfig.legal || {}
  const items = []

  // If legal is true, use all configured legal documents
  if (props.legal === true) {
    Object.entries(legal).forEach(([key, url]) => {
      if (url) items.push({ key, url })
    })
  }
  else if (Array.isArray(props.legal)) {
    // If legal is an array, use only specified items
    props.legal.forEach((key) => {
      if (legal[key]) items.push({ key, url: legal[key] })
    })
  }

  return items
})

// Get social providers for separator display
const socialProviders = computed<SocialProvider[]>(() => {
  return auth.getSocialProviders()
})

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)
const loadingProvider = ref<string | null>(null)
const verificationStep = ref(props.verification)
const verificationCode = ref('')

const state = ref<SignUpFormData>({
  email: '',
  password: '',
  confirmPassword: '',
})

const onSubmit = async (data: SignUpFormData) => {
  if (props.mock) {
    // In mock mode, simulate registration and verification
    loading.value = true
    setTimeout(() => {
      loading.value = false
      verificationStep.value = true
      console.log('[Mock] Sign up with:', data)
    }, 1000)
    return
  }

  loading.value = true
  error.value = null

  try {
    // Emit the event for parent components to handle if needed
    emit('submit', data)

    // Perform the actual sign-up
    await auth.signUp(data.email, data.password)

    // After successful registration, show verification step
    verificationStep.value = true
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
  finally {
    loading.value = false
  }
}

const handleSocialSignUp = (provider: SocialProvider) => {
  error.value = null

  // Emit the event for parent components to handle if needed
  emit('submit', {
    email: '',
    password: '',
    confirmPassword: '',
    provider: provider.name,
  })

  // The SocialProviderButtons component handles the actual sign-up
}

const verifyCode = async () => {
  if (props.mock) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      console.log('[Mock] Verification code:', verificationCode.value)
      emit('success')
    }, 1000)
    return
  }

  loading.value = true
  error.value = null

  try {
    // TODO: Implement actual verification via API
    await auth.verifyEmail(state.value.email, verificationCode.value)

    emit('success')
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Invalid verification code'
  }
  finally {
    loading.value = false
  }
}

const resendVerification = async () => {
  if (props.mock) {
    console.log('[Mock] Resending verification code to:', state.value.email)
    return
  }

  loading.value = true
  error.value = null

  try {
    // TODO: Implement resend verification via API
    await auth.resendVerificationEmail(state.value.email)

    // Show success message
    error.value = null
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to resend code'
  }
  finally {
    loading.value = false
  }
}

// Expose methods for parent components
defineExpose({
  setLoading: (value: boolean) => {
    loading.value = value
  },
  setError: (message: string | null) => {
    error.value = message
  },
  clearForm: () => {
    state.value = {
      email: '',
      password: '',
      confirmPassword: '',
    }
    error.value = null
    verificationStep.value = false
    verificationCode.value = ''
  },
  showVerification: () => {
    verificationStep.value = true
  },
})
</script>
