<template>
  <UPageSection
    :icon="icon"
    :title="title"
  >
    <UPageCard
      class="max-w-md mx-auto w-full"
      :title="cardTitle"
    >
      <slot />
    </UPageCard>
    <ALegalConsent :context="context" />
  </UPageSection>
</template>

<script setup lang="ts">
import { computed, useAppConfig, useI18n } from '#imports'

const appConfig = useAppConfig()
const { t } = useI18n()

// Define props
const props = defineProps<{
  context: 'signIn' | 'signUp'
}>()

// Get icon with proper typing
interface AppConfigWithIcons {
  ui?: {
    icons?: {
      authSignIn?: string
      authSignUp?: string
    }
  }
}

const icon = computed(() => {
  const iconKey = `auth${props.context.charAt(0).toUpperCase() + props.context.slice(1)}` as 'authSignIn' | 'authSignUp'
  return (appConfig as AppConfigWithIcons).ui?.icons?.[iconKey]
})

const title = t(`auth.${props.context}`)
const cardTitle = t(`auth.${props.context}Title`)
</script>
