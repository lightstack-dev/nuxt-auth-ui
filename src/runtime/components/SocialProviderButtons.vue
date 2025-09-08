<template>
  <div
    v-if="providers.length > 0"
    class="space-y-3"
  >
    <UButton
      v-for="provider in providers"
      :key="provider.name"
      block
      :icon="provider.icon"
      :label="provider.label"
      :loading="loadingProvider === provider.name"
      :disabled="loading || loadingProvider !== null"
      @click="handleSocialAction(provider)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthUILocale, useAuthUI } from '#imports'
import type { SocialProvider } from '../types/config'

// Define props
const props = withDefaults(defineProps<{
  mock?: boolean
  loading?: boolean
}>(), {
  mock: false,
  loading: false,
})

// Define emits
const emit = defineEmits<{
  click: [provider: SocialProvider]
}>()

// Composables
const locale = useAuthUILocale()
const auth = useAuthUI()

// Reactive state
const loadingProvider = ref<string | null>(null)

// Get social providers - will use configured or auto-detected
const providers = computed<SocialProvider[]>(() => {
  const socialProviders = auth.getSocialProviders()

  return socialProviders.map(provider => ({
    ...provider,
    label: provider.label || locale.getProviderLabel(provider.name),
    icon: provider.icon || `i-simple-icons-${provider.name}`,
  }))
})

// Methods
const handleSocialAction = async (provider: SocialProvider) => {
  loadingProvider.value = provider.name

  if (props.mock) {
    // In mock mode, just show a loading state briefly
    setTimeout(() => {
      loadingProvider.value = null
      console.log(`[Mock] Social authentication with:`, provider.name)
    }, 1000)
    return
  }

  try {
    // Emit the event for parent components to handle
    emit('click', provider)

    // Perform social authentication (handles both sign-in and sign-up)
    await auth.signInWithSocial(provider.name)

    // Note: success event not emitted here as social actions redirect
  }
  catch (err) {
    console.error(`Social authentication failed:`, err)
    loadingProvider.value = null
  }
}

// Expose methods for parent components
defineExpose({
  setLoading: (value: boolean) => {
    if (!value) loadingProvider.value = null
  },
  clearState: () => {
    loadingProvider.value = null
  },
})
</script>
