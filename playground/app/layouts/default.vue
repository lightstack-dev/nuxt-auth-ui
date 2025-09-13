<template>
  <div>
    <UHeader title="nuxt-final-auth Playground">
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
