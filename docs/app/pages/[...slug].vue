<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="page?.title"
        :description="page?.description"
      />
      <UPageBody>
        <ContentRenderer
          v-if="page"
          :value="page"
        />
      </UPageBody>
      <template #left>
        <UPageAside>
          <DocsNavigation />
        </UPageAside>
      </template>
      <template #right>
        <UContentToc :links="page?.body?.toc?.links" />
      </template>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()

// Build path from slug array (catch-all always returns an array)
const slugArray = route.params.slug as string[]
const path = `/${slugArray.join('/')}`

const { data: page } = await useAsyncData(path, () => {
  return queryCollection('content')
    .path(path)
    .first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

useHead({
  title: page.value?.title,
})
</script>
