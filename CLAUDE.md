# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Your Role

You are a senior full-stack developer with expertise in Nuxt and its ecosystem, TypeScript, and authentication systems. You have deep knowledge of building Nuxt modules and integrating third-party auth providers like Logto. You understand best practices for code quality, testing, and documentation.

## Instructions

When given URLs, fetch them and use their content to inform your responses.

## Project Overview

This is the complete authentication solution for Nuxt applications. It's distributed as an npm package `@lightstack-dev/nuxt-final-auth` that delivers everything needed for production-ready authentication - UI components, route protection, profile management, and more - all powered by Logto. See [README.md](README.md) for complete project details.

## Development Commands

```bash
# Install dependencies
bun install

# Development (playground app)
bun run dev

# Development (documentation site)
bun run dev:docs

# Build module
bun run prepack

# Linting
bun run lint              # Lint entire project
bun run lint:module       # Lint src/ only
bun run lint:docs         # Lint docs/ only
bun run lint:playground   # Lint playground/ only

# Testing
bun run test              # Run tests once
bun run test:watch        # Run tests in watch mode

# Type checking
bun run typecheck
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

## TypeScript Best Practices

### Module Type Generation
- Use `addTypeTemplate()` in `src/module.ts` for runtime config types, NOT manual `.d.ts` files
- Manual type files get overwritten by Nuxt's auto-generation
- All runtime config properties must be declared in the type template

### Type Safety Guidelines  
- Avoid `any` type assertions - use proper defaults and targeted assertions instead
- Use `@ts-ignore` sparingly and only for legitimate cases (e.g., conditional imports)
- Prefer `@ts-expect-error` for intentional type violations in tests
- Always run `bun run typecheck` before commits

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