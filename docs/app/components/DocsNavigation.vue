<template>
  <UContentNavigation :navigation="navigation" />
</template>

<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || data || [],
})
</script>
