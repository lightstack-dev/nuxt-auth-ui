<template>
  <UForm
    class="max-w-md space-y-6 w-full"
    :schema="signInSchema"
    :state="state"
    :validate-on="mock ? [] : undefined"
    @submit="onSubmit"
  >
    <div
      v-if="!nosocial && socialProviders.length > 0"
      class="space-y-3"
    >
      <UButton
        v-for="provider in socialProviders"
        :key="provider.name"
        block
        :icon="provider.icon"
        :label="provider.label"
        :loading="loadingProvider === provider.name"
        :disabled="loading || loadingProvider !== null"
        @click="handleSocialSignIn(provider)"
      />
    </div>

    <USeparator
      v-if="!nosocial && socialProviders.length > 0"
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
        autofocus
        :disabled="loading"
        size="lg"
      />
    </UFormField>

    <UFormField
      name="password"
      :label="locale.t('password')"
    >
      <template #help>
        <ULink
          :to="forgotPasswordUrl"
          class="text-xs"
        >
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

    <div class="flex gap-x-4">
      <ASignUpButton
        v-if="mock"
        block
        :to="undefined"
        variant="ghost"
      />
      <ASignUpButton
        v-else
        block
        variant="ghost"
      />
      <UButton
        block
        icon="i-lucide-mail"
        type="submit"
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

// Define props
const props = defineProps<{
  nosocial?: boolean
  mock?: boolean
}>()

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
const loadingProvider = ref<string | null>(null)
const error = ref<string | null>(null)

const state = ref<SignInFormData>({
  email: '',
  password: '',
  rememberMe: false,
})

// Computed
const forgotPasswordUrl = computed(() => {
  // TODO: Get this from config once we refactor how config is accessed
  return '/auth/password-reset'
})

// Get social providers - will use configured or auto-detected
const socialProviders = computed<SocialProvider[]>(() => {
  const providers = auth.getSocialProviders()

  return providers.map(provider => ({
    ...provider,
    // Use explicitly configured label, or fall back to localized label
    label: provider.label || locale.getProviderLabel(provider.name),
    icon: provider.icon || `i-simple-icons-${provider.name}`,
  }))
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
    emit('submit', data)
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
  finally {
    loading.value = false
  }
}

const handleSocialSignIn = async (provider: SocialProvider) => {
  loadingProvider.value = provider.name
  error.value = null

  if (props.mock) {
    // In mock mode, just show a loading state briefly
    setTimeout(() => {
      loadingProvider.value = null
      console.log('[Mock] Social sign in with:', provider.name)
    }, 1000)
    return
  }

  try {
    emit('submit', {
      email: '',
      password: '',
      provider: provider.name,
      rememberMe: false,
    })
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
  finally {
    loadingProvider.value = null
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
      rememberMe: false,
    }
    error.value = null
    loadingProvider.value = null
  },
})
</script>
