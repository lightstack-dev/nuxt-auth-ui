<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <!-- Logo and branding -->
      <div class="text-center">
        <img
          v-if="appConfig.authUi?.logo"
          :src="appConfig.authUi.logo"
          :alt="appConfig.authUi?.appName || 'Logo'"
          class="mx-auto h-12 w-auto"
        >
        <h2 class="mt-6 text-3xl font-bold tracking-tight">
          {{ t("auth.signUpTitle") }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ t("auth.signUpDescription") }}
        </p>
      </div>

      <!-- Sign-up form -->
      <SignUpForm @success="handleSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n, useAppConfig, navigateTo } from '#imports'
import SignUpForm from '../components/SignUpForm.vue'

// Composables
const { t } = useI18n()
const appConfig = useAppConfig() as {
  authUi?: {
    logo?: string
    appName?: string
    redirects?: { afterSignIn?: string }
  }
}

// Handlers
const handleSuccess = () => {
  // Show success message (toast functionality would need to be added)
  console.log(t('auth.signUpSuccess'), t('auth.welcomeMessage'))

  // Redirect to the configured after sign-up URL or default dashboard
  const redirectUrl = appConfig.authUi?.redirects?.afterSignIn || '/dashboard'
  navigateTo(redirectUrl)
}
</script>
