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
npm install @lightstack/nuxt-auth-ui @logto/nuxt
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@logto/nuxt",
    "@lightstack/nuxt-auth-ui"
  ],
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
  <AButton />

  <!-- User menu with profile/logout -->
  <AUserMenu />

  <!-- Protect content -->
  <AProtected>
    <SecretContent />
  </AProtected>
</template>
```

## Configuration

Customize everything:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@logto/nuxt",
    "@lightstack/nuxt-auth-ui"
  ],
  authUi: {
    // Branding
    appName: "My SaaS",
    logo: "/logo.svg",

    // Routes
    prefix: "/auth",
    redirects: {
      afterSignIn: "/dashboard",
    },

    // Component prefix (default: 'A')
    componentPrefix: "A",
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
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

## License

MIT License - see [LICENSE](LICENSE) for details.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@lightstack/nuxt-auth-ui/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@lightstack/nuxt-auth-ui
[npm-downloads-src]: https://img.shields.io/npm/dm/@lightstack/nuxt-auth-ui.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@lightstack/nuxt-auth-ui
[license-src]: https://img.shields.io/npm/l/@lightstack/nuxt-auth-ui.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@lightstack/nuxt-auth-ui
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
