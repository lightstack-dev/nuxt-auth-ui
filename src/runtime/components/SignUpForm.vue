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
          :autofocus="!mock && autofocus"
          :disabled="loading"
          :placeholder="t('auth.emailPlaceholder')"
          :size="size"
          type="email"
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
          :autofocus="!mock && verificationStep && autofocus"
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
import { computed, ref, useFinalAuth, useI18n, useSupabaseClient, useRuntimeConfig } from '#imports'
import { z } from 'zod'

import type { SignUpFormData } from '../utils/validation'

import type { SocialProvider } from '../types/config'
import SignInButton from './SignInButton.vue'
import SocialProviderButtons from './SocialProviderButtons.vue'

// Define props
withDefaults(
  defineProps<{
    social?: boolean
    secondary?: boolean
    autofocus?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
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
const config = useRuntimeConfig()
const supabase = useSupabaseClient()

// Check if in mock mode
const mock = config.public.auth?.mock ?? false

// Computed properties

// Get social providers for separator display
const socialProviders = computed<SocialProvider[]>(() => {
  return auth.getSocialProviders()
})

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)
const loadingProvider = ref<string | null>(null)
const verificationStep = ref(false)
const verificationCode = ref<number[]>([])

const state = ref<SignUpFormData>({
  email: '',
  password: '',
  passwordConfirmation: '',
})

// Password policy state - using Supabase defaults
const passwordPolicy = ref<{
  length: { min: number, max: number }
  characterTypes?: { min: number }
}>({
  length: { min: 6, max: 256 }, // Supabase default minimum is 6
})

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
  if (mock) {
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

    // Perform the actual sign-up using Supabase
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (signUpError) throw signUpError

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

// Note: Email verification is handled automatically by Supabase
// Users receive an email with a confirmation link
// The verification UI allows manual PIN entry for mock mode compatibility
const verifyCode = async () => {
  if (mock) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      console.log('[Mock] Verification code:', verificationCode.value.join(''))
      emit('success')
    }, 1000)
    return
  }

  // In real Supabase mode, users must click the link in their email
  // This PIN verification is only for mock mode
  error.value = 'Please check your email and click the verification link'
}

const resendVerification = async () => {
  if (mock) {
    console.log('[Mock] Resending verification code to:', state.value.email)
    return
  }

  loading.value = true
  error.value = null

  try {
    // Supabase: resend confirmation email
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: state.value.email,
    })

    if (resendError) throw resendError

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
