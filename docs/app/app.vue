<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UHeader>
      <template #title>
        <LightstackLogo202508 class="max-h-4 w-auto" />
        nuxt-auth-ui
      </template>
    </UHeader>
    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <UContentNavigation :navigation="navigation" />
            </UPageAside>
          </template>
          <NuxtPage />
        </UPage>
      </UContainer>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s · nuxt-auth-ui · Lightstack',
})

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})
</script>
