# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the complete authentication solution for Nuxt applications. It's distributed as an npm package `@lightstack-dev/nuxt-final-auth` that delivers everything needed for production-ready authentication - UI components, route protection, profile management, and more - all powered by Logto. See [README.md](README.md) for complete project details.

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

- **Main Module**: `src/module.ts` - Nuxt module definition that configures the complete auth system
- **Runtime Components**: `src/runtime/components/` - Production-ready auth components (SignInForm, SignUpForm, etc.)
- **Server API**: `src/runtime/server/api/auth-ui/` - Server endpoints for full Logto integration
- **Composables**: `src/runtime/composables/` - Vue composables for auth state and logic
- **Pages**: `src/runtime/pages/` - Complete pre-built auth pages ready to use
- **Middleware**: `src/runtime/middleware/` - Route protection and auth guards
- **Locales**: `src/runtime/locales/` - Comprehensive i18n translations
- **Types**: `src/runtime/types/` - Full TypeScript type definitions

### Workspace Structure

This is a monorepo with three workspaces (see package.json:8-11):
- Root: The Nuxt module itself
- `docs/`: Documentation site built with Nuxt Content
- `playground/`: Development playground for testing the module

### Key Dependencies

All dependencies are automatically installed with the module:
- **@nuxt/ui v4**: Component library for beautiful UI
- **@logto/nuxt**: Authentication provider integration
- **@nuxtjs/i18n**: Internationalization support
- **@iconify-json/lucide & simple-icons**: Icon sets

### Component System

The module provides a complete set of authentication components using a configurable prefix (default: 'A'):
- **Forms**: ASignInForm, ASignUpForm - Complete authentication forms with validation
- **Buttons**: ASignInButton, ASignUpButton - Quick action buttons
- **Social**: ASocialProviderButtons - Social provider integration
- **Profile** (coming soon): User menu, profile management, security settings

### API Endpoints

The module provides a complete authentication API:
- `/api/auth-ui/connectors` - Social provider discovery and configuration
- `/api/auth-ui/password-policy` - Dynamic password policy enforcement
- `/api/auth-ui/register` - Complete user registration flow
- Additional endpoints coming for profile management, MFA, and account security

### Configuration

The module provides comprehensive configuration through `nuxt.config.ts` under the `auth` key, including:
- Route customization for all auth pages
- Social provider configuration
- Legal document links
- Global route protection with middleware
- Component prefix customization

See `src/runtime/types/config.ts` for the complete configuration interface.

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