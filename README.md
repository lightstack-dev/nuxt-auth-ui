![Lighstack logo](https://raw.githubusercontent.com/lightstack-dev/.github/refs/heads/main/assets/lighstack-logo-2025-08-protected.svg)

# Lightstack nuxt-final-auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

**The final auth UI you'll ever need. Stop rebuilding forms. Start shipping features.**

Here's the truth: auth is a solved problem. It doesn't differentiate your app. It doesn't excite your users. It's pure table stakes—but you still rebuild those same login forms, password resets, and profile screens for _every single project_.

**We're done with that.**

This module gives you production-ready authentication UI for [Nuxt](https://nuxt.com/), powered by [Supabase](https://supabase.com/). Beautiful components, polished flows, i18n support—everything you'd build anyway, but will never have to again. Supabase handles the auth primitives (they're really good at it), and we handle the UI layer you're tired of recreating.

**You bring**: Basic Supabase knowledge and a running instance (cloud or self-hosted)
**We bring**: The complete auth interface your users expect
**You save**: Days of tedious UI work on something that won't move the needle

## Documentation

📚 **View full documentation at [nuxt-final-auth.lightstack.dev](https://nuxt-final-auth.lightstack.dev)**

## Quick Start

```bash
# Install dependencies
npm install @lightstack-dev/nuxt-final-auth @nuxtjs/supabase
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@lightstack-dev/nuxt-final-auth"],

  // Configure i18n (auto-installed, needs locale config)
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // Point to your Supabase instance
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
});
```

That's it! You get beautiful auth forms without writing a single line of UI code. Check the [documentation](https://nuxt-final-auth.lightstack.dev) for configuration options and examples.

## What You Get

- 🎨 **Beautiful UI** - Production-ready components built with Nuxt UI v4
- 🔐 **Complete Auth Flows** - Sign in, sign up, social providers, password reset, email verification
- 👤 **Profile Management** - User settings, avatar uploads, account security
- 🛡️ **Route Protection** - Automatic middleware with SSR support
- 🌍 **i18n Ready** - Full internationalization support out of the box
- 📦 **Smart Defaults** - Sensible configuration, customizable when needed
- 🚀 **TypeScript** - Fully typed for excellent DX

## Why Supabase?

Because it's the only auth primitive that doesn't make you want to rebuild everything yourself.

- **Complete**: Auth, database, storage, realtime—everything you need
- **Self-hostable**: Run it locally, deploy it yourself, or use their cloud
- **Well-documented**: Their docs actually help
- **Battle-tested**: Thousands of production apps trust it

We're not trying to hide Supabase from you—we're making it nicer to work with. You'll still need to understand Supabase auth basics, but you'll never rebuild another login form.

## Requirements

- Nuxt 4.x
- Supabase (cloud account or self-hosted instance)
- Basic understanding of Supabase auth

**Optional but recommended**: [Lightstack CLI](https://github.com/lightstack-dev/cli) for local HTTPS development and streamlined deployment

## Links

- 📚 [Documentation](https://nuxt-final-auth.lightstack.dev)
- 🐛 [Report Issues](https://github.com/lightstack-dev/nuxt-final-auth/issues)
- 💡 [Discussions](https://github.com/lightstack-dev/nuxt-final-auth/discussions)

## License

MIT License - see [LICENSE](LICENSE) for details.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@lightstack-dev/nuxt-final-auth/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@lightstack-dev/nuxt-final-auth
[npm-downloads-src]: https://img.shields.io/npm/dm/@lightstack-dev/nuxt-final-auth.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@lightstack-dev/nuxt-final-auth
[license-src]: https://img.shields.io/npm/l/@lightstack-dev/nuxt-final-auth.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@lightstack-dev/nuxt-final-auth
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
