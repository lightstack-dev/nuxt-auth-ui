# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt module that provides production-ready authentication UI components powered by Logto. It's distributed as an npm package `@lightstack-dev/nuxt-auth-ui`. See [README.md](README.md) for complete project details.

## Development Commands

```bash
# Install dependencies
npm install

# Development (playground app)
npm run dev

# Development (documentation site)
npm run dev:docs

# Build module
npm run prepack

# Linting
npm run lint              # Lint entire project
npm run lint:module       # Lint src/ only
npm run lint:docs         # Lint docs/ only
npm run lint:playground   # Lint playground/ only

# Testing
npm run test              # Run tests once
npm run test:watch        # Run tests in watch mode

# Type checking
npm run typecheck
```

## Architecture

### Module Structure

- **Main Module**: `src/module.ts` - Nuxt module definition that configures all features
- **Runtime Components**: `src/runtime/components/` - Vue components (SignInForm, SignUpForm, etc.)
- **Server API**: `src/runtime/server/api/auth-ui/` - Server endpoints for Logto integration
- **Composables**: `src/runtime/composables/` - Vue composables for auth UI logic
- **Pages**: `src/runtime/pages/` - Pre-built auth pages
- **Locales**: `src/runtime/locales/` - i18n translation files
- **Types**: `src/runtime/types/` - TypeScript type definitions

### Workspace Structure

This is a monorepo with three workspaces (see package.json:8-11):
- Root: The Nuxt module itself
- `docs/`: Documentation site built with Nuxt Content
- `playground/`: Development playground for testing the module

### Key Dependencies

- **@nuxt/ui v4**: Component library (auto-installed)
- **@logto/nuxt**: Authentication provider (peer dependency)
- **@nuxtjs/i18n**: Internationalization (peer dependency)
- **@iconify-json/lucide & simple-icons**: Icon sets

### Component Naming

Components use a configurable prefix (default: 'A'):
- ASignInForm, ASignUpForm, ASignInButton, ASignUpButton, ASocialProviderButtons

### API Endpoints

The module creates these server endpoints:
- `/api/auth-ui/connectors` - Fetch available social connectors
- `/api/auth-ui/password-policy` - Get Logto password requirements
- `/api/auth-ui/register` - Handle user registration

### Configuration

Module options are set in `nuxt.config.ts` under the `authUi` key. See `src/runtime/types/config.ts` for the complete interface.

## Code Style

ESLint configuration (eslint.config.mjs:10-14):
- No semicolons
- Single quotes
- Vue multi-word component names disabled for docs/ and playground/

## Testing Approach

- Test framework: Vitest
- Test files: Located in `test/` directory
- Run with `npm run test` or `npm run test:watch`

## Building & Publishing

The module uses `@nuxt/module-builder` for building. The release process:
1. Run linting, tests, and build
2. Use changelogen for changelog generation
3. Publish to npm
4. Push git tags

See package.json:37 for the complete release script.