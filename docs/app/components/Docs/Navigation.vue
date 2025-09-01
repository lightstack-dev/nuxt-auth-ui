<template>
  <UContentNavigation :navigation="navigation" />
</template>

<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})
</script>
