<template>
  <UContainer>
    <UPageHeader :title="title" />
  </UContainer>
</template>

<script setup lang="ts">
const title = 'Home'

useHead({
  title: title,
})
</script>
