<template>
  <div class="bg-coil">
    <UHeader>
      <template #title>
        <LightstackLogogram202508 class="max-h-4 w-auto" />
        nuxt-final-auth
      </template>
      <UNavigationMenu
        class="justify-center w-full"
        :items="headerItems"
        :ui="{ list: 'gap-x-1' }"
      />
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>
    <USeparator>
      <LightstackLogogram202508 class="text-base size-4" />
    </USeparator>
    <UFooter :ui="{ left: 'text-muted text-sm' }">
      <template #left>
        <UNavigationMenu
          :items="footerLegalItems"
          variant="link"
        />
      </template>

      <UNavigationMenu
        :items="footerMainItems"
        variant="link"
      />

      <template #right>
        <UButton
          color="neutral"
          icon="i-simple-icons-github"
          target="_blank"
          to="https://github.com/lightstack-dev/nuxt-final-auth"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { t } = useI18n({ useScope: 'local' })

const headerItems = computed<NavigationMenuItem[]>(() => [
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
    to: 'https://github.com/lightstack-dev/nuxt-final-auth',
  },
])

const footerLegalItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t('copyright', { year: new Date().getFullYear() }),
    target: '_blank',
    to: 'https://lightstack.dev',
  },
])

const footerMainItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t('made'),
    target: '_blank',
    to: 'https://nuxt.com',
  },
  {
    label: t('powered'),
    target: '_blank',
    to: 'https://logto.io',
  },
])
</script>

<i18n lang="yaml">
en:
  docs: Docs
  copyright: MIT Licensed © {year} Lightstack
  powered: Powered by Logto
  made: Made for Nuxt
</i18n>
