<template>
  <UButton
    v-if="persistent || !auth.isAuthenticated.value"
    :label="locale.t('signIn')"
    :leading-icon="appConfig.ui?.icons?.authSignIn"
    :to="auth.getAuthUrl('sign-in')"
  >
    <slot v-if="$slots.default" />
  </UButton>
</template>

<script setup lang="ts">
import { useAuthUI, useAuthUILocale, useAppConfig } from '#imports'

interface Props {
  persistent?: boolean
}

defineProps<Props>()

const auth = useAuthUI()
const locale = useAuthUILocale()
const appConfig = useAppConfig()
</script>
