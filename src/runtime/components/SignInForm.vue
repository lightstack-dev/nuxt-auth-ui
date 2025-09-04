<template>
  <UForm 
    :schema="signInSchema" 
    :state="state" 
    class="space-y-6"
    @submit="onSubmit"
  >
    <UFormField name="email" :label="locale.t('email')">
      <UInput 
        v-model="state.email"
        type="email"
        :placeholder="locale.t('email')"
        autocomplete="email"
        :disabled="loading"
        size="lg"
      />
    </UFormField>

    <UFormField name="password" :label="locale.t('password')">
      <UInput 
        v-model="state.password"
        type="password"
        :placeholder="locale.t('password')"
        autocomplete="current-password"
        :disabled="loading"
        size="lg"
      />
    </UFormField>

    <div class="flex items-center justify-between">
      <UCheckbox 
        v-model="state.rememberMe" 
        :label="locale.t('rememberMe')"
        :disabled="loading"
      />
      
      <UButton
        variant="link"
        size="sm"
        :to="forgotPasswordUrl"
        :disabled="loading"
        class="p-0"
      >
        {{ locale.t('forgotPassword') }}
      </UButton>
    </div>

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

    <div class="space-y-4">
      <UButton
        type="submit"
        size="lg"
        block
        :loading="loading"
        :disabled="loading"
      >
        {{ locale.t('signIn') }}
      </UButton>

      <!-- Social providers section -->
      <div v-if="socialProviders.length > 0">
        <UDivider :label="locale.t('orContinueWith')" />
        
        <div class="grid gap-3" :class="socialProviders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'">
          <UButton
            v-for="provider in socialProviders"
            :key="provider.name"
            variant="outline"
            size="lg"
            :leading-icon="provider.icon"
            :disabled="loading"
            @click="handleSocialSignIn(provider)"
          >
            {{ provider.label }}
          </UButton>
        </div>
      </div>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthUILocale, useRuntimeConfig } from '#imports'
import { signInSchema, type SignInFormData } from '../utils/validation'

// Define emits
const emit = defineEmits<{
  submit: [data: SignInFormData & { provider?: string }]
  success: []
}>()

// Composables
const locale = useAuthUILocale()
const runtimeConfig = useRuntimeConfig()
const config = (runtimeConfig.public.authUi || {}) as { routes?: { passwordReset?: string } }

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)

const state = ref<SignInFormData>({
  email: '',
  password: '',
  rememberMe: false,
})

// Computed
const forgotPasswordUrl = computed(() => {
  return config.routes?.passwordReset || '/auth/password-reset'
})

// Mock social providers - in real implementation this would be detected from Logto
const socialProviders = computed(() => [
  {
    name: 'google',
    label: locale.t('continueWithGoogle'),
    icon: 'i-simple-icons-google',
  },
  // Add more providers as needed
])

// Methods
const onSubmit = async (data: SignInFormData) => {
  loading.value = true
  error.value = null
  
  try {
    emit('submit', data)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

const handleSocialSignIn = async (provider: { name: string }) => {
  loading.value = true
  error.value = null
  
  try {
    emit('submit', { 
      email: '', 
      password: '', 
      provider: provider.name 
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
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
      rememberMe: false,
    }
    error.value = null
  },
})
</script>