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
  mock?: boolean
  persistent?: boolean
}>()

const auth = useFinalAuth()
const { t } = useI18n()
const appConfig = useAppConfig()

// Get icon with proper typing
const signUpIcon = computed(() => {
  return (appConfig.ui as Record<string, Record<string, string>>)?.icons
    ?.authSignUp
})
</script>
