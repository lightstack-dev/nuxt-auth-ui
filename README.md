![Lighstack logo](https://raw.githubusercontent.com/lightstack-dev/.github/refs/heads/main/assets/lighstack-logo-2025-08-protected.svg)

# Lightstack nuxt-final-auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

**The final auth solution for Nuxt. Stop building auth. Start shipping features.**

Production-ready authentication with beautiful UI and complete profile management for [Nuxt](https://nuxt.com/), powered by [Logto](https://logto.io/).

## Documentation

📚 **[View full documentation at nuxt-final-auth.lightstack.dev](https://nuxt-final-auth.lightstack.dev)**

## Quick Start

```bash
# Install the module
npm install @lightstack-dev/nuxt-final-auth
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@lightstack-dev/nuxt-final-auth"],

  // Configure i18n (auto-installed, needs locale config)
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
```

That's it! Check the [documentation](https://nuxt-final-auth.lightstack.dev) for configuration options and examples.

## Key Features

- 🎨 **Beautiful UI** - Production-ready components built with Nuxt UI v4
- 🔐 **Complete Auth** - Sign in, sign up, social providers, password validation
- 🛡️ **Route Protection** - Automatic middleware with SSR support
- 🌍 **i18n Ready** - Full internationalization support
- 📦 **Zero Config** - All dependencies auto-installed
- 🚀 **TypeScript** - Fully typed for excellent DX


## Requirements

- Nuxt 4.x
- A Logto instance (cloud or self-hosted)

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
