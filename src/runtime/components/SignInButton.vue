<template>
  <UButton
    v-if="!auth.isAuthenticated.value"
    :label="locale.t('signIn')"
    :leading-icon="appConfig.ui?.icons?.authSignIn"
    :to="auth.getAuthUrl('sign-in')"
  />
</template>

<script setup lang="ts">
import { useAuthUI, useAuthUILocale, useAppConfig } from '#imports'

const auth = useAuthUI()
const locale = useAuthUILocale()
const appConfig = useAppConfig()
</script>
