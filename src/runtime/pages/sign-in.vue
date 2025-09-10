<template>
  <UContainer>
    <ASignInForm />
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('auth.signIn'),
})
</script>
