<template>
  <div
    v-if="consentItems.length > 0"
    class="text-center text-xs text-muted"
  >
    <p>{{ consentMessage }}</p>
    <div class="flex flex-wrap justify-center gap-x-2">
      <template
        v-for="(item, index) in consentItems"
        :key="item.key"
      >
        <ULink
          target="_blank"
          :to="mock ? undefined : item.url"
        >
          {{ t(`auth.legal.${item.key}`) }}
        </ULink>
        <template v-if="index < consentItems.length - 1">
          ·
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useI18n, useRuntimeConfig } from '#imports'

// Define props
const props = withDefaults(
  defineProps<{
    legal?: string[]
    context?: 'signIn' | 'signUp' | 'general'
    mock?: boolean
  }>(),
  {
    context: 'general',
    mock: false,
  },
)

// Composables
const { t } = useI18n()

// Computed properties
const consentMessage = computed(() => {
  switch (props.context) {
    case 'signIn':
      return t('auth.signInConsent')
    case 'signUp':
      return t('auth.signUpConsent')
    default:
      return t('auth.generalConsent')
  }
})

const consentItems = computed(() => {
  // Get legal config from runtime config (nuxt.config.ts authUi.legal)
  const runtimeConfig = useRuntimeConfig()
  const moduleConfig = (runtimeConfig.public.authUi || {}) as Record<
    string,
    unknown
  >
  const legal = moduleConfig.legal || {}
  const items: Array<{ key: string, url: string }> = []

  if (props.legal) {
    // If legal is specified, use only those items
    props.legal.forEach((key) => {
      const url = legal[key as keyof typeof legal]
      if (url) {
        items.push({ key, url: url as string })
      }
      else if (import.meta.dev) {
        // Warn in development about missing legal document configuration
        console.warn(
          `[nuxt-auth-ui] LegalConsent: Document key "${key}" was requested but not configured in nuxt.config.ts authUi.legal`,
        )
      }
    })
  }
  else {
    // If no legal prop, use all configured legal documents
    Object.entries(legal).forEach(([key, url]) => {
      if (url) items.push({ key, url })
    })
  }

  return items
})
</script>
