<template>
  <UForm
    class="max-w-md space-y-6 w-full"
    :schema="dynamicSignUpSchema"
    :state="state"
    :validate-on="['change', 'input']"
    @submit="onSubmit"
  >
    <!-- Registration Step -->
    <template v-if="!verificationStep">
      <!-- Social providers -->
      <SocialProviderButtons
        v-if="social"
        :loading="loading"
        :mock="!!mock"
        :size="size"
        @click="handleSocialSignUp"
      />

      <USeparator
        v-if="social && socialProviders.length > 0"
        :label="t('auth.or')"
      />

      <!-- Email field -->
      <UFormField
        :label="t('auth.email')"
        name="email"
      >
        <UInput
          v-model="state.email"
          autocomplete="email"
          :autofocus="!props.mock && autofocus"
          :disabled="loading"
          :placeholder="t('auth.emailPlaceholder')"
          :size="size"
          type="email"
          @focus="fetchPasswordPolicy"
        />
      </UFormField>

      <!-- Password field -->
      <UFormField
        :label="t('auth.password')"
        name="password"
      >
        <UInput
          v-model="state.password"
          autocomplete="new-password"
          :disabled="loading"
          :size="size"
          type="password"
        />
      </UFormField>

      <!-- Confirm password field -->
      <UFormField
        :label="t('auth.passwordConfirmation')"
        name="passwordConfirmation"
      >
        <UInput
          v-model="state.passwordConfirmation"
          autocomplete="new-password"
          :disabled="loading"
          :size="size"
          type="password"
        />
      </UFormField>

      <!-- Error alert for registration -->
      <UAlert
        v-if="error"
        color="error"
        :description="error"
        :title="t('auth.signUpFailed')"
        variant="solid"
      />

      <!-- Action buttons -->
      <div :class="$slots.default || secondary ? 'flex gap-x-4' : undefined">
        <SignInButton
          v-if="secondary"
          block
          :mock="!!mock"
          :size="size"
          variant="ghost"
        />
        <UButton
          block
          :disabled="loadingProvider !== null"
          icon="i-lucide-mail"
          :label="t('auth.withEmail')"
          :loading="loading"
          :size="size"
          type="submit"
        />
      </div>
    </template>

    <!-- Verification Step -->
    <template v-if="verificationStep">
      <!-- Verification alert -->
      <UAlert
        :description="t('auth.checkEmailForCode', {
          email: state.email || t('auth.emailPlaceholder'),
        })"
        :title="t('auth.verificationEmailSent')"
        variant="soft"
      />

      <!-- Verification code input -->
      <UFormField
        :label="t('auth.verificationCode')"
        name="verificationCode"
      >
        <UPinInput
          v-model="verificationCode"
          :autofocus="!(props.mock === true || props.mock === 'verification') && verificationStep && autofocus"
          :disabled="loading"
          :length="6"
          size="xl"
          type="number"
          @complete="verifyCode"
        />
      </UFormField>

      <!-- Verification action buttons -->
      <div class="flex gap-x-4">
        <UButton
          block
          :disabled="loading"
          :size="size"
          variant="ghost"
          @click="resendVerification"
        >
          {{ t("auth.resendCode") }}
        </UButton>
        <UButton
          block
          :loading="loading"
          :size="size"
          type="button"
          @click="verifyCode"
        >
          {{ t("auth.verify") }}
        </UButton>
      </div>
    </template>
  </UForm>
</template>

<script setup lang="ts">
import { computed, ref, useFinalAuth, useI18n } from '#imports'
import { z } from 'zod'

import type { SignUpFormData } from '../utils/validation'

import type { SocialProvider } from '../types/config'
import SignInButton from './SignInButton.vue'
import SocialProviderButtons from './SocialProviderButtons.vue'

// Define props
const props = withDefaults(
  defineProps<{
    mock?: boolean | 'verification'
    social?: boolean
    secondary?: boolean
    autofocus?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    mock: false,
    social: true,
    secondary: true,
    autofocus: true,
    size: 'md',
  },
)

