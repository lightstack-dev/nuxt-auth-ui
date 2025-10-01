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
      :size="size"
      @click="handleSocialAction(provider)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n, useFinalAuth, useAppConfig, useRuntimeConfig } from '#imports'
import type { SocialProvider } from '../types/config'

// Define props
withDefaults(defineProps<{
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  loading: false,
  size: 'md',
})

// Define emits
const emit = defineEmits<{
  click: [provider: SocialProvider]
}>()

// Composables
const { t } = useI18n()
const auth = useFinalAuth()
const appConfig = useAppConfig()
const config = useRuntimeConfig()

// Check if in mock mode
const mock = config.public.auth?.mock ?? false

// Define minimal Supabase client interface for type safety
interface SupabaseAuthClient {
  auth: {
    signInWithOAuth: (params: { provider: string, options?: { redirectTo?: string } }) => Promise<{ error: Error | null }>
  }
}

// Only initialize Supabase client if not in mock mode
let supabase: SupabaseAuthClient | null = null
if (!mock) {
  try {
    // @ts-expect-error - useSupabaseClient is auto-imported by @nuxtjs/supabase
    supabase = useSupabaseClient()
  }
  catch {
    console.warn('Supabase client not available')
  }
}

// Reactive state
const loadingProvider = ref<string | null>(null)

// Get social providers - will use configured or auto-detected
const providers = computed<SocialProvider[]>(() => {
  const socialProviders = auth.getSocialProviders()

  return socialProviders.map((provider) => {
    // Get icon from app.config, fallback to simple-icons pattern
    const iconKey = `auth${provider.name.charAt(0).toUpperCase()}${provider.name.slice(1)}`
    const appConfigIcon = (appConfig.ui as Record<string, Record<string, string>>)?.icons?.[iconKey]

    return {
      ...provider,
      label: t(`auth.${provider.name}`),
      icon: provider.icon || appConfigIcon || `i-simple-icons-${provider.name}`,
    }
  })
})

// Methods
const handleSocialAction = async (provider: SocialProvider) => {
  loadingProvider.value = provider.name

  if (mock) {
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

    // Perform social authentication using Supabase (handles both sign-in and sign-up)
    const { error } = await supabase.auth.signInWithOAuth({
      // Type assertion needed as Supabase provider type is a specific union
      provider: provider.name as 'google' | 'github' | 'gitlab' | 'bitbucket' | 'discord' | 'facebook' | 'apple' | 'azure' | 'linkedin' | 'microsoft' | 'notion' | 'slack' | 'spotify' | 'twitch' | 'twitter' | 'workos' | 'zoom',
      options: {
        redirectTo: `${window.location.origin}${config.public.auth?.redirects?.afterSignIn || '/'}`,
      },
    })

    if (error) throw error

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
