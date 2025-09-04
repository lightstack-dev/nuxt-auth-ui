<template>
  <AContainer 
    :title="locale.t('signInTitle')"
    :description="locale.t('signInDescription')"
  >
    <ASignInForm 
      ref="signInForm"
      @submit="handleSignIn" 
      @success="handleSuccess"
    />

    <template #footer>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ locale.t('dontHaveAccount') }}
        <UButton
          variant="link"
          :to="signUpUrl"
          class="p-0 font-medium"
        >
          {{ locale.t('signUp') }}
        </UButton>
      </p>
    </template>
  </AContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthUILocale, useAuthUI, useRuntimeConfig, navigateTo } from '#imports'
import type { SignInFormData } from '../utils/validation'

// Composables
const locale = useAuthUILocale()
const auth = useAuthUI()
const runtimeConfig = useRuntimeConfig()
const config = (runtimeConfig.public.authUi || {}) as { routes?: { signUp?: string }; redirects?: { afterSignIn?: string } }

// Template refs
const signInForm = ref()

// Computed
const signUpUrl = computed(() => config.routes?.signUp || '/auth/sign-up')
const redirectUrl = computed(() => config.redirects?.afterSignIn || '/')

// Methods
const handleSignIn = async (data: SignInFormData & { provider?: string }) => {
  try {
    signInForm.value?.setLoading(true)
    signInForm.value?.setError(null)

    if (data.provider) {
      // Handle social sign-in
      await auth.signInWithSocial(data.provider)
    } else {
      // Handle email/password sign-in
      await auth.signIn(data.email, data.password, data.rememberMe)
    }

    // Success handled in handleSuccess
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to sign in'
    signInForm.value?.setError(errorMessage)
  } finally {
    signInForm.value?.setLoading(false)
  }
}

const handleSuccess = async () => {
  // Show success toast only on navigation
  if (process.client && window.$toast) {
    window.$toast.add({
      title: locale.t('signInSuccess'),
      icon: 'i-lucide-check-circle',
      color: 'green',
    })
  }
  
  // Navigate to redirect URL
  await navigateTo(redirectUrl.value)
}
</script>
