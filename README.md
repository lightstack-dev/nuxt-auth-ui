# Lightstack nuxt-auth-ui

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

**Your users, aboard and accounted for.**

Beautiful, production-ready authentication UI for [Nuxt](https://nuxt.com/), powered by [Logto](https://logto.io/).

## Why nuxt-auth-ui?

Building auth sucks. You either spend weeks building forms and flows, or you get a hosted solution that doesn't match your app's design or costs a ton of money.

`nuxt-auth-ui` gives you complete end-user auth UI for Logto that feels native to your app. Built with Nuxt UI components that you can deeply configure and integrate with your app.

## Quick Start

```bash
npm install @lightstack-dev/nuxt-auth-ui @logto/nuxt
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@logto/nuxt", "@lightstack-dev/nuxt-auth-ui"],
});
```

That's it! You now have:

- Sign-in page at `/auth/sign-in`
- Ready-to-use SignInButton and SignUpButton components

## Features

✅ **SignInButton component** - Drop-in sign-in button  
✅ **SignUpButton component** - Drop-in sign-up button  
✅ **Sign-in page** - Beautiful sign-in form  
✅ **Built with Nuxt UI v4** - automatically themed with Lucide icons  
✅ **Self-hostable** - works with any Logto instance  
✅ **TypeScript** - fully typed  
✅ **i18n ready** - works with @nuxtjs/i18n when available  
🚧 **More components coming soon** - User menu, profile pages, etc.

## Components

Drop authentication buttons anywhere in your app:

```vue
<template>
  <!-- Sign-in button -->
  <ASignInButton />
  
  <!-- Sign-up button -->
  <ASignUpButton />
</template>
```

## Configuration

Customize everything:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@logto/nuxt", "@lightstack-dev/nuxt-auth-ui"],
  authUi: {
    // Branding
    appName: "My SaaS",
    logo: "/logo.svg",

    // Routes (customizable)
    routes: {
      signIn: "/auth/sign-in",  // default
      signUp: "/auth/sign-up",  // default
    },
    redirects: {
      afterSignIn: "/dashboard",
      afterSignOut: "/",
    },

    // Component prefix (default: 'A')
    componentPrefix: "A",

    // Messages
    messages: {
      signIn: "Sign In",
      signInTitle: "Welcome Back",
      signInDescription: "Sign in to your account to continue",
    },
  },
});
```

## Requirements

- Nuxt 4.x
- A Logto instance (cloud or self-hosted)

## Development

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  bun install
  
  # Develop with the playground
  bun run dev
  
  # Develop with the docs
  bun run dev:docs
  
  # Run ESLint
  bun run lint
  
  # Run Vitest
  bun run test
  bun run test:watch
  
  # Run type checks
  bun run test:types
  
  # Release new version
  bun run release
  ```

</details>

## License

MIT License - see [LICENSE](LICENSE) for details.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@lightstack-dev/nuxt-auth-ui/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@lightstack-dev/nuxt-auth-ui
[npm-downloads-src]: https://img.shields.io/npm/dm/@lightstack-dev/nuxt-auth-ui.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@lightstack-dev/nuxt-auth-ui
[license-src]: https://img.shields.io/npm/l/@lightstack-dev/nuxt-auth-ui.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@lightstack-dev/nuxt-auth-ui
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
