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
        <USeparator />
        <UContentSurround :surround="(surround as any)" />
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
const { t } = useI18n({ useScope: 'local' })

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    .path(route.path)
    .first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: t('404') })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

useHead({
  title: page.value?.title,
})
</script>

<i18n lang="yaml">
en:
  404: Page Not Found
</i18n>
