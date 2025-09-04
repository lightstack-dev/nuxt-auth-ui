---
title: Sign-In Page
description: Pre-built sign-in page with authentication form
---

The module automatically adds a sign-in page to your application at `/auth/sign-in` (configurable). This page provides a complete authentication experience with email/password and social sign-in support.

## Overview

The sign-in page combines the `AContainer` and `ASignInForm` components to create a professional authentication experience:

- Centered, responsive layout
- Email/password authentication
- Social provider buttons
- Remember me functionality
- Password reset link
- Sign-up navigation
- Proper error handling (inline, not toasts)
- Success notifications (toasts only)

## Page Structure

The sign-in page is composed of:

```vue
<AContainer>
  <ASignInForm />
  <template #footer>
    <!-- Sign-up link -->
  </template>
</AContainer>
```

## Configuration

### Route Configuration

Customize the sign-in page URL:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  authUi: {
    routes: {
      signIn: '/login'  // Default: '/auth/sign-in'
    }
  }
})
```

### Redirect Configuration

Configure where users go after signing in:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  authUi: {
    redirects: {
      afterSignIn: '/dashboard'  // Default: '/'
    }
  }
})
```

### Branding

Add your logo and app name:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  authUi: {
    appName: 'My App',
    logo: '/logo.svg'
  }
})
```

## Authentication Flow

1. User enters email and password
2. Form validates input with Zod schema
3. On submit, attempts authentication with Logto
4. **Errors display inline** in the form
5. **Success shows toast** and redirects

## Social Authentication

The page automatically detects social providers configured in your Logto instance:

- Google
- GitHub  
- Microsoft
- Facebook
- And more...

Social buttons appear below the email/password form with appropriate icons and labels.

## Error Handling

Following our design principles:

- **Form errors** (validation, wrong password) → Inline display
- **Success** (signed in) → Toast notification

Example error scenarios:
- Invalid email format → Shows under email field
- Wrong password → Shows in alert above submit button
- Network error → Shows in alert above submit button

## Customization

### Using Your Own Page

To replace the default sign-in page:

1. Create your own page at the same route
2. Use the provided components or build custom

```vue
<!-- pages/auth/sign-in.vue -->
<template>
  <div class="my-custom-layout">
    <ASignInForm @submit="handleSignIn" />
  </div>
</template>
```

### Styling

The page uses Nuxt UI components and inherits your app's theme:

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'neutral'
  }
})
```

## Messages

Customize text via i18n or module configuration:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  authUi: {
    messages: {
      signInTitle: 'Welcome Back',
      signInDescription: 'Enter your credentials to continue',
      signIn: 'Log In',
      forgotPassword: 'Forgot password?',
      dontHaveAccount: "Don't have an account?",
      signUp: 'Sign up'
    }
  }
})
```

## Integration with Logto

The sign-in page integrates with `@logto/nuxt` for authentication:

1. Install and configure `@logto/nuxt`
2. The sign-in page handles the UI
3. Logto manages the authentication logic
4. Successful sign-in redirects per your configuration

## Security Considerations

- Passwords are never stored or logged
- HTTPS is required in production
- CSRF protection via Logto
- Rate limiting should be configured in Logto
- Session management handled by Logto

## Related Components

- [`AContainer`](/components/container) - Layout wrapper
- [`ASignInForm`](/components/sign-in-form) - Form component
- [`ASignInButton`](/components/sign-in-button) - Quick sign-in trigger
- [`ASignUpButton`](/components/sign-up-button) - Link to registration