// Define emits - simplified to just what's needed
const emit = defineEmits<{
  submit: [data: SignUpFormData & { provider?: string }]
  success: []
}>()

// Composables
const { t } = useI18n()
const auth = useFinalAuth()

// Computed properties

// Get social providers for separator display
const socialProviders = computed<SocialProvider[]>(() => {
  return auth.getSocialProviders()
})

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)
const loadingProvider = ref<string | null>(null)
const verificationStep = ref(props.mock === 'verification')
const verificationCode = ref<number[]>([])
const passwordPolicyFetched = ref(false)

const state = ref<SignUpFormData>({
  email: '',
  password: '',
  passwordConfirmation: '',
})

// Password policy state
const passwordPolicy = ref<{
  length: { min: number, max: number }
  characterTypes?: { min: number }
  rejects?: {
    pwned?: boolean
    repetitionAndSequence?: boolean
    userInfo?: boolean
    words?: string[]
  }
}>({
  length: { min: 8, max: 256 },
})

// Fetch password policy on email field focus
const fetchPasswordPolicy = async () => {
  if (passwordPolicyFetched.value || props.mock) return

  try {
    const policy = await auth.getPasswordPolicy()
    if (policy && 'length' in policy) {
      passwordPolicy.value = policy
      passwordPolicyFetched.value = true
    }
  }
  catch (error) {
    console.warn('Failed to fetch password policy, using defaults', error)
  }
}

// Dynamic schema based on password policy
const dynamicSignUpSchema = computed(() => {
  const minLength = passwordPolicy.value.length.min
  const maxLength = passwordPolicy.value.length.max
  const minCharTypes = passwordPolicy.value.characterTypes?.min || 0

  let passwordValidation: z.ZodString | z.ZodEffects<z.ZodString> = z
    .string()
    .min(1, t('auth.passwordRequired'))
    .min(minLength, t('auth.passwordMinLength', { min: minLength }))
    .max(maxLength, t('auth.passwordMaxLength', { max: maxLength }))

  // Only add character type validation if the policy requires it
  if (minCharTypes >= 2) {
    // Add basic character type requirements
    // Note: This is still simplified - full validation happens server-side
    passwordValidation = passwordValidation
      .refine(
        (val: string) => {
          let types = 0
          if (/[a-z]/.test(val)) types++
          if (/[A-Z]/.test(val)) types++
          if (/\d/.test(val)) types++
          if (/[^a-z\d]/i.test(val)) types++
          return types >= minCharTypes
        },
        t('auth.passwordCharacterTypes', { min: minCharTypes }),
      )
  }

  return z.object({
    email: z
      .string()
      .min(1, t('auth.emailRequired'))
      .email(t('auth.emailInvalid')),
    password: passwordValidation,
    passwordConfirmation: z
      .string()
      .min(1, t('auth.passwordConfirmationRequired')),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: t('auth.passwordMismatch'),
    path: ['passwordConfirmation'],
  })
})

const onSubmit = async (event: { data: SignUpFormData }) => {
  const data = event.data
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
    passwordConfirmation: '',
    provider: provider.name,
  })

  // The SocialProviderButtons component handles the actual sign-up
}

const verifyCode = async () => {
  if (props.mock) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      console.log('[Mock] Verification code:', verificationCode.value.join(''))
      emit('success')
    }, 1000)
    return
  }

  loading.value = true
  error.value = null

  try {
    // TODO: Implement actual verification via API
    await auth.verifyEmail(state.value.email, verificationCode.value.join(''))

    emit('success')
  }
  catch (err) {
    error.value
      = err instanceof Error ? err.message : 'Invalid verification code'
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
      passwordConfirmation: '',
    }
    error.value = null
    verificationStep.value = false
    verificationCode.value = []
  },
  showVerification: () => {
    verificationStep.value = true
  },
})
</script>
