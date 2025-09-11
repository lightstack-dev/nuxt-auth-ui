<template>
  <div>
    <UHeader title="nuxt-auth-ui Playground">
      <template #right>
        <ASignInButton variant="ghost" />
        <ASignUpButton />
      </template>
    </UHeader>
    <UMain>
      <slot />
    </UMain>
    <UFooter />
  </div>
</template>
