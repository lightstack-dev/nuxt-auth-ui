<template>
  <UHeader>
    <template #title>
      <LightstackLogogram202508 class="max-h-4 w-auto" />
      nuxt-auth-ui
    </template>
    <UNavigationMenu
      class="justify-center w-full"
      :items="items"
      :ui="{ list: 'gap-x-2' }"
    />
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
  <UMain>
    <NuxtPage />
  </UMain>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { t } = useI18n({ useScope: 'local' })

const items = computed<NavigationMenuItem[]>(() => [
  {
    active: route.path.startsWith('/docs'),
    icon: 'i-lucide-book-open',
    label: t('docs'),
    to: '/docs',
  },
  {
    icon: 'i-simple-icons-github',
    label: 'GitHub',
    target: '_blank',
    to: 'https://github.com/lightstack-dev/nuxt-auth-ui',
  },
])
</script>

<i18n lang="yaml">
en:
  docs: Docs
</i18n>
