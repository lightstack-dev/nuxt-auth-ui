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

Install the required modules:

```bash
npm install @lightstack-dev/nuxt-auth-ui @logto/nuxt @nuxtjs/i18n
```

> **Note:** `@nuxt/ui` gets installed automatically as part of nuxt-auth-ui.

First, set up your Logto instance following their [official Nuxt guide](https://docs.logto.io/quick-starts/nuxt).

Then add the modules to your Nuxt configuration:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@lightstack-dev/nuxt-auth-ui", "@logto/nuxt", "@nuxtjs/i18n"],
  
  // Configure i18n (required)
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  
  // Optional: Configure Auth UI
  authUi: {
    // See configuration docs for all options
  },
});
```

That's it! You now have:

- Beautiful sign-in & sign-up pages at `/auth/sign-in` and `/auth/sign-up`
- Complete authentication forms with social providers
- Intelligent password validation that adapts to your Logto instance
- Full internationalization support
- Ready-to-use authentication components

## Features

✅ **Complete Auth Forms** - SignInForm & SignUpForm with email verification  
✅ **Smart Components** - SignInButton, SignUpButton, SocialProviderButtons  
✅ **Dynamic Password Validation** - Automatically adapts to your Logto instance's password policy  
✅ **Flexible Sizing** - Configurable size prop (xs/sm/md/lg/xl) that cascades through all components  
✅ **Full i18n Support** - Built on @nuxtjs/i18n with comprehensive translations  
✅ **Social Auth** - Auto-detects or configures social providers (Google, GitHub, Microsoft, etc.)  
✅ **Legal Compliance** - Built-in consent components for terms, privacy, and cookies  
✅ **Built with Nuxt UI v4** - Automatically themed with your app's design system  
✅ **TypeScript** - Fully typed with excellent DX  
✅ **Self-hostable** - Works with any Logto instance  
🚧 **More components coming soon** - User menu, profile pages, etc.

## Components

Drop authentication components anywhere in your app:

```vue
<template>
  <!-- Complete sign-in form with social auth -->
  <ASignInForm />
  
  <!-- Sign-up form with email verification -->
  <ASignUpForm />
  
  <!-- Individual buttons -->
  <ASignInButton />
  <ASignUpButton />
  
  <!-- Social provider buttons -->
  <ASocialProviderButtons />
  
  <!-- Size customization -->
  <ASignInForm size="lg" />
  <ASignUpButton size="sm" />
</template>
```

## Configuration

Customize everything through module options and app.config:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@logto/nuxt",
    "@nuxtjs/i18n", // Optional but recommended
    "@lightstack-dev/nuxt-auth-ui"
  ],
  
  authUi: {
    // Routes (customizable)
    routes: {
      signIn: "/auth/sign-in",
      signUp: "/auth/sign-up",
      signOut: "/auth/sign-out",
      profile: "/auth/profile",
      passwordReset: "/auth/password-reset",
    },
    
    // Social providers (auto-detected if not specified)
    socialProviders: ["google", "github", "microsoft"],
    
    // Legal documents
    legal: {
      termsOfService: "/terms",
      privacyPolicy: "/privacy",
      cookiePolicy: "/cookies",
    },
    
    // Component prefix (default: 'A')
    componentPrefix: "A",
  },
  
  // i18n configuration (optional)
  i18n: {
    locales: ["en", "es", "fr"],
    defaultLocale: "en",
  },
});
```

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    // Icon customization
    icons: {
      authSignIn: "i-lucide-log-in",
      authSignUp: "i-lucide-user-plus",
      authGoogle: "i-simple-icons-google",
      authGithub: "i-simple-icons-github",
    },
  },
});
```

## Intelligent Features

### 🎯 Dynamic Password Validation

The SignUpForm automatically fetches and applies your Logto instance's password policy:

- **Smart Loading**: Policy fetched with social providers or lazily on email field focus
- **Real-time Validation**: Client-side validation matches server requirements
- **Clear Feedback**: Dynamic error messages in user's language
- **Zero Configuration**: Works out of the box with any Logto instance

### 🌍 Full i18n Support

Built on @nuxtjs/i18n with comprehensive translations:

```vue
<template>
  <!-- Automatically uses user's locale -->
  <ASignInForm />
  
  <!-- All messages are translatable -->
  <ASignUpForm :legal="['termsOfService', 'privacyPolicy']" />
</template>
```

### 📏 Flexible Sizing

All components support size customization that cascades to child elements:

```vue
<template>
  <!-- Extra large forms for desktop -->
  <ASignInForm size="xl" />
  
  <!-- Compact buttons for mobile -->
  <ASignUpButton size="sm" />
</template>
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
  
  # Develop with the playground
  npm run dev
  
  # Develop with the docs
  npm run dev:docs
  
  # Run ESLint
  npm run lint
  
  # Run tests
  npm run test
  
  # Run type checks
  npm run typecheck
  ```
  
  See `package.json` for all available scripts.

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
