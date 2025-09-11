<template>
  <AFormSection
    context="signIn"
  >
    <ASignInForm />
  </AFormSection>
</template>

<script setup lang="ts">
const { t } = useI18n()
const title = t('auth.signIn')

useHead({
  title: title,
})
</script>
