---
title: SignInButton
description: Comprehensive auth UI components reference
---

# Components

All components use the configurable prefix (default: `A`).

## ASignInButton

A smart sign-in button that only appears when users are not authenticated.

### Basic Usage

```vue
<template>
  <!-- Minimal - shows "Sign in" with default icon -->
  <ASignInButton />
</template>
```

### Customization

```vue
<template>
  <!-- Custom text via slot -->
  <ASignInButton>Get Started</ASignInButton>
  
  <!-- No icon -->
  <ASignInButton :leading-icon="undefined">Login</ASignInButton>
  
  <!-- Custom icon -->
  <ASignInButton leading-icon="i-heroicons-user">Join</ASignInButton>
  
  <!-- Nuxt UI button props -->
  <ASignInButton 
    variant="outline" 
    size="lg" 
    color="green"
  >
    Create Account
  </ASignInButton>
</template>
```

### Behavior

- **Conditional**: Only visible when `!auth.isAuthenticated`
- **Navigation**: Links to `/auth/sign-in` (or configured prefix)
- **No loading state**: Simple navigation, no artificial delays
- **Icon**: Shows `appConfig.ui.icons.authSignIn` by default
- **Text**: Shows localized "Sign in" text by default

### Props

Extends all [UButton props](https://ui.nuxt.com/components/button) plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leading-icon` | `string \| undefined` | `appConfig.ui.icons.authSignIn` | Icon to show before text |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button text content |

### Examples

::code-group
```vue [Basic]
<ASignInButton />
```

```vue [Custom Text]
<ASignInButton>Login to Dashboard</ASignInButton>
```

```vue [No Icon]
<ASignInButton :leading-icon="undefined">
  Sign In
</ASignInButton>
```

```vue [Styled]
<ASignInButton 
  variant="outline"
  size="xl"
  color="emerald"
  leading-icon="i-heroicons-arrow-right"
>
  Get Started →
</ASignInButton>
```
::

---

## AUserMenu  

*Coming soon*

User dropdown menu with profile and sign out options.

## AProtected

*Coming soon*

Wrapper component to protect content from unauthenticated users.