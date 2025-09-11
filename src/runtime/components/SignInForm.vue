<template>
  <UForm
    class="max-w-md space-y-6 w-full"
    :schema="signInSchema"
    :state="state"
    :validate-on="['change', 'input']"
    @submit="onSubmit"
  >
    <SocialProviderButtons
      v-if="social"
      :loading="loading"
      :mock="mock"
      :size="size"
      @click="handleSocialSignIn"
    />

    <USeparator
      v-if="social && socialProviders.length > 0"
      :label="t('auth.or')"
    />

    <UFormField
      :label="t('auth.email')"
      name="email"
    >
      <UInput
        v-model="state.email"
        autocomplete="email"
        :autofocus="!mock && autofocus"
        :disabled="loading"
        placeholder="email@example.com"
        :size="size"
        type="email"
      />
    </UFormField>

    <UFormField
      :label="t('auth.password')"
      name="password"
    >
      <template #help>
        <ULink :to="mock ? undefined : forgotPasswordUrl">
          {{ t("auth.forgotPassword") }}
        </ULink>
      </template>
      <UInput
        v-model="state.password"
        autocomplete="current-password"
        :disabled="loading"
        :size="size"
        type="password"
      />
    </UFormField>

    <UCheckbox
      v-model="state.rememberMe"
      :disabled="loading"
      :label="t('auth.rememberMe')"
      :size="size"
    />

    <!-- Inline error display for general form errors -->
    <UAlert
      v-if="error"
      color="error"
      :description="error"
      :title="t('auth.signInFailed')"
      variant="solid"
    />

    <div :class="$slots.default || secondary ? 'flex gap-x-4' : undefined">
      <SignUpButton
        v-if="secondary"
        block
        :mock="mock"
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
  </UForm>
</template>

<script setup lang="ts">
import { computed, ref, useI18n, useAuthUI } from '#imports'

import { signInSchema, type SignInFormData } from '../utils/validation'

import type { SocialProvider } from '../types/config'
import SignUpButton from './SignUpButton.vue'
import SocialProviderButtons from './SocialProviderButtons.vue'

// Define props
const props = withDefaults(
  defineProps<{
    mock?: boolean
    social?: boolean
    secondary?: boolean
    autofocus?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    mock: false,
    secondary: true,
    social: true,
    autofocus: true,
    size: 'md',
  },
)

// Define emits
const emit = defineEmits<{
  submit: [data: SignInFormData & { provider?: string }]
  success: []
}>()

// Composables
const { t } = useI18n()
const auth = useAuthUI()

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)
const loadingProvider = ref<string | null>(null)

const state = ref<SignInFormData>({
  email: '',
  password: '',
  rememberMe: false,
})

// Computed
const forgotPasswordUrl = computed(() => {
  return auth.getAuthUrl('password-reset')
})

// Get social providers for separator display
const socialProviders = computed<SocialProvider[]>(() => {
  return auth.getSocialProviders()
})

// Methods
const onSubmit = async (data: SignInFormData) => {
  if (props.mock) {
    // In mock mode, just show a success state briefly
    loading.value = true
    setTimeout(() => {
      loading.value = false
      console.log('[Mock] Sign in with:', data)
    }, 1000)
    return
  }

  loading.value = true
  error.value = null

  try {
    // Emit the event for parent components to handle if needed
    emit('submit', data)

    // Perform the actual sign-in
    await auth.signIn(data.email, data.password, data.rememberMe)

    // Emit success if sign-in completes
    emit('success')
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    loading.value = false
  }
}

const handleSocialSignIn = (provider: SocialProvider) => {
  error.value = null

  // Emit the event for parent components to handle if needed
  emit('submit', {
    email: '',
    password: '',
    provider: provider.name,
    rememberMe: false,
  })

  // The SocialProviderButtons component handles the actual sign-in
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
      rememberMe: false,
    }
    error.value = null
  },
})
</script>
