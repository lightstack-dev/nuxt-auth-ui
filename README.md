# Lightstack nuxt-auth-ui

**Your users, aboard and accounted for.**

Beautiful, production-ready authentication UI for [Nuxt](https://nuxt.com/), powered by [Logto](https://logto.io/).

## Why NuxtCrew?

Building auth sucks. You either spend weeks building forms and flows, or you get a hosted solution that doesn't match your app's design or costs a ton of money.

`nuxt-auth-ui` gives you complete end-user auth UI for Logto that feels native to your app. Built with Nuxt UI components that you can deeply configure and integrate with your app.

## Quick Start

```bash
npm install nuxt-auth-ui
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-auth-ui"],
});
```

That's it! You now have:

- Sign-up/-in at `/auth/sign-up` and `/auth/sign-in`
- Password reset flow at `/auth/reset`
- User profile at `/auth/profile`
- Security settings at `/auth/security`

## Features

✅ **Email + password authentication**  
✅ **Social sign-in** (Google, GitHub, Microsoft, Apple)  
✅ **Password reset flow**  
✅ **User profile management**  
✅ **Session management**  
✅ **Account deletion**  
✅ **Built with Nuxt UI** - automatically themed  
✅ **Self-hostable** - works with any Logto instance  
✅ **TypeScript** - fully typed

## Components

Drop these anywhere in your app:

```vue
<template>
  <!-- Sign-in button -->
  <AuthButton />

  <!-- User menu with profile/logout -->
  <AuthUserMenu />

  <!-- Protect content -->
  <AuthProtected>
    <SecretContent />
  </AuthProtected>
</template>
```

## Configuration

Customize everything:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-auth-ui"],
  authUi: {
    // Branding
    name: "My SaaS",
    logo: "/logo.svg",

    // Routes
    prefix: "/auth",
    redirects: {
      afterSignIn: "/dashboard",
    },
  },
});
```

## Requirements

- Nuxt 4.x
- A Logto instance (cloud or self-hosted)

## License

[MIT License](/LICENSE)
