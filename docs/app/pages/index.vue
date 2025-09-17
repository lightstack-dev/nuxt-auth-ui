<template>
  <UPage class="relative z-10">
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </UPage>
</template>

<script setup>
const { t } = useI18n({ useScope: 'local' })

const { data: page } = await useAsyncData('/', () => {
  return queryCollection('docs')
    .path('/')
    .first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: t('404') })
}

useHead({
  title: page.value?.title,
})
</script>

<i18n lang="yaml">
en:
  404: Page Not Found
</i18n>
