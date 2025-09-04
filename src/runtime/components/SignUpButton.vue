<template>
  <UButton
    v-if="persistent || !auth.isAuthenticated.value"
    :label="locale.t('signUp')"
    :leading-icon="signUpIcon"
    :to="auth.getAuthUrl('sign-up')"
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
const signUpIcon = computed(() => {
  return appConfig.ui?.icons?.authSignUp
})
</script>
