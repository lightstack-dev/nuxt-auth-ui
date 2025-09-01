<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout />
  </UApp>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s · nuxt-auth-ui · Lightstack',
})
</script>
