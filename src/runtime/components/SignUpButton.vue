<template>
  <UButton
    v-if="persistent || !auth.isAuthenticated.value"
    :label="t('auth.signUp')"
    :leading-icon="signUpIcon"
    :to="mock ? undefined : auth.getAuthUrl('sign-up')"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
import { computed, useAppConfig, useFinalAuth, useI18n } from '#imports'

defineProps<{
  persistent?: boolean
}>()

const auth = useFinalAuth()
const { t } = useI18n()
const appConfig = useAppConfig()
const config = useRuntimeConfig()

// Check if in mock mode
const mock = config.public.auth?.mock === true

// Get icon with proper typing
const signUpIcon = computed(() => {
  return (appConfig.ui as Record<string, Record<string, string>>)?.icons
    ?.authSignUp
})
</script>
