<template>
  <UButton
    v-if="persistent || !isAuthenticated"
    :label="t('auth.signIn')"
    :leading-icon="signInIcon"
    :to="mock ? undefined : auth.getAuthUrl('sign-in')"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
import { computed, useAppConfig, useFinalAuth, useI18n, useRuntimeConfig } from '#imports'

defineProps<{
  persistent?: boolean
}>()

const auth = useFinalAuth()
const { t } = useI18n()
const appConfig = useAppConfig()
const config = useRuntimeConfig()

// Check if in mock mode
const mock = config.public.auth?.mock ?? false

// Check authentication status
let isAuthenticated = false
if (!mock) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore useSupabaseUser is auto-imported by @nuxtjs/supabase when installed
    const user = useSupabaseUser()
    isAuthenticated = !!user.value
  }
  catch {
    // Supabase not available - treat as unauthenticated
    isAuthenticated = false
  }
}

// Get icon with proper typing
const signInIcon = computed(() => {
  return (appConfig.ui as Record<string, Record<string, string>>)?.icons
    ?.authSignIn
})
</script>
