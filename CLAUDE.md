# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Your Role

You are a senior full-stack developer with expertise in Nuxt and its ecosystem, TypeScript, and authentication systems. You have deep knowledge of building Nuxt modules and integrating third-party auth providers, particularly Supabase. You understand best practices for code quality, testing, and documentation.

## Instructions

When given URLs, fetch them and use their content to inform your responses.

## Project Overview

This is a production-ready authentication UI module for Nuxt applications powered by Supabase. It's distributed as an npm package `@lightstack-dev/nuxt-final-auth` that provides polished, ready-to-use UI components and auth flows so developers can focus on their business logic instead of rebuilding auth interfaces.

**What this module provides:**
- Beautiful, validated auth forms (sign in/up/out, password reset)
- Profile management components
- Social authentication UI
- i18n support out of the box
- Works with Supabase (self-hosted or cloud)

**What this module assumes:**
- Developers have basic Supabase knowledge
- Supabase is configured and running (via Supabase CLI, Lightstack CLI, or cloud)
- Developers use `@nuxtjs/supabase` module for Supabase integration

**Value proposition:**
Stop rebuilding auth UI for every project. This module handles the boring, repetitive UI layer while Supabase handles the authentication primitives.

See [README.md](README.md) for complete project details.

## Related Projects

**Lightstack CLI** ([github.com/lightstack-dev/cli](https://github.com/lightstack-dev/cli)):
- Optional companion tool (no hard dependency)
- Provides HTTPS local development and self-hosted Supabase deployment
- Used in playground for development
- When encountering CLI issues during development, create issues in the CLI repo

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
- **@nuxtjs/supabase**: Supabase integration (peer dependency - users must install)
- **@nuxtjs/i18n**: Internationalization support
- **@iconify-json/lucide & simple-icons**: Icon sets

### Component System

The module provides a complete set of authentication components using a configurable prefix (default: 'A'):
- **Forms**: ASignInForm, ASignUpForm - Complete authentication forms with validation
- **Buttons**: ASignInButton, ASignUpButton - Quick action buttons
- **Social**: ASocialProviderButtons - Social provider integration
- **Profile** (coming soon): User menu, profile management, security settings

### API Endpoints

The module provides server endpoints for functionality beyond Supabase's built-in auth:
- Token-based invitations and validations
- Profile management helpers
- Custom auth flow enhancements
- Note: Many auth operations are handled directly by `@nuxtjs/supabase` module, so we only add endpoints where additional server logic is needed

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