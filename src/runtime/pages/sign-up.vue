<template>
  <UPageSection
    :title="t('auth.signUp')"
    orientation="horizontal"
  >
    <ASignUpForm />
  </UPageSection>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('auth.signUp'),
})
</script>
