---
title: SignUpForm
description: A comprehensive registration form with email verification and validation
---

The SignUpForm component provides a complete registration flow with social provider options, form validation, password strength requirements, and email verification. It automatically detects available authentication methods and provides a flexible, accessible interface for user registration.

## Basic Usage and Defaults

::code-preview
::a-sign-up-form{mock}
::

#code

```vue
<!-- Renders social buttons based on Nuxt/Logto configuration -->
<ASignUpForm />
```

::

By default, the form:

- Displays configured social provider buttons for quick registration
- Includes only email, password, and confirm password fields (minimal by design)
- Enforces password strength requirements (8+ chars, uppercase, lowercase, number)
- Shows legal document links when configured (sign-up implies consent)
- Provides email verification flow after registration
- Shows a sign-in button for existing users (in the same row as sign-up)

See the component's [API](#api) for how to override these defaults.

## Minimal by Design

The sign-up form is intentionally minimal, asking only for email and password. This reduces friction and improves conversion rates. User profile information (name, avatar, etc.) can be collected later through the profile management UI when contextually relevant.

This is an opinionated design choice based on UX best practices. See our design principle about [Minimalism & Progressive Disclosure](/design-principles#minimalism-progressive-disclosure). If you need additional fields during sign-up, consider building a custom form using the `useAuthUI` composable.

## Authentication State Behavior

The SignUpForm component is unaware of authentication state. It always renders when mounted. (However, navigating to the sign-up _route_ when already authenticated will trigger a redirect at the middleware/route level.)

## Registration Flow

The SignUpForm component manages a two-step registration process:

1. **Initial Registration**: User fills form, submits credentials
2. **Email Verification**: User enters verification code from email

The component automatically transitions between these steps, showing a verification code input after successful registration.

## Customization

### Social Providers

By default, the sign-up form includes the [SocialProviderButtons component](/components/social-provider-buttons). These buttons only render when social providers have been configured or auto-detected.

With the `:social="false"` prop, you can remove social providers from a SignUpForm (even though some might be configured in Nuxt or Logto):

::code-preview
  ::a-sign-up-form{mock :social="false"}
  ::

#code

```vue
<ASignUpForm :social="false" />
```

::

### Legal Documents

By default, the form shows links to all configured legal documents with text indicating that sign-up implies consent. Control which documents to show with the `:legal` prop:

::code-preview
  ::a-sign-up-form{mock :legal="false"}
  ::

#code

```vue
<!-- Hide legal document links -->
<ASignUpForm :legal="false" />
```

::

::code-preview
  ::a-sign-up-form{mock :legal='["termsOfService"]'}
  ::

#code

```vue
<!-- Show only terms of service link -->
<ASignUpForm :legal="['termsOfService']" />
```

::

### Secondary Action

By default, the form includes a [SignInButton](/components/sign-up-button) for new users, displayed in the same row as the sign-up button. This secondary action button can be removed with the `:secondary="false"` prop:

::code-preview
  ::a-sign-up-form{mock :social="false" :secondary="false"}
  ::

#code

```vue
<!-- Only show the sign-up button -->
<ASignUpForm :secondary="false" />
```

::

### Email Verification

After successful registration, the form automatically shows a verification code input:

::code-preview
::a-sign-up-form{mock verification}
::

#code

```vue
<!-- Verification step (shown automatically after registration) -->
<ASignUpForm verification />
```

::

Features of the verification step:
- **6-digit PIN input** - Uses Nuxt UI's PinInput component
- **Auto-verification** - Automatically verifies when all 6 digits are entered
- **Resend code** - Button to request a new verification code
- **Clear messaging** - Shows which email address the code was sent to
- **Loading states** - During verification and resend operations

The verification step can be controlled programmatically using the exposed `showVerification` method.

### Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<ASignUpForm mock />
```

In mock mode:
- Form submissions simulate registration without API calls
- Verification flow shows without sending emails
- Social buttons animate without redirecting
- Console logs display submitted data

Perfect for showcasing UI without backend setup (like for all forms on this page)!

### Hackability

While not intended for typical use, the component exposes methods and events (documented in the [API section](#api)) that enable programmatic control. This is primarily for edge cases where you might need to manually control loading states or display custom error messages.

## API

The component extends [Nuxt UI's `UForm`](https://ui4.nuxt.com/docs/components/form) and inherits all its props and slots. Below are the component-specific additions:

### Props

| Prop               | Type                   | Default                     | Description                                                    |
| ------------------ | ---------------------- | --------------------------- | -------------------------------------------------------------- |
| `class`            | `string \| undefined`  | `max-w-md space-y-6 w-full` | Basic spacing and width for the sign-up form                   |
| `legal`            | `boolean \| string[]`  | `true`                      | Show legal document links. Use array to specify which ones     |
| `mock`             | `boolean`              | `false`                     | Enable mock mode for documentation/testing                     |
| `secondary`        | `boolean`              | `true`                      | Show sign-in button for existing users                         |
| `social`           | `boolean`              | `true`                      | Show social provider buttons                                   |
| `verification`     | `boolean`              | `false`                     | Start directly in verification mode (for documentation)        |

### Events

| Event    | Payload                                  | Description                        |
| -------- | ---------------------------------------- | ---------------------------------- |
| `submit` | `SignUpFormData & { provider?: string }` | Emitted when form is submitted     |
| `success`| `void`                                   | Emitted on successful registration |

### Exposed Methods

Access these methods using template refs:

```vue
<ASignUpForm ref="signUpForm" />
```

| Method            | Parameters           | Description                        |
| ----------------- | -------------------- | ---------------------------------- |
| `setLoading`      | `(value: boolean)`   | Control the form's loading state  |
| `setError`        | `(message: string)`  | Display an inline error message   |
| `clearForm`       | `()`                 | Reset form to initial state       |
| `showVerification`| `()`                 | Show the verification step         |

### Type Definitions

```typescript
interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
}

interface SocialProvider {
  name: string
  label?: string
  icon?: string
  enabled?: boolean
}
```

### Validation Rules

The form enforces comprehensive client-side validation:

| Field             | Client-side Validation                                          |
| ----------------- | --------------------------------------------------------------- |
| `email`           | Required, valid email format                                   |
| `password`        | Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number      |
| `confirmPassword` | Required, must match password                                  |
| `acceptTerms`     | Required when `showTerms` is true                              |

Note: Server-side validation and additional password policies are determined by your authentication provider's configuration.