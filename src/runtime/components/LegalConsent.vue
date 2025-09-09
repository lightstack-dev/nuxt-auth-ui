<template>
  <div
    v-if="showConsent && consentItems.length > 0"
    class="mt-12 text-center text-xs text-muted"
  >
    <p>{{ consentMessage }}</p>
    <div class="flex flex-wrap justify-center gap-x-2">
      <template
        v-for="(item, index) in consentItems"
        :key="item.key"
      >
        <ULink
          :to="mock ? undefined : item.url"
          target="_blank"
        >
          {{ t(`auth.${item.key}`) }}
        </ULink>
        <span v-if="index < consentItems.length - 1">·</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useI18n, useRuntimeConfig } from '#imports'

// Define props
const props = withDefaults(
  defineProps<{
    legal?: boolean | string[]
    context?: 'sign-in' | 'sign-up' | 'general'
    mock?: boolean
  }>(),
  {
    legal: true,
    context: 'general',
    mock: false,
  },
)

// Composables
const { t } = useI18n()

// Computed properties
const showConsent = computed(() => {
  return props.legal !== false
})

const consentMessage = computed(() => {
  switch (props.context) {
    case 'sign-up':
      return t('auth.signUpConsent')
    case 'sign-in':
      return t('auth.signInConsent')
    default:
      return t('auth.generalConsent')
  }
})

const consentItems = computed(() => {
  if (!props.legal) return []

  // Get legal config from runtime config (nuxt.config.ts authUi.legal)
  const runtimeConfig = useRuntimeConfig()
  const moduleConfig = (runtimeConfig.public.authUi || {}) as Record<
    string,
    unknown
  >
  const legal = moduleConfig.legal || {}
  const items: Array<{ key: string, url: string }> = []

  // If legal is true, use all configured legal documents
  if (props.legal === true) {
    Object.entries(legal).forEach(([key, url]) => {
      if (url) items.push({ key, url })
    })
  }
  else if (Array.isArray(props.legal)) {
    // If legal is an array, use only specified items
    props.legal.forEach((key) => {
      const url = legal[key as keyof typeof legal]
      if (url) items.push({ key, url: url as string })
    })
  }

  return items
})
</script>
