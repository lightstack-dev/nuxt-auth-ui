---
title: SignUpForm
description: A comprehensive registration form with email verification and validation
---

The SignUpForm component provides a complete registration flow with social provider options, form validation, password strength requirements, and email verification. It automatically detects available authentication methods and provides a flexible, accessible interface for user registration.

## Basic Usage and Defaults

::code-preview
::a-sign-up-form
::

#code

```vue
<!-- Renders social buttons based on your configuration -->
<ASignUpForm />
```
::

By default, the form:

- Displays configured social provider buttons for quick registration
- Includes only email, password, and confirm password fields (minimal by design)
- Enforces password strength requirements (configurable in Supabase)
- Provides email verification flow after registration
- Shows a sign-in button for existing users (in the same row as sign-up)
- Renders form elements in `size="md"`{lang="vue-html"}

See the component's [API](#api) for how to override these defaults.

## Minimal by Design

The sign-up form is intentionally minimal, asking only for email and password. This reduces friction and improves conversion rates. User profile information (name, avatar, etc.) can be collected later through the profile management UI when contextually relevant.

This is an opinionated design choice based on UX best practices. See our design principle about [Minimalism & Progressive Disclosure](/docs/design-principles#minimalism-progressive-disclosure). If you need additional fields during sign-up, consider building a custom form using the `useFinalAuth()`{lang="ts"} composable.

## Authentication State Behavior

The SignUpForm component is unaware of authentication state. It always renders when mounted. (However, navigating to the sign-up _route_ when already authenticated will trigger a redirect at the middleware/route level.)

## Registration Flow

The SignUpForm component manages a two-step registration process:

1. **Initial Registration**: User fills form, submits credentials
2. **Email Verification**: User enters verification code from email

The component automatically transitions between these steps, showing a verification code input after successful registration.

## Password Validation

The SignUpForm enforces password strength requirements:

- **Client-side Validation**: Built-in validation for common password requirements (min length, character types)
- **Server-side Enforcement**: Supabase handles the final validation based on your project's auth configuration
- **Real-time Feedback**: Users see validation errors as they type
- **Sensible Defaults**: Minimum 6 characters (Supabase default)

Password policies can be configured in your Supabase project settings (Dashboard > Authentication > Providers > Email).

## Customization

### Social Providers

By default, the sign-up form includes the [SocialProviderButtons component](/docs/components/social-provider-buttons). These buttons only render when social providers have been configured or auto-detected.

With the `:social="false"`{lang="vue-html"} prop, you can remove social providers from a SignUpForm (even though some might be configured in your module config):

::code-preview
::a-sign-up-form{:social="false"}
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
::a-sign-up-form{:secondary="false"}
::

#code

```vue
<!-- Only show the primary action button -->
<ASignUpForm :secondary="false" />
```
::

### Email Verification

After successful registration, the form automatically shows a verification code input:

::code-preview
::a-sign-up-form
::

#code

```vue
<!-- Verification step is shown after successful registration -->
<ASignUpForm />
```
::

Features of the verification step:

- **6-digit PIN input** - Uses Nuxt UI's PinInput component
- **Auto-verification** - Automatically verifies when all 6 digits are entered
- **Resend code** - Button to request a new verification code
- **Clear messaging** - Shows which email address the code was sent to
- **Loading states** - During verification and resend operations

The verification step can be controlled programmatically using the exposed `showVerification()`{lang="ts"} method. This is useful for error recovery or custom flow control within the same registration session.

### Size

Control the size of form inputs and buttons using the `size` prop. This cascades to all interactive elements including input fields, buttons, and the verification PIN input:

::code-preview
::a-sign-up-form{size="xl"}
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

**Note:** Supabase email verification is handled via confirmation links sent to the user's email. The PIN input in the form UI is primarily for mock mode compatibility.

### Hackability

While not intended for typical use, the component exposes methods and events (documented in the [API section](#api)) that enable programmatic control. This is primarily for edge cases where you might need to manually control loading states or display custom error messages.

## API

The component extends [Nuxt UI's `UForm`](https://ui4.nuxt.com/docs/components/form) and inherits all its props and slots. Below are the component-specific additions:

### Props

| Prop        | Type                                                   | Default                                        | Description                                                                     |
| ----------- | ------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `autofocus` | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Auto-focus the email field on mount                                             |
| `class`     | `string \| undefined`{lang="ts-type"}                  | `'max-w-md space-y-6 w-full'`{lang="vue-html"} | Basic spacing and width for the sign-up form                                    |
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

The form enforces client-side validation:

| Field                  | Client-side Validation                                    |
| ---------------------- | --------------------------------------------------------- |
| `email`                | Required, valid email format                              |
| `password`             | Minimum 6 characters (Supabase default), configurable     |
| `passwordConfirmation` | Required, must match password                             |

Password validation:
- **Default**: Minimum 6 characters (matches Supabase defaults)
- **Server-side**: Final validation done by Supabase based on your project configuration
- **Configurable**: Set password requirements in Supabase Dashboard > Authentication > Providers > Email

Note: Full password validation including pwned password checks and custom word rejection happens server-side.

### Localization Keys

The component uses these i18n keys under the `auth` namespace:

| Key                              | Default Value                                              | Description                           |
| -------------------------------- | ---------------------------------------------------------- | ------------------------------------- |
| `auth.signUpTitle`               | "Let's Get You Signed Up"                                 | Card title                           |
| `auth.signUpDescription`         | "Create your account to get started"                      | Card description                     |
| `auth.email`                     | "Email"                                                    | Email field label                    |
| `auth.password`                  | "Password"                                                 | Password field label                 |
| `auth.passwordConfirmation`      | "Password Confirmation"                                    | Password confirmation field label    |
| `auth.withEmail`                 | "With Email"                                               | Email sign-up button label          |
| `auth.signIn`                    | "Sign In"                                                  | Sign-in button label                |
| `auth.or`                        | "OR"                                                        | Separator text between options      |
| `auth.verificationCode`          | "Verification Code"                                        | Verification code field label       |
| `auth.enterVerificationCode`     | "Enter 6-digit code"                                       | Verification code placeholder       |
| `auth.verificationEmailSent`     | "Verification Email Sent"                                  | Verification step title             |
| `auth.checkEmailForCode`         | "Please check your email for the verification code sent to {email}." | Verification instructions |
| `auth.resendCode`                | "Resend Code"                                              | Resend code button label           |
| `auth.verify`                    | "Verify"                                                    | Verify button label                 |
| `auth.signUpSuccess`             | "Account created successfully!"                            | Success notification message        |
| `auth.signUpFailed`              | "Sign up failed"                                           | Error notification title            |
| `auth.accountExists`             | "An account with this email already exists"               | Account exists error message       |
| `auth.emailRequired`             | "Email is required"                                        | Email validation message            |
| `auth.emailInvalid`              | "Please enter a valid email address"                       | Invalid email validation message    |
| `auth.passwordRequired`          | "Password is required"                                     | Password validation message         |
| `auth.passwordMinLength`         | "Password must be at least {min} characters"              | Min length validation message       |
| `auth.passwordMaxLength`         | "Password must be at most {max} characters"               | Max length validation message       |
| `auth.passwordCharacterTypes`    | "Password must contain at least {min} different character types (lowercase, uppercase, numbers, symbols)" | Character types validation |
| `auth.passwordConfirmationRequired` | "Please confirm your password"                          | Confirmation required message       |
| `auth.passwordMismatch`          | "Passwords do not match"                                   | Passwords don't match message      |

::note
Social provider labels are also localized. See [SocialProviderButtons](/docs/components/social-provider-buttons#localization-keys) for details.
::
