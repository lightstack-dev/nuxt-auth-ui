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
<!-- Renders social buttons and legal links based on your configuration -->
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
- Renders form elements in `size="md"`{lang="vue-html"}

See the component's [API](#api) for how to override these defaults.

## Minimal by Design

The sign-up form is intentionally minimal, asking only for email and password. This reduces friction and improves conversion rates. User profile information (name, avatar, etc.) can be collected later through the profile management UI when contextually relevant.

This is an opinionated design choice based on UX best practices. See our design principle about [Minimalism & Progressive Disclosure](/docs/design-principles#minimalism-progressive-disclosure). If you need additional fields during sign-up, consider building a custom form using the `useAuthUI()`{lang="ts"} composable.

## Authentication State Behavior

The SignUpForm component is unaware of authentication state. It always renders when mounted. (However, navigating to the sign-up _route_ when already authenticated will trigger a redirect at the middleware/route level.)

## Registration Flow

The SignUpForm component manages a two-step registration process:

1. **Initial Registration**: User fills form, submits credentials
2. **Email Verification**: User enters verification code from email

The component automatically transitions between these steps, showing a verification code input after successful registration.

## Dynamic Password Validation

The SignUpForm intelligently fetches and applies your Logto instance's password policy:

- **Automatic Detection**: When social providers are auto-detected, password policy is fetched alongside
- **Lazy Loading**: When social providers are configured, password policy loads when user focuses the email field
- **Real-time Validation**: Client-side validation automatically matches your server's password requirements
- **Smart Caching**: Policy is fetched once per session and cached for performance

This ensures users always see accurate password requirements without manual configuration or maintenance.

## Customization

### Social Providers

By default, the sign-up form includes the [SocialProviderButtons component](/docs/components/social-provider-buttons). These buttons only render when social providers have been configured or auto-detected.

With the `:social="false"`{lang="vue-html"} prop, you can remove social providers from a SignUpForm (even though some might be configured in Nuxt or Logto):

::code-preview
::a-sign-up-form{mock :social="false"}
::

#code

```vue
<ASignUpForm :social="false" />
```
::

::tip
To only use social provider buttons without the rest of the sign-up form, use the dedicated [SocialProviderButtons component](/docs/components/social-provider-buttons).
::

### Secondary Action

By default, the form includes a [SignInButton](/docs/components/sign-up-button) for new users, displayed in the same row as the sign-up button. This secondary action button can be removed with the `:secondary="false"`{lang="vue-html"} prop:

::code-preview
::a-sign-up-form{mock :secondary="false"}
::

#code

```vue
<!-- Only show the primary action button -->
<ASignUpForm :secondary="false" />
```
::

### Legal Documents

By default, the form shows links to all configured legal documents with text indicating that sign-up implies consent. Control which documents to show with the `:legal`{lang="vue-html"} prop:

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

::tip
Learn how to configure the links to your legal documents in the [Legal Documents Configuration](/docs/configuration/legal-documents).
::

### Email Verification

After successful registration, the form automatically shows a verification code input:

::code-preview
::a-sign-up-form{mock="verification"}
::

#code

```vue
<!-- Start directly in verification step (for demos/documentation) -->
<ASignUpForm mock="verification" />
```
::

Features of the verification step:

- **6-digit PIN input** - Uses Nuxt UI's PinInput component
- **Auto-verification** - Automatically verifies when all 6 digits are entered
- **Resend code** - Button to request a new verification code
- **Clear messaging** - Shows which email address the code was sent to
- **Loading states** - During verification and resend operations

The verification step can be controlled programmatically using the exposed `showVerification()`{lang="ts"} method. This is useful for error recovery or custom flow control within the same registration session (Logto sessions expire after 1 hour).

### Size

Control the size of form inputs and buttons using the `size` prop. This cascades to all interactive elements including input fields, buttons, and the verification PIN input:

::code-preview
::a-sign-up-form{mock size="xl"}
::

#code

```vue
<!-- Large form elements -->
<ASignUpForm size="xl" />
```
::

Available sizes: `'xs'`{lang="vue-html"}, `'sm'`{lang="vue-html"}, `'md'`{lang="vue-html"} (default), `'lg'`{lang="vue-html"}, `'xl'`{lang="vue-html"}.

The only element not scaling is the legal consent section.

### Focus Management

By default, the email field receives focus when the form mounts, making it ready for immediate typing:

```vue
<!-- Default: auto-focus enabled -->
<ASignInForm />
```

Disable autofocus with the `:autofocus="false"`{lang="vue-html"} prop to prevent unwanted scrolling or conflicts between multiple forms:

```vue
<!-- Multiple forms - control which gives up focus -->
<ASignInForm />
<ASignUpForm :autofocus="false" />
```

During the verification step, the PIN input automatically receives focus for immediate code entry.

Autofocus is automatically disabled in mock mode to prevent unwanted focus during demos.

### Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<!-- Basic mock mode -->
<ASignUpForm mock />

<!-- Start directly in verification step -->
<ASignUpForm mock="verification" />
```

In mock mode:

- Form submissions simulate registration without API calls
- Verification flow shows without sending emails
- Social buttons animate without redirecting
- Console logs display submitted data
- Autofocus is disabled to prevent unwanted focus during demos

The `mock="verification"`{lang="vue-html"} variant starts the form directly in the verification step, useful for showcasing the verification UI without going through registration first.

Perfect for showcasing UI without backend setup (like for all forms on this page)!

### Error Recovery & Flow Control

The `showVerification()`{lang="ts"} method is useful for edge cases within the same registration session:

```vue
<script setup>
const signUpForm = ref();
const registrationError = ref(false);

// Example: Recovery after accidental navigation
const handleRetryVerification = () => {
  if (registrationError.value) {
    signUpForm.value.showVerification();
    registrationError.value = false;
  }
};
</script>

<template>
  <ASignUpForm
    ref="signUpForm"
    @submit="handleSubmit"
    @error="registrationError = true"
  />

  <!-- Recovery option -->
  <UButton v-if="registrationError" @click="handleRetryVerification">
    Return to verification
  </UButton>
</template>
```

**Note:** Logto registration sessions are short-lived (1 hour expiration) and follow a sequential flow. Users cannot resume registration from email links or deep link directly to verification steps.

### Hackability

While not intended for typical use, the component exposes methods and events (documented in the [API section](#api)) that enable programmatic control. This is primarily for edge cases where you might need to manually control loading states or display custom error messages.

## API

The component extends [Nuxt UI's `UForm`](https://ui4.nuxt.com/docs/components/form) and inherits all its props and slots. Below are the component-specific additions:

### Props

| Prop        | Type                                                   | Default                                        | Description                                                                     |
| ----------- | ------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `autofocus` | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Auto-focus the email field on mount                                             |
| `class`     | `string \| undefined`{lang="ts-type"}                  | `'max-w-md space-y-6 w-full'`{lang="vue-html"} | Basic spacing and width for the sign-up form                                    |
| `legal`     | `boolean \| string[]`{lang="ts-type"}                  | `'true'`{lang="vue-html"}                      | Show legal document links. Use array to specify which ones                      |
| `mock`      | `boolean \| 'verification'`{lang="ts-type"}            | `'false'`{lang="vue-html"}                     | Enable mock mode. Use `'verification'`{lang="vue-html"} to start in verify step |
| `secondary` | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Show sign-in button for existing users                                          |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`{lang="ts-type"} | `''md''`{lang="vue-html"}                      | Size of form inputs and buttons                                                 |
| `social`    | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Show social provider buttons                                                    |

### Events

| Event     | Payload                                                  | Description                        |
| --------- | -------------------------------------------------------- | ---------------------------------- |
| `submit`  | `SignUpFormData & { provider?: string }`{lang="ts-type"} | Emitted when form is submitted     |
| `success` | `void`{lang="ts-type"}                                   | Emitted on successful registration |

### Exposed Methods

Access these methods using template refs:

```vue
<ASignUpForm ref="signUpForm" />
```

| Method             | Parameters                          | Description                                 |
| ------------------ | ----------------------------------- | ------------------------------------------- |
| `setLoading`       | `(value: boolean)`{lang="ts-type"}  | Control the form's loading state            |
| `setError`         | `(message: string)`{lang="ts-type"} | Display an inline error message             |
| `clearForm`        | `()`{lang="ts-type"}                | Reset form to initial state                 |
| `showVerification` | `()`{lang="ts-type"}                | Programmatically show the verification step |

### Type Definitions

```typescript
interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SocialProvider {
  name: string;
  label?: string;
  icon?: string;
  enabled?: boolean;
}
```

### Validation Rules

The form enforces dynamic client-side validation based on your Logto instance's password policy:

| Field                  | Client-side Validation                                    |
| ---------------------- | --------------------------------------------------------- |
| `email`                | Required, valid email format                              |
| `password`             | Dynamic: Fetched from your Logto instance (min/max length, character types) |
| `passwordConfirmation` | Required, must match password                             |

The password validation automatically adapts to your server's configuration:
- **Length Requirements**: Min/max characters as configured in Logto
- **Character Types**: Required character types (lowercase, uppercase, numbers, symbols) based on policy
- **Fallback**: Uses sensible defaults (8+ characters) if policy fetch fails

Note: Full password validation including pwned password checks and custom word rejection happens server-side.
