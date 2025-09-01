<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>

<script>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>
