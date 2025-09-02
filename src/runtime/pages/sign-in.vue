<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold">
          {{ locale.t('signInTitle') }}
        </h2>
        <p class="mt-2 text-sm">
          {{ locale.t('signInDescription') }}
        </p>
      </div>

      <UButton
        :label="locale.t('continueWithProvider')"
        :leading-icon="providerIcon"
        size="lg"
        block
        @click="handleSignIn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthUILocale, useAppConfig, navigateTo, computed } from '#imports'

const locale = useAuthUILocale()
const appConfig = useAppConfig()

// Get icon with proper typing
const providerIcon = computed(() => {
  const ui = appConfig.ui as { icons?: Record<string, string> }
  return ui?.icons?.authProvider
})

const handleSignIn = async () => {
  await navigateTo('/sign-in')
}
</script>
