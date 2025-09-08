<template>
  <UForm
    class="max-w-md space-y-6 w-full"
    :schema="signInSchema"
    :state="state"
    :validate-on="mock ? [] : undefined"
    @submit="onSubmit"
  >
    <SocialProviderButtons
      v-if="social"
      :mock="mock"
      :loading="loading"
      @click="handleSocialSignIn"
    />

    <USeparator
      v-if="social && socialProviders.length > 0"
      :label="locale.t('or')"
    />

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

    <UFormField
      name="password"
      :label="locale.t('password')"
    >
      <template #help>
        <ULink :to="mock ? undefined : forgotPasswordUrl">
          {{ locale.t('forgotPassword') }}
        </ULink>
      </template>
      <UInput
        v-model="state.password"
        class="w-full"
        type="password"
        autocomplete="current-password"
        :disabled="loading"
        size="lg"
      />
    </UFormField>

    <UCheckbox
      v-model="state.rememberMe"
      :label="locale.t('rememberMe')"
      :disabled="loading"
    />

    <!-- Inline error display for general form errors -->
    <UAlert
      v-if="error"
      color="error"
      variant="solid"
      :title="locale.t('signInFailed')"
      :description="error"
      :close-button="{ variant: 'link', color: 'white', size: 'xs' }"
      @close="error = null"
    />

    <div :class="$slots.default || secondary ? 'flex gap-x-4' : undefined">
      <SignUpButton
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
  </UForm>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthUILocale, useAuthUI } from '#imports'
import { signInSchema, type SignInFormData } from '../utils/validation'
import type { SocialProvider } from '../types/config'
import SocialProviderButtons from './SocialProviderButtons.vue'
import SignUpButton from './SignUpButton.vue'

// Define props
const props = withDefaults(defineProps<{
  mock?: boolean
  social?: boolean
  secondary?: boolean
}>(), {
  mock: false,
  social: true,
  secondary: true,
})

// Define emits
const emit = defineEmits<{
  submit: [data: SignInFormData & { provider?: string }]
  success: []
}>()

// Composables
const locale = useAuthUILocale()
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
