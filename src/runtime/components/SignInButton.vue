<template>
  <UButton
    v-if="persistent || !auth.isAuthenticated.value"
    :label="locale.t('signIn')"
    :leading-icon="signInIcon"
    :to="auth.getAuthUrl('sign-in')"
  >
    <slot v-if="$slots.default" />
  </UButton>
</template>

<script setup lang="ts">
import { useAuthUI, useAuthUILocale, useAppConfig, computed } from '#imports'

defineProps<{
  persistent?: boolean
}>()

const auth = useAuthUI()
const locale = useAuthUILocale()
const appConfig = useAppConfig()

// Get icon with proper typing
const signInIcon = computed(() => {
  const ui = appConfig.ui as { icons?: Record<string, string> }
  return ui?.icons?.authSignIn
})
</script>
