<template>
  <AFormSection context="signUp">
    <ASignUpForm />
  </AFormSection>
</template>

<script setup lang="ts">
const { t } = useI18n()
const title = t('auth.signUp')

useHead({
  title: title,
})
</script>
