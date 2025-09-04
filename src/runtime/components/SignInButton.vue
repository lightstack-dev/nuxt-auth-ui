<template>
  <UButton
    v-if="persistent || !auth.isAuthenticated.value"
    :label="locale.t('signIn')"
    :leading-icon="signInIcon"
    :to="auth.getAuthUrl('sign-in')"
  >
    <slot />
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
  return appConfig.ui?.icons?.authSignIn
})
</script>
