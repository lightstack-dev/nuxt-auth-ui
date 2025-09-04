<template>
  <UHeader>
    <template #title>
      <LightstackLogogram202508 class="max-h-4 w-auto" />
      nuxt-auth-ui
    </template>
    <template #right>
      <UTooltip text="nuxt-auth-ui on GitHub">
        <UButton color="neutral" icon="i-simple-icons-github" to="https://github.com/lightstack-dev/nuxt-auth-ui" variant="ghost" />
      </UTooltip>
      <UColorModeButton />
    </template>
  </UHeader>
  <UMain>
    <NuxtPage />
  </UMain>
</template>
