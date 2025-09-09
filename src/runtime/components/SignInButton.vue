<template>
  <UButton
    v-if="persistent || !auth.isAuthenticated.value"
    :label="t('auth.signIn')"
    :leading-icon="signInIcon"
    :to="mock ? undefined : auth.getAuthUrl('sign-in')"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
import { computed, useAppConfig, useAuthUI, useI18n } from '#imports'

defineProps<{
  mock?: boolean
  persistent?: boolean
}>()

const auth = useAuthUI()
const { t } = useI18n()
const appConfig = useAppConfig()

// Get icon with proper typing
const signInIcon = computed(() => {
  return (appConfig.ui as Record<string, Record<string, string>>)?.icons
    ?.authSignIn
})
</script>
